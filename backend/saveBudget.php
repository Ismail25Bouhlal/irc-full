<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('./config/dbconfig.php');

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if (!$conn) {
    error_log("Database connection failed!");
    http_response_code(500);
    echo json_encode(["message" => "Database connection failed!"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

error_log("Received Data: " . print_r($data, true));

// Validate required fields
$required_fields = [
    'section_id',
    'groupement_id',
    'categorie_id',
    'description',
    'budget_amount',
    'budget_parametre_id',
    'project_id'
];

$missing_fields = [];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        $missing_fields[] = $field;
    }
}

if (!empty($missing_fields)) {
    error_log("Missing or empty fields: " . implode(", ", $missing_fields));
    http_response_code(400);
    echo json_encode([
        "message" => "Missing or empty fields: " . implode(", ", $missing_fields)
    ]);
    exit;
}

// Prepare values
$section_id = mysqli_real_escape_string($conn, $data['section_id']);
$groupement_id = mysqli_real_escape_string($conn, $data['groupement_id']);
$categorie_id = mysqli_real_escape_string($conn, $data['categorie_id']);
$description = mysqli_real_escape_string($conn, $data['description']);
$budget_amount = mysqli_real_escape_string($conn, $data['budget_amount']);
$budget_parametre_id = mysqli_real_escape_string($conn, $data['budget_parametre_id']);
$project_id = mysqli_real_escape_string($conn, $data['project_id']);

// Insert into database
$sql = "INSERT INTO budget_projet (
            ID_ligne_budget_section,
            ID_ligne_budget_groupement,
            ID_ligne_budget_categorie,
            valeur_description,
            valeur_montant,
            ID_budget_parametre,
            idprojet
        ) VALUES (
            '$section_id',
            '$groupement_id',
            '$categorie_id',
            '$description',
            '$budget_amount',
            '$budget_parametre_id',
            '$project_id'
        )";

if (mysqli_query($conn, $sql)) {
    // Retrieve saved data
    $result = mysqli_query($conn, "SELECT * FROM budget_projet ORDER BY id_budget_projet DESC LIMIT 1");
    $savedData = mysqli_fetch_assoc($result);

    http_response_code(201);
    echo json_encode(["message" => "Budget data saved successfully!", "data" => $savedData]);
} else {
    error_log("MySQL Error: " . mysqli_error($conn));
    http_response_code(500);
    echo json_encode(["message" => "Database error: " . mysqli_error($conn)]);
}

mysqli_close($conn);
