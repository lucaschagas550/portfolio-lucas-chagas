import { describe, expect, it } from "vitest";

import { buildRobots } from "~/utils/robots";

describe("buildRobots", () => {
  it("libera tudo e aponta para o sitemap", () => {
    expect(buildRobots("https://lucaschagas.dev")).toBe(
      "User-agent: *\nAllow: /\n\nSitemap: https://lucaschagas.dev/sitemap.xml\n",
    );
  });

  it("ignora a barra final da origem", () => {
    expect(buildRobots("https://lucaschagas.dev/")).toContain(
      "Sitemap: https://lucaschagas.dev/sitemap.xml",
    );
  });
});
