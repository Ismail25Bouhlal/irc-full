<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

require_once('./config/dbconfig.php');

if (!$conn) {
    die("Database connection failed.");
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["error" => "No data received"]);
    exit;
}

try {
    mysqli_begin_transaction($conn); // Start transaction

    // Update the main budget details
    $stmt = $conn->prepare("UPDATE budget_parametre SET appellation = ?, date_creation = ? WHERE ID_budget_parametre = ?");
    $stmt->bind_param('ssi', $data['appelation'], $data['creationDate'], $data['id']);
    $stmt->execute();

    // Update or insert sections
    foreach ($data['sections'] as $section) {
        if (!empty($section['id'])) {
            // Update existing section
            $stmt = $conn->prepare("UPDATE ligne_budget_section SET appellation = ? WHERE ID_ligne_budget_section = ?");
            $stmt->bind_param('si', $section['appellation'], $section['id']);
            $stmt->execute();
        } else {
            // Insert new section
            $stmt = $conn->prepare("INSERT INTO ligne_budget_section (ID_budget_parametre, appellation) VALUES (?, ?)");
            $stmt->bind_param('is', $data['id'], $section['appellation']);
            $stmt->execute();
        }
    }

    // Update or insert groupements
    foreach ($data['groupements'] as $groupement) {
        if (!empty($groupement['id'])) {
            // Update existing groupement
            $stmt = $conn->prepare("UPDATE ligne_budget_groupement SET appellation = ? WHERE ID_ligne_budget_groupement = ?");
            $stmt->bind_param('si', $groupement['appellation'], $groupement['id']);
            $stmt->execute();
        } else {
            // Insert new groupement
            $stmt = $conn->prepare("INSERT INTO ligne_budget_groupement (ID_budget_parametre, appellation) VALUES (?, ?)");
            $stmt->bind_param('is', $data['id'], $groupement['appellation']);
            $stmt->execute();
        }
    }

    // Update or insert categories
    foreach ($data['categories'] as $categorie) {
        if (!empty($categorie['id'])) {
            // Update existing category
            $stmt = $conn->prepare("UPDATE ligne_budget_categorie SET appellation = ? WHERE ID_ligne_budget_categorie = ?");
            $stmt->bind_param('si', $categorie['appellation'], $categorie['id']);
            $stmt->execute();
        } else {
            // Insert new category
            $stmt = $conn->prepare("INSERT INTO ligne_budget_categorie (ID_budget_parametre, appellation) VALUES (?, ?)");
            $stmt->bind_param('is', $data['id'], $categorie['appellation']);
            $stmt->execute();
        }
    }

    // Fetch the updated data to return to the frontend
    $stmt = $conn->prepare("
        SELECT 
            b.ID_budget_parametre AS id,
            b.appellation AS budget_appellation,
            b.date_creation AS budget_date_creation,
            s.appellation AS section,
            g.appellation AS groupement,
            c.appellation AS categorie
        FROM 
            budget_parametre b
        LEFT JOIN 
            ligne_budget_section s ON b.ID_budget_parametre = s.ID_budget_parametre
        LEFT JOIN 
            ligne_budget_groupement g ON b.ID_budget_parametre = g.ID_budget_parametre
        LEFT JOIN 
            ligne_budget_categorie c ON b.ID_budget_parametre = c.ID_budget_parametre
        WHERE 
            b.ID_budget_parametre = ?
        ORDER BY 
            b.appellation, s.appellation, g.appellation, c.appellation
    ");
    $stmt->bind_param('i', $data['id']);
    $stmt->execute();
    $result = $stmt->get_result();

    $updatedData = [];
    while ($row = $result->fetch_assoc()) {
        $updatedData[] = $row;
    }

    mysqli_commit($conn); // Commit transaction
    echo json_encode(["message" => "Budget updated successfully", "updatedData" => $updatedData]);
} catch (Exception $e) {
    mysqli_rollback($conn); // Rollback transaction
    echo json_encode(["error" => $e->getMessage()]);
}
