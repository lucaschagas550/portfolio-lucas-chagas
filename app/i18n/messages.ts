import type { Locale } from "~/i18n/locale";

// O português é a fonte do tipo: o inglês precisa ter exatamente as mesmas
// chaves, senão o TypeScript acusa. Nomes próprios (GitHub, React...) não
// entram aqui.
const pt = {
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
  contactEmail: {
    copy: "Copiar e-mail",
    copied: "E-mail copiado",
    write: "Escrever e-mail",
    copyError: "Não foi possível copiar. Selecione o endereço acima.",
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
    intro:
      "Sou desenvolvedor full-stack especializado no ecossistema .NET. Há mais de 6 anos projeto e mantenho APIs, integrações e serviços em C# e ASP.NET Core, do banco de dados à mensageria, para sistemas que precisam ser confiáveis, performáticos e fáceis de evoluir.",
    statsLabel: "Destaques",
    stats: {
      years: "anos de experiência",
      companies: "empresas de tecnologia",
      coverage: "de cobertura de testes em projeto .NET",
      courses: "cursos e certificações",
    },
    specialty: {
      label: "Especialidade",
      title: "Back-end .NET",
      description:
        "O núcleo da minha carreira: .NET em todas as empresas por onde passei, de estagiário a desenvolvedor sênior, construindo APIs, microsserviços e integrações em produção.",
    },
    complementaryTitle: "Competências complementares",
    categories: {
      architecture: "Arquitetura",
      data: "Dados e mensageria",
      integrations: "Integrações",
      frontend: "Front-end",
      devops: "DevOps e nuvem",
      quality: "Qualidade e segurança",
      ai: "Inteligência artificial",
      agile: "Métodos ágeis",
    },
    educationTitle: "Formação acadêmica",
    coursesTitle: "Cursos e certificações",
  },
  historia: {
    meta: {
      title: "História | Lucas Chagas",
      description: "A trajetória profissional de Lucas Chagas.",
    },
    title: "História",
    intro:
      "Antes da tecnologia, trabalhei na área de produção e servi no Exército. Em 2019 entrei como estagiário de desenvolvimento e, desde então, o .NET esteve presente em todas as empresas por onde passei. Hoje sou desenvolvedor full-stack sênior.",
    ladderLabel: "Evolução de cargos",
    timelineTitle: "Trajetória",
    beforeTechTitle: "Antes da tecnologia",
    current: "Atual",
    present: "hoje",
    workMode: {
      remote: "Remoto",
      hybrid: "Híbrido",
    },
    achievementsLabel: "Conquistas",
    stackToggle: (count: number) => `Tecnologias usadas (${count})`,
  },
  contato: {
    meta: {
      title: "Contato | Lucas Chagas",
      description:
        "Fale com Lucas Chagas, desenvolvedor full-stack especializado em .NET: e-mail, LinkedIn, GitHub e currículo.",
    },
    title: "Contato",
    intro:
      "Quer conversar sobre uma vaga, um projeto ou uma ideia em .NET? O caminho mais rápido é o e-mail: conte a empresa, o desafio e o formato de trabalho que você imagina.",
    channelsTitle: "Outros canais",
    channels: {
      linkedin: "Histórico profissional e mensagens",
      github: "Código e projetos pessoais",
    },
    resumeTitle: "Currículo",
    resumeDescription: "Versão em PDF para compartilhar",
    newTab: "(abre em nova aba)",
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
  contactEmail: {
    copy: "Copy email",
    copied: "Email copied",
    write: "Write an email",
    copyError: "Couldn't copy. Select the address above.",
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
    intro:
      "I am a full-stack developer specialized in the .NET ecosystem. For more than 6 years I have designed and maintained APIs, integrations and services in C# and ASP.NET Core, from the database to messaging, for systems that need to be reliable, fast and easy to evolve.",
    statsLabel: "Highlights",
    stats: {
      years: "years of experience",
      companies: "technology companies",
      coverage: "test coverage on a .NET project",
      courses: "courses and certifications",
    },
    specialty: {
      label: "Specialty",
      title: ".NET back-end",
      description:
        "The core of my career: .NET at every company I have worked for, from intern to senior developer, building APIs, microservices and integrations in production.",
    },
    complementaryTitle: "Complementary skills",
    categories: {
      architecture: "Architecture",
      data: "Data and messaging",
      integrations: "Integrations",
      frontend: "Front-end",
      devops: "DevOps and cloud",
      quality: "Quality and security",
      ai: "Artificial intelligence",
      agile: "Agile methods",
    },
    educationTitle: "Education",
    coursesTitle: "Courses and certifications",
  },
  historia: {
    meta: {
      title: "Story | Lucas Chagas",
      description: "The professional journey of Lucas Chagas.",
    },
    title: "Story",
    intro:
      "Before tech, I worked in production and served in the Brazilian Army. In 2019 I started as a software intern and, since then, .NET has been part of every company I've worked for. Today I'm a senior full-stack developer.",
    ladderLabel: "Career progression",
    timelineTitle: "Career path",
    beforeTechTitle: "Before tech",
    current: "Current",
    present: "present",
    workMode: {
      remote: "Remote",
      hybrid: "Hybrid",
    },
    achievementsLabel: "Achievements",
    stackToggle: (count: number) => `Technologies used (${count})`,
  },
  contato: {
    meta: {
      title: "Contact | Lucas Chagas",
      description:
        "Get in touch with Lucas Chagas, a full-stack developer specialized in .NET: email, LinkedIn, GitHub and resume.",
    },
    title: "Contact",
    intro:
      "Want to talk about a role, a project or an idea in .NET? Email is the fastest way: tell me about the company, the challenge and the kind of work arrangement you have in mind.",
    channelsTitle: "Other channels",
    channels: {
      linkedin: "Work history and messages",
      github: "Code and side projects",
    },
    resumeTitle: "Resume",
    resumeDescription: "PDF version to share",
    newTab: "(opens in a new tab)",
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
