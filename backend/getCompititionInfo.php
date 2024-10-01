<?php
// Include the database configuration file
require_once('./config/dbconfig.php');

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

// Check if competition ID is provided in the request parameters
if (isset($_GET['competitionId'])) {
    // Sanitize the input to prevent SQL injection
    $competitionId = mysqli_real_escape_string($conn, $_GET['competitionId']);

    // Query to fetch competition information based on ID
    $query = "SELECT * FROM competitions WHERE idcompetition = '$competitionId'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) > 0) {
        // Fetch competition details
        $competitionData = mysqli_fetch_assoc($result);

        // Return competition data as JSON
        echo json_encode($competitionData);
    } else {
        // If competition with provided ID is not found
        echo json_encode(array("message" => "Competition not found"));
    }
} else {
    // If competition ID is not provided
    echo json_encode(array("message" => "Competition ID not provided"));
}

// Close connection
mysqli_close($conn);
?>