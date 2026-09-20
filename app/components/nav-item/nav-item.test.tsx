import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import { NavItem } from "~/components/nav-item/nav-item";

function renderNavItem(currentPath: string, props?: { "aria-label"?: string }) {
  render(
    <MemoryRouter initialEntries={[currentPath]}>
      <NavItem to="/habilidades" {...props}>
        Habilidades
      </NavItem>
    </MemoryRouter>,
  );
  return screen.getByRole("link", { name: /habilidades/i });
}

describe("NavItem", () => {
  it("renderiza um link com o texto e o destino informados", () => {
    const link = renderNavItem("/");

    expect(link).toHaveTextContent("Habilidades");
    expect(link).toHaveAttribute("href", "/habilidades");
  });

  it("não fica ativo quando a rota atual é outra", () => {
    const link = renderNavItem("/contato");

    expect(link).toHaveClass("nav-item");
    expect(link).not.toHaveClass("nav-item--active");
    expect(link).not.toHaveAttribute("aria-current");
  });

  it("fica ativo e marca a página atual quando a rota corresponde", () => {
    const link = renderNavItem("/habilidades");

    expect(link).toHaveClass("nav-item", "nav-item--active");
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("repassa as props do elemento nativo", () => {
    const link = renderNavItem("/", { "aria-label": "Ver habilidades" });

    expect(link).toHaveAccessibleName("Ver habilidades");
  });
});
