import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { OutlineIcon } from "~/components/outline-icon/outline-icon";

describe("OutlineIcon", () => {
  it("desenha o caminho recebido em traço, na cor do texto", () => {
    const { container } = render(
      <OutlineIcon path="M12 3v12" className="resume-link__icon" />,
    );
    const svg = container.querySelector("svg");

    expect(svg).toHaveClass("resume-link__icon");
    expect(svg).toHaveAttribute("fill", "none");
    expect(svg).toHaveAttribute("stroke", "currentColor");
    expect(svg?.querySelector("path")).toHaveAttribute("d", "M12 3v12");
  });

  it("fica oculto para leitores de tela", () => {
    const { container } = render(<OutlineIcon path="M12 3v12" />);

    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});
