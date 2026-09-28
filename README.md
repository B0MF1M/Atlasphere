# Atlasphere - Painel Interativo de Dados Globais

Aplicação web desenvolvida com React e Vite para consulta, visualização e comparação de dados geográficos e demográficos mundiais.

---

## Problematica

Grande parte das informações sobre nações, dados populacionais, moedas e fusos horários encontra-se disponível em APIs públicas em formato bruto. Sem uma interface visual estruturada, a consulta direta a esses dados torna-se pouco prática para o usuário. 

A proposta deste projeto é transformar dados brutos em uma experiência de consulta intuitiva, organizada e interativa.

---

## Objetivo da Aplicacao

Desenvolver uma aplicação web responsiva e semântica que centralize as informações de 250 países, oferecendo busca em tempo real, filtros por continentes e sub-regiões, ordenação por múltiplos critérios, armazenamento de favoritos no navegador (localStorage) e um comparador direto entre nações.

---

## Tecnologias Utilizadas

- **React 19:** Biblioteca principal para componentização da interface e gerenciamento de estado (useState, useEffect, useMemo, useCallback).
- **Vite 8:** Ferramenta de build e servidor de desenvolvimento.
- **HTML5 Semântico:** Estruturação orientada a padrões de acessibilidade (header, nav, search, main, section, article, figure, figcaption, dl, dt, dd, aside, footer).
- **Vanilla CSS:** Folha de estilos sem frameworks externos, utilizando CSS Custom Properties para suporte a temas Claro e Escuro, CSS Grid e Flexbox.

---

## Fonte de Dados (API)

- **Fonte:** REST Countries / Base Global de Dados de Países
- **Formato:** JSON estruturado com dados de identificação (ISO cca2/cca3), nomes oficiais, população, área territorial, capitais, bandeiras, moedas, idiomas, fusos horários e fronteiras terrestres.

---

## Funcionalidades Implementadas

1. **Busca Textual em Tempo Real:**
   - Permite consultar países por nome comum, nome oficial, capital ou código ISO.
   - Tratamento de busca insensível a acentos e maiúsculas/minúsculas.

2. **Filtros por Continente e Sub-regiao:**
   - Navegação por regiões (África, Américas, Ásia, Europa, Oceania e Antártica).
   - Menu seletor dinâmico de sub-regiões gerado conforme a região selecionada.

3. **Ordenacao de Resultados:**
   - Ordenação alfabética (A-Z e Z-A).
   - Ordenação por volume populacional (Maior e Menor).
   - Ordenação por extensão territorial (Maior e Menor).

4. **Sistema de Favoritos:**
   - Possibilidade de marcar e desmarcar países favoritos com persistência automática no localStorage.
   - Aba exclusiva para visualização dos favoritos salvos.

5. **Comparador Direto de Nacoes:**
   - Seleção de até 4 países para análise lado a lado.
   - Comparação proporcional com barras visuais para população e área territorial.

6. **Modal de Detalhes com Navegacao de Fronteiras:**
   - Exibição de bandeira oficial, brasão de armas, coordenadas geográficas, moedas e idiomas.
   - Botões interativos para os países vizinhos fronteiriços que permitem navegar diretamente de um país para outro.
   - Link direto para localização no Google Maps.

7. **Indicadores Globais:**
   - Painel dinâmico com total de países visíveis, soma da população filtrada, país mais populoso e de maior extensão da seleção ativa.

8. **Alternancia de Tema:**
   - Suporte completo a Modo Escuro (Dark) e Modo Claro (Light) com persistência da preferência do usuário.

9. **Tratamento de Estados:**
   - Estados de carregamento com skeleton loaders.
   - Mensagens para buscas sem resultados ou lista de favoritos vazia.
   - Fallback offline para garantir a disponibilidade constante dos dados.

---

## Arquitetura de Componentes

```
src/
├── components/
│   ├── Header/             # Barra de navegacao superior e alternancia de tema
│   ├── Metrics/            # Painel de indicadores globais em tempo real
│   ├── FilterBar/          # Barra de busca semantica, filtros e ordenacao
│   ├── CountryCard/        # Card individual de cada pais
│   ├── CountryGrid/        # Grade responsiva de cards com paginacao fluida
│   ├── CountryModal/       # Janela modal de detalhes e navegacao de fronteiras
│   ├── ComparisonModal/    # Janela comparativa lado a lado
│   ├── SkeletonCard/       # Componente de carregamento assincrono
│   ├── EmptyState/         # Mensagens para buscas sem resultados
│   ├── Footer/             # Rodape minimalista
│   └── Icons.jsx           # Componentes de icones vetoriais SVG nativos
├── hooks/
│   ├── useCountries.js     # Gerenciamento de requisicao e cache
│   ├── useFavorites.js     # Logica de favoritos persistida em localStorage
│   └── useTheme.js         # Controle de tema claro/escuro
├── services/
│   └── countriesApi.js     # Camada de normalizacao dos dados
├── utils/
│   └── formatters.js       # Formatacao numerica e normalizacao de texto
├── App.jsx                 # Componente raiz da aplicacao
├── App.css                 # Estilos do layout principal
├── index.css               # Design system global e variaveis CSS
└── main.jsx                # Ponto de entrada da aplicacao React
```

---

## Como Executar o Projeto Localmente

### Pre-requisitos
- Node.js instalado (versão 18 ou superior)
- npm ou yarn

### Instrucoes:
1. Clone o repositório:
   ```bash
   git clone https://github.com/B0MF1M/Atlasphere.git
   cd Atlasphere
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor local:
   ```bash
   npm run dev
   ```

4. Acesse no navegador em `http://localhost:5173/`.

5. Para gerar o build de produção:
   ```bash
   npm run build
   ```

---

## Links do Projeto

- **Aplicacao Publicada:** [https://atlasphere-ten.vercel.app/](https://atlasphere-ten.vercel.app/)
- **Repositorio no GitHub:** [https://github.com/B0MF1M/Atlasphere](https://github.com/B0MF1M/Atlasphere)

---

## Uso de Inteligencia Artificial

Conforme as diretrizes do Desafio 02, o desenvolvimento da aplicação utilizou o Antigravity IDE com inteligência artificial como ferramenta de apoio durante o planejamento arquitetural e estruturação do projeto.

### Prompt utilizado:
> *"Crie uma aplicação React + Vite para o Desafio 02: Painel Interativo com API Pública. A aplicação deve consumir uma base pública de dados de países para consulta e comparação. Requisitos: 1) Utilizar HTML5 semântico (header, nav, main, search, section, article, figure, dl, dt, dd, aside, footer) evitando divs desnecessárias; 2) Componentização modular; 3) Funcionalidades interativas com busca em tempo real sem distinção de acentos, filtros por continente e sub-região, ordenação dinâmica, favoritos persistidos em localStorage, modal de detalhes com fronteiras navegáveis e comparador de até 4 países lado a lado; 4) Design responsivo com Vanilla CSS e suporte a tema claro e escuro; 5) Tratamento de estados de carregamento e lista vazia."*

### Objetivo:
O prompt foi utilizado para estruturar a arquitetura inicial do projeto em React, estabelecer a semântica adequada dos elementos HTML e agilizar a criação dos filtros e da lógica de comparação de dados.

---

## Licenca

Projeto desenvolvido para fins educacionais e de avaliação prática.
