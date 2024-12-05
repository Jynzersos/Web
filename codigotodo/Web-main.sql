create database ToDo;

use ToDo;

create table todo(
	idTodo int not null auto_increment,
    tarefas varchar(100) not null,
    primary key(idTodo)
);