<?php
// Include the database configuration file
require_once('./config/dbconfig.php');

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

// Fetch competition data from the database
$sql = "SELECT * FROM competitions";
$result = mysqli_query($conn, $sql);

// Check if there are any results
if (mysqli_num_rows($result) > 0) {
    // Fetch competition data as an associative array
    $competitions = mysqli_fetch_all($result, MYSQLI_ASSOC);
    
    // Return competition data as JSON response
    echo json_encode($competitions);
} else {
    // If no competitions found, return an empty array
    echo json_encode([]);
}

// Close the database connection
mysqli_close($conn);
?>
