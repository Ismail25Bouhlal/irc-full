<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

require_once('./config/dbconfig.php');

if (!$conn) {
    die("Database connection failed.");
}

try {
    // Fetch budgets along with their sections, groupements, and categories counts
    $query = "
        SELECT 
            b.ID_budget_parametre AS id,
            b.appellation AS budget_appellation,
            b.date_creation AS budget_date_creation,
            COUNT(DISTINCT s.ID_ligne_budget_section) AS sectionCount,
            COUNT(DISTINCT g.ID_ligne_budget_groupement) AS groupementCount,
            COUNT(DISTINCT c.ID_ligne_budget_categorie) AS categorieCount
        FROM 
            budget_parametre b
        LEFT JOIN 
            ligne_budget_section s ON b.ID_budget_parametre = s.ID_budget_parametre
        LEFT JOIN 
            ligne_budget_groupement g ON b.ID_budget_parametre = g.ID_budget_parametre
        LEFT JOIN 
            ligne_budget_categorie c ON b.ID_budget_parametre = c.ID_budget_parametre
        GROUP BY 
            b.ID_budget_parametre
        ORDER BY 
            b.appellation;
    ";

    $result = mysqli_query($conn, $query);

    $budgetData = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $budgetData[] = $row;
    }

    echo json_encode($budgetData);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
