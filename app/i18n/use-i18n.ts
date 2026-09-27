import { useLocation } from "react-router";

import { getLocale, pathForLocale } from "~/i18n/locale";
import { messages } from "~/i18n/messages";

// O idioma é sempre derivado da URL atual (/ = pt, /en = inglês).
export function useI18n() {
  const { pathname } = useLocation();
  const locale = getLocale(pathname);

  return {
    locale,
    // Textos de interface no idioma atual (app/i18n/messages.ts).
    translations: messages[locale],
    // localizePath("/historia") -> "/historia" em português, "/en/historia" em inglês.
    localizePath: (path: string) => pathForLocale(path, locale),
  };
}
