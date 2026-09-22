export type SocialLinkIcon = "github" | "linkedin" | "email";

export type SocialLink = {
  name: string;
  href: string;
  icon: SocialLinkIcon;
};

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
    href: "mailto:lucasandrade595@gmail.com",
    icon: "email",
  },
];
