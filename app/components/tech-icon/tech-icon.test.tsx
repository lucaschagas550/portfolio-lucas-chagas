import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TechIcon } from "~/components/tech-icon/tech-icon";

describe("TechIcon", () => {
  it("usa a imagem da tecnologia quando existe uma", () => {
    const { container } = render(<TechIcon iconSlug="docker" />);

    const icon = container.querySelector("img");
    expect(icon).toHaveAttribute("alt", "");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("desenha o ícone da marca com a cor dela", () => {
    const { container } = render(<TechIcon iconSlug="dotnet" />);

    const icon = container.querySelector("svg");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).toHaveStyle({ fill: "#512BD4" });
  });

  it("mostra um ícone genérico quando não recebe slug", () => {
    const { container } = render(<TechIcon />);

    const icon = container.querySelector("svg");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).not.toHaveAttribute("style");
  });

  it("soma a classe recebida à classe do bloco", () => {
    const { container } = render(
      <TechIcon iconSlug="docker" className="chip__icon" />,
    );

    expect(container.querySelector("img")).toHaveClass(
      "tech-icon",
      "chip__icon",
    );
  });
});
