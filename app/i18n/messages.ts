import type { Locale } from "~/i18n/locale";

// O português é a fonte do tipo: o inglês precisa ter exatamente as mesmas
// chaves, senão o TypeScript acusa. Nomes próprios (GitHub, React...) não
// entram aqui.
const pt = {
  common: {
    underConstruction: "Em construção.",
  },
  navbar: {
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    navLabel: "Principal",
    menuTitle: "Menu",
    links: {
      home: "Início",
      habilidades: "Habilidades",
      historia: "História",
      contato: "Contato",
    },
  },
  languageSwitch: {
    text: "EN",
    label: "English",
  },
  themeToggle: {
    label: "Modo escuro",
  },
  availability: {
    available: "Disponível para novos projetos",
  },
  location: {
    // A hora só existe no cliente; antes disso mostra apenas o lugar.
    label: (time?: string) => (time ? `Brasil, ${time} (Brasília)` : "Brasil"),
  },
  resume: {
    label: "Baixar currículo",
  },
  footer: {
    credits: "Construído e desenvolvido por Lucas Chagas",
    heart: "coração roxo",
    tech: "Feito com React + TypeScript.",
    copyright: (year: number) =>
      `© ${year} Lucas Chagas. Todos os direitos reservados.`,
    sourceCode: "Ver código no GitHub",
    backToTop: "Voltar ao topo",
  },
  home: {
    meta: {
      title: "Lucas Chagas | Portfólio",
      description: "Portfólio de Lucas Chagas.",
    },
    role: "Senior Full Stack Engineer",
    aboutTitle: "Sobre mim",
    about: [
      "Com 6 anos de experiência em desenvolvimento de software, atuo na criação de soluções que buscam simplificar processos, resolver problemas reais e proporcionar uma melhor experiência aos usuários.",
      "Ao longo da minha trajetória, venho trabalhando com tecnologias como .NET Core, C#, Xamarin, APIs REST, ASP.NET Core, Blazor, HTML, CSS, Angular, React, SQL, Azure e práticas de CI/CD, sempre buscando evoluir tecnicamente e acompanhar as constantes transformações do mercado de tecnologia.",
      "Mais do que a escolha de uma tecnologia específica, acredito que o desenvolvimento de software deve estar orientado à entrega de valor. Por isso, meu foco está na construção de soluções eficientes, escaláveis, funcionais e intuitivas, combinando qualidade técnica, boas práticas de desenvolvimento e uma experiência positiva para quem utiliza o produto.",
    ],
    techLabel: "Tecnologias",
  },
  habilidades: {
    meta: {
      title: "Habilidades | Lucas Chagas",
      description: "Tecnologias e habilidades de Lucas Chagas.",
    },
    title: "Habilidades",
  },
  historia: {
    meta: {
      title: "História | Lucas Chagas",
      description: "A trajetória profissional de Lucas Chagas.",
    },
    title: "História",
  },
  contato: {
    meta: {
      title: "Contato | Lucas Chagas",
      description: "Entre em contato com Lucas Chagas.",
    },
    title: "Contato",
  },
  errors: {
    defaultTitle: "Ops!",
    defaultDetails: "Ocorreu um erro inesperado.",
    notFoundTitle: "404",
    notFoundDetails: "A página solicitada não foi encontrada.",
    genericTitle: "Erro",
  },
};

export type Messages = typeof pt;

const en: Messages = {
  common: {
    underConstruction: "Under construction.",
  },
  navbar: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    navLabel: "Main",
    menuTitle: "Menu",
    links: {
      home: "Home",
      habilidades: "Skills",
      historia: "Story",
      contato: "Contact",
    },
  },
  languageSwitch: {
    text: "PT",
    label: "Português",
  },
  themeToggle: {
    label: "Dark mode",
  },
  availability: {
    available: "Available for new projects",
  },
  location: {
    label: (time?: string) =>
      time ? `Brazil, ${time} (Brasília time)` : "Brazil",
  },
  resume: {
    label: "Download resume",
  },
  footer: {
    credits: "Built and developed by Lucas Chagas",
    heart: "purple heart",
    tech: "Made with React + TypeScript.",
    copyright: (year: number) => `© ${year} Lucas Chagas. All rights reserved.`,
    sourceCode: "View source on GitHub",
    backToTop: "Back to top",
  },
  home: {
    meta: {
      title: "Lucas Chagas | Portfolio",
      description: "Lucas Chagas' portfolio.",
    },
    role: "Senior Full Stack Engineer",
    aboutTitle: "About me",
    about: [
      "With 6 years of experience in software development, I build solutions that simplify processes, solve real problems and give users a better experience.",
      "Throughout my career I have worked with technologies such as .NET Core, C#, Xamarin, REST APIs, ASP.NET Core, Blazor, HTML, CSS, Angular, React, SQL, Azure and CI/CD practices, always looking to grow technically and keep up with the constant changes in the technology market.",
      "More than choosing a specific technology, I believe software development should be driven by delivering value. That is why my focus is on building efficient, scalable, functional and intuitive solutions, combining technical quality, good development practices and a positive experience for the people who use the product.",
    ],
    techLabel: "Technologies",
  },
  habilidades: {
    meta: {
      title: "Skills | Lucas Chagas",
      description: "Technologies and skills of Lucas Chagas.",
    },
    title: "Skills",
  },
  historia: {
    meta: {
      title: "Story | Lucas Chagas",
      description: "The professional journey of Lucas Chagas.",
    },
    title: "Story",
  },
  contato: {
    meta: {
      title: "Contact | Lucas Chagas",
      description: "Get in touch with Lucas Chagas.",
    },
    title: "Contact",
  },
  errors: {
    defaultTitle: "Oops!",
    defaultDetails: "An unexpected error occurred.",
    notFoundTitle: "404",
    notFoundDetails: "The requested page could not be found.",
    genericTitle: "Error",
  },
};

export const messages: Record<Locale, Messages> = { pt, en };
