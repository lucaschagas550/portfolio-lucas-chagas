import type { Locale } from "~/i18n/locale";

// Texto de conteúdo (app/data): string quando é igual nos dois idiomas (nomes
// próprios como "Docker"), objeto quando precisa de tradução.
export type LocalizedText = string | Record<Locale, string>;

export function localize(text: LocalizedText, locale: Locale): string {
  return typeof text === "string" ? text : text[locale];
}

export function localizeNames<Item extends { name: LocalizedText }>(
  items: Item[],
  locale: Locale,
) {
  return items.map((item) => ({ ...item, name: localize(item.name, locale) }));
}
