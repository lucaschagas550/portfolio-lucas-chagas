import { useLocation } from "react-router";

import { getLocale, localizedPath } from "~/i18n/locale";
import { messages } from "~/i18n/messages";

// O idioma é sempre derivado da URL atual (/ = pt, /en = inglês).
export function useI18n() {
  const { pathname } = useLocation();
  const locale = getLocale(pathname);

  return {
    locale,
    t: messages[locale],
    // href("/historia") -> "/historia" em português, "/en/historia" em inglês.
    href: (path: string) => localizedPath(path, locale),
  };
}
