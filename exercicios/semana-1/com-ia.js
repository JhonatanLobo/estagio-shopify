// Tempo de início: 14:10

// Função que inverte uma string
// Exemplo: "hello" -> "olleh"
function inverterString(str) {
    return str.split('').reverse().join('');
}

// Função que conta as vogais em uma string (maiúsculas e minúsculas)
// Exemplo: "programacao" -> 5
function contarVogais(str) {
    return (str.match(/[aeiouáàãâéêíóôõú]/gi) || []).length;
}

// Função que encontra o maior número em um array
// Exemplo: [3, 7, 2, 9, 19]
function encontrarMaior(numeros) {
    return Math.max(...numeros);
}

// Função que remove valores duplicados de um array
// Exemplo: [1, 2, 2, 3, 3, 4] -> [1, 2, 3, 4]
function removerDuplicatas(array) {
    return [...new Set(array)];
}

// Tempo de fim: 14:15
// Tempo total COM IA: 5 minutos