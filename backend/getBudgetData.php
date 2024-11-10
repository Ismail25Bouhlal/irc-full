<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

// Include the MySQLi connection file
require_once('./config/dbconfig.php');

if (!$conn) {
    die("Database connection failed.");
}

$query = "
    SELECT 
        b.appellation AS budget_appellation,
        b.date_creation AS budget_date_creation,
        s.appellation AS section,
        g.appellation AS groupement,
        c.appellation AS categorie
    FROM 
        budget_parametre b
    LEFT JOIN 
        ligne_budget_section s 
    ON 
        b.ID_budget_parametre = s.ID_budget_parametre
    LEFT JOIN 
        ligne_budget_groupement g 
    ON 
        s.ID_ligne_budget_section = g.ID_ligne_budget_section
    LEFT JOIN 
        ligne_budget_categorie c 
    ON 
        g.ID_ligne_budget_groupement = c.ID_ligne_budget_groupement
    ORDER BY 
        b.appellation, s.appellation, g.appellation, c.appellation";

$result = mysqli_query($conn, $query);

$budgetData = [];

while ($row = mysqli_fetch_assoc($result)) {
    $budgetData[] = $row;
}

echo json_encode($budgetData);
