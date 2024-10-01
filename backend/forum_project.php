<?php
// Include the database configuration file
require_once('./config/dbconfig.php');

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');


// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Get the POST data and decode the JSON
$postData = file_get_contents('php://input');
$data = json_decode($postData, true);

// Check if the required data is set
if (isset($data['resume'], $data['miniProject'], $data['email'])) {
    $resumeFr = $data['resume']['francais'];
    $resumeEn = $data['resume']['anglais'];
    $intro = $data['miniProject']['introduction'];
    $objectives = $data['miniProject']['objectives'];
    $methodology = $data['miniProject']['methodology'];
    $results = $data['miniProject']['results'];
    $ethics = $data['miniProject']['ethics'];
    $email = $data['email'];

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO projets (email, resume_fr, resume_en, intro, objectives, methodology, results, ethics) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $email, $resumeFr, $resumeEn, $intro, $objectives, $methodology, $results, $ethics);

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Data saved successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error saving data: " . $stmt->error]);
    }

    // Close statement
    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}

// Close connection
$conn->close();
