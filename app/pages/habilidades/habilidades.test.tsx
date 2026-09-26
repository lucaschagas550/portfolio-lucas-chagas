import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import { courses } from "~/data/courses";
import Habilidades, { meta } from "~/pages/habilidades/habilidades";

function renderPage(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Habilidades />
    </MemoryRouter>,
  );
}

describe("Habilidades", () => {
  it("exibe o título principal da página", () => {
    renderPage("/habilidades");

    expect(
      screen.getByRole("heading", { level: 1, name: "Habilidades" }),
    ).toBeInTheDocument();
  });

  it("apresenta o back-end .NET como especialidade", () => {
    renderPage("/habilidades");

    const specialty = screen.getByRole("region", { name: "Back-end .NET" });
    expect(within(specialty).getByText("Especialidade")).toBeInTheDocument();
    expect(within(specialty).getByText("C#")).toBeInTheDocument();
    expect(
      within(specialty).getByText("ASP.NET Core Web API"),
    ).toBeInTheDocument();
  });

  it("mostra a especialidade antes das competências complementares", () => {
    renderPage("/habilidades");

    const headings = screen
      .getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent);
    expect(headings).toEqual([
      "Back-end .NET",
      "Competências complementares",
      "Formação acadêmica",
      "Cursos e certificações",
    ]);
  });

  it("mostra os números de destaque antes da especialidade", () => {
    renderPage("/habilidades");

    const stats = screen.getByRole("list", { name: "Destaques" });
    const items = within(stats).getAllByRole("listitem");
    expect(items).toHaveLength(4);
    expect(items[0]).toHaveTextContent("6+ anos de experiência");
    expect(items[1]).toHaveTextContent("7 empresas de tecnologia");
    expect(items[2]).toHaveTextContent(
      "94% de cobertura de testes em projeto .NET",
    );
    expect(items[3]).toHaveTextContent(
      `${courses.length} cursos e certificações`,
    );

    const specialty = screen.getByRole("region", { name: "Back-end .NET" });
    expect(
      stats.compareDocumentPosition(specialty) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("inclui SignalR e Hangfire na especialidade", () => {
    renderPage("/habilidades");

    const specialty = screen.getByRole("region", { name: "Back-end .NET" });
    expect(within(specialty).getByText("SignalR")).toBeInTheDocument();
    expect(within(specialty).getByText("Hangfire")).toBeInTheDocument();
  });

  it("agrupa as competências complementares por categoria", () => {
    renderPage("/habilidades");

    const complementary = screen.getByRole("region", {
      name: "Competências complementares",
    });
    const categories = within(complementary)
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    expect(categories).toEqual([
      "Arquitetura",
      "Dados e mensageria",
      "Integrações",
      "Front-end",
      "DevOps e nuvem",
      "Qualidade e segurança",
      "Inteligência artificial",
      "Métodos ágeis",
    ]);
    expect(
      within(complementary).getByText("Microsserviços"),
    ).toBeInTheDocument();
  });

  it("mantém code review e Postman em Qualidade e segurança", () => {
    renderPage("/habilidades");

    const quality = screen.getByRole("region", {
      name: "Qualidade e segurança",
    });
    expect(within(quality).getByText("Code review")).toBeInTheDocument();
    expect(
      within(quality).getByText("Postman (testes de API)"),
    ).toBeInTheDocument();

    const architecture = screen.getByRole("region", { name: "Arquitetura" });
    expect(
      within(architecture).queryByText("Code review"),
    ).not.toBeInTheDocument();
    const devops = screen.getByRole("region", { name: "DevOps e nuvem" });
    expect(within(devops).queryByText(/Postman/)).not.toBeInTheDocument();
  });

  it("mostra Claude na categoria de inteligência artificial", () => {
    renderPage("/habilidades");

    const ai = screen.getByRole("region", { name: "Inteligência artificial" });
    expect(within(ai).getByText("Claude (Anthropic)")).toBeInTheDocument();
  });

  it("lista a formação acadêmica", () => {
    renderPage("/habilidades");

    const section = screen.getByRole("region", { name: "Formação acadêmica" });
    const items = within(section).getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent(
      "Pós-graduação lato sensu em Engenharia de Software",
    );
    expect(items[0]).toHaveTextContent("PUC Minas · 2023 – 2024");
    expect(items[1]).toHaveTextContent("Bacharelado em Ciência da Computação");
    expect(items[1]).toHaveTextContent(
      "Universidade Paulista (UNIP) · 2017 – 2020",
    );
  });

  it("lista os cursos e certificações", () => {
    renderPage("/habilidades");

    const section = screen.getByRole("region", {
      name: "Cursos e certificações",
    });
    expect(within(section).getAllByRole("listitem")).toHaveLength(
      courses.length,
    );
    expect(within(section).getByText("Formação .NET")).toBeInTheDocument();
  });

  it("define título e descrição da página", () => {
    expect(meta({ location: { pathname: "/habilidades" } })).toEqual([
      { title: "Habilidades | Lucas Chagas" },
      {
        name: "description",
        content: "Tecnologias e habilidades de Lucas Chagas.",
      },
    ]);
  });

  it("exibe a página em inglês em /en/habilidades", () => {
    renderPage("/en/habilidades");

    expect(
      screen.getByRole("heading", { level: 1, name: "Skills" }),
    ).toBeInTheDocument();
    const specialty = screen.getByRole("region", { name: ".NET back-end" });
    expect(within(specialty).getByText("Specialty")).toBeInTheDocument();
    expect(within(specialty).getByText("REST APIs")).toBeInTheDocument();
    expect(screen.getByText("Microservices")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Data and messaging" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Courses and certifications",
      }),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole("list", { name: "Highlights" })).getByText(
        "years of experience",
      ),
    ).toBeInTheDocument();
    const educationSection = screen.getByRole("region", { name: "Education" });
    expect(
      within(educationSection).getByText(
        "Bachelor's degree in Computer Science",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Quality and security" }),
    ).toBeInTheDocument();
  });

  it("define título e descrição em inglês em /en/habilidades", () => {
    expect(meta({ location: { pathname: "/en/habilidades" } })).toEqual([
      { title: "Skills | Lucas Chagas" },
      {
        name: "description",
        content: "Technologies and skills of Lucas Chagas.",
      },
    ]);
  });
});
