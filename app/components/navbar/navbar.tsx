import { useEffect, useId, useRef, useState } from "react";

import { LanguageSwitch } from "~/components/language-switch/language-switch";
import { NavItem } from "~/components/nav-item/nav-item";
import { ThemeToggle } from "~/components/theme-toggle/theme-toggle";
import { pages } from "~/data/pages";
import { useI18n } from "~/i18n/use-i18n";

import "./navbar.css";

// No celular o menu é um drawer; a partir do tablet o CSS o exibe em linha.
// O estado só controla o drawer, quem decide o layout por tela é o CSS.
export function Navbar() {
  const { t, href } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      toggleRef.current?.focus();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <header className="navbar surface-bar">
      <div className="navbar__bar">
        <div className="navbar__tools">
          <LanguageSwitch />
          <ThemeToggle />
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="navbar__toggle"
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-label={isOpen ? t.navbar.closeMenu : t.navbar.openMenu}
          onClick={() => setIsOpen((open) => !open)}
        >
          <svg
            className="navbar__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {isOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {isOpen && (
          <button
            type="button"
            className="navbar__backdrop"
            aria-hidden="true"
            tabIndex={-1}
            onClick={close}
          />
        )}

        <nav
          id={menuId}
          className={isOpen ? "navbar__nav navbar__nav--open" : "navbar__nav"}
          aria-label={t.navbar.navLabel}
        >
          <p className="navbar__title">{t.navbar.menuTitle}</p>
          <ul className="navbar__list">
            {pages.map(({ id, path }) => (
              // end: true na página inicial evita que ela fique "ativa" em
              // qualquer rota (todo caminho começa com "/").
              <li key={id} className="navbar__item">
                <NavItem to={href(path)} end={path === "/"} onClick={close}>
                  {t.navbar.links[id]}
                </NavItem>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
