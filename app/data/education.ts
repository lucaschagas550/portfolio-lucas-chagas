import type { LocalizedText } from "~/i18n/localize";

// Formação acadêmica, da mais recente para a mais antiga. Só os anos: currículo
// e LinkedIn divergem nos meses.
export type Education = {
  degree: LocalizedText;
  institution: string;
  period: string;
};

export const education: Education[] = [
  {
    degree: {
      pt: "Pós-graduação lato sensu em Engenharia de Software",
      en: "Postgraduate specialization in Software Engineering",
    },
    institution: "PUC Minas",
    period: "2023 – 2024",
  },
  {
    degree: {
      pt: "Bacharelado em Ciência da Computação",
      en: "Bachelor's degree in Computer Science",
    },
    institution: "Universidade Paulista (UNIP)",
    period: "2017 – 2020",
  },
];
