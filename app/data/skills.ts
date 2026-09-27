import type { TechIconSlug } from "~/data/tech-stack";
import type { LocalizedText } from "~/i18n/localize";

// Fonte: currículo (public/curriculo-lucas-chagas.pdf), export do LinkedIn e a
// nota "Habilidades" do cofre Obsidian. Sem nível de proficiência: a
// especialidade é mostrada pelo destaque visual, não por percentuais.
export type Skill = {
  name: LocalizedText;
  iconSlug?: TechIconSlug;
};

export type ComplementaryCategoryId =
  | "architecture"
  | "data"
  | "integrations"
  | "frontend"
  | "devops"
  | "quality"
  | "ai"
  | "agile";

export type SkillCategory<Id extends string> = {
  id: Id;
  skills: Skill[];
};

export const specialty: SkillCategory<"dotnet"> = {
  id: "dotnet",
  skills: [
    { name: "C#", iconSlug: "csharp" },
    { name: ".NET / .NET Core", iconSlug: "dotnetcore" },
    { name: "ASP.NET Core Web API", iconSlug: "dotnetcore" },
    { name: "ASP.NET Core MVC", iconSlug: "dotnetcore" },
    { name: "Entity Framework Core", iconSlug: "dotnetcore" },
    { name: "Dapper" },
    { name: { pt: "APIs REST", en: "REST APIs" }, iconSlug: "openapi" },
    { name: "WebSocket" },
    { name: "SignalR" },
    { name: "Hangfire" },
    { name: "ASP.NET Core Identity", iconSlug: "dotnetcore" },
    {
      name: {
        pt: "xUnit (testes unitários e de integração)",
        en: "xUnit (unit and integration tests)",
      },
    },
    { name: "Blazor", iconSlug: "blazor" },
    { name: "Xamarin", iconSlug: "xamarin" },
  ],
};

export const complementarySkills: SkillCategory<ComplementaryCategoryId>[] = [
  {
    id: "architecture",
    skills: [
      { name: "SOLID" },
      { name: { pt: "Microsserviços", en: "Microservices" } },
      { name: "Clean Architecture" },
      { name: "Multi-tenant" },
      { name: "MVC" },
      { name: "Micro Frontends" },
    ],
  },
  {
    id: "data",
    skills: [
      { name: "SQL Server", iconSlug: "mssql" },
      { name: "Oracle", iconSlug: "oracle" },
      { name: "PostgreSQL", iconSlug: "postgresql" },
      { name: "MongoDB", iconSlug: "mongodb" },
      { name: "Redis", iconSlug: "redis" },
      { name: "Pub/Sub" },
      { name: "RabbitMQ", iconSlug: "rabbitmq" },
      {
        name: {
          pt: "Procedures e triggers",
          en: "Stored procedures and triggers",
        },
      },
    ],
  },
  {
    id: "integrations",
    skills: [
      { name: { pt: "Gov.br (autenticação)", en: "Gov.br (authentication)" } },
      { name: "RFID" },
      { name: { pt: "Protocolo Modbus", en: "Modbus protocol" } },
      {
        name: {
          pt: "Relatórios em Excel e PDF",
          en: "Excel and PDF reports",
        },
      },
      {
        name: {
          pt: "Migração de dados legados",
          en: "Legacy data migration",
        },
      },
    ],
  },
  {
    id: "frontend",
    skills: [
      { name: "Angular", iconSlug: "angular" },
      { name: "AngularJS", iconSlug: "angularjs" },
      { name: "TypeScript", iconSlug: "typescript" },
      { name: "JavaScript", iconSlug: "javascript" },
      { name: "jQuery", iconSlug: "jquery" },
      { name: "HTML", iconSlug: "html5" },
      { name: "CSS", iconSlug: "css3" },
      { name: "React", iconSlug: "react" },
    ],
  },
  {
    id: "devops",
    skills: [
      { name: "Azure", iconSlug: "azure" },
      { name: "Azure DevOps", iconSlug: "azuredevops" },
      { name: "Docker", iconSlug: "docker" },
      { name: "Kubernetes", iconSlug: "kubernetes" },
      { name: "Git", iconSlug: "git" },
      { name: "GitLab", iconSlug: "gitlab" },
      { name: "CI/CD", iconSlug: "githubactions" },
      { name: "IIS" },
      { name: "Datadog", iconSlug: "datadog" },
    ],
  },
  {
    id: "quality",
    skills: [
      { name: "Code review" },
      {
        name: { pt: "Postman (testes de API)", en: "Postman (API testing)" },
        iconSlug: "postman",
      },
      {
        name: {
          pt: "Fortify (análise de vulnerabilidades)",
          en: "Fortify (vulnerability analysis)",
        },
      },
      { name: "HashiCorp Vault", iconSlug: "vault" },
    ],
  },
  {
    id: "ai",
    skills: [
      { name: "Claude (Anthropic)", iconSlug: "claude" },
      { name: "Claude Code", iconSlug: "claude" },
      {
        name: {
          pt: "Desenvolvimento assistido por IA",
          en: "AI-assisted development",
        },
      },
    ],
  },
  {
    id: "agile",
    skills: [
      { name: "Scrum" },
      { name: "Kanban" },
      { name: "SAFe" },
      { name: "Jira", iconSlug: "jira" },
    ],
  },
];
