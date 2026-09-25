import type { Locale } from "~/i18n/locale";

// Brasília (UTC-3, sem horário de verão desde 2019).
const TIME_ZONE = "America/Sao_Paulo";

const intlLocale: Record<Locale, string> = { pt: "pt-BR", en: "en-US" };

// Hora atual em Brasília no formato do idioma: "14:32" (pt) ou "2:32 PM" (en).
export function formatLocalTime(date: Date, locale: Locale): string {
  return (
    new Intl.DateTimeFormat(intlLocale[locale], {
      hour: "numeric",
      minute: "2-digit",
      timeZone: TIME_ZONE,
    })
      .format(date)
      // Versões novas do ICU põem um espaço especial antes de AM/PM; \s o troca por um comum.
      .replace(/\s/g, " ")
  );
}
