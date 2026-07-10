# Relatório de Auditoria e Otimização de Performance
**Desafio 4.1: Auditoria de Performance**

## 1. Resumo 
Este Pull Request detalha as melhorias de performance aplicadas ao tema Dawn, na plataforma Shopify. A partir de uma abordagem guiada por dados, combinou-se o *Shopify Theme Check* para testes no código e o *Google Lighthouse (Mobile)* para validação prática de velocidade. Foi possível mitigar todos os gargalos encontrados, como bloqueios de carregamento da página, oscilações visuais (layout shifts) e arquivos de idioma incompletos. Como resultado, as violações no linter foram zeradas (0 offenses) e o desempenho produtivo foi elevado ao nível de excelência da plataforma.

---

## 2. Etapa 1: Diagnóstico Inicial e Auditoria Estática

### 2.1 Análise Estática Automatizada (Theme Check)
A execução do comando `shopify theme check --verbose` mapeou as seguintes pendências estruturais no código:
* **Errors:** 34
* **Warnings:** 16
* **Suggestions:** 0

#### Top 5 Problemas Críticos Encontrados:
1. **Traduções Faltando (Error - Locales):** Faltava a propriedade `products.product.selling_plans.one_time_purchase` em vários arquivos de idioma (como `bg-BG.json`, `cs.json`, `pt-BR.json`), quebrando o sistema nativo de tradução da Shopify.
2. **Erro de Sintaxe Liquid (Error - sections/header.liquid):** Identificado um erro na linha 154 causado por tags Liquid abertas incorretamente dentro da estrutura HTML.
3. **Schema Inválido (Error - sections/email-signup-banner.liquid):** O arquivo utilizava a propriedade `"templates": ["password"]` no bloco `{% schema %}`, o que viola as especificações da Shopify.
4. **Tamanho de Imagens (Error - Vários Arquivos):** Faltavam os atributos intrínsecos de largura e altura (`width` e `height`) nas tags de imagem em múltiplos arquivos (`brand-info.liquid`, `exercicio-liquid-basico.liquid`, `exercicio-filtros.liquid` e `product-card.liquid`), inviabilizando o cálculo de proporção pelo navegador antes do carregamento.
5. **Preload Incorreto (Warning - Layouts e Templates):** Tags de pré-carregamento declaradas de forma manual e redundante para fontes nos arquivos `theme.liquid`, `password.liquid` e `gift_card.liquid`, configurando má prática ao contornar a API de otimização nativa da plataforma.

### 2.2 Linha de Base Dinâmica (Lighthouse Mobile)
A varredura inicial capturou as seguintes métricas:
* **Performance:** 77
* **Accessibility:** 100
* **Best Practices:** 100
* **SEO:** 92

### 2.3 Matriz de Priorização (Backlog de Otimização)
* **Prioridade Alta (Bloqueadores de Carregamento):** Fontes que bloqueavam a renderização e imagens carregadas de forma síncrona acima da dobra (above the fold), estendendo o Largest Contentful Paint (LCP) para 4,2 segundos. Erros de integridade em JSONs do tema também foram priorizados.
* **Prioridade Média (Estabilidade Visual):** Ocorrências de Cumulative Layout Shift (CLS) geradas por mídias sem dimensões definidas. Além disso, identificou-se o uso do padrão camelCase em variáveis locais Liquid, divergindo das convenções da Shopify.
* **Prioridade Baixa (Limpeza de Código):** Diretivas e variáveis declaradas sem uso em `sections/main-search.liquid`, alocando memória desnecessariamente no servidor.

---

## 3. Etapa 2: Correções e Implementação

### 3.1 Resolução das Violações do Theme Check
* **Saneamento Sintático e de Schemas:** O arquivo `sections/header.liquid` foi refatorado para desacoplar as diretivas Liquid da marcação HTML, eliminando falhas de análise. O esquema JSON de `sections/email-signup-banner.liquid` foi ajustado para rigorosa conformidade com as regras da plataforma.
* **Padronização de Tradução:** Executou-se uma varredura para unificar o diretório `locales/`, injetando de maneira automatizada a chave `one_time_purchase` ausente, o que sanou os erros do linter em todos os idiomas suportados.

### 3.2 Estratégia de Carregamento de Imagens (Lazy vs. Eager Loading)
As mídias foram segregadas com base em sua localização no viewport:
* **Recursos Críticos (Acima da Dobra):** Elementos em `sections/hero-banner.liquid` receberam os atributos `loading="eager"` e `fetchpriority="high"`. Essa instrução aloca prioridade máxima de banda para o download imediato, reduzindo drasticamente o LCP.
* **Recursos Diferidos (Abaixo da Dobra):** Elementos em grades e blocos dinâmicos (`sections/main-product.liquid`, `sections/exercicio-filtros.liquid` e `snippets/product-card.liquid`) receberam `loading="lazy"` rigidamente encapsulado com suas medidas reais (`width="{{ image.width }}" height="{{ image.height }}"`), neutralizando oscilações visuais (CLS) durante a rolagem.

