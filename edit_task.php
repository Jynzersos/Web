<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $task_id = $_POST['id'];
    $task_name = $_POST['task_name'];

    $stmt = $pdo->prepare("UPDATE tasks SET task_name = ? WHERE id = ?");
    $stmt->execute([$task_name, $task_id]);

    echo json_encode(['message' => 'Tarefa editada com sucesso!']);
}
?>
