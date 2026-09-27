import { describe, expect, it } from "vitest";

import {
  getLocale,
  otherLocale,
  pathForLocale,
  stripLocale,
  switchLocalePath,
} from "~/i18n/locale";

describe("getLocale", () => {
  it("usa português nos caminhos sem prefixo", () => {
    expect(getLocale("/")).toBe("pt");
    expect(getLocale("/historia")).toBe("pt");
  });

  it("usa inglês em /en e nos caminhos abaixo dele", () => {
    expect(getLocale("/en")).toBe("en");
    expect(getLocale("/en/")).toBe("en");
    expect(getLocale("/en/historia")).toBe("en");
  });

  it("não confunde caminhos que apenas começam com 'en'", () => {
    expect(getLocale("/entrevistas")).toBe("pt");
  });
});

describe("otherLocale", () => {
  it("devolve o idioma oposto", () => {
    expect(otherLocale("pt")).toBe("en");
    expect(otherLocale("en")).toBe("pt");
  });
});

describe("stripLocale", () => {
  it("remove o prefixo /en e mantém o resto do caminho", () => {
    expect(stripLocale("/en")).toBe("/");
    expect(stripLocale("/en/historia")).toBe("/historia");
  });

  it("não altera caminhos em português", () => {
    expect(stripLocale("/historia")).toBe("/historia");
  });
});

describe("pathForLocale", () => {
  it("mantém o caminho em português", () => {
    expect(pathForLocale("/", "pt")).toBe("/");
    expect(pathForLocale("/historia", "pt")).toBe("/historia");
  });

  it("acrescenta o prefixo /en em inglês", () => {
    expect(pathForLocale("/", "en")).toBe("/en");
    expect(pathForLocale("/historia", "en")).toBe("/en/historia");
  });
});

describe("switchLocalePath", () => {
  it("troca português por inglês preservando a página", () => {
    expect(switchLocalePath("/")).toBe("/en");
    expect(switchLocalePath("/historia")).toBe("/en/historia");
  });

  it("troca inglês por português preservando a página", () => {
    expect(switchLocalePath("/en")).toBe("/");
    expect(switchLocalePath("/en/historia")).toBe("/historia");
  });
});
