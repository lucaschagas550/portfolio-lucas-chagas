# Portfólio — Lucas Chagas

Portfólio pessoal de Lucas Chagas, desenvolvedor full-stack especializado no ecossistema .NET. O site está em português (`/`) e inglês (`/en`), tem tema claro e escuro e é renderizado no servidor (SSR).

## Páginas

| Página      | Rota (PT / EN)                     | Conteúdo                                                      |
| ----------- | ---------------------------------- | ------------------------------------------------------------- |
| Início      | `/` · `/en`                        | Apresentação, redes sociais, currículo e tecnologias          |
| Habilidades | `/habilidades` · `/en/habilidades` | Especialidade .NET, competências, formação e cursos           |
| História    | `/historia` · `/en/historia`       | Linha do tempo da carreira, com conquistas e escada de cargos |
| Contato     | `/contato` · `/en/contato`         | E-mail em destaque (copiar/escrever) e outros canais          |

Endereços inexistentes caem numa página 404 dentro do layout, que responde com status 404 real. O site também gera `sitemap.xml` (com `hreflang`) e `robots.txt`.

## Stack

- [React Router v8](https://reactrouter.com/) em framework mode, com SSR
- React 19 e TypeScript em modo estrito
- Vite
- CSS escrito à mão no padrão [BEM](https://getbem.com/), mobile-first, sem frameworks de CSS. As animações são só CSS e respeitam `prefers-reduced-motion`.
- Vitest e React Testing Library
- ESLint (com `jsx-a11y`) e Prettier
- Docker (Node 24 Alpine)

## Como rodar

Use Node.js 24, a mesma versão da imagem Docker.

```bash
npm install
npm run dev        # http://localhost:5173
```

Build de produção:

```bash
npm run build
npm run start      # http://localhost:3000
```

Meça o desempenho (Lighthouse) sempre no build de produção, nunca no `npm run dev`.

## Scripts

| Comando                | O que faz                                              |
| ---------------------- | ------------------------------------------------------ |
| `npm run dev`          | Servidor de desenvolvimento com HMR                    |
| `npm run build`        | Gera `build/client` (estáticos) e `build/server` (SSR) |
| `npm run start`        | Serve o build de produção                              |
| `npm run typecheck`    | Gera os tipos das rotas e roda o `tsc`                 |
| `npm run lint`         | ESLint (`lint:fix` corrige o que for automático)       |
| `npm run format:check` | Confere a formatação (`format` aplica o Prettier)      |
| `npm run test`         | Roda os testes uma vez (`test:watch` em modo watch)    |

Antes de concluir qualquer mudança, `typecheck`, `lint`, `format:check`, `test` e `build` precisam passar.

## Estrutura

```
app/
├── components/   # um componente por pasta: <nome>.tsx, <nome>.css e <nome>.test.tsx
├── pages/        # uma página por pasta (módulo de rota + teste)
├── data/         # conteúdo tipado: carreira, habilidades, cursos, links…
├── i18n/         # idiomas: textos de interface (messages.ts) e useI18n()
├── utils/        # funções puras (datas, sitemap, classes CSS…)
├── routes.ts     # rotas, montadas a partir de data/pages.ts nos dois idiomas
├── root.tsx      # layout raiz (navbar, footer, tema, fonte)
└── app.css       # tokens (cores, espaçamentos, breakpoints), reset e base
public/           # favicon e currículo em PDF
```

- **Conteúdo** (experiências, habilidades, cursos) fica em `app/data/*.ts`, nunca fixo no JSX.
- **Textos de interface** ficam em `app/i18n/messages.ts`. O português define o tipo, e o inglês precisa ter as mesmas chaves.
- **Nova página**: crie `app/pages/<nome>/` e registre-a em `app/data/pages.ts`. Isso a coloca nas rotas, no menu e no sitemap.

As convenções completas (BEM, breakpoints, i18n, acessibilidade e testes) estão em [CLAUDE.md](CLAUDE.md).

## Deploy

```bash
docker build -t portfolio .
docker run -p 3000:3000 -e SITE_URL=https://seu-dominio portfolio
```

`SITE_URL` é o endereço público do site. O `sitemap.xml` e o `robots.txt` usam esse valor; sem ele, vale a origem da requisição, o que dá errado atrás de proxy.

Sem Docker, publique `package.json`, `package-lock.json` e a pasta `build/`, instale as dependências com `npm ci --omit=dev` e rode `npm run start`.
