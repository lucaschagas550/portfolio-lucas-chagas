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
    render(<TechMarquee items={items} />);

    const list = screen.getByRole("list");
    for (const item of items) {
      expect(within(list).getByText(item.name)).toBeInTheDocument();
    }
  });

  it("duplica a lista visualmente mas oculta a cópia de leitores de tela", () => {
    render(<TechMarquee items={items} />);

    expect(screen.getAllByRole("list")).toHaveLength(1);
  });
});
