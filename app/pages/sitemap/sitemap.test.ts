import { afterEach, describe, expect, it, vi } from "vitest";

import { loader } from "~/pages/sitemap/sitemap";

describe("sitemap.xml", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("responde XML com as páginas nos dois idiomas", async () => {
    vi.stubEnv("SITE_URL", "");

    const response = loader({
      request: new Request("http://localhost:3000/sitemap.xml"),
    });
    const body = await response.text();

    expect(response.headers.get("Content-Type")).toBe(
      "application/xml; charset=utf-8",
    );
    expect(body).toContain("<loc>http://localhost:3000/</loc>");
    expect(body).toContain("<loc>http://localhost:3000/en/historia</loc>");
  });
});
