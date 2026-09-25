import { afterEach, describe, expect, it, vi } from "vitest";

import {
  buildRobots,
  buildSitemap,
  normalizeOrigin,
  resolveOrigin,
} from "~/utils/sitemap";

const origin = "https://lucaschagas.dev";

function locs(xml: string) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

describe("buildSitemap", () => {
  const xml = buildSitemap(origin);

  it("lista cada página nos dois idiomas", () => {
    expect(locs(xml)).toEqual([
      `${origin}/`,
      `${origin}/en`,
      `${origin}/habilidades`,
      `${origin}/en/habilidades`,
      `${origin}/historia`,
      `${origin}/en/historia`,
      `${origin}/contato`,
      `${origin}/en/contato`,
    ]);
  });

  it("liga cada URL às versões em português, inglês e x-default (hreflang)", () => {
    const home = xml.split("<url>")[1];

    expect(home).toContain(
      `<xhtml:link rel="alternate" hreflang="pt-BR" href="${origin}/"/>`,
    );
    expect(home).toContain(
      `<xhtml:link rel="alternate" hreflang="en" href="${origin}/en"/>`,
    );
    expect(home).toContain(
      `<xhtml:link rel="alternate" hreflang="x-default" href="${origin}/"/>`,
    );
  });

  it("declara os namespaces do sitemap e do xhtml", () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain(
      'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    );
    expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
  });

  it("ignora a barra final da origem", () => {
    expect(locs(buildSitemap(`${origin}/`))[0]).toBe(`${origin}/`);
  });

  it("escapa caracteres especiais da origem", () => {
    expect(locs(buildSitemap("https://exemplo.com/?a=1&b=2"))[0]).toContain(
      "&amp;",
    );
  });
});

describe("buildRobots", () => {
  it("libera tudo e aponta para o sitemap", () => {
    expect(buildRobots(origin)).toBe(
      `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
    );
  });
});

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
    vi.stubEnv("SITE_URL", origin);

    expect(
      resolveOrigin(new Request("http://localhost:3000/sitemap.xml")),
    ).toBe(origin);
  });
});
