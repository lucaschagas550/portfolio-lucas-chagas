import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Footer } from "~/components/footer/footer";

function renderFooter(
  props: React.ComponentProps<typeof Footer> = {},
  path = "/",
) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Footer {...props} />
    </MemoryRouter>,
  );
}

describe("Footer", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("é o rodapé da página (landmark contentinfo)", () => {
    renderFooter();

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("exibe os links de GitHub, LinkedIn e Email com os destinos corretos", () => {
    renderFooter();

    const footer = screen.getByRole("contentinfo");

    expect(
      within(footer).getByRole("link", { name: "GitHub" }),
    ).toHaveAttribute("href", "https://github.com/lucaschagas550");
    expect(
      within(footer).getByRole("link", { name: "LinkedIn" }),
    ).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/lucas-chagas-40624a163/",
    );
    expect(within(footer).getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:lucasandrade595@gmail.com",
    );
  });

  it("assina o site com o coração roxo", () => {
    renderFooter();

    expect(
      screen.getByText(/Construído e desenvolvido por Lucas Chagas/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "coração roxo" }),
    ).toBeInTheDocument();
  });

  it("menciona as tecnologias do site", () => {
    renderFooter();

    expect(
      screen.getByText("Feito com React + TypeScript."),
    ).toBeInTheDocument();
  });

  it("exibe o copyright com o ano informado", () => {
    renderFooter({ year: 2030 });

    expect(
      screen.getByText("© 2030 Lucas Chagas. Todos os direitos reservados."),
    ).toBeInTheDocument();
  });

  it("usa o ano atual no copyright quando nenhum ano é informado", () => {
    renderFooter();

    expect(
      screen.getByText(
        `© ${new Date().getFullYear()} Lucas Chagas. Todos os direitos reservados.`,
      ),
    ).toBeInTheDocument();
  });

  it("abre o código-fonte no GitHub em uma nova aba", () => {
    renderFooter();

    const link = screen.getByRole("link", { name: "Ver código no GitHub" });

    expect(link).toHaveAttribute(
      "href",
      "https://github.com/lucaschagas550/portfolio-lucas-chagas",
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("volta ao topo da página ao clicar em Voltar ao topo", async () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    renderFooter();

    await userEvent.click(
      screen.getByRole("button", { name: "Voltar ao topo" }),
    );

    expect(scrollTo).toHaveBeenCalledWith({ top: 0 });
  });

  it("mostra a disponibilidade, a localização e o download do currículo", () => {
    renderFooter();

    expect(
      screen.getByText("Disponível para novos projetos"),
    ).toBeInTheDocument();
    expect(screen.getByText(/^Brasil, .* \(Brasília\)$/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Baixar currículo" }),
    ).toHaveAttribute("download");
  });

  it("exibe todos os textos em inglês em /en", async () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    renderFooter({ year: 2030 }, "/en");

    expect(
      screen.getByText(/Built and developed by Lucas Chagas/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "purple heart" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Made with React + TypeScript."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("© 2030 Lucas Chagas. All rights reserved."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "View source on GitHub" }),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Back to top" }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0 });
  });

  it("repassa as props do elemento footer", () => {
    renderFooter({ className: "extra", "aria-label": "Rodapé do site" });

    expect(screen.getByRole("contentinfo")).toHaveClass("footer", "extra");
  });
});
