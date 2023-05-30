<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once('../config/dbconfig.php');

$data = json_decode(file_get_contents('php://input'), true); // Receive data from React code

if (isset($data['email']) && isset($data['password'])) {
    $email = htmlspecialchars($data['email']);
    $password = htmlspecialchars($data['password']);

    $conn = new mysqli('localhost', 'root', '', 'irc');

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        if ($password == $user['password']) {
            $response['status'] = true;
            $response['message'] = "Login successful";
            $response['user'] = $user;
        } else {
            $response['status'] = false;
            $response['message'] = "Incorrect password";
        }
    } else {
        $response['status'] = false;
        $response['message'] = "User not found";
    }

    $conn->close();
} else {
    $response['status'] = false;
    $response['message'] = "Invalid data received";
}

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($response);
?>
