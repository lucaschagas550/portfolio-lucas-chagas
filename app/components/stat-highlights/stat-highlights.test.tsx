import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StatHighlights } from "~/components/stat-highlights/stat-highlights";

describe("StatHighlights", () => {
  const items = [
    { id: "years", value: 6, suffix: "+", label: "anos de experiência" },
    { id: "companies", value: 7, label: "empresas de tecnologia" },
  ];

  it("exibe os destaques em uma lista nomeada", () => {
    render(<StatHighlights items={items} label="Destaques" />);

    const list = screen.getByRole("list", { name: "Destaques" });
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
  });

  it("dá a cada destaque o texto completo, com o valor final", () => {
    render(<StatHighlights items={items} label="Destaques" />);

    const [years, companies] = screen.getAllByRole("listitem");
    expect(years).toHaveTextContent("6+ anos de experiência");
    expect(companies).toHaveTextContent("7 empresas de tecnologia");
  });

  it("passa o valor ao CSS e esconde o número animado dos leitores de tela", () => {
    render(<StatHighlights items={items} label="Destaques" />);

    const [years] = screen.getAllByRole("listitem");
    const animatedValue = years.querySelector(".stat-highlights__value");
    expect(animatedValue).toHaveAttribute("aria-hidden", "true");
    expect(animatedValue).toHaveStyle({ "--stat-value": "6" });
  });
});
