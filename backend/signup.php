<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

// Include database configuration
require_once('./config/dbconfig.php');

// Decode JSON input
$requestData = json_decode(file_get_contents('php://input'), true);

// Initialize response array
$response = array("error" => false);

// Sanitize input data
$Nom = isset($requestData['Nom']) ? sanitizeInput($requestData['Nom']) : null;
$prenom = isset($requestData['prenom']) ? sanitizeInput($requestData['prenom']) : null;
$email = isset($requestData['email']) ? sanitizeInput($requestData['email']) : null;
$telephone = isset($requestData['telephone']) ? sanitizeInput($requestData['telephone']) : null;
$password = isset($requestData['password']) ? sanitizeInput($requestData['password']) : null;

// Validate input fields
if (!$Nom || !$prenom || !$email || !$telephone || !$password) {
    $error = "All required fields must be filled";
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
}

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Check if email already exists
$alreadyExistVal = mysqli_prepare($conn, "SELECT * FROM `chercheur` WHERE `email` = ?");
mysqli_stmt_bind_param($alreadyExistVal, "s", $email);
mysqli_stmt_execute($alreadyExistVal);
mysqli_stmt_store_result($alreadyExistVal);

if (mysqli_stmt_num_rows($alreadyExistVal) > 0) {
    $response['message'] = "Sorry, this email is already in use. Please try again.";
    $response['error'] = true;
    echo json_encode($response);
    exit();
}

// Insert user data into database
$insertQry = "INSERT INTO `chercheur`(`nom`, `prenom`, `password`,  `telephone`, `email`)
              VALUES (?, ?, ?, ?, ?)";

// Prepare the SQL statement
$stmt = mysqli_prepare($conn, $insertQry);
if ($stmt === false) {
    // Handle the error if preparation fails
    $response['error'] = true;
    $response['error_msg'] = "Error preparing statement: " . mysqli_error($conn);
    echo json_encode($response);
    exit();
}

// Bind parameters to the prepared statement
$success = mysqli_stmt_bind_param($stmt, "sssss", $Nom, $prenom,  $hashedPassword,  $telephone, $email);
if ($success === false) {
    // Handle the error if binding fails
    $response['error'] = true;
    $response['error_msg'] = "Error binding parameters: " . mysqli_stmt_error($stmt);
    echo json_encode($response);
    exit();
}

// Execute the prepared statement
$success = mysqli_stmt_execute($stmt);
if ($success === false) {
    // Handle the error if execution fails
    $response['error'] = true;
    $response['error_msg'] = "Error executing statement: " . mysqli_stmt_error($stmt);
    echo json_encode($response);
    exit();
}

// Check if the insertion was successful
if (mysqli_stmt_affected_rows($stmt) > 0) {
    // Your success response here
    $userID = mysqli_insert_id($conn);
    $response['message'] = "Registered successfully";
    $response['userID'] = $userID;
    $response['error'] = false;
    echo json_encode($response);

    $dataToSave = json_encode($requestData);
    file_put_contents('data.json', $dataToSave);
} else {
    // Your failure response here
    $response['message'] = "Sorry, something went wrong. Please try again later.";
    $response['error'] = true;
    echo json_encode($response);
}

// Close the statement
mysqli_stmt_close($stmt);

// Function to sanitize input
function sanitizeInput($input)
{
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input);
    return $input;
}
