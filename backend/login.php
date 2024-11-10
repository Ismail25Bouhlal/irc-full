<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');
require_once('./config/dbconfig.php');

$requestData = json_decode(file_get_contents('php://input'), true);

$response = array("error" => false);
$email = isset($requestData['email']) ? sanitizeInput($requestData['email']) : null;
$password = isset($requestData['password']) ? sanitizeInput($requestData['password']) : null;

if (!$email || !$password) {
    $error = "Email and password are required";
    $response['error'] = true;
    $response['error_msg'] = $error;
    echo json_encode($response);
    exit();
} else {
    // Check in the administrateur table
    $loginQueryAdmin = "SELECT email, password FROM administrateur WHERE email = ?";
    $stmtAdmin = mysqli_prepare($conn, $loginQueryAdmin);

    if (!$stmtAdmin) {
        $error = "Error in preparing the statement: " . mysqli_error($conn);
        $response['error'] = true;
        $response['error_msg'] = $error;
        echo json_encode($response);
        exit();
    }

    mysqli_stmt_bind_param($stmtAdmin, "s", $email);
    mysqli_stmt_execute($stmtAdmin);
    mysqli_stmt_store_result($stmtAdmin);

    if (mysqli_stmt_num_rows($stmtAdmin) > 0) {
        mysqli_stmt_bind_result($stmtAdmin, $dbEmail, $dbPassword);
        mysqli_stmt_fetch($stmtAdmin);

        // Verify password
        if (password_verify($password, $dbPassword)) {
            $response['message'] = "Login successful as administrateur";
            $response['error'] = false;
            $response['role'] = "administrateur";
            $response['email'] = $email;
            echo json_encode($response);
            exit();
        }
    }

    mysqli_stmt_close($stmtAdmin);

    // Check in the evaluateur table

    $loginQueryEvaluateur = "SELECT idevaluteur, email, password FROM evaluteur WHERE email = ?";
    $stmtEvaluateur = mysqli_prepare($conn, $loginQueryEvaluateur);

    if (!$stmtEvaluateur) {
        $error = "Error in preparing the statement: " . mysqli_error($conn);
        $response['error'] = true;
        $response['error_msg'] = $error;
        echo json_encode($response);
        exit();
    }

    mysqli_stmt_bind_param($stmtEvaluateur, "s", $email);
    mysqli_stmt_execute($stmtEvaluateur);
    mysqli_stmt_store_result($stmtEvaluateur);

    if (mysqli_stmt_num_rows($stmtEvaluateur) > 0) {
        mysqli_stmt_bind_result($stmtEvaluateur,$idevaluteur , $dbEmail, $dbPassword);
        mysqli_stmt_fetch($stmtEvaluateur);

        if (password_verify($password, $dbPassword)) {
            $response['message'] = "Login successful as evaluateur";
            $response['error'] = false;
            $response['role'] = "evaluateur";
            $response['email'] = $email;
            $response['idevaluteur'] = $idevaluteur;
            error_log("evaluateur ID: " . $idevaluteur );
            echo json_encode($response);
            exit();
        }
    }

    mysqli_stmt_close($stmtEvaluateur);

    // Check in the chercheur table
    // Modify this query to select idchercheur
    $loginQueryChercheur = "SELECT idchercheur, email, password FROM chercheur WHERE email = ?";
    $stmtChercheur = mysqli_prepare($conn, $loginQueryChercheur);

    if (!$stmtChercheur) {
        $error = "Error in preparing the statement: " . mysqli_error($conn);
        $response['error'] = true;
        $response['error_msg'] = $error;
        echo json_encode($response);
        exit();
    }

    mysqli_stmt_bind_param($stmtChercheur, "s", $email);
    mysqli_stmt_execute($stmtChercheur);
    mysqli_stmt_store_result($stmtChercheur);

    if (mysqli_stmt_num_rows($stmtChercheur) > 0) {
        mysqli_stmt_bind_result($stmtChercheur, $idchercheur, $dbEmail, $dbPassword);
        mysqli_stmt_fetch($stmtChercheur);

        // Verify password
        if (password_verify($password, $dbPassword)) {
            $response['message'] = "Login successful as chercheur";
            $response['error'] = false;
            $response['role'] = "chercheur";
            $response['email'] = $email;
            $response['idchercheur'] = $idchercheur;
            error_log("Chercheur ID: " . $idchercheur);
            echo json_encode($response);
            exit();
        }
    }


    mysqli_stmt_close($stmtChercheur);



    // If the email is not found in either table or password is incorrect
    $response['message'] = "Invalid email or password";
    $response['error'] = true;
    echo json_encode($response);
    exit();
}

function sanitizeInput($input)
{
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input);
    return $input;
}
