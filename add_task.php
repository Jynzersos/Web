<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $task_name = $_POST['task_name'];
    $priority = $_POST['priority'];

    $stmt = $pdo->prepare("INSERT INTO tasks (task_name, priority) VALUES (?, ?)");
    $stmt->execute([$task_name, $priority]);

    echo json_encode(['message' => 'Tarefa adicionada com sucesso!']);
}
?>
