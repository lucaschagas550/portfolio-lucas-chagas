import type { EducationId } from "~/data/education";
import type { Skill } from "~/data/skills";
import type { LocalizedText } from "~/i18n/localize";

// Trajetória para a página História. Fonte: export do LinkedIn (datas) e a
// nota "Experiência profissional" do cofre Obsidian. A ordem dos arrays é a
// ordem na tela: do mais recente para o mais antigo.

export type CareerRole = {
  title: LocalizedText;
  // "AAAA-MM"; sem `end` o cargo é o atual.
  start: string;
  end?: string;
};

export type CareerAchievement = {
  // Número em destaque (ex.: "94%"), igual nos dois idiomas.
  metric?: string;
  text: LocalizedText;
};

export type WorkMode = "remote" | "hybrid";

export type CareerJobEntry = {
  kind: "job";
  id: string;
  company: string;
  location: string;
  workMode?: WorkMode;
  // Ano mostrado na linha do tempo (início na empresa).
  year: number;
  roles: CareerRole[];
  summary?: LocalizedText;
  achievements: CareerAchievement[];
  stack: Skill[];
};

export type CareerMilestone = {
  kind: "education";
  educationId: EducationId;
  // Ano de conclusão, que define a posição entre os empregos.
  year: number;
};

export type CareerEntry = CareerJobEntry | CareerMilestone;

const intern = { pt: "Estagiário de desenvolvimento", en: "Software intern" };
const midLevel = { pt: "Desenvolvedor pleno", en: "Mid-level developer" };

