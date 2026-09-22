# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Visão geral

Portfólio pessoal (Lucas Chagas) construído a partir do template padrão do **React Router v8 (framework mode)** com SSR, React 19, TypeScript estrito, CSS próprio (BEM, sem frameworks de CSS) e Vite. As páginas ainda são placeholders ("Em construção") e devem receber o conteúdo real do portfólio.

## Comandos

```bash
npm install          # instalar dependências
npm run dev          # dev server com HMR em http://localhost:5173
npm run build        # gera build/client (estáticos) e build/server (SSR)
npm run start        # serve o build de produção (react-router-serve), porta 3000 por padrão
npm run typecheck    # react-router typegen && tsc  (gera os tipos das rotas antes de checar)
npm run lint         # ESLint (lint:fix aplica correções automáticas)
npm run format       # Prettier --write (format:check só verifica)
npm run test         # Vitest, execução única (test:watch para modo watch)
npx vitest run app/components/nav-item/nav-item.test.tsx -t "nome do teste"   # um único arquivo/teste
docker build -t portfolio . && docker run -p 3000:3000 portfolio
```

- **Lint e formatação**: [eslint.config.js](eslint.config.js) (flat config: `typescript-eslint`, `react`, `react-hooks`, `jsx-a11y`; `eslint-config-prettier` por último para não conflitar) e [.prettierrc](.prettierrc). O ESLint está fixado na série **9** porque `eslint-plugin-jsx-a11y` ainda não suporta a 10 — não atualize sem checar os peers. Rode `npm run typecheck`, `npm run lint`, `npm run format:check` e `npm run test` antes de concluir qualquer mudança.
- **Testes**: **Vitest + React Testing Library** (`jsdom`, `@testing-library/jest-dom`, `@testing-library/user-event`). A config fica em [vitest.config.ts](vitest.config.ts), **separada** do `vite.config.ts` (o plugin `reactRouter()` não deve rodar nos testes), e [vitest.setup.ts](vitest.setup.ts) registra os matchers do jest-dom e o `cleanup`. Não há `globals`: importe `describe`, `it` e `expect` de `vitest`. Só arquivos `app/**/*.test.{ts,tsx}` são executados.

## Arquitetura

- **Roteamento por configuração, não por arquivos**: as rotas são declaradas em [app/routes.ts](app/routes.ts) (`RouteConfig`; o nome e o local desse arquivo são exigidos pelo React Router). As páginas ficam em `app/pages/<nome>/<nome>.tsx`, mas criar uma página **não** a registra — é preciso adicioná-la em `routes.ts` (ex.: `route("historia", "pages/historia/historia.tsx")`).
- **Tipos de rota gerados**: cada módulo de rota importa `Route` de `./+types/<nome>` (ex.: `import type { Route } from "./+types/home"`). Esses tipos são gerados em `.react-router/types/` por `react-router typegen` (já executado por `dev` e `typecheck`). Se o TypeScript reclamar de `+types/...` inexistente, rode `npm run typecheck` ou `npx react-router typegen`. `.react-router/` é gerado — nunca editar.
- **[app/root.tsx](app/root.tsx)** é o layout raiz: `Layout` (shell HTML com `<Meta/>`, `<Links/>`, `<Scripts/>`, viewport meta), `App` (`<Navbar/>` + `<Outlet/>`) e `ErrorBoundary` global. A fonte (Roboto, pesos 400/500/700 + itálico 400, via Google Fonts) é declarada em `links` e aplicada pelo token `--font-sans` em `app.css`; para usar outro peso, adicione-o na URL em `links`.
- **Módulos de rota** exportam por convenção `default` (componente), `meta`, `links`, e opcionalmente `loader`/`action` (server) e `clientLoader`/`clientAction`. Dados devem vir de `loader`, não de `useEffect`.
- **SSR ligado** em [react-router.config.ts](react-router.config.ts) (`ssr: true`). Para virar SPA/estático, mude para `false` (isso invalida o uso de `loader`/`action` de servidor).
- **Alias `~/*` → `app/*`** (tsconfig + `resolve.tsconfigPaths` no Vite). Prefira `~/components/...` a caminhos relativos longos.
- **CSS**: escrito à mão em BEM, sem Tailwind — ver seção _CSS (BEM, sem Tailwind)_. Tokens globais e reset em [app/app.css](app/app.css).
- **Build/deploy**: Dockerfile multi-stage (Node 24 alpine); a imagem final roda `npm run start` sobre `build/`.
- `verbatimModuleSyntax` está ativo: use `import type { ... }` para importações que são apenas tipos.

