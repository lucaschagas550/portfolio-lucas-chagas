import { useI18n } from "~/i18n/use-i18n";
import { pageMeta } from "~/i18n/page-meta";
import "~/pages/page.css";

export function meta({ location }: { location: { pathname: string } }) {
  return pageMeta(location.pathname, "historia");
}

export default function Historia() {
  const { t } = useI18n();

  return (
    <main className="page">
      <h1 className="page__title">{t.historia.title}</h1>
      <p className="page__text">{t.common.underConstruction}</p>
    </main>
  );
}
