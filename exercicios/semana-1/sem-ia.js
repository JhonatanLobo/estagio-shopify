// Tempo de início: 13:32

// a) inverterString(str)
function inverterString(str) {
    if (typeof str !== 'string') return "";
    return str.split('').reverse().join('');
}

// b) contarVogais(str)
function contarVogais(str) {
    if (typeof str !== 'string') return 0;
    
    let count = 0;
    const vogais = "aeiouAEIOUáàãâéêíóôõúÁÀÃÂÉÊÍÓÔÕÚ";
    
    for (let char of str) {
        if (vogais.includes(char)) {
            count++;
        }
    }
    return count;
}

// c) encontrarMaior(numeros)
function encontrarMaior(numeros) {
    if (!Array.isArray(numeros) || numeros.length === 0) return null;
    
    let maior = numeros[0];
    for (let i = 1; i < numeros.length; i++) {
        if (numeros[i] > maior) {
            maior = numeros[i];
        }
    }
    return maior;
}

// d) removerDuplicatas(array)
function removerDuplicatas(array) {
    if (!Array.isArray(array)) return [];
    return [...new Set(array)];
}
// Tempo de fim: 14:07
// Tempo total SEM IA: 35 minutos
