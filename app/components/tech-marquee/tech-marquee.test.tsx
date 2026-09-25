import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TechMarquee } from "~/components/tech-marquee/tech-marquee";
import type { TechStackItem } from "~/data/tech-stack";

describe("TechMarquee", () => {
  const items: TechStackItem[] = [
    { name: "React", iconSlug: "react" },
    { name: "C#" },
    { name: "Azure" },
  ];

  it("exibe as tecnologias em uma lista acessível", () => {
    render(<TechMarquee items={items} label="Tecnologias" />);

    const list = screen.getByRole("list", { name: "Tecnologias" });
    for (const item of items) {
      expect(within(list).getByText(item.name)).toBeInTheDocument();
    }
  });

  it("usa o nome acessível recebido, no idioma da página", () => {
    render(<TechMarquee items={items} label="Technologies" />);

    expect(
      screen.getByRole("list", { name: "Technologies" }),
    ).toBeInTheDocument();
  });

  it("duplica a lista visualmente mas oculta a cópia de leitores de tela", () => {
    render(<TechMarquee items={items} label="Tecnologias" />);

    expect(screen.getAllByRole("list")).toHaveLength(1);
  });
});
