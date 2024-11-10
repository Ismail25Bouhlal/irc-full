<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS and Content-Type headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

// Include the MySQLi connection file
require_once('./config/dbconfig.php');

// Check if $conn is set (MySQLi connection)
if (!$conn) {
    die(json_encode(["error" => "Database connection was not established."]));
}

// Query to get all sections, groupements, and categories
$query = "
    SELECT 
        s.ID_ligne_budget_section AS section_id, s.appellation AS section_appellation,
        g.ID_ligne_budget_groupement AS groupement_id, g.appellation AS groupement_appellation, g.ID_ligne_budget_section AS groupement_section_id,
        c.ID_ligne_budget_categorie AS categorie_id, c.appellation AS categorie_appellation, c.ID_ligne_budget_groupement AS categorie_groupement_id,
        s.ID_budget_parametre AS budget_parametre_id  -- Add this line if available in `ligne_budget_section` or any other relevant table
    FROM ligne_budget_section s
    LEFT JOIN ligne_budget_groupement g ON s.ID_ligne_budget_section = g.ID_ligne_budget_section
    LEFT JOIN ligne_budget_categorie c ON g.ID_ligne_budget_groupement = c.ID_ligne_budget_groupement
";

// Execute the query
$result = $conn->query($query);

$response = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $response[] = $row;
    }
} else {
    $response = ["message" => "No data found."];
}

// Log the response for debugging
file_put_contents('php://stderr', print_r($response, true));

// Return the JSON response
echo json_encode($response);

$conn->close();
