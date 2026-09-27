import { type RouteConfig, index, route } from "@react-router/dev/routes";

import { pages } from "./data/pages";

// O mesmo módulo de página atende os dois idiomas; o idioma vem da URL
// (/ = português, /en = inglês). Por isso cada rota precisa de um id único.
const localizedRoutes = pages.flatMap(({ id, path, file }) => {
  const segment = path.slice(1);

  return [
    segment ? route(segment, file, { id }) : index(file, { id }),
    route(segment ? `en/${segment}` : "en", file, { id: `en-${id}` }),
  ];
});

export default [
  ...localizedRoutes,
  route("sitemap.xml", "pages/sitemap/sitemap.ts"),
  route("robots.txt", "pages/robots/robots.ts"),
  route(
    ".well-known/appspecific/com.chrome.devtools.json",
    "pages/devtools/devtools.ts",
  ),
  // Qualquer outro endereço: página 404 dentro do layout, nos dois idiomas.
  route("*", "pages/not-found/not-found.tsx"),
] satisfies RouteConfig;
