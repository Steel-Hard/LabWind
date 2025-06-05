# LabWind Frontend

Este é o frontend do projeto **LabWind**, um painel meteorológico moderno e responsivo para visualização de dados ambientais, desenvolvido em React + TypeScript.

## Funcionalidades
- Visualização em tempo real de dados de sensores meteorológicos (temperatura, umidade, pressão, radiação solar, vento, etc.)
- Cards dinâmicos e responsivos para cada tipo de dado
- Alerta meteorológico em destaque
- Visualização do volume da barragem com animação
- Mapa interativo com localização da represa
- Previsão do tempo integrada
- Interface moderna, responsiva e personalizável

## Tecnologias Utilizadas
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build tool)
- [React Leaflet](https://react-leaflet.js.org/) (mapas)
- [FontAwesome](https://fontawesome.com/) (ícones)
- [Material UI](https://mui.com/) (alertas)
- [Tailwind CSS](https://tailwindcss.com/) (alguns utilitários)

## Estrutura de Pastas
- `src/components/` — Componentes reutilizáveis (cards, alertas, navegação, etc.)
- `src/pages/` — Páginas principais do app (Dashboard, Login, etc.)
- `src/services/` — Serviços para integração com APIs e backend
- `src/types/` — Tipos TypeScript compartilhados
- `src/utils/` — Utilitários e helpers

## Como rodar o projeto
1. Instale as dependências:
   ```sh
   npm install
   ```
2. Rode o projeto em modo desenvolvimento:
   ```sh
   npm run dev
   ```
3. Acesse em [http://localhost:5173](http://localhost:5173)

## Configuração
- As URLs das APIs e serviços estão configuradas nos arquivos em `src/services/`.
- Para customizar estilos, edite os arquivos em `src/components/WeatherCard/WeatherCard.css` e `src/styles/`.

---

Projeto desenvolvido por Equipe STEELHARD.
