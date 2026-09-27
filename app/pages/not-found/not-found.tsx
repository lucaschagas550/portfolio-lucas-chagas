import { data, Link, useLocation } from "react-router";

import { pages } from "~/data/pages";
import { getLocale } from "~/i18n/locale";
import { messages } from "~/i18n/messages";
import { useI18n } from "~/i18n/use-i18n";

import "~/pages/page.css";
import "./not-found.css";

// Rota "*": renderiza dentro do layout, mas responde com status 404.
export function loader() {
  return data(null, { status: 404 });
}

export function meta({ location }: { location: { pathname: string } }) {
  const { title, description } =
    messages[getLocale(location.pathname)].notFound.meta;

  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "noindex" },
  ];
}

export default function NotFound() {
  const { pathname } = useLocation();
  const { t, href } = useI18n();

  return (
    <main className="page not-found">
      {/* A requisição que o visitante fez e a resposta do servidor. Repete o
          que o h1 e o texto dizem, por isso fica fora dos leitores de tela. */}
      <div className="not-found__exchange" aria-hidden="true">
        <p className="not-found__request">GET {pathname}</p>
        <p className="not-found__response">
          <span className="not-found__protocol">HTTP/1.1</span>
          <span className="not-found__status">404</span>
          <span className="not-found__reason">Not Found</span>
        </p>
      </div>

      <h1 className="page__title">{t.notFound.title}</h1>
      <p className="not-found__text">{t.notFound.details(pathname)}</p>

      <section className="not-found__pages" aria-labelledby="not-found-pages">
        <h2 id="not-found-pages" className="not-found__pages-title">
          {t.notFound.pagesTitle}
        </h2>
        <ul className="not-found__list">
          {pages.map(({ id, path }) => (
            <li key={id}>
              <Link className="not-found__link" to={href(path)}>
                <span className="not-found__link-name">
                  {t.navbar.links[id]}
                </span>{" "}
                <span className="not-found__link-description">
                  {t.notFound.pages[id]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
