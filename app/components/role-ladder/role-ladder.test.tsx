import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RoleLadder } from "~/components/role-ladder/role-ladder";

describe("RoleLadder", () => {
  const steps = [
    { title: "Estagiário", year: 2019 },
    { title: "Pleno", year: 2022 },
    { title: "Sênior", year: 2026 },
  ];

  it("exibe os cargos em uma lista ordenada e nomeada", () => {
    render(<RoleLadder steps={steps} label="Evolução de cargos" />);

    const list = screen.getByRole("list", { name: "Evolução de cargos" });
    expect(list.tagName).toBe("OL");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent("Estagiário2019");
    expect(items[2]).toHaveTextContent("Sênior2026");
  });

  it("destaca só o último degrau, o cargo atual", () => {
    render(<RoleLadder steps={steps} label="Evolução de cargos" />);

    const items = screen.getAllByRole("listitem");
    expect(items[2]).toHaveClass("role-ladder__step--current");
    expect(items[0]).not.toHaveClass("role-ladder__step--current");
  });

  it("informa ao CSS a posição de cada degrau e o total", () => {
    render(<RoleLadder steps={steps} label="Evolução de cargos" />);

    expect(screen.getByRole("list")).toHaveStyle({
      "--role-ladder-steps": "3",
    });
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveStyle({ "--role-ladder-step": "1" });
    expect(items[2]).toHaveStyle({ "--role-ladder-step": "3" });
  });
});
