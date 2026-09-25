import { describe, expect, it } from "vitest";

import { messages } from "~/i18n/messages";

// Lista o caminho de cada texto (ex.: "home.meta.title"), para comparar os
// idiomas sem depender dos valores.
function listKeys(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return [prefix];
  }

  return Object.entries(value).flatMap(([key, child]) =>
    listKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe("messages", () => {
  it("tem as mesmas chaves em português e inglês", () => {
    expect(listKeys(messages.en)).toEqual(listKeys(messages.pt));
  });

  it("tem o mesmo número de parágrafos no sobre mim", () => {
    expect(messages.en.home.about).toHaveLength(messages.pt.home.about.length);
  });

  it("monta o copyright com o ano em cada idioma", () => {
    expect(messages.pt.footer.copyright(2030)).toBe(
      "© 2030 Lucas Chagas. Todos os direitos reservados.",
    );
    expect(messages.en.footer.copyright(2030)).toBe(
      "© 2030 Lucas Chagas. All rights reserved.",
    );
  });
});
