<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

require_once('./config/dbconfig.php');

// Query to fetch teams with their members
$query = "
    SELECT 
        e.id_equipe AS teamId, 
        e.nom_equipe AS teamName, 
        m.id_membre, 
        m.Nom_membre AS nom, 
        m.Prenom_membre AS prenom, 
        m.Civility_membre AS civility, 
        m.Role_dans_lequipe AS role, 
        m.Titre_membre AS titre, 
        m.Email_membre AS email, 
        m.Specialite_membre AS specialite, 
        m.Structure_membre AS structure, 
        m.Contribution_projet_membre AS contribution, 
        m.temps_de_travail
    FROM equipe e
    LEFT JOIN membre_dequipe m ON e.id_equipe = m.id_equipe
";

$result = $conn->query($query);

$teams = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $teamId = $row['teamId'];

        // Initialize the team if it doesn't already exist in the array
        if (!isset($teams[$teamId])) {
            $teams[$teamId] = [
                'id' => $teamId,
                'teamName' => $row['teamName'],
                'members' => []
            ];
        }

        // Add member details if they exist
        if ($row['nom'] && $row['prenom']) {
            $teams[$teamId]['members'][] = [
                'id_membre' => $row['id_membre'],
                'nom' => $row['nom'],
                'prenom' => $row['prenom'],
                'civility' => $row['civility'],
                'role' => $row['role'],
                'titre' => $row['titre'],
                'email' => $row['email'],
                'specialite' => $row['specialite'],
                'structure' => $row['structure'],
                'contribution' => $row['contribution'],
                'temps_de_travail' => $row['temps_de_travail'],
            ];
        }
    }

    // Reset keys to return as array
    $teams = array_values($teams);

    echo json_encode(["success" => true, "teams" => $teams]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to fetch teams."]);
}

$conn->close();
