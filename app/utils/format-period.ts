import type { Locale } from "~/i18n/locale";

// Meses fixos por idioma (em vez de Intl) para o texto sair igual no servidor
// e no navegador.
const MONTHS: Record<Locale, string[]> = {
  pt: [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ],
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

// "2026-01" -> "jan 2026" (pt) / "Jan 2026" (en).
export function formatYearMonth(yearMonth: string, locale: Locale): string {
  const [year, month] = yearMonth.split("-");

  return `${MONTHS[locale][Number(month) - 1]} ${year}`;
}

// Período de um cargo; sem fim, usa o rótulo de "até hoje" recebido.
export function formatPeriod(
  start: string,
  end: string | undefined,
  locale: Locale,
  presentLabel: string,
): string {
  const endLabel = end ? formatYearMonth(end, locale) : presentLabel;

  return `${formatYearMonth(start, locale)} – ${endLabel}`;
}
