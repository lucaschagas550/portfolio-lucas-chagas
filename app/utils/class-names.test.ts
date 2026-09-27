import { describe, expect, it } from "vitest";

import { classNames } from "~/utils/class-names";

describe("classNames", () => {
  it("junta as classes separadas por espaço", () => {
    expect(classNames("navbar", "surface-bar")).toBe("navbar surface-bar");
  });

  it("ignora valores falsos, vazios e ausentes", () => {
    expect(classNames("chip", false, undefined, null, "", "chip--lg")).toBe(
      "chip chip--lg",
    );
  });

  it("devolve texto vazio sem nenhuma classe válida", () => {
    expect(classNames(undefined, false)).toBe("");
  });
});
