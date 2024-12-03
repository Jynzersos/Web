document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskName = document.getElementById('task-name');
    const prioritySelect = document.getElementById('priority');
    const tasksList = document.getElementById('tasks');

    // Carregar tarefas ao inicializar
    loadTasks();

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const taskText = taskName.value;
        const taskPriority = prioritySelect.value;

        if (taskText) {
            addTask(taskText, taskPriority);
        }

        taskName.value = ''; // Limpa o campo de entrada
    });

    function addTask(text, priority) {
        // Envia a tarefa para o servidor (banco de dados)
        fetch('add_task.php', {
            method: 'POST',
            body: new URLSearchParams({
                task_name: text,
                priority: priority
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            loadTasks(); // Recarrega as tarefas após adicionar
        });
    }

    function loadTasks() {
        // Carrega tarefas do servidor (banco de dados)
        fetch('get_tasks.php')
            .then(response => response.json())
            .then(tasks => {
                tasksList.innerHTML = ''; // Limpa a lista antes de adicionar as tarefas
                tasks.forEach(task => {
                    const li = document.createElement('li');
                    li.classList.add(`priority-${task.priority}`);
                    
                    const span = document.createElement('span');
                    span.textContent = task.task_name;

                    const editButton = document.createElement('button');
                    editButton.classList.add('edit');
                    editButton.textContent = 'Editar';
                    editButton.onclick = () => editTask(task, li);

                    const cancelButton = document.createElement('button');
                    cancelButton.classList.add('cancel');
                    cancelButton.textContent = 'Cancelar';
                    cancelButton.onclick = () => cancelTask(task.id, li);

                    const completeButton = document.createElement('button');
                    completeButton.classList.add('complete');
                    completeButton.textContent = 'Concluir';
                    completeButton.onclick = () => completeTask(task.id, li);

                    li.appendChild(span);
                    li.appendChild(editButton);
                    li.appendChild(cancelButton);
                    li.appendChild(completeButton);

                    tasksList.appendChild(li);
                });
            });
    }

    function editTask(task, li) {
        const newText = prompt('Editando tarefa:', task.task_name);
        if (newText) {
            fetch('edit_task.php', {
                method: 'POST',
                body: new URLSearchParams({
                    id: task.id,
                    task_name: newText
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                loadTasks(); // Recarrega a lista de tarefas
            });
        }
    }

    function cancelTask(taskId, li) {
        if (confirm('Deseja realmente cancelar esta tarefa?')) {
            fetch('delete_task.php', {
                method: 'POST',
                body: new URLSearchParams({ id: taskId })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                loadTasks(); // Recarrega a lista de tarefas
            });
        }
    }

    function completeTask(taskId, li) {
        fetch('complete_task.php', {
            method: 'POST',
            body: new URLSearchParams({ id: taskId })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            li.style.textDecoration = 'line-through';
            li.style.backgroundColor = '#e0e0e0';
            li.querySelector('.complete').disabled = true;
        });
    }
});
