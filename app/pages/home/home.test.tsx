import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home, { meta } from "~/pages/home/home";

describe("Home", () => {
  it("exibe o título principal da página", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Lucas Chagas" }),
    ).toBeInTheDocument();
  });

  it("define título e descrição da página", () => {
    expect(meta()).toEqual([
      { title: "Lucas Chagas | Portfólio" },
      { name: "description", content: "Portfólio de Lucas Chagas." },
    ]);
  });
});
