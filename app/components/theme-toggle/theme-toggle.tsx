import { useSyncExternalStore } from "react";

import { OutlineIcon } from "~/components/outline-icon/outline-icon";
import { useI18n } from "~/i18n/use-i18n";
import { classNames } from "~/utils/class-names";
import { THEME_STORAGE_KEY } from "~/utils/theme-script";

import "./theme-toggle.css";

const DARK_QUERY = "(prefers-color-scheme: dark)";

const SUN_ICON =
  "M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z";
const MOON_ICON = "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z";

// O tema vive no DOM (atributo do <html>) e no sistema, não em estado React:
// o componente só lê essas duas fontes e reage quando elas mudam.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  const media = window.matchMedia?.(DARK_QUERY);
  media?.addEventListener?.("change", onChange);

  return () => {
    observer.disconnect();
    media?.removeEventListener?.("change", onChange);
  };
}

function getIsDark() {
  const chosen = document.documentElement.dataset.theme;
  if (chosen) return chosen === "dark";

  return window.matchMedia?.(DARK_QUERY).matches ?? false;
}

// No servidor o tema é desconhecido: renderiza como claro e corrige ao hidratar.
const getServerIsDark = () => false;

// Alterna entre claro e escuro. Sem escolha salva, começa no tema do sistema.
export function ThemeToggle() {
  const { translations } = useI18n();
  const isDark = useSyncExternalStore(subscribe, getIsDark, getServerIsDark);

  function toggle() {
    const next = isDark ? "light" : "dark";

    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Sem localStorage (modo privado, por exemplo): o tema vale só nesta visita.
    }
  }

  return (
    <button
      type="button"
      className={classNames("theme-toggle", isDark && "theme-toggle--dark")}
      aria-pressed={isDark}
      onClick={toggle}
    >
      <span className="theme-toggle__label">
        {translations.themeToggle.label}
      </span>
      <OutlineIcon
        className="theme-toggle__icon"
        path={isDark ? SUN_ICON : MOON_ICON}
      />
    </button>
  );
}
