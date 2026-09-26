export type TechIconSlug =
  | "dotnet"
  | "dotnetcore"
  | "blazor"
  | "html5"
  | "css3"
  | "angular"
  | "react"
  | "mongodb"
  | "openapi"
  | "githubactions"
  | "csharp"
  | "xamarin"
  | "azure"
  | "mssql"
  | "typescript"
  | "javascript"
  | "angularjs"
  | "oracle"
  | "postgresql"
  | "redis"
  | "rabbitmq"
  | "docker"
  | "git"
  | "gitlab"
  | "jira"
  | "postman"
  | "kubernetes"
  | "jquery"
  | "azuredevops"
  | "datadog"
  | "vault"
  | "claude";

export type TechStackItem = {
  name: string;
  iconSlug?: TechIconSlug;
};

export const techStack: TechStackItem[] = [
  { name: ".NET Core", iconSlug: "dotnet" },
  { name: "C#", iconSlug: "csharp" },
  { name: "Xamarin", iconSlug: "xamarin" },
  { name: "API REST", iconSlug: "openapi" },
  { name: "ASP.NET Core", iconSlug: "dotnet" },
  { name: "Blazor", iconSlug: "blazor" },
  { name: "HTML", iconSlug: "html5" },
  { name: "CSS", iconSlug: "css3" },
  { name: "Angular", iconSlug: "angular" },
  { name: "React", iconSlug: "react" },
  { name: "SQL", iconSlug: "mssql" },
  { name: "MongoDB", iconSlug: "mongodb" },
  { name: "Azure", iconSlug: "azure" },
  { name: "CI/CD", iconSlug: "githubactions" },
];
