<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

require_once('./config/dbconfig.php');

// Decode JSON input and check for validity
$input = json_decode(file_get_contents('php://input'), true);

error_log("Received input: " . json_encode($input, JSON_PRETTY_PRINT));

if (!$input) {
    echo json_encode(["success" => false, "message" => "Invalid JSON input"]);
    exit();
}

// Check for main required fields
$requiredMainFields = ['teamName', 'teamLeaderEmail', 'members', 'idprojet'];
foreach ($requiredMainFields as $field) {
    if (!isset($input[$field])) {
        error_log("Missing required field: $field");
        echo json_encode(["success" => false, "message" => "Missing required field: $field"]);
        exit();
    }
}

// Assign input variables
$teamName = $input['teamName'];
$teamLeaderEmail = $input['teamLeaderEmail'];
$members = $input['members'];
$idprojet = $input['idprojet'];
$idchercheur = isset($input['idchercheur']) ? (int)$input['idchercheur'] : null;
$idevaluateur = isset($input['idevaluateur']) ? (int)$input['idevaluateur'] : null;

// Determine leader ID and log it
if ($idchercheur) {
    $leaderColumn = 'idchercheur';
    $leaderId = $idchercheur;
} elseif ($idevaluateur) {
    $leaderColumn = 'idevaluateur';
    $leaderId = $idevaluateur;
} else {
    error_log("No valid leader ID provided.");
    echo json_encode(["success" => false, "message" => "No valid leader ID provided."]);
    exit();
}
error_log("Leader ID chosen: $leaderColumn = $leaderId");

// Insert team into `equipe` table and log success/failure
$query = "INSERT INTO equipe (nom_equipe, idprojet, $leaderColumn) VALUES (?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("sii", $teamName, $idprojet, $leaderId);

if ($stmt->execute()) {
    $id_equipe = $conn->insert_id;
    error_log("Team inserted successfully with ID: $id_equipe");

    // Prepare query for inserting each member
    $query = "INSERT INTO membre_dequipe (id_equipe, Nom_membre, Prenom_membre, Civility_membre, Role_dans_lequipe, Titre_membre, Email_membre, Specialite_membre, Structure_membre, Contribution_projet_membre, temps_de_travail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);

    foreach ($members as $index => $member) {
        // Log each member to check structure and values
        error_log("Processing member #$index: " . json_encode($member, JSON_PRETTY_PRINT));

        // Check required fields for each member and log if missing
        $requiredMemberFields = ['nom', 'prenom', 'role', 'titre', 'email', 'specialite', 'structure', 'contribution', 'temps_de_travail'];
        foreach ($requiredMemberFields as $field) {
            if (!isset($member[$field]) || $member[$field] === '') {
                error_log("Missing field for member #$index: $field");
                echo json_encode(["success" => false, "message" => "Incomplete member data for member #$index. Missing field: $field"]);
                exit();
            }
        }

        // Set optional `civility` field to NULL if missing
        $civility = isset($member['civility']) ? $member['civility'] : null;

        // Log the binding parameters
        error_log("Binding member parameters for member #$index - nom: {$member['nom']}, prenom: {$member['prenom']}, civility: $civility, role: {$member['role']}, titre: {$member['titre']}, email: {$member['email']}, specialite: {$member['specialite']}, structure: {$member['structure']}, contribution: {$member['contribution']}, temps_de_travail: {$member['temps_de_travail']}");

        // Bind parameters and execute for each member
        $stmt->bind_param(
            "isssssssssi",
            $id_equipe,
            $member['nom'],
            $member['prenom'],
            $civility,
            $member['role'],
            $member['titre'],
            $member['email'],
            $member['specialite'],
            $member['structure'],
            $member['contribution'],
            $member['temps_de_travail']
        );

        if (!$stmt->execute()) {
            error_log("Failed to insert member #$index: " . $stmt->error);
            echo json_encode(["success" => false, "message" => "Failed to add member #$index"]);
            exit();
        } else {
            error_log("Member #$index inserted successfully.");
        }
    }

    echo json_encode(["success" => true, "message" => "Team and members added successfully."]);
} else {
    error_log("Failed to insert team: " . $stmt->error);
    echo json_encode(["success" => false, "message" => "Failed to add team."]);
}

$stmt->close();
$conn->close();
