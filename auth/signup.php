<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');
require_once('../config/dbconfig.php');

$requestData = json_decode(file_get_contents('php://input'), true);

$response = array("error" => false);
$Nom = isset($requestData['Nom']) ? sanitizeInput($requestData['Nom']) : null;
$prenom = isset($requestData['prenom']) ? sanitizeInput($requestData['prenom']) : null;
$Date_de_nainssance = isset($requestData['date_de_nainssance']) ? sanitizeInput($requestData['date_de_nainssance']) : null;
$adresse_line1 = isset($requestData['adresse_line1']) ? sanitizeInput($requestData['adresse_line1']) : null;
$adresse_line2 = isset($requestData['adresse_line2']) ? sanitizeInput($requestData['adresse_line2']) : null;
$idAfilliation = isset($requestData['idAfilliation']) ? sanitizeInput($requestData['idAfilliation']) : null;
$idVille = isset($requestData['idVille']) ? sanitizeInput($requestData['idVille']) : null;
$idStatu = isset($requestData['idStatu']) ? sanitizeInput($requestData['idStatu']) : null;
$idPays = isset($requestData['idPays']) ? sanitizeInput($requestData['idPays']) : null;
$email = isset($requestData['email']) ? sanitizeInput($requestData['email']) : null;
$telephone = isset($requestData['telephone']) ? sanitizeInput($requestData['telephone']) : null;
$password = isset($requestData['password']) ? sanitizeInput($requestData['password']) : null;

if (!$Nom) {
    $error = "Nom is required";
    $response['error'] = true;
    $response['error_msg'] = $error;
    echo json_encode($response);
    exit();
} elseif (!$prenom) {
    $error = "Prenom is required";
    $response['error'] = true;
    $response['error_msg'] = $error;
    echo json_encode($response);
    exit();
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $error = "The email is invalid";
    $response['error'] = true;
    $response['error_msg'] = $error;
    echo json_encode($response);
    exit();
} elseif (!$email) {
    $error = "Email is required";
    $response['error'] = true;
    $response['error_msg'] = $error;
    echo json_encode($response);
    exit();
} elseif (!$telephone) {
    $error = "Telephone is required";
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
} elseif (!$adresse_line1) {
    $error = "adresse_line1 is required";
    $response['error'] = true;
    $response['error_msg'] = $error;
    echo json_encode($response);
    exit();
} elseif (!$Date_de_nainssance) {
    $error = "Date_de_nainssance is required";
    $response['error'] = true;
    $response['error_msg'] = $error;
    echo json_encode($response);
    exit();
} else {
    $alreadyExistVal = mysqli_prepare($conn, "SELECT * FROM `users` WHERE `email` = ?");
    mysqli_stmt_bind_param($alreadyExistVal, "s", $email);
    mysqli_stmt_execute($alreadyExistVal);
    mysqli_stmt_store_result($alreadyExistVal);
    
    if (mysqli_stmt_num_rows($alreadyExistVal) == 0) {
        $insertQry = "INSERT INTO `users`(`nom`, `prenom`, `idAfilliation`, `Date_de_nainssance`, `idVille`, `idPays`, `idStatu`, `password`, `adresse_line1`, `telephone`, `email`)
                      VALUES ('$Nom', '$prenom', '$idAfilliation', '$Date_de_nainssance', '$idVille', '$idPays', '$idStatu', '$password', '$adresse_line1', '$telephone', '$email')";

        $stmt = mysqli_prepare($conn, $insertQry);
        mysqli_stmt_bind_param($stmt, "ssisiiissss", $Nom, $prenom, $idAfilliation, $Date_de_nainssance, $idVille, $idPays, $idStatu, $password, $adresse_line1, $telephone, $email);
        mysqli_stmt_execute($stmt);

        if (mysqli_stmt_affected_rows($stmt) > 0) {
            $userID = mysqli_insert_id($conn);
            $response['message'] = "Registered successfully";
            $response['userID'] = $userID;
            $response['error'] = false;
            echo json_encode($response);

            $dataToSave = json_encode($requestData);
            file_put_contents('data.json', $dataToSave);
        } else {
            $response['message'] = "Sorry, this email is already in use. Please try again.";
            $response['error'] = true;
            echo json_encode($response);
        }

        mysqli_stmt_close($stmt);
    } else {
        $response['message'] = "Sorry, this email is already in use. Please try again.";
        $response['error'] = true;
        echo json_encode($response);
    }
}

function sanitizeInput($input)
{
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input);
    return $input;
}
?>
