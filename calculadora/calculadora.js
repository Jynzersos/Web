let valor = ""; 
let mostraresultado = false; 

function insert(value) {
    if (mostraresultado) { //limpa a entrada depois de mostrar o resultado
        valor = ""; 
        mostraresultado = false; 
    }
    valor += value; //adiciona o valor digitado para o resultado
    document.getElementById("resultado").innerText = valor; // mostra a entrada na tela
}

function limpanumero() {
        valor = valor.slice(0, -1); // remove o último caractere
        document.getElementById("resultado").innerText = valor;
}

function clean() { // limpa tudo
    valor = "";
    document.getElementById("resultado").innerText = valor;
}


function raizquadrada() {
    try {
        const value = parseExpression(valor); // tenta pegar o valor da expressão
        if (value < 0) throw new Error("Número negativo"); // verifica se o número é negativo
        const result = Math.sqrt(value); // calcula a raiz quadrada
        document.getElementById("resultado").innerText = result; 
        valor = result.toString(); 
        mostraresultado = true; 
    } catch (error) {
        document.getElementById("resultado").innerText = "Erro!";  // se der erro, mostra "Erro!" e reseta tudo
        valor = "";
    }
}

function porcentagem() {
    try {
        const value = parseExpression(valor); // pega o valor da expressão e calcula a porcentagem
        const result = value / 100; // divisão básica pra fazer a porcentagem
        document.getElementById("resultado").innerText = result; 
        valor = result.toString(); 
        mostraresultado = true; 
    } catch (error) {
        document.getElementById("resultado").innerText = "Erro!";
        valor = "";
    }
}

function exponencial() {
    try {
        const base = parseExpression(valor);
        const exponent = parseFloat(prompt("Digite o expoente:")); // pede para o usuário digitar o expoente
        const result = Math.pow(base, exponent); // calcula o exponencial
        document.getElementById("resultado").innerText = result; 
        valor = result.toString(); 
        mostraresultado = true;
    } catch (error) {
        document.getElementById("resultado").innerText = "Erro!";
        valor = "";
    }
}

function parseExpression(expression) {// verifica se a expressão só tem números e operadores válidos
    if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
        throw new Error("Expressão inválida");
    }

    try {
        return new Function("return " + expression)(); // retorna  a expressao valida, no caso, o resultado
    } catch (error) {
        throw new Error("Expressão inválida");
    }
}

function calculate() {
    try {
        const result = parseExpression(valor);
        document.getElementById("resultado").innerText = result; 
        valor = result.toString(); 
        mostraresultado = true; 
    } catch (error) {
        document.getElementById("resultado").innerText = "Erro!";
        valor = "";
    }
}
