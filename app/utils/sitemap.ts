import { pages } from "~/data/pages";
import { htmlLang, locales, pathForLocale, type Locale } from "~/i18n/locale";
import { normalizeOrigin } from "~/utils/site-origin";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Uma <url> por página e idioma; cada uma aponta para todas as versões
// (hreflang) e para o português como padrão (x-default).
export function buildSitemap(origin: string): string {
  const base = normalizeOrigin(origin);
  const urlOf = (path: string, locale: Locale) =>
    escapeXml(`${base}${pathForLocale(path, locale)}`);

  const entries = pages.flatMap(({ path }) => {
    const alternates = [
      ...locales.map(
        (locale) =>
          `    <xhtml:link rel="alternate" hreflang="${htmlLang[locale]}" href="${urlOf(path, locale)}"/>`,
      ),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlOf(path, "pt")}"/>`,
    ].join("\n");

    return locales.map(
      (locale) =>
        `  <url>\n    <loc>${urlOf(path, locale)}</loc>\n${alternates}\n  </url>`,
    );
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;
}
