# Análise: Caça aos Bugs da IA

## Trecho A - Validação de email
* **Qual é o bug:** A função usa apenas o método `.includes("@")` para validar a string.
* **Por que está errado:** Uma string como `@@@@` ou `usuario@` retorna `true`, gerando falsos positivos. Um email válido exige uma estrutura estrita: caracteres locais, o símbolo de arroba, um domínio e um TLD (Top-Level Domain, como `.com`).
* **Como corrigir:** A validação deve ser refatorada utilizando Expressões Regulares (Regex) para avaliar o padrão completo da string, além de checar previamente se o tipo de dado recebido é realmente uma string.

## Trecho B - Buscar item em array
* **Qual é o bug:** A condição de parada do loop `for` está declarada como `i <= produtos.length`. Além disso, a comparação usa `==` em vez de `===`.
* **Por que está errado:** Este é um clássico *off-by-one error*. Como os arrays em JavaScript são indexados a partir de 0, o último elemento está no índice `length - 1`. Quando o loop tenta iterar no índice igual ao `length`, ele acessa `undefined`. Tentar ler a propriedade `.nome` de `undefined` lançará um erro do tipo `TypeError`, quebrando a aplicação. O uso de `==` também abre margem para bugs de coerção de tipo.
* **Como corrigir:** Alterar a condição do loop para estritamente menor (`i < produtos.length`) e substituir a comparação solta por estrita (`===`). Foi adicionada também uma validação inicial para garantir que o argumento passado é de fato um Array.

## Trecho C - Calcular desconto
* **Qual é o bug:** A função realiza o cálculo diretamente, sem validar os tipos de entrada e as regras de negócio para descontos.
* **Por que está errado:** A falta de validação permite anomalias matemáticas. Se o desconto for maior que o preço, o lojista "paga" para o cliente levar o produto. Se o desconto for um número negativo (ex: -10), a regra de sinais matemática fará com que o preço final aumente em vez de diminuir.
* **Como corrigir:** Implementar cláusulas de guarda (*guard clauses*) no início da função para garantir que ambos os argumentos sejam do tipo numérico e maiores ou iguais a zero, e que o desconto não seja superior ao preço.

## Trecho D - Formatação de preço
* **Qual é o bug:** A função tenta aplicar o método `.toFixed(2)` sem validar o tipo de dado recebido.
* **Por que está errado:** O método `.toFixed()` é exclusivo do protótipo de `Number`. Se a função receber uma string (`"abc"`) ou `null`, o interpretador lançará um erro fatal (`TypeError: valor.toFixed is not a function`).
* **Como corrigir:** Adicionar uma verificação utilizando `typeof` para garantir que o valor é estritamente um número e rejeitar valores `NaN` (Not-a-Number) antes de tentar formatar.