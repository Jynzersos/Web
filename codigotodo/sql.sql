create database ToDo;
use ToDo;

CREATE TABLE tarefas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tarefa VARCHAR(255),
  prioridade VARCHAR(50)
);

SELECT * FROM tarefas;