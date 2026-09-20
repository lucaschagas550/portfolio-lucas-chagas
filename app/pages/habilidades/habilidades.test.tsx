import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Habilidades, { meta } from "~/pages/habilidades/habilidades";

describe("Habilidades", () => {
  it("exibe o título principal da página", () => {
    render(<Habilidades />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Habilidades" }),
    ).toBeInTheDocument();
  });

  it("define título e descrição da página", () => {
    expect(meta()).toEqual([
      { title: "Habilidades | Lucas Chagas" },
      {
        name: "description",
        content: "Tecnologias e habilidades de Lucas Chagas.",
      },
    ]);
  });
});
