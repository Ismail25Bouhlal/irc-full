<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

require_once('./config/dbconfig.php');

// Fetch users from the "chercheur" table
$sql = "SELECT idchercheur, nom, prenom, email, telephone FROM chercheur";
$result = $conn->query($sql);

$users = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Check if the user exists in the "evaluteur" table
        $email = $row['email'];
        $checkSql = "SELECT * FROM evaluteur WHERE email = ?";
        $checkStmt = $conn->prepare($checkSql);
        $checkStmt->bind_param("s", $email);
        $checkStmt->execute();
        $checkResult = $checkStmt->get_result();

        // Add isEvaluateur status to user data
        if ($checkResult->num_rows > 0) {
            $row['isEvaluateur'] = true;
        } else {
            $row['isEvaluateur'] = false;
        }

        $users[] = $row;
    }
} else {
    $users = [];
}

echo json_encode($users);

$conn->close();
