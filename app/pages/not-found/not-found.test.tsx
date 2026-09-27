import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import NotFound, { loader, meta } from "~/pages/not-found/not-found";

function renderPage(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <NotFound />
    </MemoryRouter>,
  );
}

describe("NotFound", () => {
  it("exibe o título principal da página", () => {
    renderPage("/rota-inexistente");

    expect(
      screen.getByRole("heading", { level: 1, name: "Página não encontrada" }),
    ).toBeInTheDocument();
  });

  it("explica que o endereço acessado não existe", () => {
    renderPage("/rota-inexistente");

    expect(
      screen.getByText(
        "Não existe nenhuma página em /rota-inexistente. O link pode estar desatualizado ou ter um erro de digitação.",
      ),
    ).toBeInTheDocument();
  });

  it("lista as páginas do portfólio com a descrição de cada uma", () => {
    renderPage("/rota-inexistente");

    const list = screen.getByRole("region", { name: "Páginas do portfólio" });
    const links = within(list).getAllByRole("link");

    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/",
      "/habilidades",
      "/historia",
      "/contato",
    ]);
    expect(
      within(list).getByRole("link", {
        name: "História Trajetória profissional, do estágio a sênior",
      }),
    ).toHaveAttribute("href", "/historia");
  });

  it("exibe a página em inglês com links em /en", () => {
    renderPage("/en/missing");

    expect(
      screen.getByRole("heading", { level: 1, name: "Page not found" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "There is no page at /en/missing. The link may be out of date or contain a typo.",
      ),
    ).toBeInTheDocument();

    const list = screen.getByRole("region", { name: "Portfolio pages" });

    expect(
      within(list)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href")),
    ).toEqual(["/en", "/en/habilidades", "/en/historia", "/en/contato"]);
  });

  it("define título, descrição e noindex", () => {
    expect(meta({ location: { pathname: "/rota-inexistente" } })).toEqual([
      { title: "Página não encontrada | Lucas Chagas" },
      {
        name: "description",
        content:
          "O endereço acessado não corresponde a nenhuma página do portfólio de Lucas Chagas.",
      },
      { name: "robots", content: "noindex" },
    ]);
  });

  it("define título e descrição em inglês em /en", () => {
    expect(meta({ location: { pathname: "/en/missing" } })).toEqual([
      { title: "Page not found | Lucas Chagas" },
      {
        name: "description",
        content:
          "The address you opened doesn't match any page in Lucas Chagas' portfolio.",
      },
      { name: "robots", content: "noindex" },
    ]);
  });

  it("responde com status 404", () => {
    expect(loader().init?.status).toBe(404);
  });
});
