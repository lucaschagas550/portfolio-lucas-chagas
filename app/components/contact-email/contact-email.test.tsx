import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ContactEmail } from "~/components/contact-email/contact-email";

const email = "alguem@example.com";

function renderEmail(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ContactEmail email={email} />
    </MemoryRouter>,
  );
}

describe("ContactEmail", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("exibe o endereço de e-mail", () => {
    renderEmail();

    expect(screen.getByText(email)).toBeInTheDocument();
  });

  it("abre o app de e-mail pelo link Escrever e-mail", () => {
    renderEmail();

    expect(
      screen.getByRole("link", { name: "Escrever e-mail" }),
    ).toHaveAttribute("href", `mailto:${email}`);
  });

  it("copia o endereço e confirma na tela e para leitores de tela", async () => {
    const user = userEvent.setup();
    renderEmail();

    await user.click(screen.getByRole("button", { name: "Copiar e-mail" }));

    await expect(navigator.clipboard.readText()).resolves.toBe(email);
    expect(
      screen.getByRole("button", { name: "E-mail copiado" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("E-mail copiado");
  });

  it("volta ao rótulo original alguns segundos depois de copiar", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderEmail();

    await user.click(screen.getByRole("button", { name: "Copiar e-mail" }));
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(
      screen.getByRole("button", { name: "Copiar e-mail" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });

  it("explica como seguir quando não consegue copiar", async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(
      new Error("negado"),
    );
    renderEmail();

    await user.click(screen.getByRole("button", { name: "Copiar e-mail" }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Não foi possível copiar. Selecione o endereço acima.",
    );
    expect(
      screen.getByRole("button", { name: "Copiar e-mail" }),
    ).toBeInTheDocument();
  });

  it("traduz os rótulos em inglês em /en", async () => {
    const user = userEvent.setup();
    renderEmail("/en");

    expect(
      screen.getByRole("link", { name: "Write an email" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Copy email" }));

    expect(
      screen.getByRole("button", { name: "Email copied" }),
    ).toBeInTheDocument();
  });
});
