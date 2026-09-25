import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import { AvailabilityBadge } from "~/components/availability-badge/availability-badge";

function renderBadge(available: boolean, path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AvailabilityBadge available={available} />
    </MemoryRouter>,
  );
}

describe("AvailabilityBadge", () => {
  it("mostra a disponibilidade quando está disponível", () => {
    renderBadge(true);

    expect(
      screen.getByText("Disponível para novos projetos"),
    ).toBeInTheDocument();
  });

  it("não mostra nada quando não está disponível", () => {
    const { container } = renderBadge(false);

    expect(container).toBeEmptyDOMElement();
  });

  it("traduz o texto em inglês em /en", () => {
    renderBadge(true, "/en");

    expect(screen.getByText("Available for new projects")).toBeInTheDocument();
  });
});
