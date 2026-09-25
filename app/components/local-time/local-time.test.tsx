import { act, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";

import { LocalTime } from "~/components/local-time/local-time";

function wrap(path: string) {
  return (
    <MemoryRouter initialEntries={[path]}>
      <LocalTime />
    </MemoryRouter>
  );
}

describe("LocalTime", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("mostra o lugar e a hora de Brasília em português", () => {
    vi.useFakeTimers({ now: new Date("2030-01-01T17:32:00Z") });
    render(wrap("/"));

    expect(screen.getByText("Brasil, 14:32 (Brasília)")).toBeInTheDocument();
  });

  it("mostra a hora em 12 horas em inglês em /en", () => {
    vi.useFakeTimers({ now: new Date("2030-01-01T17:32:00Z") });
    render(wrap("/en"));

    expect(
      screen.getByText("Brazil, 2:32 PM (Brasília time)"),
    ).toBeInTheDocument();
  });

  it("atualiza a hora quando o minuto muda", () => {
    vi.useFakeTimers({ now: new Date("2030-01-01T17:32:00Z") });
    render(wrap("/"));

    act(() => {
      vi.advanceTimersByTime(60_000);
    });

    expect(screen.getByText("Brasil, 14:33 (Brasília)")).toBeInTheDocument();
  });

  it("para de atualizar depois de desmontar", () => {
    vi.useFakeTimers({ now: new Date("2030-01-01T17:32:00Z") });
    const { unmount } = render(wrap("/"));

    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });

  it("no servidor mostra só o lugar, sem a hora", () => {
    const html = renderToString(wrap("/"));

    expect(html).toContain("Brasil");
    expect(html).not.toMatch(/\d{1,2}:\d{2}/);
  });
});
