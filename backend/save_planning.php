<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow requests from your React app
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

// Include your database configuration file
require_once('./config/dbconfig.php');

// Get the JSON input from the request
$input = json_decode(file_get_contents('php://input'), true);

// Check if all required fields are present
if (isset($input['nom_Planning'], $input['Description_Planning'], $input['id_equipe'], $input['idprojet'], $input['debut_planning'], $input['fin_planning'], $input['nbr_jour_planning'])) {
    $nom_Planning = $input['nom_Planning'];
    $Description_Planning = $input['Description_Planning'];
    $id_equipe = $input['id_equipe'];
    $idprojet = $input['idprojet'];
    $debut_planning = $input['debut_planning'];
    $fin_planning = $input['fin_planning'];
    $nbr_jour_planning = $input['nbr_jour_planning'];

    // Prepare the SQL statement
    $query = "INSERT INTO planning (nom_Planning, Description_Planning, id_equipe, idprojet, debut_planning, fin_planning, nbr_jour_planning) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssiiisi", $nom_Planning, $Description_Planning, $id_equipe, $idprojet, $debut_planning, $fin_planning, $nbr_jour_planning);

    // Execute the statement and check for success
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Planning added successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to add planning."]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid input."]);
}

$conn->close();
