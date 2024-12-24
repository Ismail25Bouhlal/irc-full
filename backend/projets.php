<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers for CORS and JSON responses
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Include database configuration
require_once('./config/dbconfig.php');
global $conn;

// Decode JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Utility function to send JSON responses
function sendResponse($status, $message, $data = null)
{
    echo json_encode(['status' => $status, 'message' => $message, 'data' => $data]);
    exit;
}

// Handle POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $input['action'] ?? null;

    // === CREATE EMPTY PROJECT ===
    if ($action === 'createEmptyProject') {
        $idchercheur = isset($input['idchercheur']) ? (int)$input['idchercheur'] : null;
        $idevaluateur = isset($input['idevaluateur']) ? (int)$input['idevaluateur'] : null;

        if (!$idchercheur || !$idevaluateur) {
            sendResponse('error', 'Missing idchercheur or idevaluateur');
        }

        $stmt = $conn->prepare("INSERT INTO projets (idchercheur, idevaluteur) VALUES (?, ?)");
        $stmt->bind_param("ii", $idchercheur, $idevaluateur);

        if ($stmt->execute()) {
            $newProjectId = $conn->insert_id;
            sendResponse('success', 'Empty project created successfully', ['projectId' => $newProjectId]);
        } else {
            sendResponse('error', 'Failed to create empty project');
        }

        $stmt->close();

        // === UPDATE EXISTING PROJECT ===
    } elseif ($action === 'updateProject') {
        $projectId = isset($input['projectId']) ? (int)$input['projectId'] : null;

        if (!$projectId) {
            sendResponse('error', 'Project ID is required for updates');
        }

        // Collect data fields for the update
        $projectTitle = $input['projectTitle'] ?? null;
        $startDate = $input['startDate'] ?? null;
        $endDate = $input['endDate'] ?? null;
        $applicationField = $input['applicationField'] ?? null;
        $domain = $input['domain'] ?? null;
        $subDomain = $input['subDomain'] ?? null;
        $totalAmount = $input['totalAmount'] ?? null;
        $requestedAmount = $input['requestedAmount'] ?? null;
        $resumeFr = $input['resume']['francais'] ?? null;
        $resumeEn = $input['resume']['anglais'] ?? null;
        $intro = $input['miniProject']['introduction'] ?? null;
        $objectives = $input['miniProject']['objectives'] ?? null;
        $methodology = $input['miniProject']['methodology'] ?? null;
        $results = $input['miniProject']['results'] ?? null;
        $ethics = $input['miniProject']['ethics'] ?? null;

        // Perform the update query
        $stmt = $conn->prepare("UPDATE projets SET 
            titre_projet = COALESCE(?, titre_projet), 
            date_debut_projet = COALESCE(?, date_debut_projet),
            date_fin_projet = COALESCE(?, date_fin_projet),
            nom_Champs_dpplication = COALESCE(?, nom_Champs_dpplication),
            Domaine = COALESCE(?, Domaine),
            sous_domaine = COALESCE(?, sous_domaine),
            Montant_global = COALESCE(?, Montant_global),
            Montant_subvention = COALESCE(?, Montant_subvention),
            Resume_francais = COALESCE(?, Resume_francais),
            Resume_anglais = COALESCE(?, Resume_anglais),
            Introduction_projet = COALESCE(?, Introduction_projet),
            Objectif_general_specifiques = COALESCE(?, Objectif_general_specifiques),
            Methodologie_proposee = COALESCE(?, Methodologie_proposee),
            resultats_attendus = COALESCE(?, resultats_attendus),
            considerations_ethiques = COALESCE(?, considerations_ethiques)
            WHERE idprojet = ?");

        $stmt->bind_param(
            "ssssssssssssssssi",
            $projectTitle,
            $startDate,
            $endDate,
            $applicationField,
            $domain,
            $subDomain,
            $totalAmount,
            $requestedAmount,
            $resumeFr,
            $resumeEn,
            $intro,
            $objectives,
            $methodology,
            $results,
            $ethics,
            $projectId
        );

        if ($stmt->execute()) {
            sendResponse('success', 'Project updated successfully', ['projectId' => $projectId]);
        } else {
            sendResponse('error', 'Failed to update project');
        }

        $stmt->close();
    } else {
        sendResponse('error', 'Invalid action');
    }

    // Handle GET requests
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = $_GET['action'] ?? null;

    // === FETCH LAST PROJECT ID ===
    if ($action === 'getLastProjectId') {
        $query = "SELECT MAX(idprojet) as lastProjectId FROM projets";
        $result = $conn->query($query);

        if ($result && $row = $result->fetch_assoc()) {
            $lastProjectId = $row['lastProjectId'] ?? 0; // Default to 0 if no rows exist
            sendResponse('success', 'Last project ID fetched successfully', ['lastProjectId' => $lastProjectId]);
        } else {
            sendResponse('error', 'Failed to fetch last project ID');
        }

        // === FETCH PROJECT DETAILS BY ID ===
    } elseif (isset($_GET['projectId'])) {
        $projectId = (int)$_GET['projectId'];

        $stmt = $conn->prepare("SELECT * FROM projets WHERE idprojet = ?");
        $stmt->bind_param("i", $projectId);
        $stmt->execute();
        $result = $stmt->get_result();
        $project = $result->fetch_assoc();

        if ($project) {
            // Determine if the project is complete
            $isComplete = true;
            foreach ($project as $key => $value) {
                if (empty($value) && $key !== 'idprojet') {
                    $isComplete = false;
                    break;
                }
            }

            sendResponse('success', 'Project fetched successfully', [
                'project' => $project,
                'isComplete' => $isComplete
            ]);
        } else {
            sendResponse('error', 'Project not found');
        }
    } else {
        sendResponse('error', 'Invalid GET request');
    }
} else {
    sendResponse('error', 'Invalid request method');
}
