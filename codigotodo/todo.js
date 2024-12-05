// Função para buscar as tarefas do banco de dados e exibi-las na página
function carregarTarefas() {
    fetch('/tasks') // URL correta para acessar as tarefas
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then(tarefas => {
            const listaTarefas = document.getElementById("tasks");
            listaTarefas.innerHTML = ''; // Limpa a lista antes de adicionar as tarefas

            tarefas.forEach(tarefa => {
                const tarefaAdd = document.createElement("li");
                tarefaAdd.textContent = `${tarefa.tarefa} - Prioridade: ${tarefa.prioridade}`;

                // Botão de remover tarefa
                const concluirTar = document.createElement("button");
                concluirTar.textContent = "Remover";
                concluirTar.addEventListener("click", function() {
                    tarefaAdd.remove();
                });

                // Adicionar o botão à tarefa
                tarefaAdd.appendChild(concluirTar);

                // Adicionar a tarefa à lista
                listaTarefas.appendChild(tarefaAdd);
            });
        })
        .catch((error) => {
            console.error('Erro ao carregar tarefas:', error);
        });
}

// Carregar as tarefas ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    carregarTarefas();  // Carrega as tarefas assim que a página é carregada
});
