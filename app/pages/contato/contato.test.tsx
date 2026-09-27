import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import Contato, { meta } from "~/pages/contato/contato";

function renderPage(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Contato />
    </MemoryRouter>,
  );
}

describe("Contato", () => {
  it("exibe o título principal da página", () => {
    renderPage("/contato");

    expect(
      screen.getByRole("heading", { level: 1, name: "Contato" }),
    ).toBeInTheDocument();
  });

  it("define título e descrição da página", () => {
    expect(meta({ location: { pathname: "/contato" } })).toEqual([
      { title: "Contato | Lucas Chagas" },
      {
        name: "description",
        content:
          "Fale com Lucas Chagas, desenvolvedor full-stack especializado em .NET: e-mail, LinkedIn, GitHub e currículo.",
      },
    ]);
  });

  it("destaca o e-mail com as ações de copiar e escrever", () => {
    renderPage("/contato");

    expect(screen.getByText("lucasandrade595@gmail.com")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Copiar e-mail" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Escrever e-mail" }),
    ).toHaveAttribute("href", "mailto:lucasandrade595@gmail.com");
  });

  it("mostra a disponibilidade e o local", () => {
    renderPage("/contato");

    expect(
      screen.getByText("Disponível para novos projetos"),
    ).toBeInTheDocument();
    expect(screen.getByText(/^Brasil/)).toBeInTheDocument();
  });

  it("lista LinkedIn, GitHub e currículo em outros canais", () => {
    renderPage("/contato");

    const channels = screen.getByRole("region", { name: "Outros canais" });
    const linkedin = within(channels).getByRole("link", {
      name: "LinkedIn (abre em nova aba)",
    });
    const github = within(channels).getByRole("link", {
      name: "GitHub (abre em nova aba)",
    });

    expect(linkedin).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/lucas-chagas-40624a163/",
    );
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("href", "https://github.com/lucaschagas550");
    expect(github).toHaveAttribute("target", "_blank");
    expect(
      within(channels).getByText("linkedin.com/in/lucas-chagas-40624a163"),
    ).toBeInTheDocument();
    expect(
      within(channels).getByRole("link", { name: "Baixar currículo" }),
    ).toHaveAttribute("download");
  });

  it("não lista o e-mail de novo em outros canais", () => {
    renderPage("/contato");

    const channels = screen.getByRole("region", { name: "Outros canais" });

    expect(
      within(channels).queryByRole("link", { name: /mail/i }),
    ).not.toBeInTheDocument();
  });

  it("exibe a página em inglês em /en/contato", () => {
    renderPage("/en/contato");

    expect(
      screen.getByRole("heading", { level: 1, name: "Contact" }),
    ).toBeInTheDocument();

    const channels = screen.getByRole("region", { name: "Other channels" });

    expect(
      within(channels).getByRole("link", {
        name: "LinkedIn (opens in a new tab)",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Copy email" }),
    ).toBeInTheDocument();
  });

  it("define título e descrição em inglês em /en/contato", () => {
    expect(meta({ location: { pathname: "/en/contato" } })).toEqual([
      { title: "Contact | Lucas Chagas" },
      {
        name: "description",
        content:
          "Get in touch with Lucas Chagas, a full-stack developer specialized in .NET: email, LinkedIn, GitHub and resume.",
      },
    ]);
  });
});
