import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import Home, { meta } from "~/pages/home/home";

function renderHome(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Home />
    </MemoryRouter>,
  );
}

describe("Home", () => {
  it("exibe o título principal da página", () => {
    renderHome();

    expect(
      screen.getByRole("heading", { level: 1, name: "Lucas Chagas" }),
    ).toBeInTheDocument();
  });

  it("define título e descrição da página", () => {
    expect(meta({ location: { pathname: "/" } })).toEqual([
      { title: "Lucas Chagas | Portfólio" },
      { name: "description", content: "Portfólio de Lucas Chagas." },
    ]);
  });

  it("exibe a foto de perfil", () => {
    renderHome();

    expect(screen.getByAltText("Lucas Chagas")).toBeInTheDocument();
  });

  it("exibe os links de redes sociais", () => {
    renderHome();

    expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Email" })).toBeInTheDocument();
  });

  it("oferece o download do currículo", () => {
    renderHome();

    expect(
      screen.getByRole("link", { name: "Baixar currículo" }),
    ).toHaveAttribute("href", "/curriculo-lucas-chagas.pdf");
  });

  it("exibe a seção sobre mim com a descrição", () => {
    renderHome();

    expect(
      screen.getByRole("heading", { level: 2, name: "Sobre mim" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/6 anos de experiência em desenvolvimento/),
    ).toBeInTheDocument();
  });

  it("exibe a lista de tecnologias", () => {
    renderHome();

    const list = screen.getByRole("list", { name: "Tecnologias" });
    expect(within(list).getByText("React")).toBeInTheDocument();
    expect(within(list).getByText("Azure")).toBeInTheDocument();
  });

  it("exibe a seção sobre mim e as tecnologias em inglês em /en", () => {
    renderHome("/en");

    expect(
      screen.getByRole("heading", { level: 2, name: "About me" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/6 years of experience in software development/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: "Technologies" }),
    ).toBeInTheDocument();
  });

  it("define título e descrição em inglês em /en", () => {
    expect(meta({ location: { pathname: "/en" } })).toEqual([
      { title: "Lucas Chagas | Portfolio" },
      { name: "description", content: "Lucas Chagas' portfolio." },
    ]);
  });
});
