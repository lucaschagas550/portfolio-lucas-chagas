export type SocialLinkIcon = "github" | "linkedin" | "email";

export type SocialLink = {
  name: string;
  href: string;
  icon: SocialLinkIcon;
};

// Fonte única do endereço: a página Contato o exibe e o link "Email" deriva dele.
export const contactEmail = "lucasandrade595@gmail.com";

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/lucaschagas550",
    icon: "github",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/lucas-chagas-40624a163/",
    icon: "linkedin",
  },
  {
    name: "Email",
    href: `mailto:${contactEmail}`,
    icon: "email",
  },
];
