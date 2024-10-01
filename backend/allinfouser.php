<?php
// Display all PHP errors for debugging purposes
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
    $response['error'] = true;
    $response['error_msg'] = "Email is not set in the cookie";
    echo json_encode($response);
    exit();
}

// Function to sanitize input to prevent injection attacks
function sanitizeInput($input)
{
    return htmlspecialchars(stripslashes(trim($input)));
}

// Prepare SQL statement to fetch data from chercheur table
$query = "SELECT `nom`, `prenom`, `datenaissance`, `email`, `telephone`, 
          `selectedSpecialty`, `type_organisme`, `specialite_formation`, 
          `domaine_maitrise`, `domaine_dinteret`, `specialite`, `statut`, 
          `selected_organisme`
          FROM `chercheur`
          WHERE `email` = ?";

$stmt = mysqli_prepare($conn, $query);

if (!$stmt) {
    $response['error'] = true;
    $response['error_msg'] = "Error in preparing the statement: " . mysqli_error($conn);
    echo json_encode($response);
    exit();
}

// Bind the parameter and execute the statement
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($result && mysqli_num_rows($result) > 0) {
    // Fetch the first result (assuming email is unique in the table)
    $row = mysqli_fetch_assoc($result);

    // Create an array with the required information
    $userInformation = array(
        'nom' => $row['nom'],
        'prenom' => $row['prenom'],
        'datenaissance' => $row['datenaissance'],
        'email' => $row['email'],
        'telephone' => $row['telephone'],
        'selectedSpecialty' => $row['selectedSpecialty'],
        'type_organisme' => $row['type_organisme'],
        'specialite_formation' => $row['specialite_formation'],
        'domaine_maitrise' => $row['domaine_maitrise'],
        'domaine_dinteret' => $row['domaine_dinteret'],
        'specialite' => $row['specialite'],
        'statut' => $row['statut'],
        'selected_organisme' => $row['selected_organisme'],
    );

    // Return the user information as JSON
    $response['userInformation'] = $userInformation;
    echo json_encode($response);
    exit();
} else {
    // If no matching record is found
    $response['error'] = true;
    $response['error_msg'] = "User not found in the chercheur table";
}

echo json_encode($response);
exit();
