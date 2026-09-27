import { afterEach, describe, expect, it, vi } from "vitest";

import { normalizeOrigin, resolveOrigin } from "~/utils/site-origin";

describe("normalizeOrigin", () => {
  it("remove as barras do final", () => {
    expect(normalizeOrigin("https://a.com//")).toBe("https://a.com");
  });
});

describe("resolveOrigin", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("usa a origem da requisição quando SITE_URL não está definida", () => {
    vi.stubEnv("SITE_URL", "");

    expect(
      resolveOrigin(new Request("http://localhost:3000/sitemap.xml")),
    ).toBe("http://localhost:3000");
  });

  it("prefere SITE_URL quando definida", () => {
    vi.stubEnv("SITE_URL", "https://lucaschagas.dev");

    expect(
      resolveOrigin(new Request("http://localhost:3000/sitemap.xml")),
    ).toBe("https://lucaschagas.dev");
  });
});
