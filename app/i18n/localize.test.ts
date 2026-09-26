import { describe, expect, it } from "vitest";

import { localize } from "~/i18n/localize";

describe("localize", () => {
  it("devolve o mesmo texto nos dois idiomas quando recebe uma string", () => {
    expect(localize("Docker", "pt")).toBe("Docker");
    expect(localize("Docker", "en")).toBe("Docker");
  });

  it("escolhe a tradução do idioma pedido", () => {
    const text = { pt: "Microsserviços", en: "Microservices" };

    expect(localize(text, "pt")).toBe("Microsserviços");
    expect(localize(text, "en")).toBe("Microservices");
  });
});
