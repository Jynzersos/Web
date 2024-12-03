<?php
$host = 'localhost'; // Ou o IP do seu servidor
$dbname = 'todo_list';
$username = 'root'; // Usuário do MySQL
$password = ''; // Senha do MySQL, se houver

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro ao conectar ao banco de dados: " . $e->getMessage());
}
?>