## Princípios de código

Aplique com bom senso ao tamanho do projeto — é um portfólio, não um sistema corporativo. Na dúvida, prefira a solução mais simples.

- **KISS**: sem abstrações, camadas ou bibliotecas "para o futuro". Prefira componentes funcionais simples, estado local e recursos nativos do React Router (`loader`, `Form`, `Link`) antes de adicionar gerenciadores de estado ou de dados.
- **DRY**: extraia componentes/hooks/constantes na **segunda ou terceira** repetição real, não antes. Conteúdo do portfólio (projetos, skills, experiências, links sociais) deve viver em dados tipados (ex.: `app/data/*.ts`) e ser renderizado por componentes, não copiado no JSX. Valor de CSS repetido (cor, espaçamento, raio) → token `var(--...)` em `app.css`; bloco de estilo repetido → novo bloco BEM reutilizável.
- **SOLID** (aplicado a React):
  - _SRP_: um componente/hook faz uma coisa; separar apresentação (componentes) de dados (`loader`/`app/data`) e de lógica (hooks/funções puras em `app/utils`).
  - _OCP_: componentes extensíveis por props/`children`/variantes, sem editar o interior a cada novo caso.
  - _LSP_: componentes que envolvem elementos nativos devem aceitar e repassar as props do elemento (`React.ComponentProps<"button">`) sem quebrar seu comportamento.
  - _ISP_: props mínimas e específicas; não passe um objeto gigante quando o componente usa dois campos.
  - _DIP_: componentes dependem de props/interfaces, não de fontes de dados concretas (fetch, arquivos) — isso também facilita testar.
- **YAGNI**, nomes descritivos, funções pequenas, sem `any` (o projeto é `strict`), sem código comentado ou morto.
- **Componentes: uma pasta por componente** em `app/components/<nome>/`, contendo `<nome>.tsx`, `<nome>.css` e `<nome>.test.tsx` (ex.: `app/components/nav-item/nav-item.tsx`, `nav-item.css`, `nav-item.test.tsx`). Nomes com mais de uma palavra usam `kebab-case` na pasta e nos arquivos (`nav-item`) e `PascalCase` no componente (`NavItem`). Importe com o caminho completo, `~/components/<nome>/<nome>` — sem arquivos barrel (`index.ts`). Um componente que use outro importa da pasta dele (`~/components/nav-item/nav-item`). O nome deve dizer o **papel** do componente (ex.: `NavItem` é um link de navegação, não um "botão").
- **Páginas: uma pasta por página** em `app/pages/<nome>/`, com `<nome>.tsx` (módulo de rota: componente default + `meta`, e `loader`/`action` se houver) e `<nome>.test.tsx` (ex.: `app/pages/historia/historia.tsx`). Estilo específico da página, se existir, vai em `<nome>/<nome>.css` com bloco BEM próprio; o bloco `page` compartilhado fica em `app/pages/page.css` e é importado como `~/pages/page.css`.
- Organização sugerida ao crescer: `app/components/` (UI reutilizável, seguindo a regra acima), `app/pages/` (seguindo a regra acima), `app/data/`, `app/utils/`, `app/hooks/`. Código exclusivo de servidor usa o sufixo `.server.ts` (ou pasta `.server/`), exclusivo de cliente `.client.ts`.

## CSS (BEM, sem Tailwind)

**Não use Tailwind nem CSS utility-first** — ele foi removido do projeto. Todo CSS é escrito por nós, no padrão **BEM** (Block, Element, Modifier).

- **Nomenclatura**: `.bloco`, `.bloco__elemento`, `.bloco--modificador`, em `kebab-case`. Exemplo: `.navbar`, `.navbar__list`, `.nav-item--active`. Nunca encadeie elementos (`.bloco__a__b` é errado — use `.bloco__b`). Um elemento não depende do bloco pai no seletor (`.navbar .nav-item` é errado).
- **Um arquivo `.css` por componente**, dentro da pasta do componente e com o mesmo nome do `.tsx` (`nav-item/nav-item.tsx` + `nav-item/nav-item.css`), importado no próprio componente (`import "./nav-item.css"`). Cada arquivo define o seu bloco. Estilos compartilhados de página ficam em `app/pages/page.css`.
- **Seletores**: só de classe. Sem `#id`, sem seletor de tag dentro de blocos, sem `!important`, sem aninhamento profundo. Estados de componente via modificador (`.nav-item--active`), aplicado no JSX.
- **Tokens**: cores, espaçamentos, raios, fontes e larguras vêm de custom properties em `:root` ([app/app.css](app/app.css)) — nunca valores literais repetidos. Adicione o token em vez de repetir o valor.
- **Tema escuro**: redefina os tokens dentro de `@media (prefers-color-scheme: dark)` em `app.css`; componentes usam só `var(--...)`, sem regras de dark mode próprias.
- **Mobile-first**: estilo base para telas pequenas, ampliado com `@media (min-width: ...)` usando **somente** os breakpoints da tabela abaixo (`48rem`, `64rem`, `90rem`). Não use `max-width` em media queries.

