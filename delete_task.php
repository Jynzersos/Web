<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $task_id = $_POST['id'];

    $stmt = $pdo->prepare("DELETE FROM tasks WHERE id = ?");
    $stmt->execute([$task_id]);

    echo json_encode(['message' => 'Tarefa excluída com sucesso!']);
}
?>

