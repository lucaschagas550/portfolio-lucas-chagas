import type { CSSProperties } from "react";

import { classNames } from "~/utils/class-names";

import "./role-ladder.css";

type RoleLadderProps = {
  // Do primeiro cargo ao atual (o último é destacado).
  steps: { title: string; year: number }[];
  // Nome acessível da lista (ex.: "Evolução de cargos").
  label: string;
  className?: string;
};

export function RoleLadder({ steps, label, className }: RoleLadderProps) {
  return (
    <ol
      className={classNames("role-ladder", className)}
      aria-label={label}
      style={{ "--role-ladder-steps": steps.length } as CSSProperties}
    >
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={classNames(
            "role-ladder__step",
            index === steps.length - 1 && "role-ladder__step--current",
          )}
          style={{ "--role-ladder-step": index + 1 } as CSSProperties}
        >
          <span className="role-ladder__title">{step.title}</span>
          <span className="role-ladder__year">{step.year}</span>
        </li>
      ))}
    </ol>
  );
}
