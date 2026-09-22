import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home, { meta } from "~/pages/home/home";

describe("Home", () => {
  it("exibe o título principal da página", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Lucas Chagas" }),
    ).toBeInTheDocument();
  });

  it("define título e descrição da página", () => {
    expect(meta()).toEqual([
      { title: "Lucas Chagas | Portfólio" },
      { name: "description", content: "Portfólio de Lucas Chagas." },
    ]);
  });

  it("exibe a foto de perfil", () => {
    render(<Home />);

    expect(screen.getByAltText("Lucas Chagas")).toBeInTheDocument();
  });

  it("exibe os links de redes sociais", () => {
    render(<Home />);

    expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Email" })).toBeInTheDocument();
  });

  it("exibe a seção sobre mim com a descrição", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Sobre mim" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/6 anos de experiência em desenvolvimento/),
    ).toBeInTheDocument();
  });

  it("exibe a lista de tecnologias", () => {
    render(<Home />);

    const list = screen.getByRole("list", { name: "Tecnologias" });
    expect(within(list).getByText("React")).toBeInTheDocument();
    expect(within(list).getByText("Azure")).toBeInTheDocument();
  });
});
