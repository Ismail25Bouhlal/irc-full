<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include database configuration
require_once('./config/dbconfig.php');
global $conn;

// Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Check if the 'action' parameter is provided
$action = $_GET['action'] ?? null;

if ($action === 'getDetailedProjects') {
    try {
        // Query to fetch detailed project information
        $sql = "
            SELECT 
                p.idprojet,
                p.titre_projet,
                p.date_debut_projet,
                p.date_fin_projet,
                p.Domaine,
                p.Sous_Domaine,
                p.Montant_global,
                p.Montant_subvention,
                c.nom AS chercheur_nom,
                e.nom_equipe,
                b.valeur_description AS valeur_description,
                b.valeur_montant AS valeur_montant
            FROM 
                projets p
            LEFT JOIN 
                chercheur c ON p.idchercheur = c.idchercheur
            LEFT JOIN 
                equipe e ON p.idprojet = e.idprojet
            LEFT JOIN 
                budget_projet b ON p.idprojet = b.idprojet
        ";

        // Prepare the statement
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            throw new Exception("SQL preparation failed: " . $conn->error);
        }

        // Execute the statement
        $stmt->execute();

        // Fetch the results
        $result = $stmt->get_result();
        $projects = $result->fetch_all(MYSQLI_ASSOC);

        // Return the fetched data as JSON
        if ($projects) {
            echo json_encode(['status' => 'success', 'data' => $projects]);
        } else {
            echo json_encode(['status' => 'success', 'data' => [], 'message' => 'No projects found.']);
        }
    } catch (Exception $e) {
        // Return any exceptions as JSON
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
} else {
    // Handle invalid action parameter
    echo json_encode(['status' => 'error', 'message' => 'Invalid action.']);
}