export const careerTimeline: CareerEntry[] = [
  {
    kind: "job",
    id: "fagron",
    company: "Fagron Tech",
    location: "Jundiaí, SP",
    workMode: "remote",
    year: 2026,
    roles: [
      {
        title: { pt: "Desenvolvedor sênior", en: "Senior developer" },
        start: "2026-01",
      },
    ],
    summary: {
      pt: "Soluções para o setor farmacêutico, com foco na evolução da área de CRM do sistema, em uma arquitetura de microsserviços, micro frontends e multi-tenant.",
      en: "Solutions for the pharmaceutical sector, focused on evolving the system's CRM area, on a microservices, micro frontends and multi-tenant architecture.",
    },
    achievements: [],
    stack: [
      { name: "C#", iconSlug: "csharp" },
      { name: ".NET", iconSlug: "dotnetcore" },
      { name: "ASP.NET Core Web API", iconSlug: "dotnetcore" },
      { name: "Dapper" },
      { name: "SQL Server", iconSlug: "mssql" },
      { name: "MongoDB", iconSlug: "mongodb" },
      { name: "Redis", iconSlug: "redis" },
      { name: "RabbitMQ", iconSlug: "rabbitmq" },
      { name: "WebSocket" },
      { name: "Angular", iconSlug: "angular" },
      { name: "AngularJS", iconSlug: "angularjs" },
      { name: "JavaScript", iconSlug: "javascript" },
      { name: "HTML", iconSlug: "html5" },
      { name: "CSS", iconSlug: "css3" },
      { name: "Azure", iconSlug: "azure" },
      { name: "Datadog", iconSlug: "datadog" },
      { name: "Postman", iconSlug: "postman" },
      { name: "Git", iconSlug: "git" },
      { name: "SOLID" },
      { name: "Scrum" },
    ],
  },
  { kind: "education", educationId: "puc", year: 2024 },
  {
    kind: "job",
    id: "montreal",
    company: "Montreal",
    location: "São Paulo, SP",
    workMode: "remote",
    year: 2023,
    roles: [{ title: midLevel, start: "2023-12", end: "2026-01" }],
    summary: {
      pt: "Setor público, em sistemas institucionais de grande porte. Entrei com o primeiro projeto em andamento e o levei até a homologação; o segundo acompanhei do início até a produção.",
      en: "Public sector, on large institutional systems. I joined the first project mid-way and took it to user acceptance; I followed the second from kickoff to production.",
    },
    achievements: [
      {
        text: {
          pt: "Corrigi todas as vulnerabilidades severas e críticas apontadas pelo Fortify, deixando o projeto livre de falhas de segurança.",
          en: "Fixed every severe and critical vulnerability flagged by Fortify, leaving the project free of security flaws.",
        },
      },
      {
        text: {
          pt: "Criei o controle de permissões por perfil de usuário com ASP.NET Core Identity, nos dois projetos.",
          en: "Built role-based user permissions with ASP.NET Core Identity on both projects.",
        },
      },
      {
        text: {
          pt: "Integrei a autenticação com o Gov.br.",
          en: "Integrated authentication with Gov.br.",
        },
      },
      {
        text: {
          pt: "Implementei o pipeline de CI/CD com a configuração de cada ambiente.",
          en: "Implemented the CI/CD pipeline with per-environment configuration.",
        },
      },
      {
        text: {
          pt: "Desenvolvi relatórios em Excel e PDF e participei da migração de dados do sistema legado.",
          en: "Built Excel and PDF reports and took part in migrating data from the legacy system.",
        },
      },
    ],
    stack: [
      { name: "C#", iconSlug: "csharp" },
      { name: ".NET", iconSlug: "dotnetcore" },
      { name: "ASP.NET Core Web API", iconSlug: "dotnetcore" },
      { name: "ASP.NET Core MVC", iconSlug: "dotnetcore" },
      { name: "ASP.NET Core Identity", iconSlug: "dotnetcore" },
      { name: "Entity Framework", iconSlug: "dotnetcore" },
      { name: "Dapper" },
      { name: "SQL Server", iconSlug: "mssql" },
      { name: "JavaScript", iconSlug: "javascript" },
      { name: "jQuery", iconSlug: "jquery" },
      { name: "HTML", iconSlug: "html5" },
      { name: "CSS", iconSlug: "css3" },
      { name: "Azure", iconSlug: "azure" },
      { name: "Azure DevOps", iconSlug: "azuredevops" },
      { name: "IIS" },
      { name: "Postman", iconSlug: "postman" },
      { name: "Git", iconSlug: "git" },
      { name: "SOLID" },
      { name: "Scrum" },
    ],
  },
  {
    kind: "job",
    id: "eldorado",
    company: "Instituto de Pesquisas Eldorado",
    location: "Rio Grande do Sul",
    workMode: "remote",
    year: 2022,
    roles: [{ title: midLevel, start: "2022-06", end: "2023-11" }],
    summary: {
      pt: "Área de pesquisa e desenvolvimento (P&D), aplicando conhecimento científico e tecnológico para inovar.",
      en: "Research and development (R&D), applying scientific and technical knowledge to innovate.",
    },
    achievements: [
      {
        metric: "94%",
        text: {
          pt: "de cobertura de testes, com centenas de testes unitários em xUnit.",
          en: "test coverage, with hundreds of xUnit unit tests.",
        },
      },
      {
        metric: "10×",
        text: {
          pt: "mais rápido: o processo principal da aplicação depois da melhoria de performance.",
          en: "faster: the application's main process after the performance work.",
        },
      },
      {
        metric: "10/10",
        text: {
          pt: "foi a nota do cliente para o projeto.",
          en: "was the client's rating for the project.",
        },
      },
      {
        text: {
          pt: "Implementei SignalR com Redis para acompanhar o processo principal em tempo real, com a aplicação rodando na nuvem.",
          en: "Implemented SignalR with Redis to follow the main process in real time, with the application running in the cloud.",
        },
      },
      {
        text: {
          pt: "Comparei a performance de Entity Framework Core e Dapper; o Dapper foi o mais rápido.",
          en: "Benchmarked Entity Framework Core against Dapper; Dapper was the faster one.",
        },
      },
      {
        text: {
          pt: "Configurei o deploy de uma aplicação Python no Kubernetes e ajudei a criar o pipeline automatizado.",
          en: "Set up the deployment of a Python application on Kubernetes and helped build its automated pipeline.",
        },
      },
    ],
    stack: [
      { name: "C#", iconSlug: "csharp" },
      { name: ".NET", iconSlug: "dotnetcore" },
      { name: { pt: "APIs REST", en: "REST APIs" }, iconSlug: "openapi" },
      { name: "xUnit" },
      { name: "SignalR" },
      { name: "WebSocket" },
      { name: "Dapper" },
      { name: "Redis", iconSlug: "redis" },
      { name: "Pub/Sub" },
      { name: "Oracle", iconSlug: "oracle" },
      { name: "Angular", iconSlug: "angular" },
      { name: "TypeScript", iconSlug: "typescript" },
      { name: "Docker", iconSlug: "docker" },
      { name: "Kubernetes", iconSlug: "kubernetes" },
      { name: "GitLab", iconSlug: "gitlab" },
      { name: "CI/CD", iconSlug: "githubactions" },
      { name: "HashiCorp Vault", iconSlug: "vault" },
      { name: "Jira", iconSlug: "jira" },
      { name: "Scrum" },
      { name: "Kanban" },
    ],
  },
  {
    kind: "job",
    id: "inobag",
    company: "Inobag",
    location: "Louveira, SP",
    workMode: "hybrid",
    year: 2021,
    roles: [
      { title: midLevel, start: "2022-01", end: "2022-06" },
      {
        title: { pt: "Desenvolvedor júnior", en: "Junior developer" },
        start: "2021-05",
        end: "2022-01",
      },
    ],
    summary: {
      pt: "Indústria de máquinas: software que conversa diretamente com o equipamento.",
      en: "Machinery manufacturer: software that talks directly to the equipment.",
    },
    achievements: [
      {
        text: {
          pt: "Analisei e implementei integrações RFID com dois fornecedores para escolher a melhor; o resultado virou uma funcionalidade nova da máquina da empresa.",
          en: "Analyzed and built RFID integrations with two vendors to pick the best one; the result became a new feature of the company's machine.",
        },
      },
      {
        text: {
          pt: "Implementei a comunicação pelo protocolo Modbus, ligando o back-end às ações da máquina.",
          en: "Implemented Modbus communication, connecting the back end to the machine's actions.",
        },
      },
      {
        text: {
          pt: "Participei de reuniões com clientes para entender seus desafios e propor soluções.",
          en: "Joined client meetings to understand their challenges and propose solutions.",
        },
      },
    ],
    stack: [
      { name: "C#", iconSlug: "csharp" },
      { name: ".NET Core", iconSlug: "dotnetcore" },
      { name: { pt: "APIs REST", en: "REST APIs" }, iconSlug: "openapi" },
      { name: "Entity Framework Core", iconSlug: "dotnetcore" },
      { name: "Hangfire" },
      { name: "PostgreSQL", iconSlug: "postgresql" },
      { name: "RFID" },
      { name: "Modbus" },
      { name: "Ext JS" },
      { name: "HTML", iconSlug: "html5" },
      { name: "CSS", iconSlug: "css3" },
      { name: "Jira", iconSlug: "jira" },
      { name: "Scrum" },
      { name: "Kanban" },
    ],
  },
  { kind: "education", educationId: "unip", year: 2020 },
  {
    kind: "job",
    id: "taker",
    company: "Taker IT",
    location: "Jundiaí, SP",
    workMode: "hybrid",
    year: 2020,
    roles: [
      {
        title: { pt: "Desenvolvedor trainee", en: "Trainee developer" },
        start: "2021-01",
        end: "2021-05",
      },
      { title: intern, start: "2020-04", end: "2020-12" },
    ],
    summary: {
      pt: "ERP JD Edwards EnterpriseOne: desenvolvimento em C#, manipulação de dados em Oracle, SQL Server e DB2 e documentação para GMUD.",
      en: "JD Edwards EnterpriseOne ERP: C# development, data work on Oracle, SQL Server and DB2, and change-management (GMUD) documentation.",
    },
    achievements: [],
    stack: [
      { name: "C#", iconSlug: "csharp" },
      { name: "Oracle JDE Tools", iconSlug: "oracle" },
      { name: "Oracle", iconSlug: "oracle" },
      { name: "SQL Server", iconSlug: "mssql" },
      { name: "DB2" },
      { name: "Scrum" },
      { name: "Kanban" },
    ],
  },
  {
    kind: "job",
    id: "elis",
    company: "ELIS",
    location: "Jundiaí, SP",
    year: 2020,
    roles: [{ title: intern, start: "2020-01", end: "2020-04" }],
    achievements: [],
    stack: [
      { name: "C#", iconSlug: "csharp" },
      { name: ".NET Core", iconSlug: "dotnetcore" },
      { name: "MVC" },
      { name: "SQL Server", iconSlug: "mssql" },
      { name: "Crystal Reports" },
      { name: "Azure DevOps", iconSlug: "azuredevops" },
    ],
  },
  {
    kind: "job",
    id: "cogna",
    company: "Cogna Educação",
    location: "Valinhos, SP",
    year: 2019,
    roles: [{ title: intern, start: "2019-08", end: "2020-01" }],
    summary: {
      pt: "O primeiro passo na tecnologia: .NET desde o primeiro dia.",
      en: "My first step into tech: .NET from day one.",
    },
    achievements: [],
    stack: [
      { name: "C#", iconSlug: "csharp" },
      { name: ".NET Core", iconSlug: "dotnetcore" },
      { name: "MVC" },
      { name: "PL/SQL", iconSlug: "oracle" },
      { name: "Azure DevOps", iconSlug: "azuredevops" },
      { name: "Scrum" },
    ],
  },
];

