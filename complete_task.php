<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $task_id = $_POST['id'];

    $stmt = $pdo->prepare("UPDATE tasks SET status = 'concluida' WHERE id = ?");
    $stmt->execute([$task_id]);

    echo json_encode(['message' => 'Tarefa concluída com sucesso!']);
}
?>
