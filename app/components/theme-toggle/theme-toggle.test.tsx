import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ThemeToggle } from "~/components/theme-toggle/theme-toggle";
import { THEME_STORAGE_KEY } from "~/utils/theme-script";

function renderToggle(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ThemeToggle />
    </MemoryRouter>,
  );
}

const getToggle = () => screen.getByRole("button", { name: /modo escuro/i });

function mockSystemPrefersDark(prefersDark: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({ matches: prefersDark }),
  );
}

describe("ThemeToggle", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  it("começa no tema claro quando o sistema é claro e nada foi escolhido", () => {
    mockSystemPrefersDark(false);
    renderToggle();

    expect(getToggle()).toHaveAttribute("aria-pressed", "false");
  });

  it("começa no tema escuro quando o sistema é escuro e nada foi escolhido", () => {
    mockSystemPrefersDark(true);
    renderToggle();

    expect(getToggle()).toHaveAttribute("aria-pressed", "true");
  });

  it("respeita o tema já aplicado ao <html>, mesmo que o sistema seja outro", () => {
    mockSystemPrefersDark(true);
    document.documentElement.dataset.theme = "light";
    renderToggle();

    expect(getToggle()).toHaveAttribute("aria-pressed", "false");
  });

  it("alterna para o escuro, aplica ao <html> e salva a escolha", async () => {
    mockSystemPrefersDark(false);
    renderToggle();

    await userEvent.click(getToggle());

    expect(getToggle()).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
  });

  it("volta para o claro no segundo clique", async () => {
    mockSystemPrefersDark(true);
    renderToggle();

    await userEvent.click(getToggle());

    expect(getToggle()).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
  });

  it("aplica o tema mesmo sem localStorage", async () => {
    mockSystemPrefersDark(false);
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("indisponível");
    });
    renderToggle();

    await userEvent.click(getToggle());

    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("traduz o rótulo em inglês em /en", () => {
    mockSystemPrefersDark(false);
    renderToggle("/en");

    expect(
      screen.getByRole("button", { name: "Dark mode" }),
    ).toBeInTheDocument();
  });
});
