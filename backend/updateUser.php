<?php
include 'db_connection.php';

$id = $_POST['id'];
$nom = $_POST['nom'];
$prenom = $_POST['prenom'];
$email = $_POST['email'];
$telephone = $_POST['telephone'];
$password = $_POST['password'];

$sql = "UPDATE chercheur SET nom='$nom', prenom='$prenom', email='$email', telephone='$telephone', password='$password' WHERE idchercheur='$id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'Error updating record: ' . $conn->error]);
}

$conn->close();
?>
