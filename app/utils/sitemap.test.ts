import { describe, expect, it } from "vitest";

import { buildSitemap } from "~/utils/sitemap";

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
