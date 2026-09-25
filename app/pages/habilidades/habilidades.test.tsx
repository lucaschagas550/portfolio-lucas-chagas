import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import Habilidades, { meta } from "~/pages/habilidades/habilidades";

function renderPage(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Habilidades />
    </MemoryRouter>,
  );
}

describe("Habilidades", () => {
  it("exibe o título principal da página", () => {
    renderPage("/habilidades");

    expect(
      screen.getByRole("heading", { level: 1, name: "Habilidades" }),
    ).toBeInTheDocument();
  });

  it("define título e descrição da página", () => {
    expect(meta({ location: { pathname: "/habilidades" } })).toEqual([
      { title: "Habilidades | Lucas Chagas" },
      {
        name: "description",
        content: "Tecnologias e habilidades de Lucas Chagas.",
      },
    ]);
  });

  it("exibe o título em inglês em /en/habilidades", () => {
    renderPage("/en/habilidades");

    expect(
      screen.getByRole("heading", { level: 1, name: "Skills" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Under construction.")).toBeInTheDocument();
  });

  it("define título e descrição em inglês em /en/habilidades", () => {
    expect(meta({ location: { pathname: "/en/habilidades" } })).toEqual([
      { title: "Skills | Lucas Chagas" },
      {
        name: "description",
        content: "Technologies and skills of Lucas Chagas.",
      },
    ]);
  });
});
