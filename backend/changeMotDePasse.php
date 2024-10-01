<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');
require_once('./config/dbconfig.php');

$requestData = json_decode(file_get_contents('php://input'), true);

$response = array("error" => false);
$email = isset($requestData['email']) ? sanitizeInput($requestData['email']) : null;
$currentPassword = isset($requestData['currentPassword']) ? $requestData['currentPassword'] : null;
$newPassword = isset($requestData['newPassword']) ? $requestData['newPassword'] : null;

// Validate inputs
if (!$email || !$currentPassword || !$newPassword) {
    $error = "All fields are required";
    $response['error'] = true;
    $response['error_msg'] = $error;
    echo json_encode($response);
    exit();
}

// Validate current password
// Implement your logic to fetch the user's current password from the database and compare it with $currentPassword

// If current password is valid, update the password in the database with $newPassword
// Implement your logic to update the password in the database

// Return appropriate response
if ($passwordUpdatedSuccessfully) {
    $response['message'] = "Password updated successfully";
    echo json_encode($response);
} else {
    $response['error'] = true;
    $response['error_msg'] = "Failed to update password";
    echo json_encode($response);
}

function sanitizeInput($input)
{
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input);
    return $input;
}
?>
