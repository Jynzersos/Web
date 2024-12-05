const express = require('express');
const mysql = require('mysql');
const app = express();

// Middleware para processar JSON
app.use(express.json());

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'aluno',
    password: 'aluno',
    database: 'ToDo',
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.stack);
        return;
    }
    console.log('Conectado ao MySQL');
});

// Rota para adicionar tarefa
app.post('/add-task', (req, res) => {
    const { tarefa, prioridade } = req.body;

    if (!tarefa || !prioridade) {
        return res.status(400).json({ error: 'Tarefa e prioridade são obrigatórios' });
    }

    const query = 'INSERT INTO tarefas (tarefa, prioridade) VALUES (?, ?)';
    connection.query(query, [tarefa, prioridade], (err, result) => {
        if (err) {
            console.error('Erro ao inserir tarefa no MySQL:', err.stack);
            return res.status(500).json({ error: 'Erro no servidor' });
        }
        console.log('Tarefa inserida:', result);
        res.status(200).json({ message: 'Tarefa adicionada com sucesso!' });
    });
});

// Rota para buscar todas as tarefas
app.get('/tasks', (req, res) => {
    const query = 'SELECT * FROM tarefas';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar tarefas:', err.stack);
            return res.status(500).json({ error: 'Erro ao buscar tarefas' });
        }

        res.status(200).json(results); // Retorna as tarefas como JSON
    });
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
