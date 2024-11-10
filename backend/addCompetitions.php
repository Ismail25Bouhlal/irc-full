<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once('./config/dbconfig.php');

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Log incoming POST data to verify the budget ID
    error_log(print_r($_POST, true));  // Debugging: Check POST data

    $titre = $_POST['titre'] ?? '';
    $libelle = $_POST['libelle'] ?? '';
    $date_debut = $_POST['date_debut'] ?? '';
    $date_fin = $_POST['date_fin'] ?? '';
    $annee_competition = $_POST['annee_competition'] ?? '';
    $enligne = $_POST['enligne'] ?? '';
    $ID_budget_parametre = $_POST['ID_budget_parametre'] ?? '';

    // Validate if the budget ID is correctly sent and not empty
    if (empty($ID_budget_parametre) || !is_numeric($ID_budget_parametre)) {
        echo json_encode(["message" => "Invalid Budget ID."]);
        exit;
    }

    $sql = "INSERT INTO competitions (titre, libelle, date_debut, date_fin, annee_competition, enligne, ID_budget_parametre) 
            VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if ($stmt->execute([$titre, $libelle, $date_debut, $date_fin, $annee_competition, $enligne, $ID_budget_parametre])) {
        echo json_encode(["message" => "Competition ajoutée avec succès."]);
    } else {
        echo json_encode(["message" => "Erreur lors de l'ajout de la competition."]);
    }
} else {
    echo json_encode(["message" => "Méthode de requête non autorisée."]);
}