### Breakpoints (dispositivos)

| Dispositivo    | Largura   | Como escrever                |
| -------------- | --------- | ---------------------------- |
| **Celular**    | até 767px | estilo base, sem media query |
| **Tablet**     | ≥ 768px   | `@media (min-width: 48rem)`  |
| **Notebook**   | ≥ 1024px  | `@media (min-width: 64rem)`  |
| **Computador** | ≥ 1440px  | `@media (min-width: 90rem)`  |

Custom properties não funcionam em `@media`, por isso os valores são literais em `rem`; a mesma tabela está no topo de [app/app.css](app/app.css) — se um valor mudar, altere os dois lugares e todos os `.css`. Não invente outros breakpoints: se um layout quebra entre dois deles, ajuste o componente (`flex-wrap`, `minmax()`, `clamp()`), não crie um novo valor.

## Responsividade e acessibilidade (obrigatório)

- **Mobile-first**: a base é para telas pequenas e a ampliação vem de media queries `min-width` (ver seção _CSS_). Não use larguras fixas em px que causem scroll horizontal; prefira `max-width`, `width: 100%`, `flex`/`grid`, `gap` e unidades relativas (`rem`, `%`).
- O `<meta name="viewport">` já está no `Layout` — não removê-lo.
- Toda UI nova deve ser verificada em **360px** (celular), **768px** (tablet), **1024px** (notebook) e **1440px** (computador), e nos temas claro e escuro. Confira também 767px, a última largura de celular.
- **Navbar**: o menu tem 4 itens — **Início** (`/`, primeiro; usa `end: true` no `NavLink`/`NavItem` para não ficar ativo em outras rotas), Habilidades, História e Contato. O hover dos itens (links e botão do menu) muda a cor para `--color-hover` (`#5000ca`; no tema escuro um tom mais claro do mesmo roxo, por contraste). No celular o menu é um **drawer** (botão "Abrir menu" + painel pela direita, com o título "Menu", itens centralizados e fundo escurecido); do tablet em diante são os links em linha. O layout é decidido só pelo CSS — o estado React (`isOpen`) apenas alterna a classe `navbar__nav--open`; **não use `matchMedia`/JS para breakpoints**. O drawer fecha ao clicar num link, no fundo ou com Esc.
- Alvos de toque ≥ 44px, texto legível sem zoom, imagens com `alt`, dimensões (`width`/`height`) ou `aspect-ratio` para evitar layout shift e `loading="lazy"` abaixo da dobra.
- HTML semântico (`header`, `nav`, `main`, `section`, `footer`, hierarquia de `h1`–`h6`), foco visível, contraste adequado e navegação por teclado. Cada rota define `meta` com `title` e `description`.

## Testes

- **Testes são obrigatórios.** Todo componente **e toda página** novos **ou alterados** devem ter testes unitários no mesmo commit — sem testes, a tarefa **não está concluída**. O teste fica na pasta do componente/página, com o nome `<nome>.test.tsx` (ver estrutura em _Princípios de código_). Bug corrigido ganha um teste de regressão que falha sem a correção. O mesmo vale para funções em `app/utils`, hooks e páginas com `loader`/`action`. Em páginas, teste ao menos o `h1` e o `meta()` (título e descrição).
- Teste **comportamento visível ao usuário** (`getByRole`, `getByText`, `toHaveAccessibleName`), não detalhes de implementação. Componentes que dependem do roteador são renderizados dentro de `MemoryRouter` (`react-router`), controlando a rota atual com `initialEntries`; interações usam `userEvent`. Funções puras em `app/utils` e dados/transformações têm testes unitários; fluxos críticos (navegação, formulário de contato) podem ter E2E com Playwright.
- Para testar responsividade, cubra a lógica que muda por breakpoint (ex.: menu mobile abre/fecha) em testes de componente e valide o layout em E2E com diferentes viewports.
- Componentes recebem dados por props para poderem ser testados sem rede; rotas com `loader` são testadas com `createRoutesStub` do `react-router`.
- Antes de considerar uma tarefa concluída: `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm run test` e `npm run build` devem passar.
