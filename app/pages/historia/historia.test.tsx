import { render, screen } from "@testing-library/react";
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

describe("Historia", () => {
  it("exibe o título principal da página", () => {
    renderPage("/historia");

    expect(
      screen.getByRole("heading", { level: 1, name: "História" }),
    ).toBeInTheDocument();
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

  it("exibe o título em inglês em /en/historia", () => {
    renderPage("/en/historia");

    expect(
      screen.getByRole("heading", { level: 1, name: "Story" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Under construction.")).toBeInTheDocument();
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
