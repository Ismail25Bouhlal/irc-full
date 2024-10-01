<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Respond with HTTP 200 for preflight
    exit; // Stop further processing
}


require_once('./config/dbconfig.php');

// Get the JSON data from the POST request
// Validate the incoming request data
$requestData = json_decode(file_get_contents('php://input'), true);

// Ensure you have quotes around string literals
$email = isset($requestData['email']) ? $requestData['email'] : null;

if (!$email) {
    // If 'email' is missing, respond with a 400 status and an error message
    http_response_code(400); // Bad request
    echo json_encode(["error" => true, "message" => "Missing 'email'."]);
    exit; // Stop further processing
}

// Now, ensure you have correct quotes and references throughout
// Example: Bind the parameter correctly with proper variable reference
$sqlCheck = $conn->prepare("SELECT * FROM chercheur WHERE email = ?");
$sqlCheck->bind_param("s", $email); // Ensure email variable is used correctly

$sqlCheck->execute();
$result = $sqlCheck->get_result();

if ($result->num_rows > 0) { // If the user exists
    $sqlUpdate = $conn->prepare(
        "UPDATE chercheur 
         SET selectedSpecialty = ?, 
             type_organisme = ?, 
             specialite_formation = ?, 
             domaine_maitrise = ?, 
             domaine_dinteret = ? ,
             statut = ?,
             specialite = ?,
             selected_organisme = ?
         WHERE email = ?"
    );
    $sqlUpdate->bind_param(
        "sssssssss",
        $requestData['selectedSpecialty'],
        $requestData['type_organisme'],
        $requestData['specialite_formation'],
        $requestData['domaine_maitrise'],
        $requestData['domaine_dinteret'],
        $requestData['statut'],
        $requestData['specialite'],
        $requestData['selected_organisme'],
        $email
    );

    if ($sqlUpdate->execute()) {
        echo json_encode(["error" => false, "message" => "Data updated successfully."]);
    } else {
        http_response_code(500); // Server error
        echo json_encode(["error" => true, "message" => "Database error: " . $conn->error]);
    }
} else { // If the user doesn't exist, insert a new record
    $sqlInsert = $conn->prepare(
        "INSERT INTO chercheur (email, selectedSpecialty, type_organisme, specialite_formation, domaine_maitrise, domaine_dinteret,statut,specialite,selected_organisme) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    $sqlInsert->bind_param(
        "ssssss",
        $email, // Make sure 'email' is properly referenced
        $requestData['selectedSpecialty'],
        $requestData['type_organisme'],
        $requestData['specialite_formation'],
        $requestData['domaine_maitrise'],
        $requestData['domaine_dinteret'],
        $requestData['statut'],
        $requestData['specialite'],
        $requestData['selected_organisme']
    );

    if ($sqlInsert->execute()) {
        echo json_encode(["error" => false, "message" => "Data saved successfully."]);
    } else {
        http_response_code(500); // Server error
        echo json_encode(["error" => true, "message" => "Database error: " . $conn->error]);
    }
}

// Close the database connection
$conn->close();
