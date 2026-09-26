import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import Historia, { meta } from "~/pages/historia/historia";

function renderPage(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Historia />
    </MemoryRouter>,
  );
}

function companies(region: HTMLElement) {
  return within(region)
    .getAllByRole("heading", { level: 3 })
    .map((heading) => heading.textContent);
}

describe("Historia", () => {
  it("exibe o título principal da página", () => {
    renderPage("/historia");

    expect(
      screen.getByRole("heading", { level: 1, name: "História" }),
    ).toBeInTheDocument();
  });

  it("mostra a escada de cargos, de estagiário a sênior", () => {
    renderPage("/historia");

    const ladder = screen.getByRole("list", { name: "Evolução de cargos" });
    const steps = within(ladder).getAllByRole("listitem");
    expect(steps).toHaveLength(5);
    expect(steps[0]).toHaveTextContent("Estagiário2019");
    expect(steps[4]).toHaveTextContent("Sênior2026");
  });

  it("conta a trajetória do mais recente ao mais antigo, com a formação como marco", () => {
    renderPage("/historia");

    const timeline = screen.getByRole("region", { name: "Trajetória" });
    expect(companies(timeline)).toEqual([
      "Fagron Tech",
      "Pós-graduação lato sensu em Engenharia de Software",
      "Montreal",
      "Instituto de Pesquisas Eldorado",
      "Inobag",
      "Bacharelado em Ciência da Computação",
      "Taker IT",
      "ELIS",
      "Cogna Educação",
    ]);
  });

  it("marca o emprego atual e formata os períodos", () => {
    renderPage("/historia");

    const timeline = screen.getByRole("region", { name: "Trajetória" });
    expect(within(timeline).getAllByText("Atual")).toHaveLength(1);
    expect(within(timeline).getByText("jan 2026 – hoje")).toBeInTheDocument();
    expect(
      within(timeline).getByText("dez 2023 – jan 2026"),
    ).toBeInTheDocument();
  });

  it("indica atuação remota ou híbrida nas empresas informadas", () => {
    renderPage("/historia");

    const items = within(
      screen.getByRole("region", { name: "Trajetória" }),
    ).getAllByRole("listitem");
    const itemOf = (company: string) =>
      items.find((item) =>
        within(item).queryByRole("heading", { level: 3, name: company }),
      ) as HTMLElement;

    for (const company of [
      "Fagron Tech",
      "Montreal",
      "Instituto de Pesquisas Eldorado",
    ]) {
      expect(within(itemOf(company)).getByText("Remoto")).toBeInTheDocument();
    }
    for (const company of ["Inobag", "Taker IT"]) {
      expect(within(itemOf(company)).getByText("Híbrido")).toBeInTheDocument();
    }
    expect(within(itemOf("ELIS")).queryByText(/Remoto|Híbrido/)).toBeNull();
    expect(screen.getAllByText("Remoto")).toHaveLength(3);
    expect(screen.getAllByText("Híbrido")).toHaveLength(2);
  });

  it("destaca as conquistas com números do Eldorado", () => {
    renderPage("/historia");

    const lists = screen.getAllByRole("list", { name: "Conquistas" });
    const eldorado = lists.find((list) => within(list).queryByText("94%"));
    expect(eldorado).toBeDefined();
    const items = within(eldorado as HTMLElement).getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("94% de cobertura de testes");
    expect(items[1]).toHaveTextContent("10× mais rápido");
    expect(items[2]).toHaveTextContent("10/10 foi a nota do cliente");
  });

  it("recolhe as tecnologias de cada empresa com o total no botão", () => {
    const { container } = renderPage("/historia");

    // Um <details> por empresa de tecnologia; antes da tecnologia não há stack.
    expect(container.querySelectorAll("details")).toHaveLength(7);
    expect(
      screen.getByText("Tecnologias usadas (7)", { selector: "summary" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText("Tecnologias usadas (20)", { selector: "summary" }),
    ).toHaveLength(2);
  });

  it("conta o que veio antes da tecnologia", () => {
    renderPage("/historia");

    const before = screen.getByRole("region", { name: "Antes da tecnologia" });
    expect(companies(before)).toEqual(["Exército Brasileiro", "Grupo Astra"]);
    expect(within(before).getByText(/honra ao mérito/)).toBeInTheDocument();
  });

  it("define título e descrição da página", () => {
    expect(meta({ location: { pathname: "/historia" } })).toEqual([
      { title: "História | Lucas Chagas" },
      {
        name: "description",
        content: "A trajetória profissional de Lucas Chagas.",
      },
    ]);
  });

  it("exibe a página em inglês em /en/historia", () => {
    renderPage("/en/historia");

    expect(
      screen.getByRole("heading", { level: 1, name: "Story" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: "Career progression" }),
    ).toBeInTheDocument();
    const timeline = screen.getByRole("region", { name: "Career path" });
    expect(
      within(timeline).getByText("Jan 2026 – present"),
    ).toBeInTheDocument();
    expect(within(timeline).getByText("Current")).toBeInTheDocument();
    expect(within(timeline).getAllByText("Remote")).toHaveLength(3);
    expect(within(timeline).getAllByText("Hybrid")).toHaveLength(2);
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Bachelor's degree in Computer Science",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Before tech" }),
    ).toBeInTheDocument();
  });

  it("define título e descrição em inglês em /en/historia", () => {
    expect(meta({ location: { pathname: "/en/historia" } })).toEqual([
      { title: "Story | Lucas Chagas" },
      {
        name: "description",
        content: "The professional journey of Lucas Chagas.",
      },
    ]);
  });
});
