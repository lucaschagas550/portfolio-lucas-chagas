import type { ReactNode } from "react";

import "./career-timeline.css";

export type CareerTimelineItem = {
  id: string;
  year: number;
  // Formação usa um marcador diferente (losango).
  marker?: "education";
  current?: boolean;
  content: ReactNode;
};

type CareerTimelineProps = {
  items: CareerTimelineItem[];
  // "muted": em cinza, para o período antes da tecnologia.
  variant?: "muted";
  className?: string;
};

// Só o layout da linha do tempo (anos, trilho e marcadores); o conteúdo de
// cada item vem pronto em `content`.
export function CareerTimeline({
  items,
  variant,
  className,
}: CareerTimelineProps) {
  const classes = [
    "career-timeline",
    variant && `career-timeline--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ol className={classes}>
      {items.map((item) => {
        const nodeClasses = [
          "career-timeline__node",
          item.marker && `career-timeline__node--${item.marker}`,
          item.current && "career-timeline__node--current",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <li key={item.id} className="career-timeline__item">
            <span className="career-timeline__year">{item.year}</span>
            <span className={nodeClasses} aria-hidden="true" />
            <div className="career-timeline__content">{item.content}</div>
          </li>
        );
      })}
    </ol>
  );
}
