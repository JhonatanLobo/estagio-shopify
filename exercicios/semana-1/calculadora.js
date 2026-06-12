function somar(a, b) {
  return a + b;
}

function subtrair(a, b) {
  return a - b;
}

function multiplicar(a, b) {
  return a * b;
}

function dividir(a, b) {
  if (b === 0) {
    return "Erro: divisão por zero";
  }
  return a / b;
}

// Testes manuais
console.log("2+3=", somar(2, 3));
console.log("10-4=", subtrair(10, 4));
console.log("5*6=", multiplicar(5, 6));
console.log("15/3=", dividir(15, 3));
console.log("10/0=", dividir(10, 0));

function porcentagem(valor, percent) {
  return (valor * percent) / 100;
}

console.log("20% de 150=", porcentagem(150, 20));