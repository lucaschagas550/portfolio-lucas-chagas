// Fonte única das páginas do site: consumida por routes.ts e pelo Navbar.
// `path` é o caminho em português; a versão em inglês recebe o prefixo /en.
export const pages = [
  { id: "home", path: "/", file: "pages/home/home.tsx" },
  {
    id: "habilidades",
    path: "/habilidades",
    file: "pages/habilidades/habilidades.tsx",
  },
  { id: "historia", path: "/historia", file: "pages/historia/historia.tsx" },
  { id: "contato", path: "/contato", file: "pages/contato/contato.tsx" },
] as const;

export type PageId = (typeof pages)[number]["id"];
