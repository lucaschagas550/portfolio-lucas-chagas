import angularIcon from "devicon/icons/angular/angular-original.svg";
import azureIcon from "devicon/icons/azure/azure-original.svg";
import csharpIcon from "devicon/icons/csharp/csharp-original.svg";
import css3Icon from "devicon/icons/css3/css3-original.svg";
import mssqlIcon from "devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg";
import xamarinIcon from "devicon/icons/xamarin/xamarin-original.svg";
import {
  siBlazor,
  siDotnet,
  siGithubactions,
  siHtml5,
  siMongodb,
  siOpenapiinitiative,
  siReact,
} from "simple-icons";

import type { TechIconSlug, TechStackItem } from "~/data/tech-stack";

import "./tech-marquee.css";

const brandIcons: Partial<Record<TechIconSlug, { path: string; hex: string }>> =
  {
    dotnet: siDotnet,
    blazor: siBlazor,
    html5: siHtml5,
    react: siReact,
    mongodb: siMongodb,
    openapi: siOpenapiinitiative,
    githubactions: siGithubactions,
  };

const imageIcons: Partial<Record<TechIconSlug, string>> = {
  csharp: csharpIcon,
  xamarin: xamarinIcon,
  azure: azureIcon,
  mssql: mssqlIcon,
  css3: css3Icon,
  angular: angularIcon,
};

const GENERIC_ICON_PATH =
  "M9.4 6 3.4 12l6 6 1.4-1.4L6.2 12l4.6-4.6L9.4 6Zm5.2 0-1.4 1.4L17.8 12l-4.6 4.6L14.6 18l6-6-6-6Z";

function TechIcon({ iconSlug }: { iconSlug?: TechIconSlug }) {
  const imageSrc = iconSlug ? imageIcons[iconSlug] : undefined;

  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt=""
        aria-hidden="true"
        className="tech-marquee__icon"
      />
    );
  }

  const brandIcon = iconSlug ? brandIcons[iconSlug] : undefined;

  return (
    <svg
      viewBox="0 0 24 24"
      className="tech-marquee__icon"
      aria-hidden="true"
      style={brandIcon ? { fill: `#${brandIcon.hex}` } : undefined}
    >
      <path d={brandIcon ? brandIcon.path : GENERIC_ICON_PATH} />
    </svg>
  );
}

function TechList({
  items,
  clone,
}: {
  items: TechStackItem[];
  clone?: boolean;
}) {
  return (
    <ul
      className="tech-marquee__list"
      aria-hidden={clone || undefined}
      aria-label={clone ? undefined : "Tecnologias"}
    >
      {items.map((item) => (
        <li key={item.name} className="tech-marquee__item">
          <TechIcon iconSlug={item.iconSlug} />
          {item.name}
        </li>
      ))}
    </ul>
  );
}

type TechMarqueeProps = {
  items: TechStackItem[];
  className?: string;
};

export function TechMarquee({ items, className }: TechMarqueeProps) {
  const classes = ["tech-marquee", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <div className="tech-marquee__track">
        <TechList items={items} />
        <TechList items={items} clone />
      </div>
    </div>
  );
}
