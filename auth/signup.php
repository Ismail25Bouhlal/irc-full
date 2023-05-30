<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');
require_once('../config/dbconfig.php');

$requestData = json_decode(file_get_contents('php://input'), true);

$response = array("error" => false);
$Nom = @htmlspecialchars($requestData['Nom']);
$prenom = @htmlspecialchars($requestData['prenom']);
$Date_de_nainssance = @htmlspecialchars($requestData['date_de_nainssance']);
$adresse_line1 = @htmlspecialchars($requestData['adresse_line1']);
$adresse_line2 = @htmlspecialchars($requestData['adresse_line2']);
$idAfilliation = @htmlspecialchars($requestData['idAfilliation']);
$idVille = @htmlspecialchars($requestData['idVille']);
$idStatu = @htmlspecialchars($requestData['idStatu']);
$idPays = @htmlspecialchars($requestData['idPays']);
$email = @htmlspecialchars($requestData['email']);
$telephone = @htmlspecialchars($requestData['telephone']);
$password = @htmlspecialchars($requestData['password']);

if (!isset($Nom)) {
    $error = "Nom is required";
    $response['error'] = true;
    $response['error_msg'] = $error;
    echo json_encode($response);
    exit();
} elseif (empty($prenom)){
    $error = "Prenom is required";
    $response['error'] = true;
    $response['error_msg'] = $error;
    echo json_encode($response);
} elseif (filter_var($email, FILTER_VALIDATE_EMAIL)){
    $error = "The email is invalid";
    $response['error'] = true;
    $response['error_msg'] = $error;
    echo json_encode($response);
} elseif (empty($email)) {
    $error = "Email is required";
    $response['error'] = true;
    $response['error_msg'] = $error;
    echo json_encode($response);
} elseif (empty($telephone)) {
    $error = "Telephone is required";
    $response['error'] = true;
    $response['error_msg'] = $error;
    echo json_encode($response);
} elseif (empty($password)) {
    $error = "Password is required";
    $response['error'] = true;
    $response['error_msg'] = $error;
    echo json_encode($response);
} elseif (empty($adresse_line1)){
    $error = "adresse_line1 is required";
    $response['error'] = true;
    $response['error_msg'] = $error;
    echo json_encode($response);
} elseif (empty($Date_de_nainssance)){
    $error = "Date_de_nainssance is required";
    $response['error'] = true;
    $response['error_msg'] = $error;
    echo json_encode($response);
} else {
    $alreadyExistVal = mysqli_query($conn, "SELECT * FROM `users` WHERE `email` = '$email'");

    if (mysqli_num_rows($alreadyExistVal) == 0) {
        $insertQry = "INSERT INTO `users`(`nom`, `prenom`, `idAfilliation`, `Date_de_nainssance`, `idVille`, `idPays`, `idStatu`, `password`, `adresse_line1`, `telephone`, `email`)
                      VALUES ('$Nom', '$prenom', '$idAfilliation', '$Date_de_nainssance', '$idVille', '$idPays', '$idStatu', '$password', '$adresse_line1', '$telephone', '$email')";

        $qry = mysqli_query($conn, $insertQry) or die(json_encode(array("status" => false, "message" => mysqli_error($conn))));

        if ($qry) {

        

            $userID = mysqli_insert_id($conn);
            $response['message'] = "Registered successfully";
            $response['userID'] = $userID;
            $response['error'] = false;
            echo json_encode($response);

            // Save data to a JSON file
            $dataToSave = json_encode($requestData);
            file_put_contents('data.json', $dataToSave);
        } else {
            $response['message'] = "Sorry, this email is already in use. Please try again.";
            $response['error'] = false;
            echo json_encode($response);
        }
    } else {
        $response['message'] = "Sorry, this email is already in use. Please try again.";
        $response['error'] = false;
        echo json_encode($response);
    }
}
?>
