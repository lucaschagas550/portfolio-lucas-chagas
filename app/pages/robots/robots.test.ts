import { afterEach, describe, expect, it, vi } from "vitest";

import { loader } from "~/pages/robots/robots";

describe("robots.txt", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("responde texto liberando tudo e apontando para o sitemap", async () => {
    vi.stubEnv("SITE_URL", "https://lucaschagas.dev");

    const response = loader({
      request: new Request("http://localhost:3000/robots.txt"),
    });

    expect(response.headers.get("Content-Type")).toBe(
      "text/plain; charset=utf-8",
    );
    expect(await response.text()).toBe(
      "User-agent: *\nAllow: /\n\nSitemap: https://lucaschagas.dev/sitemap.xml\n",
    );
  });
});
