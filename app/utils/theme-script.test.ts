import { afterEach, describe, expect, it } from "vitest";

import { THEME_STORAGE_KEY, themeScript } from "~/utils/theme-script";

function runThemeScript() {
  new Function(themeScript)();
}

describe("themeScript", () => {
  afterEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  it("aplica o tema escuro salvo", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");

    runThemeScript();

    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("aplica o tema claro salvo", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "light");

    runThemeScript();

    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("não define tema quando nada foi salvo (vale o do sistema)", () => {
    runThemeScript();

    expect(document.documentElement.dataset.theme).toBeUndefined();
  });

  it("ignora valores inválidos", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "roxo");

    runThemeScript();

    expect(document.documentElement.dataset.theme).toBeUndefined();
  });
});
