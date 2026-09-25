import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import { LanguageSwitch } from "~/components/language-switch/language-switch";

function renderSwitch(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageSwitch />
    </MemoryRouter>,
  );
}

describe("LanguageSwitch", () => {
  it("em português, leva para a mesma página em inglês", () => {
    renderSwitch("/historia");

    const link = screen.getByRole("link", { name: "English" });

    expect(link).toHaveTextContent("EN");
    expect(link).toHaveAttribute("href", "/en/historia");
    expect(link).toHaveAttribute("lang", "en");
    expect(link).toHaveAttribute("hreflang", "en");
  });

  it("em inglês, leva para a mesma página em português", () => {
    renderSwitch("/en/historia");

    const link = screen.getByRole("link", { name: "Português" });

    expect(link).toHaveTextContent("PT");
    expect(link).toHaveAttribute("href", "/historia");
    expect(link).toHaveAttribute("lang", "pt");
  });

  it("leva da página inicial para /en e de volta para /", () => {
    const { unmount } = renderSwitch("/");
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en",
    );
    unmount();

    renderSwitch("/en");
    expect(screen.getByRole("link", { name: "Português" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
