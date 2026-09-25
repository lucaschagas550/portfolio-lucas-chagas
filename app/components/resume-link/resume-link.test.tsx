import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import { ResumeLink } from "~/components/resume-link/resume-link";

function renderLink(
  path = "/",
  props: React.ComponentProps<typeof ResumeLink> = {},
) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ResumeLink {...props} />
    </MemoryRouter>,
  );
}

describe("ResumeLink", () => {
  it("baixa o currículo em PDF", () => {
    renderLink();

    const link = screen.getByRole("link", { name: "Baixar currículo" });

    expect(link).toHaveAttribute("href", "/curriculo-lucas-chagas.pdf");
    expect(link).toHaveAttribute("download");
  });

  it("traduz o texto em inglês em /en", () => {
    renderLink("/en");

    expect(
      screen.getByRole("link", { name: "Download resume" }),
    ).toHaveAttribute("download");
  });

  it("aplica o modificador de botão apenas quando pedido", () => {
    const { unmount } = renderLink();
    expect(screen.getByRole("link")).not.toHaveClass("resume-link--button");
    unmount();

    renderLink("/", { variant: "button" });
    expect(screen.getByRole("link")).toHaveClass(
      "resume-link",
      "resume-link--button",
    );
  });

  it("repassa as props do elemento a e mantém a classe extra", () => {
    renderLink("/", { className: "extra", "aria-label": "Currículo em PDF" });

    expect(screen.getByRole("link", { name: "Currículo em PDF" })).toHaveClass(
      "resume-link",
      "extra",
    );
  });
});
