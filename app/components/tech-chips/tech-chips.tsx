import type { CSSProperties } from "react";

import { TechIcon } from "~/components/tech-icon/tech-icon";
import type { TechIconSlug } from "~/data/tech-stack";
import { classNames } from "~/utils/class-names";

import "./tech-chips.css";

type TechChipsProps = {
  // Nomes já no idioma da página.
  items: { name: string; iconSlug?: TechIconSlug }[];
  size?: "lg";
  // Entrada em cascata ao carregar (use só em listas visíveis de início).
  cascade?: boolean;
  className?: string;
};

export function TechChips({ items, size, cascade, className }: TechChipsProps) {
  const classes = classNames(
    "tech-chips",
    size && `tech-chips--${size}`,
    cascade && "tech-chips--cascade",
    className,
  );

  return (
    <ul className={classes}>
      {items.map((item, index) => (
        <li
          key={item.name}
          className="tech-chips__item"
          // Posição do chip, usada pelo CSS para a entrada em cascata.
          style={{ "--chip-index": index } as CSSProperties}
        >
          <TechIcon iconSlug={item.iconSlug} className="tech-chips__icon" />
          {item.name}
        </li>
      ))}
    </ul>
  );
}
