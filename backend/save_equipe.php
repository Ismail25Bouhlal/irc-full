<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

require_once('./config/dbconfig.php');

// Log raw input for debugging
$rawInput = file_get_contents('php://input');
error_log("Raw input received: " . $rawInput);

// Decode JSON input and check for validity
$input = json_decode($rawInput, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    error_log("JSON decode error: " . json_last_error_msg());
    echo json_encode(["success" => false, "message" => "Invalid JSON input: " . json_last_error_msg()]);
    exit();
}

error_log("Decoded input: " . json_encode($input, JSON_PRETTY_PRINT));

// Validate main fields for the team object
if (!isset($input['members']) || !is_array($input['members'])) {
    error_log("Missing or invalid 'members' array.");
    echo json_encode(["success" => false, "message" => "Invalid or missing 'members' array."]);
    exit();
}

// Check if teamId is provided
$teamId = isset($input['teamId']) ? (int)$input['teamId'] : null;

if ($teamId) {
    // If teamId exists, skip team creation and only insert members
    error_log("Adding members to existing team with ID: $teamId");
} else {
    // Validate required fields for new team creation
    $requiredTeamFields = ['teamName', 'teamLeaderEmail', 'idprojet'];
    foreach ($requiredTeamFields as $field) {
        if (!isset($input[$field])) {
            error_log("Missing required team field: $field");
            echo json_encode(["success" => false, "message" => "Missing required field: $field"]);
            exit();
        }
    }

    // Assign input fields for the team
    $teamName = $input['teamName'];
    $teamLeaderEmail = $input['teamLeaderEmail'];
    $idprojet = $input['idprojet'];
    $idchercheur = isset($input['idchercheur']) ? (int)$input['idchercheur'] : null;
    $idevaluateur = isset($input['idevaluateur']) ? (int)$input['idevaluateur'] : null;

    // Insert team into `equipe` table
    $query = "INSERT INTO equipe (nom_equipe, idprojet, idchercheur, idevaluteur) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("siii", $teamName, $idprojet, $idchercheur, $idevaluateur);

    if (!$stmt->execute()) {
        error_log("Failed to insert team: " . $stmt->error);
        echo json_encode(["success" => false, "message" => "Failed to add team"]);
        exit();
    }

    $teamId = $stmt->insert_id;
    error_log("New team created successfully with ID: $teamId");
}

// Prepare the query for inserting members
$query = "INSERT INTO membre_dequipe (id_equipe, Nom_membre, Prenom_membre, Civility_membre, Role_dans_lequipe, Titre_membre, Email_membre, Specialite_membre, Structure_membre, Contribution_projet_membre, temps_de_travail) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($query);

foreach ($input['members'] as $index => $member) {
    // Validate required fields for each member
    $requiredMemberFields = ['nom', 'prenom', 'role', 'titre', 'email', 'specialite', 'structure', 'contribution', 'temps_de_travail'];
    foreach ($requiredMemberFields as $field) {
        if (!isset($member[$field]) || $member[$field] === '') {
            error_log("Missing field for member #$index: $field");
            echo json_encode(["success" => false, "message" => "Incomplete member data for member #$index. Missing field: $field"]);
            exit();
        }
    }

    // Handle optional `civility` field
    $civility = isset($member['civility']) ? $member['civility'] : null;

    // Bind parameters and execute for each member
    $stmt->bind_param(
        "isssssssssi",
        $teamId,
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
$stmt->close();
$conn->close();
