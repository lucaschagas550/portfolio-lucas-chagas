# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Visão geral

Portfólio pessoal (Lucas Chagas) construído a partir do template padrão do **React Router v8 (framework mode)** com SSR, React 19, TypeScript estrito, Tailwind CSS v4 e Vite. O conteúdo ainda é o do template (`app/welcome/`, título "New React Router App") e deve ser substituído pelo conteúdo real do portfólio.

## Comandos

```bash
npm install          # instalar dependências
npm run dev          # dev server com HMR em http://localhost:5173
npm run build        # gera build/client (estáticos) e build/server (SSR)
npm run start        # serve o build de produção (react-router-serve), porta 3000 por padrão
npm run typecheck    # react-router typegen && tsc  (gera os tipos das rotas antes de checar)
npm run lint         # ESLint (lint:fix aplica correções automáticas)
npm run format       # Prettier --write (format:check só verifica)
docker build -t portfolio . && docker run -p 3000:3000 portfolio
```

- **Lint e formatação**: [eslint.config.js](eslint.config.js) (flat config: `typescript-eslint`, `react`, `react-hooks`, `jsx-a11y`; `eslint-config-prettier` por último para não conflitar) e [.prettierrc](.prettierrc) (com `prettier-plugin-tailwindcss`, que ordena as classes usando `app/app.css`). O ESLint está fixado na série **9** porque `eslint-plugin-jsx-a11y` ainda não suporta a 10 — não atualize sem checar os peers. Rode `npm run typecheck`, `npm run lint` e `npm run format:check` antes de concluir qualquer mudança.
- **Não há test runner configurado** (nenhum script `test`, Vitest não instalado). Ao adicionar testes, use **Vitest + React Testing Library** (integra-se naturalmente ao Vite), adicione os scripts `test` e `test:watch` ao `package.json` e atualize esta seção com o comando para rodar um único teste (`npx vitest run caminho/arquivo.test.tsx -t "nome do teste"`).

## Arquitetura

- **Roteamento por configuração, não por arquivos**: as rotas são declaradas em [app/routes.ts](app/routes.ts) (`RouteConfig`). Criar um arquivo em `app/routes/` **não** o registra — é preciso adicioná-lo em `routes.ts`.
- **Tipos de rota gerados**: cada módulo de rota importa `Route` de `./+types/<nome>` (ex.: `import type { Route } from "./+types/home"`). Esses tipos são gerados em `.react-router/types/` por `react-router typegen` (já executado por `dev` e `typecheck`). Se o TypeScript reclamar de `+types/...` inexistente, rode `npm run typecheck` ou `npx react-router typegen`. `.react-router/` é gerado — nunca editar.
- **[app/root.tsx](app/root.tsx)** é o layout raiz: `Layout` (shell HTML com `<Meta/>`, `<Links/>`, `<Scripts/>`, viewport meta), `App` (`<Outlet/>`) e `ErrorBoundary` global. Fontes (Inter via Google Fonts) são declaradas em `links`.
- **Módulos de rota** exportam por convenção `default` (componente), `meta`, `links`, e opcionalmente `loader`/`action` (server) e `clientLoader`/`clientAction`. Dados devem vir de `loader`, não de `useEffect`.
- **SSR ligado** em [react-router.config.ts](react-router.config.ts) (`ssr: true`). Para virar SPA/estático, mude para `false` (isso invalida o uso de `loader`/`action` de servidor).
- **Alias `~/*` → `app/*`** (tsconfig + `resolve.tsconfigPaths` no Vite). Prefira `~/components/...` a caminhos relativos longos (o template ainda usa `../welcome/welcome`).
- **Tailwind v4**: configurado via plugin `@tailwindcss/vite` e `@import "tailwindcss"` em [app/app.css](app/app.css); tokens do tema ficam em `@theme` no próprio CSS (não existe `tailwind.config.js`). Dark mode segue `prefers-color-scheme` / variante `dark:`.
- **Build/deploy**: Dockerfile multi-stage (Node 24 alpine); a imagem final roda `npm run start` sobre `build/`.
- `verbatimModuleSyntax` está ativo: use `import type { ... }` para importações que são apenas tipos.

