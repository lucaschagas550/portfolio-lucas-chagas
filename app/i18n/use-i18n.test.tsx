import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import { messages } from "~/i18n/messages";
import { useI18n } from "~/i18n/use-i18n";

function renderAt(pathname: string) {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[pathname]}>{children}</MemoryRouter>
  );

  return renderHook(() => useI18n(), { wrapper }).result.current;
}

describe("useI18n", () => {
  it("usa português e os textos em português fora de /en", () => {
    const { locale, translations } = renderAt("/historia");

    expect(locale).toBe("pt");
    expect(translations).toBe(messages.pt);
  });

  it("usa inglês e os textos em inglês em /en", () => {
    const { locale, translations } = renderAt("/en/historia");

    expect(locale).toBe("en");
    expect(translations).toBe(messages.en);
  });

  it("gera os caminhos no idioma atual", () => {
    expect(renderAt("/").localizePath("/historia")).toBe("/historia");
    expect(renderAt("/en").localizePath("/historia")).toBe("/en/historia");
    expect(renderAt("/en").localizePath("/")).toBe("/en");
  });
});