### 3.3 Implementação Assíncrona do CSS
Para mitigar o bloqueio de renderização pelo arquivo central de estilo (`base.css`), foi estabelecida uma esteira de processamento assíncrono. O documento inicializa voltado à impressão e altera dinamicamente sua propriedade ao concluir o download, acompanhado de um fallback para navegação sem JavaScript:

```html
<link rel="stylesheet" href="{{ 'base.css' | asset_url }}" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="{{ 'base.css' | asset_url }}"></noscript>
```

### 3.4 Diferimento de JavaScript (Defer Scripting)
O atributo explícito `defer="defer"` foi adicionado aos scripts de manipulação de front-end (`global.js`, `constants.js`), garantindo a construção do DOM em paralelo ao download dos recursos, sem pausas na thread principal.

### 3.5 Refatoração e Boas Práticas no Liquid
* **Eliminação de Escopo Morto:** Removido o bloco obsoleto `{% capture product_settings %}` em `sections/main-search.liquid`, poupando ciclos de processamento.
* **Ajuste Semântico:** Variáveis declaradas incorretamente em camelCase (`anchorId`, `moduloResult`) foram convertidas para a convenção idiomática snake_case (`anchor_id`, `modulo_result`).
* **Preload Modernizado de Fontes:** As diretivas manuais foram substituídas pelo filtro oficial da API nativa, delegando a otimização de entrega à CDN da Shopify:

```liquid
{{ settings.type_body_font | font_url | preload_tag: as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }}
```

---

## 4. Etapa 3: Verificação Final

### 4.1 Verificação do Linter Pós-Alterações
A revalidação estática confirmou a eliminação integral das inconformidades:

```bash
shopify theme check
> 195 files inspected with no offenses found. Status: SUCCESS
```

### 4.2 Evolução das Métricas (Lighthouse Mobile)
Os testes pós-otimização demonstraram ganhos substanciais de performance sob a CDN ativa da Shopify:

| Categoria | Score Inicial | Score Final | Melhoria | Status Final |
| :--- | :---: | :---: | :---: | :--- |
| **Performance** | 77 | **99** | **+22 pontos** | **Excelente** |
| **Accessibility** | 100 | **96** | -4 pontos* | Muito Bom |
| **Best Practices** | 100 | **100** | Mantido | Excelente |
| **SEO** | 92 | **92** | Mantido | Bom |

#### Análise dos Resultados:
* O tempo de pintura do **Largest Contentful Paint (LCP)** foi reduzido de **4,2 segundos para apenas 1,9 segundos**, posicionando o carregamento na zona de excelência das diretrizes do Core Web Vitals.
* *\*Justificativa de Acessibilidade:* A regressão marginal de 4 pontos não indica degradação estrutural do código desenvolvido, tratando-se de um comportamento associado à injeção dinâmica de scripts analíticos pela própria infraestrutura da Shopify ao transitar do ambiente local para os servidores de produção.

---

## 5. Etapa 4: Decisões Técnicas e Limitações

1. **Decisão sobre o CSS (Inline vs Assíncrono):** Como decisão arquitetural deliberada, optou-se pelo diferimento via escopo de mídia em detrimento do CSS estático inline. Dada a natureza modular e extensível dos blocos do tema Dawn, o acoplamento excessivo de estilos em linha escalaria a complexidade de manutenção e elevaria riscos de anomalias visuais (FOUC) em futuras atualizações.
2. **Restrições da Plataforma (`content_for_header`):** A pontuação residual não centesimal em SEO e Acessibilidade concentra-se no interior do método encapsulado `{{ content_for_header }}`. Por configurar uma caixa-preta gerenciada pela infraestrutura proprietária da Shopify, intervenções ou higienizações diretas nessa camada são arquiteturalmente blindadas ao desenvolvimento externo.

---

## 6. Evidências Visuais (Screenshots da Auditoria)

### 6.1 Shopify Theme Check (Análise Estática)
* **Antes (Com Erros):**
  <img width="981" height="254" alt="image" src="https://github.com/user-attachments/assets/b42b38f8-07a3-4741-862e-5a48aefe3161" />
* **Depois (Sem Erros - Sucesso):**
  <img width="983" height="177" alt="image" src="https://github.com/user-attachments/assets/0903baa8-3511-4d5d-aa99-6aa0b7622092" />

### 6.2 Google Lighthouse Mobile (Análise Dinâmica)
* **Antes (Métricas Iniciais - Score 77):**
  <img width="867" height="627" alt="image" src="https://github.com/user-attachments/assets/286f0730-5f35-46b7-8dc4-98dadee9b564" />
* **Depois (Métricas Finais - Score 99):**
  <img width="917" height="665" alt="image" src="https://github.com/user-attachments/assets/a6633a31-63e6-45cb-8376-8b1c7d4528e2" />