# Repositório de Estágio: Shopify / Webjump

Este repositório documenta os desafios e aprendizados práticos desenvolvidos durante o estágio, com foco na construção de código limpo, resolução de bugs e boas práticas de versionamento.

**Desenvolvedor:** Jhonatan Teixeira Lôbo (Estagiário - Sistemas de Informação, IFCE Campus Crato)

---

## Entregas e Evolução Técnica

### Semana 1: Fundamentos de JavaScript e Refatoração
O foco desta semana foi estabelecer o fluxo de trabalho com Git e aplicar conceitos de programação defensiva, avaliando de forma prática as vantagens e os pontos cegos do uso de IA no desenvolvimento.

* **Desafio 1.1 — Modularidade (`calculadora.js`):**
  Criação da estrutura inicial do projeto, isolando operações matemáticas básicas em funções utilitárias diretas e de fácil leitura.

* **Desafio 1.2 — Tratamento de Erros e Edge Cases (`caca-bugs-corrigido.js`, `caca-bugs.md`):**
  Análise de lógicas geradas por IA que falhavam fora do "caminho feliz". A refatoração aplicou *Guard Clauses* (como `typeof` e `Array.isArray`) no início das funções, implementando um padrão "Fail-Fast" para proteger o código contra tipos de dados inesperados.

* **Desafio 1.3 — Código Manual vs. Código IA (`sem-ia.js`, `com-ia.js`, `reflexao-ia.md`):**
  Comparação entre a construção de código iterativo tradicional e abordagens modernas sugeridas pelo Copilot (Expressões Regulares e *Spread Operator*). A entrega exigiu adaptar o código da IA para regras reais, como a inclusão nativa de vogais com acento (`/[aeiouáàãâéêíóôõú]/gi`).

---

## Padrões Adotados

* **Programação Defensiva:** Validação de entradas para evitar falhas silenciosas.
* **Versionamento:** Fluxo de trabalho com Feature Branches, Pull Requests e resolução de conflitos.
* **Commits Semânticos:** Uso do padrão *Conventional Commits* (feat, fix, docs) para manter o histórico organizado e rastreável.
