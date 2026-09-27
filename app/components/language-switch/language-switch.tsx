import { Link, useLocation } from "react-router";

import { otherLocale, switchLocalePath } from "~/i18n/locale";
import { useI18n } from "~/i18n/use-i18n";

import "./language-switch.css";

// Link (não botão) para a mesma página no outro idioma: funciona sem JS.
export function LanguageSwitch() {
  const { pathname } = useLocation();
  const { locale, translations } = useI18n();
  const targetLang = otherLocale(locale);

  return (
    <Link
      className="language-switch"
      to={switchLocalePath(pathname)}
      lang={targetLang}
      hrefLang={targetLang}
      aria-label={translations.languageSwitch.label}
    >
      {translations.languageSwitch.text}
    </Link>
  );
}
