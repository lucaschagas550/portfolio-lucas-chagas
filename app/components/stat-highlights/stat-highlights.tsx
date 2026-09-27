import type { CSSProperties } from "react";

import { classNames } from "~/utils/class-names";

import "./stat-highlights.css";

type StatHighlightsProps = {
  items: { id: string; value: number; suffix?: string; label: string }[];
  // Nome acessível da lista (ex.: "Destaques").
  label: string;
  className?: string;
};

// O número visível é desenhado pelo CSS (counter animado de 0 até o valor);
// o leitor de tela recebe o valor final em texto oculto.
export function StatHighlights({
  items,
  label,
  className,
}: StatHighlightsProps) {
  return (
    <ul className={classNames("stat-highlights", className)} aria-label={label}>
      {items.map((item) => (
        <li key={item.id} className="stat-highlights__item">
          <span
            className="stat-highlights__value"
            aria-hidden="true"
            style={{ "--stat-value": item.value } as CSSProperties}
          >
            {item.suffix}
          </span>
          <span className="visually-hidden">
            {item.value}
            {item.suffix}{" "}
          </span>
          <span className="stat-highlights__label">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
