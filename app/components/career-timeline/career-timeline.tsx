import type { ReactNode } from "react";

import { classNames } from "~/utils/class-names";

import "./career-timeline.css";

export type CareerTimelineItem = {
  id: string;
  year: number;
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
  const classes = classNames(
    "career-timeline",
    variant && `career-timeline--${variant}`,
    className,
  );

  return (
    <ol className={classes}>
      {items.map((item) => {
        const nodeClasses = classNames(
          "career-timeline__node",
          item.marker && `career-timeline__node--${item.marker}`,
          item.current && "career-timeline__node--current",
        );

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
