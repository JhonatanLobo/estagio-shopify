#  Shopify Dawn Theme Extension — Sprint 2

Este repositório contém a arquitetura modular avançada e os recursos de e-commerce desenvolvidos durante a Sprint 2 do programa de engenharia. O projeto estende as capacidades nativas do tema Dawn da Shopify por meio de seções customizadas em Liquid, blocos dinâmicos reordenáveis, injeção de metadados relacionais (Metafields/Metaobjects) e folhas de estilo otimizadas sob as diretrizes de performance da plataforma.

---

##  Arquitetura do Repositório e Ecossistema Estrutural

O código foi rigorosamente isolado para evitar a poluição do escopo global do tema, utilizando templates JSON dinâmicos para mapear e persistir o estado dos componentes nas diferentes viewports.

```text
loja-tema/ (Raiz do Projeto)    
├── assets/
│   ├── custom-faq.css                ← Estilos encapsulados da Seção de FAQ
│   └── store-benefits.css            ← Regras de layout e Grid da Seção de Benefícios
├── sections/
│   ├── hero-banner.liquid            ← Componente promocional principal (Sprint 2.1)
│   ├── product-extra-info.liquid     ← Abas técnicas hidratadas via Metafields (Sprint 2.2)
│   ├── brand-info.liquid             ← Bloco institucional alimentado por Metaobject
│   ├── custom-faq.liquid             ← NOVA: Seção polimórfica de FAQ com múltiplos blocos
│   └── store-benefits.liquid         ← NOVA: Grid assimétrico com lógica híbrida de renderização
├── templates/
│   ├── index.json                    ← Esquema de configuração estrutural da Homepage
│   └── product.json                  ← Mapeamento e ordenação da Página de Produto
├── PERFORMANCE-REPORT.md             ← Relatório de auditoria de Core Vitals e renderização
└── README.md                         ← Documentação técnica central do repositório