import { TechIcon } from "~/components/tech-icon/tech-icon";
import type { TechStackItem } from "~/data/tech-stack";

import "./tech-marquee.css";

function TechList({
  items,
  label,
  clone,
}: {
  items: TechStackItem[];
  label: string;
  clone?: boolean;
}) {
  return (
    <ul
      className="tech-marquee__list"
      aria-hidden={clone || undefined}
      aria-label={clone ? undefined : label}
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
  // Nome acessível da lista (ex.: "Tecnologias"), no idioma da página.
  label: string;
  className?: string;
};

export function TechMarquee({ items, label, className }: TechMarqueeProps) {
  const classes = ["tech-marquee", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <div className="tech-marquee__track">
        <TechList items={items} label={label} />
        <TechList items={items} label={label} clone />
      </div>
    </div>
  );
}
