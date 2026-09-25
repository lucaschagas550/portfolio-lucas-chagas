import { Link, useLocation } from "react-router";

import { switchLocalePath } from "~/i18n/locale";
import { useI18n } from "~/i18n/use-i18n";

import "./language-switch.css";

// Link (não botão) para a mesma página no outro idioma: funciona sem JS.
export function LanguageSwitch() {
  const { pathname } = useLocation();
  const { locale, t } = useI18n();
  const targetLang = locale === "pt" ? "en" : "pt";

  return (
    <Link
      className="language-switch"
      to={switchLocalePath(pathname)}
      lang={targetLang}
      hrefLang={targetLang}
      aria-label={t.languageSwitch.label}
    >
      {t.languageSwitch.text}
    </Link>
  );
}
