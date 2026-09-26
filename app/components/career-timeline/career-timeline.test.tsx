import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  CareerTimeline,
  type CareerTimelineItem,
} from "~/components/career-timeline/career-timeline";

describe("CareerTimeline", () => {
  const items: CareerTimelineItem[] = [
    { id: "a", year: 2026, current: true, content: <h3>Empresa atual</h3> },
    { id: "b", year: 2024, marker: "education", content: <h3>Pós</h3> },
    { id: "c", year: 2019, content: <h3>Primeiro emprego</h3> },
  ];

  it("renderiza os itens em uma lista ordenada, na ordem recebida", () => {
    render(<CareerTimeline items={items} />);

    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    const listItems = within(list).getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
    expect(listItems[0]).toHaveTextContent("2026Empresa atual");
    expect(listItems[2]).toHaveTextContent("2019Primeiro emprego");
  });

  it("marca formação e cargo atual com modificadores no marcador", () => {
    const { container } = render(<CareerTimeline items={items} />);

    const nodes = container.querySelectorAll(".career-timeline__node");
    expect(nodes[0]).toHaveClass("career-timeline__node--current");
    expect(nodes[1]).toHaveClass("career-timeline__node--education");
    expect(nodes[2]).not.toHaveClass(
      "career-timeline__node--current",
      "career-timeline__node--education",
    );
    nodes.forEach((node) =>
      expect(node).toHaveAttribute("aria-hidden", "true"),
    );
  });

  it("aplica a variante em cinza quando pedida", () => {
    render(<CareerTimeline items={items} variant="muted" />);

    expect(screen.getByRole("list")).toHaveClass(
      "career-timeline",
      "career-timeline--muted",
    );
  });
});
