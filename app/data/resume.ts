import type { Locale } from "~/i18n/locale";

// Arquivos em public/. Enquanto não houver um currículo em inglês, os dois
// idiomas usam o mesmo PDF; quando existir, troque o caminho de "en".
export const resumeFiles: Record<Locale, string> = {
  pt: "/curriculo-lucas-chagas.pdf",
  en: "/curriculo-lucas-chagas.pdf",
};
