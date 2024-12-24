<?php
// Display errors for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

// Handle OPTIONS preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Include the database configuration file
require_once('./config/dbconfig.php');
require_once('./config/fpdf186/fpdf.php');

if (!isset($conn) || $conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . ($conn->connect_error ?? 'Undefined connection')]));
}

try {
    // Fetch data from tables
    $tables = [
        'projets' => "
            SELECT idprojet, idcompetition, idchercheur, idevaluteur, titre_projet, 
            date_debut_projet, date_fin_projet, Mots_cles, id_Champs_dpplication, 
            nom_Champs_dpplication, Domaine, Sous_Domaine, Montant_global, 
            Montant_subvention, Resume_francais, Resume_anglais, Introduction_projet, 
            Objectif_general_specifiques, Methodologie_proposee, resultats_attendus, 
            considerations_ethiques, sous_domaine FROM projets",
        'budget_projet' => "
            SELECT ID_ligne_budget_categorie, ID_ligne_budget_groupement, 
            ID_ligne_budget_section, ID_budget_parametre, id_budget_projet, 
            valeur_description, valeur_montant FROM budget_projet",
        'chercheur' => "
            SELECT idchercheur, nom_chercheur, prenom_chercheur, email_chercheur FROM chercheur",
        'equipe' => "
            SELECT id_equipe, nom_equipe, idprojet, idchercheur, idevaluteur FROM equipe"
    ];

    $jsonData = [];
    foreach ($tables as $key => $query) {
        $result = $conn->query($query);
        if (!$result) {
            throw new Exception("$key query error: " . $conn->error);
        }
        $jsonData[$key] = $result->fetch_all(MYSQLI_ASSOC);
    }

    // Save data to JSON file
    $jsonFileName = 'database_dump.json';
    if (!file_put_contents($jsonFileName, json_encode($jsonData, JSON_PRETTY_PRINT))) {
        throw new Exception("Failed to write data to $jsonFileName");
    }
    echo json_encode(["success" => "Data has been dumped to $jsonFileName"]);

    // Generate PDF
    require_once('fpdf/fpdf.php');

    class PDF extends FPDF
    {
        function Header()
        {
            $this->SetFont('Arial', 'B', 14);
            $this->Cell(0, 10, 'Database Data Dump', 0, 1, 'C');
            $this->Ln(5);
        }

        function Footer()
        {
            $this->SetY(-15);
            $this->SetFont('Arial', 'I', 8);
            $this->Cell(0, 10, 'Page ' . $this->PageNo(), 0, 0, 'C');
        }

        function SectionTitle($title)
        {
            $this->SetFont('Arial', 'B', 12);
            $this->Cell(0, 10, $title, 0, 1, 'L');
            $this->Ln(5);
        }

        function AddData($data)
        {
            $this->SetFont('Arial', '', 10);
            foreach ($data as $row) {
                foreach ($row as $key => $value) {
                    $this->Cell(60, 10, ucfirst(str_replace("_", " ", $key)) . ':', 1);
                    $this->Cell(0, 10, $value, 1, 1);
                }
                $this->Ln(5);
            }
        }
    }

    $pdf = new PDF();
    $pdf->AddPage();

    foreach ($jsonData as $section => $data) {
        $pdf->SectionTitle(ucfirst($section) . ' Data');
        $pdf->AddData($data);
    }

    $pdfFileName = 'database_dump.pdf';
    $pdf->Output('F', $pdfFileName, true);
    echo json_encode(["success" => "PDF has been created as $pdfFileName"]);
} catch (Exception $e) {
    error_log($e->getMessage());
    echo json_encode(["error" => $e->getMessage()]);
} finally {
    $conn->close(); // Close the connection
}
