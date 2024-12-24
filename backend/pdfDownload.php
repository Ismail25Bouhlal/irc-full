<?php
// Include FPDF library and database configuration
require_once('./config/fpdf186/fpdf.php'); // Adjust path as needed
require_once('./config/dbconfig.php'); // Adjust path as needed

// Check if the project ID is provided in the URL
if (!isset($_GET['projectId'])) {
    die('Project ID is required.');
}

$projectId = intval($_GET['projectId']); // Sanitize input

// Fetch project details from the `projets` table
$query = $conn->prepare("
    SELECT 
        p.idprojet,
        p.idcompetition,
        p.idchercheur,
        p.idevaluteur,
        p.titre_projet,
        p.date_debut_projet,
        p.date_fin_projet,
        p.id_Champs_dpplication,
        p.nom_Champs_dpplication,
        p.Domaine,
        p.Sous_Domaine,
        p.Montant_global,
        p.Montant_subvention,
        p.Resume_francais,
        p.Resume_anglais,
        p.Introduction_projet,
        p.Objectif_general_specifiques,
        p.Methodologie_proposee,
        p.resultats_attendus,
        p.considerations_ethiques
    FROM projets p
    WHERE p.idprojet = ?
");
$query->bind_param("i", $projectId);
$query->execute();
$result = $query->get_result();

// Check if the project exists
if ($result->num_rows === 0) {
    die('Project not found.');
}

$project = $result->fetch_assoc();

// Fetch budget details from the `budget_projet` table
$budgetQuery = $conn->prepare("
    SELECT 
        b.ID_ligne_budget_categorie,
        b.idprojet,
        b.ID_ligne_budget_groupement,
        b.ID_ligne_budget_section,
        b.ID_budget_parametre,
        b.id_budget_projet,
        b.valeur_description,
        b.valeur_montant
    FROM budget_projet b
    WHERE b.idprojet = ?
");
$budgetQuery->bind_param("i", $projectId);
$budgetQuery->execute();
$budgetResult = $budgetQuery->get_result();

$budgetData = [];
while ($row = $budgetResult->fetch_assoc()) {
    $budgetData[] = $row;
}

// Fetch team details from the `equipe` table
$teamQuery = $conn->prepare("
    SELECT 
        e.id_equipe,
        e.nom_equipe,
        e.idprojet,
        e.idchercheur,
        e.idevaluteur
    FROM equipe e
    WHERE e.idprojet = ?
");
$teamQuery->bind_param("i", $projectId);
$teamQuery->execute();
$teamResult = $teamQuery->get_result();

$teamData = [];
while ($row = $teamResult->fetch_assoc()) {
    $teamData[] = $row;
}

// Field labels for better readability
$fieldLabels = [
    'idcompetition' => 'Competition ID',
    'idprojet' => 'Project ID',
    'idchercheur' => 'Researcher ID',
    'idevaluteur' => 'Evaluator ID',
    'titre_projet' => 'Project Title',
    'date_debut_projet' => 'Start Date',
    'date_fin_projet' => 'End Date',
    'id_Champs_dpplication' => 'Application Field ID',
    'nom_Champs_dpplication' => 'Application Field Name',
    'Domaine' => 'Domain',
    'Sous_Domaine' => 'Subdomain',
    'Montant_global' => 'Total Amount',
    'Montant_subvention' => 'Subsidy Amount',
    'Resume_francais' => 'Summary (French)',
    'Resume_anglais' => 'Summary (English)',
    'Introduction_projet' => 'Project Introduction',
    'Objectif_general_specifiques' => 'General and Specific Objectives',
    'Methodologie_proposee' => 'Proposed Methodology',
    'resultats_attendus' => 'Expected Results',
    'considerations_ethiques' => 'Ethical Considerations'
];

// Generate the PDF
$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);
$pdf->Cell(0, 10, 'Project Details', 0, 1, 'C');
$pdf->Ln(10);

$pdf->SetFont('Arial', '', 12);
foreach ($project as $key => $value) {
    if (isset($fieldLabels[$key])) {
        $label = $fieldLabels[$key];
        $pdf->Cell(50, 10, $label . ':', 0, 0);
        $pdf->Cell(0, 10, $value ?? 'N/A', 0, 1); // Replace NULL with "N/A"
    }
}

// Add a section for budget details
$pdf->Ln(10);
$pdf->SetFont('Arial', 'B', 14);
$pdf->Cell(0, 10, 'Budget Details', 0, 1);
$pdf->Ln(5);

$pdf->SetFont('Arial', '', 12);
if (empty($budgetData)) {
    $pdf->Cell(0, 10, 'No budget data available.', 0, 1);
} else {
    foreach ($budgetData as $budget) {
        $pdf->Cell(50, 10, 'Budget Description:', 0, 0);
        $pdf->Cell(0, 10, $budget['valeur_description'] ?? 'N/A', 0, 1);

        $pdf->Cell(50, 10, 'Budget Amount:', 0, 0);
        $pdf->Cell(0, 10, $budget['valeur_montant'] ?? 'N/A', 0, 1);
        $pdf->Ln(5); // Add spacing between budget entries
    }
}

// Add a section for team details
$pdf->Ln(10);
$pdf->SetFont('Arial', 'B', 14);
$pdf->Cell(0, 10, 'Team Details', 0, 1);
$pdf->Ln(5);

$pdf->SetFont('Arial', '', 12);
if (empty($teamData)) {
    $pdf->Cell(0, 10, 'No team data available.', 0, 1);
} else {
    foreach ($teamData as $team) {
        $pdf->Cell(50, 10, 'Team Name:', 0, 0);
        $pdf->Cell(0, 10, $team['nom_equipe'] ?? 'N/A', 0, 1);

        $pdf->Cell(50, 10, 'Researcher ID:', 0, 0);
        $pdf->Cell(0, 10, $team['idchercheur'] ?? 'N/A', 0, 1);

        $pdf->Cell(50, 10, 'Evaluator ID:', 0, 0);
        $pdf->Cell(0, 10, $team['idevaluteur'] ?? 'N/A', 0, 1);
        $pdf->Ln(5); // Add spacing between team entries
    }
}

// Set the PDF filename
$pdfFileName = 'project_' . $projectId . '.pdf';

// Output the PDF to the browser for download
header('Content-Type: application/pdf');
header('Content-Disposition: attachment; filename="' . $pdfFileName . '"');
$pdf->Output();
