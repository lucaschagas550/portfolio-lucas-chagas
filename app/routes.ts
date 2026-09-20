import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/home/home.tsx"),
  route("habilidades", "pages/habilidades/habilidades.tsx"),
  route("historia", "pages/historia/historia.tsx"),
  route("contato", "pages/contato/contato.tsx"),
] satisfies RouteConfig;
