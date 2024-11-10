<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

// Include the MySQLi connection file
require_once('./config/dbconfig.php');

// Check for a valid database connection
if (!$conn) {
    die(json_encode(['error' => "Database connection failed."]));
}

// Query to fetch budgets, sections, groupements, and categories
$query = "
SELECT 
    b.ID_budget_parametre AS budget_id, 
    b.appellation AS budget_name, 
    b.date_creation AS budget_creation,
    lbs.ID_ligne_budget_section AS section_id, 
    lbs.appellation AS section_name,
    lbg.ID_ligne_budget_groupement AS group_id, 
    lbg.appellation AS group_name,
    lbc.ID_ligne_budget_categorie AS category_id, 
    lbc.appellation AS category_name
FROM budget_parametre b
LEFT JOIN ligne_budget_section lbs ON lbs.ID_budget_parametre = b.ID_budget_parametre
LEFT JOIN ligne_budget_groupement lbg ON lbg.ID_ligne_budget_section = lbs.ID_ligne_budget_section
LEFT JOIN ligne_budget_categorie lbc ON lbc.ID_ligne_budget_groupement = lbg.ID_ligne_budget_groupement
ORDER BY b.date_creation DESC;
";

$result = mysqli_query($conn, $query);

$budgets = [];

// Organize data into nested structures
while ($row = mysqli_fetch_assoc($result)) {
    $budgetId = $row['budget_id'];

    // Initialize the budget if it doesn't exist yet
    if (!isset($budgets[$budgetId])) {
        $budgets[$budgetId] = [
            'id' => $budgetId,
            'appellation' => $row['budget_name'],
            'dateCreation' => $row['budget_creation'],
            'sections' => []
        ];
    }

    $sectionId = $row['section_id'];
    if ($sectionId && !isset($budgets[$budgetId]['sections'][$sectionId])) {
        $budgets[$budgetId]['sections'][$sectionId] = [
            'id' => $sectionId,
            'name' => $row['section_name'],
            'groupements' => []
        ];
    }

    $groupId = $row['group_id'];
    if ($groupId && !isset($budgets[$budgetId]['sections'][$sectionId]['groupements'][$groupId])) {
        $budgets[$budgetId]['sections'][$sectionId]['groupements'][$groupId] = [
            'id' => $groupId,
            'name' => $row['group_name'],
            'categories' => []
        ];
    }

    $categoryId = $row['category_id'];
    if ($categoryId) {
        $budgets[$budgetId]['sections'][$sectionId]['groupements'][$groupId]['categories'][] = [
            'id' => $categoryId,
            'name' => $row['category_name']
        ];
    }
}

// Convert associative arrays to indexed arrays
$budgets = array_values($budgets);
foreach ($budgets as &$budget) {
    $budget['sections'] = array_values($budget['sections']);
    foreach ($budget['sections'] as &$section) {
        $section['groupements'] = array_values($section['groupements']);
    }
}

// Return the result as JSON
echo json_encode($budgets);
