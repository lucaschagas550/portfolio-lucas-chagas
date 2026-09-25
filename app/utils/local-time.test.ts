import { describe, expect, it } from "vitest";

import { formatLocalTime } from "~/utils/local-time";

describe("formatLocalTime", () => {
  // 17:32 UTC é 14:32 em Brasília (UTC-3).
  const date = new Date("2030-01-01T17:32:00Z");

  it("formata a hora de Brasília em 24 horas em português", () => {
    expect(formatLocalTime(date, "pt")).toBe("14:32");
  });

  it("formata a hora de Brasília em 12 horas em inglês", () => {
    expect(formatLocalTime(date, "en")).toBe("2:32 PM");
  });

  it("usa Brasília mesmo quando a data cruza a meia-noite em UTC", () => {
    const lateUtc = new Date("2030-01-02T01:05:00Z");

    expect(formatLocalTime(lateUtc, "pt")).toBe("22:05");
  });
});