export const beforeTech: CareerJobEntry[] = [
  {
    kind: "job",
    id: "exercito",
    company: "Exército Brasileiro",
    location: "Jundiaí, SP",
    year: 2017,
    roles: [
      {
        title: { pt: "Soldado", en: "Soldier" },
        start: "2017-03",
        end: "2018-01",
      },
    ],
    achievements: [
      {
        text: {
          pt: "Recebi honra ao mérito pelo desempenho nos 11 meses de serviço.",
          en: "Received an honor of merit for my performance during 11 months of service.",
        },
      },
    ],
    stack: [],
  },
  {
    kind: "job",
    id: "astra",
    company: "Grupo Astra",
    location: "São Paulo, SP",
    year: 2014,
    roles: [
      {
        title: { pt: "Produção", en: "Production" },
        start: "2014-06",
        end: "2019-07",
      },
    ],
    achievements: [],
    stack: [],
  },
];

// Degraus da carreira na tecnologia, do primeiro ao atual.
export const roleProgression: { title: LocalizedText; year: number }[] = [
  { title: { pt: "Estagiário", en: "Intern" }, year: 2019 },
  { title: { pt: "Trainee", en: "Trainee" }, year: 2021 },
  { title: { pt: "Júnior", en: "Junior" }, year: 2021 },
  { title: { pt: "Pleno", en: "Mid-level" }, year: 2022 },
  { title: { pt: "Sênior", en: "Senior" }, year: 2026 },
];
