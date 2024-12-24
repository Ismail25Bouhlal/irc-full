<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");

require_once('./config/dbconfig.php');

// Update the query to use the correct primary key field
$query = "SELECT id_equipe AS id, nom_equipe AS teamName FROM equipe";
$result = $conn->query($query);

$teams = [];
while ($row = $result->fetch_assoc()) {
    $teams[] = $row;
}

// Return teams as JSON
echo json_encode($teams);

$conn->close();
