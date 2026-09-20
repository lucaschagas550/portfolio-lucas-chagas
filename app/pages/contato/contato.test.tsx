import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Contato, { meta } from "~/pages/contato/contato";

describe("Contato", () => {
  it("exibe o título principal da página", () => {
    render(<Contato />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Contato" }),
    ).toBeInTheDocument();
  });

  it("define título e descrição da página", () => {
    expect(meta()).toEqual([
      { title: "Contato | Lucas Chagas" },
      {
        name: "description",
        content: "Entre em contato com Lucas Chagas.",
      },
    ]);
  });
});
