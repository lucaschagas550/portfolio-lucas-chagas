import { TechChips } from "~/components/tech-chips/tech-chips";
import type { TechIconSlug } from "~/data/tech-stack";
import { classNames } from "~/utils/class-names";

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
  const isFeatured = variant === "featured";
  const classes = classNames(
    "skill-group",
    variant && `skill-group--${variant}`,
    className,
  );

  return (
    <section className={classes} aria-labelledby={titleId}>
      {eyebrow && <p className="skill-group__eyebrow">{eyebrow}</p>}
      <Heading id={titleId} className="skill-group__title">
        {title}
      </Heading>
      {description && <p className="skill-group__description">{description}</p>}
      <TechChips
        items={skills}
        size={isFeatured ? "lg" : undefined}
        cascade={isFeatured}
      />
    </section>
  );
}
