<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

require_once('./config/dbconfig.php');

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['teamName'], $input['teamLeaderEmail'], $input['members'], $input['idprojet'])) {
    $teamName = $input['teamName'];
    $teamLeaderEmail = $input['teamLeaderEmail'];
    $members = $input['members'];
    $idprojet = $input['idprojet'];
    $idchercheur = isset($input['idchercheur']) ? (int) $input['idchercheur'] : null;
    $idevaluateur = isset($input['idevaluateur']) ? (int) $input['idevaluateur'] : null;

    // Determine which ID to use as the team leader
    if ($idchercheur) {
        $leaderColumn = 'idchercheur';
        $leaderId = $idchercheur;
    } elseif ($idevaluateur) {
        $leaderColumn = 'idevaluateur';
        $leaderId = $idevaluateur;
    } else {
        echo json_encode(["success" => false, "message" => "No valid leader ID provided."]);
        exit();
    }

    // Insert team into `equipe` table
    $query = "INSERT INTO equipe (nom_equipe, idprojet, $leaderColumn) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sii", $teamName, $idprojet, $leaderId);

    if ($stmt->execute()) {
        $id_equipe = $conn->insert_id; // Get the inserted team ID

        // Insert each member into `membre_dequipe` table
        $query = "INSERT INTO membre_dequipe (id_equipe, Nom_membre, Prenom_membre, Civility_membre, Role_dans_lequipe, Titre_membre, Email_membre, Specialite_membre, Structure_membre, Contribution_projet_membre, temps_de_travail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);

        foreach ($members as $member) {
            $stmt->bind_param(
                "isssssssssi",
                $id_equipe,
                $member['nom'],
                $member['prenom'],
                $member['civility'],
                $member['role'],
                $member['titre'],
                $member['email'],
                $member['specialite'],
                $member['structure'],
                $member['contribution'],
                $member['temps_de_travail']
            );
            $stmt->execute();
        }

        echo json_encode(["success" => true, "message" => "Team and members added successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to add team."]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid input."]);
}

$conn->close();
