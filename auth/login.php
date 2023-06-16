<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');
require_once('../config/dbconfig.php');

$requestData = json_decode(file_get_contents('php://input'), true);

$response = array("error" => false);
$email = isset($requestData['email']) ? sanitizeInput($requestData['email']) : null;
$password = isset($requestData['password']) ? sanitizeInput($requestData['password']) : null;

if (!$email) {
    $error = "Email is required";
    $response['error'] = true;
    $response['error_msg'] = $error;
    echo json_encode($response);
    exit();
} elseif (!$password) {
    $error = "Password is required";
    $response['error'] = true;
    $response['error_msg'] = $error;
    echo json_encode($response);
    exit();
} else {
    $loginQuery = "SELECT * FROM `users` WHERE `email` = ? AND `password` = ?";
    $stmt = mysqli_prepare($conn, $loginQuery);
    mysqli_stmt_bind_param($stmt, "ss", $email, $password);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_store_result($stmt);

    if (mysqli_stmt_num_rows($stmt) > 0) {
        $response['message'] = "Login successful";
        $response['error'] = false;
        echo json_encode($response);
    } else {
        $response['message'] = "Invalid email or password";
        $response['error'] = true;
        echo json_encode($response);
    }

    mysqli_stmt_close($stmt);
}

function sanitizeInput($input)
{
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input);
    return $input;
}
?>
