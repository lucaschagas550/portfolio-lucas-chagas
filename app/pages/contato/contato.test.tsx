import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import Contato, { meta } from "~/pages/contato/contato";

function renderPage(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Contato />
    </MemoryRouter>,
  );
}

describe("Contato", () => {
  it("exibe o título principal da página", () => {
    renderPage("/contato");

    expect(
      screen.getByRole("heading", { level: 1, name: "Contato" }),
    ).toBeInTheDocument();
  });

  it("define título e descrição da página", () => {
    expect(meta({ location: { pathname: "/contato" } })).toEqual([
      { title: "Contato | Lucas Chagas" },
      {
        name: "description",
        content: "Entre em contato com Lucas Chagas.",
      },
    ]);
  });

  it("exibe o título em inglês em /en/contato", () => {
    renderPage("/en/contato");

    expect(
      screen.getByRole("heading", { level: 1, name: "Contact" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Under construction.")).toBeInTheDocument();
  });

  it("define título e descrição em inglês em /en/contato", () => {
    expect(meta({ location: { pathname: "/en/contato" } })).toEqual([
      { title: "Contact | Lucas Chagas" },
      {
        name: "description",
        content: "Get in touch with Lucas Chagas.",
      },
    ]);
  });
});
