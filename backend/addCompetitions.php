<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include the database configuration file
require_once('./config/dbconfig.php');

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $titre = $_POST['titre'];
    $libelle = $_POST['libelle'];
    $date_debut = $_POST['date_debut'];
    $date_fin = $_POST['date_fin'];
    $annee_competition = $_POST['annee_competition'];
    $enligne = $_POST['enligne'];

    // Prepare the SQL query to insert data into the database
    $sql = "INSERT INTO competitions (titre, libelle, date_debut, date_fin, annee_competition, enligne) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    // Execute the SQL query
    if ($stmt->execute([$titre, $libelle, $date_debut, $date_fin, $annee_competition, $enligne])) {
        // Data inserted successfully
        echo json_encode(array("message" => "Competition ajoutée avec succès."));
    } else {
        // Failed to insert data
        echo json_encode(array("message" => "Erreur lors de l'ajout de la competition."));
    }
} else {
    // If the request method is not POST, return an error message
    echo json_encode(array("message" => "Méthode de requête non autorisée."));
}
