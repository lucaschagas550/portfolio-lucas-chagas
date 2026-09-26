import { describe, expect, it } from "vitest";

import { formatPeriod, formatYearMonth } from "~/utils/format-period";

describe("formatYearMonth", () => {
  it("formata mês e ano em português e em inglês", () => {
    expect(formatYearMonth("2026-01", "pt")).toBe("jan 2026");
    expect(formatYearMonth("2023-12", "en")).toBe("Dec 2023");
  });
});

describe("formatPeriod", () => {
  it("junta início e fim", () => {
    expect(formatPeriod("2023-12", "2026-01", "pt", "hoje")).toBe(
      "dez 2023 – jan 2026",
    );
  });

  it("usa o rótulo de até hoje quando não há fim", () => {
    expect(formatPeriod("2026-01", undefined, "pt", "hoje")).toBe(
      "jan 2026 – hoje",
    );
    expect(formatPeriod("2026-01", undefined, "en", "present")).toBe(
      "Jan 2026 – present",
    );
  });
});
