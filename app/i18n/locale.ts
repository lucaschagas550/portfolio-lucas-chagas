export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

// Valor do atributo lang do <html>.
export const htmlLang: Record<Locale, string> = { pt: "pt-BR", en: "en" };

// Só o inglês tem prefixo na URL; o português é o idioma padrão (sem prefixo).
const ENGLISH_PREFIX = "/en";

export function getLocale(pathname: string): Locale {
  const isEnglish =
    pathname === ENGLISH_PREFIX || pathname.startsWith(`${ENGLISH_PREFIX}/`);

  return isEnglish ? "en" : "pt";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "pt" ? "en" : "pt";
}

// Caminho sem o prefixo de idioma: "/en/historia" -> "/historia".
export function stripLocale(pathname: string): string {
  if (getLocale(pathname) === "pt") return pathname;

  return pathname.slice(ENGLISH_PREFIX.length) || "/";
}

// Recebe sempre um caminho em português ("/historia") e o devolve no idioma.
export function pathForLocale(path: string, locale: Locale): string {
  if (locale === "pt") return path;

  return path === "/" ? ENGLISH_PREFIX : `${ENGLISH_PREFIX}${path}`;
}

// Mesmo caminho da página atual, no outro idioma.
export function switchLocalePath(pathname: string): string {
  return pathForLocale(stripLocale(pathname), otherLocale(getLocale(pathname)));
}
