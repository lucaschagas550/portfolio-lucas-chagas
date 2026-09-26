import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CareerJob } from "~/components/career-job/career-job";

describe("CareerJob", () => {
  const props = {
    company: "Eldorado",
    location: "Rio Grande do Sul",
    roles: [
      { title: "Desenvolvedor pleno", period: "jun 2022 – nov 2023" },
      { title: "Desenvolvedor júnior", period: "mai 2021 – jan 2022" },
    ],
    summary: "Área de P&D.",
    achievements: [
      { metric: "94%", text: "de cobertura de testes." },
      { text: "Implementei SignalR com Redis." },
    ],
    stack: [{ name: "C#", iconSlug: "csharp" as const }, { name: "Dapper" }],
    labels: {
      current: "Atual",
      achievements: "Conquistas",
      stack: "Tecnologias usadas (2)",
    },
  };

  it("exibe a empresa como h3, com cargos, períodos e local", () => {
    render(<CareerJob {...props} />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Eldorado" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Desenvolvedor pleno")).toBeInTheDocument();
    expect(screen.getByText("jun 2022 – nov 2023")).toBeInTheDocument();
    expect(screen.getByText("Rio Grande do Sul")).toBeInTheDocument();
    expect(screen.getByText("Área de P&D.")).toBeInTheDocument();
  });

  it("mostra o modelo de trabalho ao lado do local, só quando informado", () => {
    const { rerender } = render(<CareerJob {...props} />);

    expect(screen.queryByText("Remoto")).not.toBeInTheDocument();

    rerender(<CareerJob {...props} workMode="Remoto" />);

    expect(screen.getByText("Rio Grande do Sul")).toHaveTextContent(
      "Rio Grande do Sul Remoto",
    );
  });

  it("marca como atual só o cargo indicado", () => {
    const { rerender } = render(<CareerJob {...props} />);

    expect(screen.queryByText("Atual")).not.toBeInTheDocument();

    rerender(
      <CareerJob
        {...props}
        roles={[
          {
            title: "Desenvolvedor sênior",
            period: "jan 2026 – hoje",
            current: true,
          },
        ]}
      />,
    );

    expect(screen.getByText("Atual")).toBeInTheDocument();
  });

  it("lista as conquistas, com o número em destaque antes do texto", () => {
    render(<CareerJob {...props} />);

    const list = screen.getByRole("list", { name: "Conquistas" });
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("94% de cobertura de testes.");
    expect(items[0]).toHaveClass("career-job__achievement--metric");
    expect(items[1]).toHaveTextContent("Implementei SignalR com Redis.");
    expect(items[1]).not.toHaveClass("career-job__achievement--metric");
  });

  it("recolhe as tecnologias num details que abre ao clicar", async () => {
    const user = userEvent.setup();
    const { container } = render(<CareerJob {...props} />);

    const details = container.querySelector("details");
    expect(details).not.toHaveAttribute("open");

    await user.click(screen.getByText("Tecnologias usadas (2)"));

    expect(details).toHaveAttribute("open");
    expect(within(details as HTMLElement).getByText("Dapper")).toBeVisible();
  });

  it("omite conquistas e tecnologias quando não há nenhuma", () => {
    render(<CareerJob {...props} achievements={[]} stack={[]} />);

    expect(
      screen.queryByRole("list", { name: "Conquistas" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Tecnologias usadas (2)"),
    ).not.toBeInTheDocument();
  });
});
