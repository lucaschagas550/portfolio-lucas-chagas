import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { Footer } from "~/components/footer/footer";
import { Navbar } from "~/components/navbar/navbar";
import { htmlLang } from "~/i18n/locale";
import { useI18n } from "~/i18n/use-i18n";
import { themeScript } from "~/utils/theme-script";

import roboto400 from "@fontsource/roboto/files/roboto-latin-400-normal.woff2?url";

import type { Route } from "./+types/root";
import "@fontsource/roboto/latin-400.css";
import "@fontsource/roboto/latin-500.css";
import "@fontsource/roboto/latin-700.css";
import "./app.css";
import "./error-page.css";

// Fonte servida pelo próprio site; o peso do texto corrido é pré-carregado.
export const links: Route.LinksFunction = () => [
  {
    rel: "preload",
    href: roboto400,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n();

  return (
    <html lang={htmlLang[locale]} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { t } = useI18n();
  let message = t.errors.defaultTitle;
  let details = t.errors.defaultDetails;
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message =
      error.status === 404 ? t.errors.notFoundTitle : t.errors.genericTitle;
    details =
      error.status === 404
        ? t.errors.notFoundDetails
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="error-page">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="error-page__stack">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
