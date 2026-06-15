# Reflexão: Com e Sem IA

## Tempo
Sem IA: 35 minutos
Com IA: 5 minutos

## Qualidade
- O código gerado pela IA estava correto de primeira? Se não, o que precisou ajustar?
Sim, a IA gerou o código funcional logo de cara para cenários ideais. Não precisei ajustar a lógica central, mas notei que ela ignorou a tipagem e os cenários de erro.

- Qual versão ficou com código mais limpo?
A versão Com IA ficou mais limpa e curta, pois utilizou métodos avançados do JavaScript como Expressões Regulares (`match(/[aeiou]/gi)`) e o `Math.max` aliado ao spread operator (`...`).

- Qual versão tem melhor tratamento de edge cases?
A versão Sem IA. Ao construir a lógica passo a passo, a preocupação em validar os dados de entrada (verificando `typeof str !== 'string'` ou `!Array.isArray()`) garantiu que a função não quebrasse ao receber tipos de dados inesperados.

## Aprendizado
- Em qual abordagem você sentiu que aprendeu mais?
No desenvolvimento Sem IA. Fazer as estruturas de repetição manualmente consolida a base algorítmica e te obriga a pensar no fluxo completo dos dados, incluindo onde ele pode falhar.

- O Copilot sugeriu alguma solução que você não conhecia? Qual?
O uso do regex `(str.match(/[aeiou]/gi) || []).length` para contar as vogais de forma direta, sem precisar iterar sobre cada caractere com um laço `for`.

- Houve algum momento em que o Copilot atrapalhou ou confundiu?
Nesse caso específico não chegou a atrapalhar, mas a omissão dos tratamentos de erros na primeira sugestão poderia causar bugs graves em produção se o código fosse aceito de forma cega.

## Conclusão
- Quando faz sentido usar IA no seu fluxo de trabalho?
Para agilizar blocos de código conhecidos e repetitivos, descobrir métodos nativos mais otimizados da linguagem ou para ajudar a refatorar uma função que já funciona.

- Quando é melhor desligar e fazer na mão?
Quando estou aprendendo um conceito novo, desenvolvendo a lógica central de uma regra de negócio complexa, ou quando preciso garantir segurança máxima contra edge cases inesperados.

- Como você pretende usar o Copilot daqui para frente?
Como um assistente avançado, e não como um substituto. Pretendo deixar ele gerar as partes braçais do código, mas sempre mantendo a responsabilidade de revisar a lógica e adicionar as validações de segurança necessárias.