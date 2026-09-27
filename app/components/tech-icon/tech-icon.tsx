import angularIcon from "devicon/icons/angular/angular-original.svg";
import angularjsIcon from "devicon/icons/angularjs/angularjs-original.svg";
import azureIcon from "devicon/icons/azure/azure-original.svg";
import azuredevopsIcon from "devicon/icons/azuredevops/azuredevops-original.svg";
import csharpIcon from "devicon/icons/csharp/csharp-original.svg";
import css3Icon from "devicon/icons/css3/css3-original.svg";
import datadogIcon from "devicon/icons/datadog/datadog-original.svg";
import dockerIcon from "devicon/icons/docker/docker-original.svg";
import dotnetcoreIcon from "devicon/icons/dotnetcore/dotnetcore-original.svg";
import gitIcon from "devicon/icons/git/git-original.svg";
import gitlabIcon from "devicon/icons/gitlab/gitlab-original.svg";
import javascriptIcon from "devicon/icons/javascript/javascript-original.svg";
import jiraIcon from "devicon/icons/jira/jira-original.svg";
import jqueryIcon from "devicon/icons/jquery/jquery-original.svg";
import kubernetesIcon from "devicon/icons/kubernetes/kubernetes-original.svg";
import mssqlIcon from "devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg";
import oracleIcon from "devicon/icons/oracle/oracle-original.svg";
import postgresqlIcon from "devicon/icons/postgresql/postgresql-original.svg";
import postmanIcon from "devicon/icons/postman/postman-original.svg";
import rabbitmqIcon from "devicon/icons/rabbitmq/rabbitmq-original.svg";
import redisIcon from "devicon/icons/redis/redis-original.svg";
import typescriptIcon from "devicon/icons/typescript/typescript-original.svg";
import vaultIcon from "devicon/icons/vault/vault-original.svg";
import xamarinIcon from "devicon/icons/xamarin/xamarin-original.svg";
import {
  siBlazor,
  siClaude,
  siDotnet,
  siGithubactions,
  siHtml5,
  siMongodb,
  siOpenapiinitiative,
  siReact,
} from "simple-icons";

import type { TechIconSlug } from "~/data/tech-stack";
import { classNames } from "~/utils/class-names";

import "./tech-icon.css";

const brandIcons: Partial<Record<TechIconSlug, { path: string; hex: string }>> =
  {
    dotnet: siDotnet,
    blazor: siBlazor,
    html5: siHtml5,
    react: siReact,
    mongodb: siMongodb,
    openapi: siOpenapiinitiative,
    githubactions: siGithubactions,
    claude: siClaude,
  };

const imageIcons: Partial<Record<TechIconSlug, string>> = {
  csharp: csharpIcon,
  xamarin: xamarinIcon,
  azure: azureIcon,
  mssql: mssqlIcon,
  css3: css3Icon,
  angular: angularIcon,
  angularjs: angularjsIcon,
  typescript: typescriptIcon,
  javascript: javascriptIcon,
  oracle: oracleIcon,
  postgresql: postgresqlIcon,
  redis: redisIcon,
  rabbitmq: rabbitmqIcon,
  docker: dockerIcon,
  // Logo redondo: legível em fundo claro ou escuro, ao contrário do wordmark
  // de `dotnet` (que segue no letreiro da home, de fundo roxo).
  dotnetcore: dotnetcoreIcon,
  git: gitIcon,
  gitlab: gitlabIcon,
  jira: jiraIcon,
  postman: postmanIcon,
  kubernetes: kubernetesIcon,
  jquery: jqueryIcon,
  azuredevops: azuredevopsIcon,
  datadog: datadogIcon,
  vault: vaultIcon,
};

const GENERIC_ICON_PATH =
  "M9.4 6 3.4 12l6 6 1.4-1.4L6.2 12l4.6-4.6L9.4 6Zm5.2 0-1.4 1.4L17.8 12l-4.6 4.6L14.6 18l6-6-6-6Z";

type TechIconProps = {
  // Sem slug (ou sem ícone para ele) mostra um ícone genérico de código.
  iconSlug?: TechIconSlug;
  className?: string;
};

// Ícone decorativo: o nome da tecnologia sempre aparece em texto ao lado.
export function TechIcon({ iconSlug, className }: TechIconProps) {
  const classes = classNames("tech-icon", className);
  const imageSrc = iconSlug ? imageIcons[iconSlug] : undefined;

  if (imageSrc) {
    // `lazy`: na História os ícones ficam num <details> fechado e só são
    // baixados quando alguém o abre. O tamanho real vem do CSS.
    return (
      <img
        src={imageSrc}
        alt=""
        aria-hidden="true"
        width={16}
        height={16}
        loading="lazy"
        className={classes}
      />
    );
  }

  const brandIcon = iconSlug ? brandIcons[iconSlug] : undefined;

  return (
    <svg
      viewBox="0 0 24 24"
      className={classes}
      aria-hidden="true"
      style={brandIcon ? { fill: `#${brandIcon.hex}` } : undefined}
    >
      <path d={brandIcon ? brandIcon.path : GENERIC_ICON_PATH} />
    </svg>
  );
}
