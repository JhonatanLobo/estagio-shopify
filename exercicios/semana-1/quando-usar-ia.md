# Diretrizes de Uso de Inteligência Artificial no Desenvolvimento

Este documento apresenta uma análise crítica e prática sobre os critérios de utilização de ferramentas de Inteligência Artificial (como Copilot e modelos de linguagem) durante o fluxo de desenvolvimento de software nesta sprint.

## Cenários de Utilização Recomendada (Quando Usar)
O uso de ferramentas de IA demonstrou ser altamente eficiente para otimizar o tempo de desenvolvimento em tarefas repetitivas, estruturais e de validação sintática. Exemplos concretos incluem:
- **Geração de Estruturas Repetitivas:** Escrita e formatação inicial de blocos JSON no Schema das seções do Liquid, acelerando a configuração de inputs (como ranges, checkboxes e seletores de cores).
- **Pair Programming e Code Review Local:** Identificação ágil de pequenos erros de sintaxe sintáticos, tais como o fechamento incorreto de tags HTML (`alt` ou `href`) ou ausência de hífens em declarações de variáveis CSS customizadas inline (`--colunas`).
- **Automação de Testes e Refatoração:** Criação de estruturas CSS responsivas padronizadas baseadas em regras de Grid e Flexbox, economizando tempo na codificação de media queries comuns.

## Cenários de Restrição de Uso (Quando Não Usar)
A delegação irrestrita de tarefas para a IA acarreta riscos técnicos e pedagógicos, devendo ser evitada em cenários como:
- **Definição de Regras de Negócio e Lógica Crítica:** Conforme evidenciado no desafio de depuração, o código gerado automaticamente pode introduzir bugs de escopo ou falhas lógicas sutis que exigem discernimento e validação humana rigorosa.
- **Aprendizado de Novos Conceitos:** O uso automatizado de ferramentas de completude de código durante o primeiro contato com uma tecnologia (como a sintaxe de objetos e tags nativas do Liquid) prejudica a fixação dos conceitos fundamentais e o desenvolvimento do raciocínio algorítmico do desenvolvedor.
