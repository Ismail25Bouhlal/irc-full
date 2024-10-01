<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');
require_once('./config/dbconfig.php');

$requestData = json_decode(file_get_contents('php://input'), true);

$response = array("error" => false);
$email = isset($requestData['email']) ? sanitizeInput($requestData['email']) : null;

if (!$email) {
    $error = "Email is required";
    $response['error'] = true;
    $response['error_msg'] = $error;
    echo json_encode($response);
    exit();
} else {
    // Fetch user information from the database based on the email
    $adminQuery = "SELECT * FROM `administrateur` WHERE `email` = ?";
    $adminStmt = mysqli_prepare($conn, $adminQuery);

    if (!$adminStmt) {
        $error = "Error in preparing the administrator statement: " . mysqli_error($conn);
        $response['error'] = true;
        $response['error_msg'] = $error;
        echo json_encode($response);
        exit();
    }

    mysqli_stmt_bind_param($adminStmt, "s", $email);
    mysqli_stmt_execute($adminStmt);
    $adminResult = mysqli_stmt_get_result($adminStmt);

    if ($adminResult && mysqli_num_rows($adminResult) > 0) {
        $row = mysqli_fetch_assoc($adminResult);
        $userInformation = array(
            'nom' => $row['nom'],
            'prenom' => $row['prenom'],
            'email' => $row['email'],
            'telephone' => $row['telephone'],
        );

        $response['userInformation'] = $userInformation;
        echo json_encode($response);
        exit();
    } else {
        // Check in the chercheur table if not found in administrateur table
        $chercheurQuery = "SELECT * FROM `chercheur` WHERE `email` = ?";
        $chercheurStmt = mysqli_prepare($conn, $chercheurQuery);

        if (!$chercheurStmt) {
            $error = "Error in preparing the chercheur statement: " . mysqli_error($conn);
            $response['error'] = true;
            $response['error_msg'] = $error;
            echo json_encode($response);
            exit();
        }

        mysqli_stmt_bind_param($chercheurStmt, "s", $email);
        mysqli_stmt_execute($chercheurStmt);
        $chercheurResult = mysqli_stmt_get_result($chercheurStmt);

        if ($chercheurResult && mysqli_num_rows($chercheurResult) > 0) {
            $row = mysqli_fetch_assoc($chercheurResult);
            $userInformation = array(
                'nom' => $row['nom'],
                'prenom' => $row['prenom'],
                'email' => $row['email'],
                'telephone' => $row['telephone'],
            );

            $response['userInformation'] = $userInformation;
            echo json_encode($response);
            exit();
        } else {
            $response['error'] = true;
            $response['error_msg'] = "User not found";
            echo json_encode($response);
            exit();
        }
    }
}

function sanitizeInput($input)
{
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input);
    return $input;
}
