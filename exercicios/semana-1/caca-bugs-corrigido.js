/**
 * Trecho A: Valida o formato de um endereço de email.
 * @param {string} email - O endereço de email a ser validado.
 * @returns {boolean} Retorna true se o formato for válido, false caso contrário.
 */
function validarEmail(email) {
  // Edge case: rejeita null, undefined ou tipos incorretos
  if (typeof email !== 'string' || !email.trim()) return false;
  
  // Utiliza Regex para garantir o formato correto (texto@texto.texto)
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}

/**
 * Trecho B: Busca um produto pelo nome dentro de um array de objetos.
 * @param {Array} produtos - Array contendo os objetos de produtos.
 * @param {string} nome - O nome do produto desejado.
 * @returns {Object|null} Retorna o objeto do produto ou null se não encontrado.
 */
function buscarProduto(produtos, nome) {
  // Edge case: garante que os parâmetros têm os tipos corretos antes de iterar
  if (!Array.isArray(produtos) || typeof nome !== 'string') return null;

  // Correção do off-by-one error: 'i < produtos.length' impede o acesso a undefined
  for (let i = 0; i < produtos.length; i++) {
    // Uso do === para evitar coerção de tipo inesperada
    if (produtos[i] && produtos[i].nome === nome) {
      return produtos[i];
    }
  }
  return null;
}

/**
 * Trecho C: Calcula o preço final após aplicar um desconto.
 * @param {number} preco - O preço original do produto.
 * @param {number} desconto - O valor a ser descontado.
 * @returns {number|string} Retorna o preço com desconto ou mensagem de erro.
 */
function aplicarDesconto(preco, desconto) {
  // Guard clauses: bloqueiam execuções indevidas na raiz
  if (typeof preco !== 'number' || typeof desconto !== 'number') return "Erro: Tipos inválidos.";
  if (preco < 0) return "Erro: Preço não pode ser negativo.";
  if (desconto < 0) return "Erro: Desconto não pode ser negativo.";
  if (desconto > preco) return "Erro: Desconto não pode ultrapassar o valor do produto.";

  return preco - desconto;
}

/**
 * Trecho D: Formata um valor numérico para o padrão de moeda (BRL).
 * @param {number} valor - O valor a ser formatado.
 * @returns {string} O valor formatado em reais ou mensagem de erro.
 */
function formatarPreco(valor) {
  // Validação estrita: rejeita null, strings e o tipo especial NaN
  if (typeof valor !== 'number' || Number.isNaN(valor)) {
    return "Erro: O valor informado não é um número válido.";
  }
  
  return "R$" + valor.toFixed(2);
}

// ==========================================
// TESTES MANUAIS PARA VALIDAÇÃO NO TERMINAL
// ==========================================

console.log("--- Testes Trecho A (Email) ---");
console.log(validarEmail("usuario@email.com")); // true
console.log(validarEmail("@@@@")); // false
console.log(validarEmail("sem-arroba.com")); // false
console.log(validarEmail(null)); // false

console.log("\n--- Testes Trecho B (Busca) ---");
const lista = [
  { nome: "Camiseta", preco: 49.90 },
  { nome: "Calça", preco: 89.90 }
];
console.log(buscarProduto(lista, "Calça")); // { nome: 'Calça', preco: 89.9 }
console.log(buscarProduto(lista, "Boné")); // null
console.log(buscarProduto("nao-sou-array", "Calça")); // null

console.log("\n--- Testes Trecho C (Desconto) ---");
console.log(aplicarDesconto(100, 10)); // 90
console.log(aplicarDesconto(100, -10)); // Erro: Desconto não pode ser negativo
console.log(aplicarDesconto(100, 110)); // Erro: Desconto não pode ultrapassar o valor
console.log(aplicarDesconto("100", 10)); // Erro: Tipos inválidos

console.log("\n--- Testes Trecho D (Formatação) ---");
console.log(formatarPreco(49.9)); // R$49.90
console.log(formatarPreco("abc")); // Erro
console.log(formatarPreco(null)); // Erro