## Princípios de código

Aplique com bom senso ao tamanho do projeto — é um portfólio, não um sistema corporativo. Na dúvida, prefira a solução mais simples.

- **KISS**: sem abstrações, camadas ou bibliotecas "para o futuro". Prefira componentes funcionais simples, estado local e recursos nativos do React Router (`loader`, `Form`, `Link`) antes de adicionar gerenciadores de estado ou de dados.
- **DRY**: extraia componentes/hooks/constantes na **segunda ou terceira** repetição real, não antes. Conteúdo do portfólio (projetos, skills, experiências, links sociais) deve viver em dados tipados (ex.: `app/data/*.ts`) e ser renderizado por componentes, não copiado no JSX. Repetição de classes Tailwind → componente, não `@apply` em massa.
- **SOLID** (aplicado a React):
  - _SRP_: um componente/hook faz uma coisa; separar apresentação (componentes) de dados (`loader`/`app/data`) e de lógica (hooks/funções puras em `app/utils`).
  - _OCP_: componentes extensíveis por props/`children`/variantes, sem editar o interior a cada novo caso.
  - _LSP_: componentes que envolvem elementos nativos devem aceitar e repassar as props do elemento (`React.ComponentProps<"button">`) sem quebrar seu comportamento.
  - _ISP_: props mínimas e específicas; não passe um objeto gigante quando o componente usa dois campos.
  - _DIP_: componentes dependem de props/interfaces, não de fontes de dados concretas (fetch, arquivos) — isso também facilita testar.
- **YAGNI**, nomes descritivos, funções pequenas, sem `any` (o projeto é `strict`), sem código comentado ou morto.
- Organização sugerida ao crescer: `app/components/` (UI reutilizável), `app/routes/` (uma rota por arquivo), `app/data/`, `app/utils/`, `app/hooks/`. Código exclusivo de servidor usa o sufixo `.server.ts` (ou pasta `.server/`), exclusivo de cliente `.client.ts`.

## Responsividade e acessibilidade (obrigatório)

- **Mobile-first**: estilize a base para telas pequenas e amplie com breakpoints do Tailwind (`sm:`, `md:`, `lg:`, `xl:`). Não use larguras fixas em px que causem scroll horizontal; use `max-w-*`, `w-full`, `flex`/`grid`, `gap-*` e `container mx-auto`.
- O `<meta name="viewport">` já está no `Layout` — não removê-lo.
- Toda UI nova deve ser verificada em ~360px (celular), ~768px (tablet) e ≥1280px (desktop), e nos temas claro e escuro (`dark:`).
- Alvos de toque ≥ 44px, texto legível sem zoom, imagens com `alt`, dimensões (`width`/`height`) ou `aspect-*` para evitar layout shift e `loading="lazy"` abaixo da dobra.
- HTML semântico (`header`, `nav`, `main`, `section`, `footer`, hierarquia de `h1`–`h6`), foco visível, contraste adequado e navegação por teclado. Cada rota define `meta` com `title` e `description`.

## Testes

- Ainda não há testes; ao introduzir funcionalidade, adicione-os junto (ver setup Vitest + Testing Library na seção _Comandos_).
- Teste **comportamento visível ao usuário** (`getByRole`, `getByText`), não detalhes de implementação. Funções puras em `app/utils` e dados/transformações têm testes unitários; componentes interativos e rotas têm testes de componente; fluxos críticos (navegação, formulário de contato) podem ter E2E com Playwright.
- Para testar responsividade, cubra a lógica que muda por breakpoint (ex.: menu mobile abre/fecha) em testes de componente e valide o layout em E2E com diferentes viewports.
- Componentes recebem dados por props para poderem ser testados sem rede; rotas com `loader` são testadas com `createRoutesStub` do `react-router`.
- Antes de considerar uma tarefa concluída: `npm run typecheck`, `npm run lint`, `npm run format:check`, testes (quando existirem) e `npm run build` devem passar.
