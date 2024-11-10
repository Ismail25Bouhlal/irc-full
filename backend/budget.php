<?php
// Enable error reporting
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
    die("Database connection was not established.");
}

// Decode the incoming JSON data
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    // Start MySQLi transaction
    mysqli_begin_transaction($conn);

    try {
        // Insert into budget_parametre (Appelation and Date Creation)
        $stmt = $conn->prepare("INSERT INTO budget_parametre (appellation, date_creation) VALUES (?, ?)");
        $stmt->bind_param('ss', $data['appelation'], $data['creationDate']);
        $stmt->execute();

        // Get the ID of the inserted budget_parametre
        $budgetParametreId = $conn->insert_id;

        // Insert sections, groupements, and categories using MySQLi
        foreach ($data['sections'] as $section) {
            $stmt = $conn->prepare("INSERT INTO ligne_budget_section (ID_budget_parametre, appellation, date_creation) VALUES (?, ?, ?)");
            $stmt->bind_param('iss', $budgetParametreId, $section['appelation'], $section['creationDate']);
            $stmt->execute();

            $sectionId = $conn->insert_id;  // Get the last inserted ID for section

            // Insert groupements related to this section
            foreach ($data['groups'] as $group) {
                if ($group['groupement'] === $section['appelation']) {
                    // Insert into ligne_budget_groupement with ID_budget_parametre
                    $stmt = $conn->prepare("INSERT INTO ligne_budget_groupement (ID_budget_parametre, ID_ligne_budget_section, appellation, date_creation) VALUES (?, ?, ?, ?)");
                    $stmt->bind_param('iiss', $budgetParametreId, $sectionId, $group['appelation'], $group['creationDate']);
                    $stmt->execute();

                    $groupId = $conn->insert_id;  // Get the last inserted ID for groupement

                    // Insert categories related to this groupement
                    foreach ($data['categories'] as $categorie) {
                        if ($categorie['groupement'] === $group['appelation']) {
                            // Insert into ligne_budget_categorie with ID_budget_parametre
                            $stmt = $conn->prepare("INSERT INTO ligne_budget_categorie (ID_budget_parametre, ID_ligne_budget_groupement, appellation, date_creation) VALUES (?, ?, ?, ?)");
                            $stmt->bind_param('iiss', $budgetParametreId, $groupId, $categorie['appelation'], $categorie['creationDate']);
                            $stmt->execute();
                        }
                    }
                }
            }
        }

        // Commit the transaction
        mysqli_commit($conn);

        echo json_encode(["message" => "Budget saved successfully"]);
    } catch (Exception $e) {
        // Rollback the transaction on error
        mysqli_rollback($conn);
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Invalid data"]);
}
