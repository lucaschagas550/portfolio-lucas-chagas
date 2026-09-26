import type { CSSProperties } from "react";

import { TechIcon } from "~/components/tech-icon/tech-icon";
import type { TechIconSlug } from "~/data/tech-stack";

import "./skill-group.css";

type SkillGroupProps = {
  // Base dos ids internos (o título nomeia a seção via aria-labelledby).
  id: string;
  title: string;
  // Nomes já no idioma da página.
  skills: { name: string; iconSlug?: TechIconSlug }[];
  headingLevel?: 2 | 3;
  // Rótulo curto acima do título (ex.: "Especialidade").
  eyebrow?: string;
  description?: string;
  variant?: "featured";
  className?: string;
};

export function SkillGroup({
  id,
  title,
  skills,
  headingLevel = 2,
  eyebrow,
  description,
  variant,
  className,
}: SkillGroupProps) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
  const titleId = `${id}-title`;
  const classes = [
    "skill-group",
    variant && `skill-group--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes} aria-labelledby={titleId}>
      {eyebrow && <p className="skill-group__eyebrow">{eyebrow}</p>}
      <Heading id={titleId} className="skill-group__title">
        {title}
      </Heading>
      {description && <p className="skill-group__description">{description}</p>}
      <ul className="skill-group__list">
        {skills.map((skill, index) => (
          <li
            key={skill.name}
            className="skill-group__item"
            // Posição do chip, usada pelo CSS para a entrada em cascata.
            style={{ "--skill-index": index } as CSSProperties}
          >
            <TechIcon iconSlug={skill.iconSlug} className="skill-group__icon" />
            {skill.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
