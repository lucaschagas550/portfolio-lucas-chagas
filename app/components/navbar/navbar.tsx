import { useEffect, useId, useRef, useState } from "react";

import { LanguageSwitch } from "~/components/language-switch/language-switch";
import { NavItem } from "~/components/nav-item/nav-item";
import { OutlineIcon } from "~/components/outline-icon/outline-icon";
import { ThemeToggle } from "~/components/theme-toggle/theme-toggle";
import { pages } from "~/data/pages";
import { useI18n } from "~/i18n/use-i18n";
import { classNames } from "~/utils/class-names";

import "./navbar.css";

const MENU_ICON = "M4 6h16M4 12h16M4 18h16";
const CLOSE_ICON = "M6 6l12 12M18 6L6 18";

// No celular o menu é um drawer; a partir do tablet o CSS o exibe em linha.
// O estado só controla o drawer, quem decide o layout por tela é o CSS.
export function Navbar() {
  const { translations, localizePath } = useI18n();
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
          aria-label={
            isOpen
              ? translations.navbar.closeMenu
              : translations.navbar.openMenu
          }
          onClick={() => setIsOpen((open) => !open)}
        >
          <OutlineIcon
            className="navbar__icon"
            path={isOpen ? CLOSE_ICON : MENU_ICON}
          />
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
          className={classNames("navbar__nav", isOpen && "navbar__nav--open")}
          aria-label={translations.navbar.navLabel}
        >
          <p className="navbar__title">{translations.navbar.menuTitle}</p>
          <ul className="navbar__list">
            {pages.map(({ id, path }) => (
              // end: true na página inicial evita que ela fique "ativa" em
              // qualquer rota (todo caminho começa com "/").
              <li key={id} className="navbar__item">
                <NavItem
                  to={localizePath(path)}
                  end={path === "/"}
                  onClick={close}
                >
                  {translations.navbar.links[id]}
                </NavItem>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
