<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include database configuration
require_once('./config/dbconfig.php');
global $conn;

// Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Decode JSON input (if applicable)
$input = json_decode(file_get_contents('php://input'), true);

// Function to send JSON responses
function sendResponse($status, $message, $data = null)
{
    echo json_encode(['status' => $status, 'message' => $message, 'data' => $data]);
    exit;
}

// Handle GET requests
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = $_GET['action'] ?? null;

    if ($action === 'getUserProjects') {
        // Get the IDs from the request
        $idchercheur = isset($_GET['idchercheur']) ? (int)$_GET['idchercheur'] : null;
        $idevaluateur = isset($_GET['idevaluateur']) ? (int)$_GET['idevaluateur'] : null;

        if (!$idchercheur && !$idevaluateur) {
            sendResponse('error', 'No user ID provided');
        }

        // Fetch projects where idchercheur or idevaluateur matches
        $query = "SELECT * FROM projets WHERE idchercheur = ? OR idevaluteur = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ii", $idchercheur, $idevaluateur);
        $stmt->execute();
        $result = $stmt->get_result();

        $projects = [];
        while ($row = $result->fetch_assoc()) {
            $isComplete = true;
            foreach ($row as $key => $value) {
                if (empty($value) && $key !== 'idprojet') { // Exclude idprojet from completeness check
                    $isComplete = false;
                    break;
                }
            }
            $row['isComplete'] = $isComplete;
            $projects[] = $row;
        }

        sendResponse('success', 'Projects fetched successfully', $projects);
    } else {
        sendResponse('error', 'Invalid action');
    }
} else {
    sendResponse('error', 'Invalid request method');
}
