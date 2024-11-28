document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskName = document.getElementById('task-name');
    const prioritySelect = document.getElementById('priority');
    const tasksList = document.getElementById('tasks');

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
        const li = document.createElement('li');
        li.classList.add(`priority-${priority}`);
        
        const span = document.createElement('span');
        span.textContent = text;

        const editButton = document.createElement('button');
        editButton.classList.add('edit');
        editButton.textContent = 'Editar';
        editButton.onclick = () => editTask(li);

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('cancel');
        cancelButton.textContent = 'Cancelar';
        cancelButton.onclick = () => cancelTask(li);

        const completeButton = document.createElement('button');
        completeButton.classList.add('complete');
        completeButton.textContent = 'Concluir';
        completeButton.onclick = () => completeTask(li);

        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(cancelButton);
        li.appendChild(completeButton);

        tasksList.appendChild(li);
    }

    function editTask(task) {
        const newText = prompt('Editando tarefa:', task.querySelector('span').textContent);
        if (newText) {
            task.querySelector('span').textContent = newText;
        }
    }

    function cancelTask(task) {
        if (confirm('Deseja realmente cancelar esta tarefa?')) {
            task.remove();
        }
    }

    function completeTask(task) {
        task.style.textDecoration = 'line-through';
        task.style.backgroundColor = '#e0e0e0';
        task.querySelector('.complete').disabled = true;
    }
});
