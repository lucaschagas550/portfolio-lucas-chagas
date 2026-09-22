import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import { Navbar } from "~/components/navbar/navbar";

function renderNavbar(currentPath = "/") {
  return render(
    <MemoryRouter initialEntries={[currentPath]}>
      <Navbar />
    </MemoryRouter>,
  );
}

const getToggle = () =>
  screen.getByRole("button", { name: /(abrir|fechar) menu/i });
const getMenu = () => screen.getByRole("navigation", { name: "Principal" });
const getLink = (name: string) => screen.getByRole("link", { name });

describe("Navbar", () => {
  it("expõe a navegação principal", () => {
    renderNavbar();

    expect(getMenu()).toBeInTheDocument();
  });

  it("lista Início, Habilidades, História e Contato, nessa ordem, com seus destinos", () => {
    renderNavbar();

    const links = within(getMenu()).getAllByRole("link");

    expect(links.map((link) => link.textContent)).toEqual([
      "Início",
      "Habilidades",
      "História",
      "Contato",
    ]);
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/",
      "/habilidades",
      "/historia",
      "/contato",
    ]);
  });

  it("marca apenas o link da página atual", () => {
    renderNavbar("/historia");

    expect(getLink("História")).toHaveAttribute("aria-current", "page");
    for (const label of ["Início", "Habilidades", "Contato"]) {
      expect(getLink(label)).not.toHaveAttribute("aria-current");
    }
  });

  it("marca Início quando a rota atual é a página inicial", () => {
    renderNavbar("/");

    expect(getLink("Início")).toHaveAttribute("aria-current", "page");
    for (const label of ["Habilidades", "História", "Contato"]) {
      expect(getLink(label)).not.toHaveAttribute("aria-current");
    }
  });

  it("não marca Início fora da página inicial", () => {
    renderNavbar("/contato");

    expect(getLink("Início")).not.toHaveAttribute("aria-current");
  });

  it("move a marcação para o link clicado", async () => {
    const user = userEvent.setup();
    renderNavbar("/habilidades");

    await user.click(getLink("Contato"));

    expect(getLink("Contato")).toHaveAttribute("aria-current", "page");
    expect(getLink("Habilidades")).not.toHaveAttribute("aria-current");
  });
});

describe("Navbar (drawer no celular)", () => {
  it("começa com o menu fechado", () => {
    renderNavbar();

    expect(getToggle()).toHaveAccessibleName("Abrir menu");
    expect(getToggle()).toHaveAttribute("aria-expanded", "false");
    expect(getMenu()).not.toHaveClass("navbar__nav--open");
  });

  it("exibe o título Menu dentro do drawer", () => {
    renderNavbar();

    expect(within(getMenu()).getByText("Menu")).toBeInTheDocument();
  });

  it("abre e fecha o menu pelo botão", async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(getToggle());

    expect(getToggle()).toHaveAccessibleName("Fechar menu");
    expect(getToggle()).toHaveAttribute("aria-expanded", "true");
    expect(getMenu()).toHaveClass("navbar__nav--open");

    await user.click(getToggle());

    expect(getToggle()).toHaveAccessibleName("Abrir menu");
    expect(getToggle()).toHaveAttribute("aria-expanded", "false");
    expect(getMenu()).not.toHaveClass("navbar__nav--open");
  });

  it("aponta o botão para o menu que ele controla", () => {
    renderNavbar();

    expect(getMenu()).toHaveAttribute(
      "id",
      getToggle().getAttribute("aria-controls"),
    );
  });

  it("fecha o menu ao clicar em um link", async () => {
    const user = userEvent.setup();
    renderNavbar();
    await user.click(getToggle());

    await user.click(getLink("História"));

    expect(getToggle()).toHaveAttribute("aria-expanded", "false");
    expect(getMenu()).not.toHaveClass("navbar__nav--open");
  });

  it("fecha o menu com Esc e devolve o foco ao botão", async () => {
    const user = userEvent.setup();
    renderNavbar();
    await user.click(getToggle());

    await user.keyboard("{Escape}");

    expect(getToggle()).toHaveAttribute("aria-expanded", "false");
    expect(getToggle()).toHaveFocus();
  });

  it("fecha o menu ao clicar no fundo escurecido", async () => {
    const user = userEvent.setup();
    const { container } = renderNavbar();
    await user.click(getToggle());

    // O fundo é aria-hidden (decorativo), por isso não é acessível por role.
    const backdrop = container.querySelector(".navbar__backdrop");
    expect(backdrop).toBeInTheDocument();
    await user.click(backdrop as Element);

    expect(getToggle()).toHaveAttribute("aria-expanded", "false");
    expect(
      container.querySelector(".navbar__backdrop"),
    ).not.toBeInTheDocument();
  });
});
