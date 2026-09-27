import { courses } from "~/data/courses";

// Números de destaque da página Habilidades, todos reais (fonte: currículo,
// LinkedIn e a nota "Experiência profissional" do cofre Obsidian). Os
// rótulos ficam em translations.habilidades.stats.
export type HighlightId = "years" | "companies" | "coverage" | "courses";

export type Highlight = {
  id: HighlightId;
  value: number;
  suffix?: string;
};

export const highlights: Highlight[] = [
  { id: "years", value: 6, suffix: "+" },
  // Empresas de TI: Cogna, ELIS, Taker IT, Inobag, Eldorado, Montreal e Fagron.
  { id: "companies", value: 7 },
  // Cobertura de testes com xUnit no Instituto de Pesquisas Eldorado.
  { id: "coverage", value: 94, suffix: "%" },
  { id: "courses", value: courses.length },
];
