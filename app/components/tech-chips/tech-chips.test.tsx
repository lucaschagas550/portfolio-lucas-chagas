import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TechChips } from "~/components/tech-chips/tech-chips";

describe("TechChips", () => {
  const items = [
    { name: "C#", iconSlug: "csharp" as const },
    { name: "Dapper" },
  ];

  it("lista as tecnologias", () => {
    render(<TechChips items={items} />);

    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    expect(within(list).getByText("C#")).toBeInTheDocument();
    expect(within(list).getByText("Dapper")).toBeInTheDocument();
  });

  it("informa ao CSS a posição de cada chip, para a entrada em cascata", () => {
    render(<TechChips items={items} />);

    const [first, second] = screen.getAllByRole("listitem");
    expect(first).toHaveStyle({ "--chip-index": "0" });
    expect(second).toHaveStyle({ "--chip-index": "1" });
  });

  it("aplica os modificadores de tamanho e cascata só quando pedidos", () => {
    const { rerender } = render(<TechChips items={items} />);

    const list = screen.getByRole("list");
    expect(list).toHaveClass("tech-chips");
    expect(list).not.toHaveClass("tech-chips--lg", "tech-chips--cascade");

    rerender(<TechChips items={items} size="lg" cascade />);

    expect(screen.getByRole("list")).toHaveClass(
      "tech-chips--lg",
      "tech-chips--cascade",
    );
  });
});
