import { describe, expect, it } from "vitest";

import { displayUrl } from "~/utils/display-url";

describe("displayUrl", () => {
  it("remove o protocolo, o www e a barra final", () => {
    expect(
      displayUrl("https://www.linkedin.com/in/lucas-chagas-40624a163/"),
    ).toBe("linkedin.com/in/lucas-chagas-40624a163");
  });

  it("mantém o caminho de endereços sem www", () => {
    expect(displayUrl("https://github.com/lucaschagas550")).toBe(
      "github.com/lucaschagas550",
    );
  });

  it("aceita http", () => {
    expect(displayUrl("http://example.com/")).toBe("example.com");
  });

  it("não altera o que não é endereço web", () => {
    expect(displayUrl("mailto:alguem@example.com")).toBe(
      "mailto:alguem@example.com",
    );
  });
});
