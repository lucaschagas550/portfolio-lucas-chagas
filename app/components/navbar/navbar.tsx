import { useEffect, useId, useRef, useState } from "react";

import { NavItem } from "~/components/nav-item/nav-item";

import "./navbar.css";

// end: true no Início evita que ele fique "ativo" em qualquer rota
// (todo caminho começa com "/", então o NavLink precisa de match exato).
const navLinks = [
  { to: "/", label: "Início", end: true },
  { to: "/habilidades", label: "Habilidades" },
  { to: "/historia", label: "História" },
  { to: "/contato", label: "Contato" },
];

// No celular o menu é um drawer; a partir do tablet o CSS o exibe em linha.
// O estado só controla o drawer, quem decide o layout por tela é o CSS.
export function Navbar() {
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
    <header className="navbar">
      <div className="navbar__bar">
        <button
          ref={toggleRef}
          type="button"
          className="navbar__toggle"
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
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
          aria-label="Principal"
        >
          <p className="navbar__title">Menu</p>
          <ul className="navbar__list">
            {navLinks.map(({ to, label, end }) => (
              <li key={to} className="navbar__item">
                <NavItem to={to} end={end} onClick={close}>
                  {label}
                </NavItem>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
