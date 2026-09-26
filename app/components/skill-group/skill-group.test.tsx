import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SkillGroup } from "~/components/skill-group/skill-group";

describe("SkillGroup", () => {
  const skills = [
    { name: "C#", iconSlug: "csharp" as const },
    { name: "Dapper" },
  ];

  it("exibe o título como h2 por padrão e nomeia a seção com ele", () => {
    render(<SkillGroup id="dotnet" title="Back-end .NET" skills={skills} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Back-end .NET" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Back-end .NET" }),
    ).toBeInTheDocument();
  });

  it("usa o nível de título recebido", () => {
    render(
      <SkillGroup id="data" title="Dados" skills={skills} headingLevel={3} />,
    );

    expect(
      screen.getByRole("heading", { level: 3, name: "Dados" }),
    ).toBeInTheDocument();
  });

  it("lista as habilidades", () => {
    render(<SkillGroup id="dotnet" title="Back-end .NET" skills={skills} />);

    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    expect(within(list).getByText("C#")).toBeInTheDocument();
    expect(within(list).getByText("Dapper")).toBeInTheDocument();
  });

  it("informa ao CSS a posição de cada chip, para a entrada em cascata", () => {
    render(<SkillGroup id="dotnet" title="Back-end .NET" skills={skills} />);

    const [first, second] = screen.getAllByRole("listitem");
    expect(first).toHaveStyle({ "--skill-index": "0" });
    expect(second).toHaveStyle({ "--skill-index": "1" });
  });

  it("exibe rótulo e descrição só quando recebidos", () => {
    const { rerender } = render(
      <SkillGroup id="dotnet" title="Back-end .NET" skills={skills} />,
    );

    expect(screen.queryByText("Especialidade")).not.toBeInTheDocument();

    rerender(
      <SkillGroup
        id="dotnet"
        title="Back-end .NET"
        skills={skills}
        eyebrow="Especialidade"
        description="O núcleo da minha carreira."
        variant="featured"
      />,
    );

    expect(screen.getByText("Especialidade")).toBeInTheDocument();
    expect(screen.getByText("O núcleo da minha carreira.")).toBeInTheDocument();
  });

  it("aplica o modificador da variante em destaque", () => {
    render(
      <SkillGroup
        id="dotnet"
        title="Back-end .NET"
        skills={skills}
        variant="featured"
      />,
    );

    expect(screen.getByRole("region", { name: "Back-end .NET" })).toHaveClass(
      "skill-group",
      "skill-group--featured",
    );
  });
});
