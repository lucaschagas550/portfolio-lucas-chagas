import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Historia, { meta } from "~/pages/historia/historia";

describe("Historia", () => {
  it("exibe o título principal da página", () => {
    render(<Historia />);

    expect(
      screen.getByRole("heading", { level: 1, name: "História" }),
    ).toBeInTheDocument();
  });

  it("define título e descrição da página", () => {
    expect(meta()).toEqual([
      { title: "História | Lucas Chagas" },
      {
        name: "description",
        content: "A trajetória profissional de Lucas Chagas.",
      },
    ]);
  });
});
