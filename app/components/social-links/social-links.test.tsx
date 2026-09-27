import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SocialLinks } from "~/components/social-links/social-links";
import { socialLinks } from "~/data/social-links";

describe("SocialLinks", () => {
  it("exibe os links de GitHub, LinkedIn e Email com os destinos corretos", () => {
    render(<SocialLinks links={socialLinks} />);

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

  it("exibe só os links recebidos", () => {
    render(
      <SocialLinks
        links={[
          { name: "GitHub", href: "https://github.com/x", icon: "github" },
        ]}
      />,
    );

    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/x",
    );
  });

  it("abre GitHub e LinkedIn em uma nova aba, mas não o Email", () => {
    render(<SocialLinks links={socialLinks} />);

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
    render(<SocialLinks links={socialLinks} />);

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
