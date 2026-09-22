import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SocialLinks } from "~/components/social-links/social-links";

describe("SocialLinks", () => {
  it("exibe os links de GitHub, LinkedIn e Email com os destinos corretos", () => {
    render(<SocialLinks />);

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/lucaschagas550",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/lucas-chagas-40624a163/",
    );
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:lucasandrade595@gmail.com",
    );
  });

  it("abre GitHub e LinkedIn em uma nova aba, mas não o Email", () => {
    render(<SocialLinks />);

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(screen.getByRole("link", { name: "Email" })).not.toHaveAttribute(
      "target",
    );
  });

  it("exibe um tooltip com o nome da rede em cada link", () => {
    render(<SocialLinks />);

    expect(
      within(screen.getByRole("link", { name: "GitHub" })).getByText("GitHub"),
    ).toHaveClass("social-links__tooltip");
    expect(
      within(screen.getByRole("link", { name: "LinkedIn" })).getByText(
        "LinkedIn",
      ),
    ).toHaveClass("social-links__tooltip");
    expect(
      within(screen.getByRole("link", { name: "Email" })).getByText("Email"),
    ).toHaveClass("social-links__tooltip");
  });
});
