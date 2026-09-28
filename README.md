# 🌍 Atlasphere | Painel Global Interativo de Países

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)](https://vite.dev/)
[![HTML5 Semântico](https://img.shields.io/badge/HTML5-Semântico-e34f26?logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Glossary/Semantics)
[![CSS3](https://img.shields.io/badge/CSS3-Design_System-1572b6?logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![REST Countries API](https://img.shields.io/badge/API-REST_Countries_v3.1-06b6d4)](https://restcountries.com/)

Aplicação web interativa, responsiva e acessível desenvolvida com **React** e **Vite**, que consome em tempo real os dados da **REST Countries API v3.1** para transformar dados brutos globais em uma experiência visual rica, intuitiva e educativa.

---

## 💡 Problemática
Atualmente, uma imensa quantidade de informações sobre nações, dados demográficos, moedas e fusos horários está disponível publicamente via APIs. No entanto, o acesso a dados brutos em JSON não facilita a consulta por parte do usuário comum. Sem uma camada visual organizada, torna-se difícil:
- Localizar nações por nomes e capitais;
- Visualizar e filtrar por continentes e sub-regiões;
- Realizar comparações diretas de população e extensão territorial;
- Consultar detalhes rápidos como brasão de armas, moedas e países fronteiriços com navegação fluida.

## 🎯 Objetivo da Aplicação
Desenvolver um painel interativo moderno, altamente responsivo e semântico, que organiza as informações de mais de 250 países de maneira visualmente atraente, possibilitando busca instantânea, filtragem multinível, seleção de favoritos persistentes no navegador (`localStorage`), comparador direto de nações com métricas proporcionais e alternância de temas (Dark/Light).

---

## 🛠️ Tecnologias Utilizadas
- **React 19** (Functional Components, Hooks customizados: `useCountries`, `useFavorites`, `useTheme`, `useMemo`, `useCallback`)
- **Vite 8** (Build tool ultrarrápido com Hot Module Replacement)
- **HTML5 Semântico Estrito** (`<header>`, `<nav>`, `<main>`, `<search>`, `<section>`, `<article>`, `<figure>`, `<figcaption>`, `<dl>`, `<dt>`, `<dd>`, `<aside>`, `<footer>`, `<dialog>`)
- **CSS Moderno / Vanilla CSS** (Variáveis CSS Custom Properties, Glassmorphism, Layouts com CSS Grid e Flexbox, Animações Fluidas e Design System responsivo)
- **Design Tokens & Acessibilidade** (Suporte a Dark Mode / Light Mode, contrastes WCAG e leitores de tela)

---

## 🔌 API Pública Utilizada
- **Nome:** [REST Countries API (v3.1)](https://restcountries.com/)
- **Endpoint principal:** `https://restcountries.com/v3.1/all?fields=name,cca3,flags,coatOfArms,population,region,subregion,capital,currencies,languages,borders,area,continents,maps,timezones,latlng`
- **Características:** Gratuita, sem necessidade de chaves de API, com suporte a CORS e rica em metadados geográficos e demográficos.

---

## ✨ Principais Funcionalidades

1. 🔍 **Busca em Tempo Real (Insensível a Acentos e Maiúsculas):**
   - Pesquise instantaneamente por nome comum, nome oficial, capital ou código ISO (`cca3`).
2. 🌎 **Filtro Multinível por Continentes e Sub-regiões:**
   - Navegação por pills com os continentes (África, Américas, Ásia, Europa, Oceania, Antártica).
   - Menu seletor de sub-regiões dinâmico gerado conforme a região ativa.
3. 🔀 **Ordenação Dinâmica:**
   - Ordenar por Nome (A-Z ou Z-A), População (Maior/Menor) e Área Territorial (Maior/Menor).
4. ❤️ **Sistema de Favoritos com `localStorage`:**
   - Salve qualquer país com 1 clique;
   - Aba exclusiva "Favoritos" no topo com contagem em tempo real e persistência automática.
5. 📊 **Comparador de Nações Lado a Lado (Até 4 países):**
   - Comparação visual direta com barras proporcionais de população e extensão territorial;
   - Análise de capitais, moedas e idiomas oficiais.
6. 📋 **Modal de Detalhes Completos com Navegação de Fronteiras:**
   - Visualização da bandeira em alta resolução e Brasão de Armas (`coatOfArms`);
   - Botões clicáveis dos países fronteiriços (`borders`) que permitem navegar instantaneamente entre países vizinhos;
   - Link direto para localização no Google Maps.
7. 📈 **Painel de Métricas em Tempo Real:**
   - Total de países visíveis, soma populacional, país mais populoso e de maior extensão na seleção ativa.
8. 🌓 **Dark Mode / Light Mode:**
   - Alternância de tema com persistência local e detecção automática de preferência do sistema operacional.
9. ⚡ **Tratamento Robusto de Estados:**
   - Skeleton Loader animado durante a requisição;
   - Estado Vazio (*Empty State*) amigável com botão de limpar filtros;
   - Tratamento de falhas e botão "Tentar Novamente".

---

## 🧩 Arquitetura de Componentes e Estrutura Semântica

```
src/
├── components/
│   ├── Header/             # <header>, <nav> principal, alternância de tema
│   ├── Metrics/            # <section>, <article>, <dl><dt><dd> com estatísticas em tempo real
│   ├── FilterBar/          # <search>, <nav> de continentes, seletores de sub-região e ordenação
│   ├── CountryCard/        # <article>, <figure> (bandeira), <dl> (chave-valor), <button> de ação
│   ├── CountryGrid/        # <section>, <ul> e <li> com carregamento paginado fluido
│   ├── CountryModal/       # <aside role="dialog"> com detalhes, brasão, mapa e fronteiras
│   ├── ComparisonModal/    # <aside role="dialog"> com análise comparativa lado a lado
│   ├── SkeletonCard/       # Efeito shimmer de carregamento assíncrono
│   ├── EmptyState/         # <article> informativo para buscas sem resultados ou erros
│   ├── Footer/             # <footer>, <section>, <nav> com links e créditos
│   └── Icons.jsx           # Sistema próprio de ícones SVG sem dependências externas
├── hooks/
│   ├── useCountries.js     # Consumo da API, cache em sessionStorage e tratamento de erros
│   ├── useFavorites.js     # Gerenciamento e persistência de favoritos no localStorage
│   └── useTheme.js         # Controle de tema Dark/Light sincronizado no HTML
├── services/
│   └── countriesApi.js     # Camada de requisição e normalização dos dados da REST Countries
├── utils/
│   └── formatters.js       # Formatação de população, área e normalização de busca (sem acentos)
├── App.jsx                 # Componente raiz estruturado
├── App.css                 # Estilos do layout principal e transições
├── index.css               # Design System com tokens, variáveis e reset semântico
└── main.jsx                # Ponto de entrada do React
```

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js instalado (versão 18+ recomendada)
- npm ou yarn

### Passo a Passo:
1. **Clone o repositório ou acesse a pasta:**
   ```bash
   git clone https://github.com/B0MF1M/Atlasphere.git
   cd Atlasphere
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   Abra [http://localhost:5173/](http://localhost:5173/) para explorar a aplicação.

5. **Para gerar a build de produção:**
   ```bash
   npm run build
   ```

---

## 🌐 Link da Aplicação Publicada
- **Produção:** [https://seu-projeto.vercel.app](https://vercel.com/) *(Atualize com o seu link do Vercel/Netlify)*

---

## 🤖 Uso de Inteligência Artificial

Em conformidade com as orientações do Desafio 02, o desenvolvimento da aplicação utilizou o **Antigravity IDE** com inteligência artificial como ferramenta de apoio pair-programming para estruturação arquitetural, design semântico e lógica de manipulação de dados.

### Prompt Utilizado no Antigravity IDE:
> *"Crie uma aplicação React + Vite completa para o Desafio 02: Painel Interativo com API Pública. A aplicação deve consumir a REST Countries API v3.1 para exibir dados de países. Requisitos obrigatórios: 1) Usar HTML5 estritamente semântico (<header>, <nav>, <main>, <search>, <section>, <article>, <figure>, <figcaption>, <dl>, <dt>, <dd>, <aside>, <footer>) e utilizar <div> apenas quando estritamente necessário para wrappers visuais; 2) Componentização clara e desacoplada; 3) Funcionalidades interativas completas: busca em tempo real com normalização de acentos, filtros por continentes e sub-regiões, ordenação dinâmica, sistema de favoritos persistido em localStorage, modal de detalhes com navegação entre fronteiras vizinhas e comparador visual lado a lado de até 4 países com barras proporcionais; 4) Design moderno e responsivo em Vanilla CSS com Dark/Light Mode, glassmorphism e micro-animações; 5) Tratamento de estados de carregamento (skeleton), vazio e erro com retry."*

### Objetivo:
O objetivo deste prompt foi acelerar a arquitetura inicial do projeto, estabelecer um padrão rigoroso de HTML5 semântico sem abuso de tags genéricas `<div>`, criar um sistema de design responsivo com transições suaves e implementar funcionalidades avançadas de filtragem, persistência em `localStorage` e comparador de nações.

---

## 📄 Licença
Este projeto foi desenvolvido como parte de atividades acadêmicas/práticas de desenvolvimento frontend. Sinta-se livre para estudar, modificar e aprimorar.
