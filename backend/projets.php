<?php

require_once('./config/dbconfig.php');

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

// Handle incoming POST data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $inputData = file_get_contents('php://input');
    // Decode JSON data into PHP array
    $formData = json_decode($inputData, true);

    // Check if formData is valid
    if ($formData) {
        // Extract the general project fields
        $projectTitle = $formData['projectTitle'];
        $startDate = $formData['startDate'];
        $endDate = $formData['endDate'];
        $applicationField = $formData['applicationField'];
        $domain = $formData['domain'];
        $subDomain = $formData['subDomain'];
        $totalAmount = $formData['totalAmount'];
        $requestedAmount = $formData['requestedAmount'];

        // Extract resume details
        $resumeFr = $formData['resume']['francais'];
        $resumeEn = $formData['resume']['anglais'];

        // Extract mini project details
        $intro = $formData['miniProject']['introduction'];
        $objectives = $formData['miniProject']['objectives'];
        $methodology = $formData['miniProject']['methodology'];
        $results = $formData['miniProject']['results'];
        $ethics = $formData['miniProject']['ethics'];

        // Use the existing database connection from dbconfig.php
        global $conn;

        // Save the project main details to projets table
        // Replace "Sous_Domaine" with the correct column name
        $stmt = $conn->prepare("INSERT INTO projets (titre_projet, date_debut_projet, date_fin_projet, nom_Champs_dpplication, Domaine, sous_domaine, Montant_global, Montant_subvention, Resume_francais, Resume_anglais, Introduction_projet, Objectif_general_specifiques, Methodologie_proposee, resultats_attendus, considerations_ethiques) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssssssssss", $projectTitle, $startDate, $endDate, $applicationField, $domain, $subDomain, $totalAmount, $requestedAmount, $resumeFr, $resumeEn, $intro, $objectives, $methodology, $results, $ethics);

        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Project data saved successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to save project data']);
        }

        // Close the statement
        $stmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input data']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
