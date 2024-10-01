<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

require_once('./config/dbconfig.php');

// Get the user ID from the request
$requestData = json_decode(file_get_contents('php://input'), true);
if (!isset($requestData['id'])) {
    echo json_encode(["error" => "No ID provided"]);
    exit;
}
$userId = $requestData['id'];

// Fetch the user from the "chercheur" table
$sql = "SELECT * FROM chercheur WHERE idchercheur = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Check if the user is already an evaluateur by email
    $checkSql = "SELECT * FROM evaluteur WHERE email = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $user['email']);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();

    if ($checkResult->num_rows > 0) {
        echo json_encode(["error" => "User is already an evaluateur"]);
    } else {
        // Insert the user into the "evaluteur" table
        $insertSql = "INSERT INTO evaluteur (nom, prenom, email, telephone, password) VALUES (?, ?, ?, ?, ?)";
        $insertStmt = $conn->prepare($insertSql);
        $insertStmt->bind_param("sssss", $user['nom'], $user['prenom'], $user['email'], $user['telephone'], $user['password']);
        $insertStmt->execute();

        echo json_encode(["message" => "User moved to evaluateur table successfully"]);
    }
} else {
    echo json_encode(["error" => "User not found"]);
}

$conn->close();
