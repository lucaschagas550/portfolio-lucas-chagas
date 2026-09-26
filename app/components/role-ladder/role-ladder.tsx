import type { CSSProperties } from "react";

import "./role-ladder.css";

type RoleLadderProps = {
  // Cargos já no idioma da página, do primeiro ao atual.
  steps: { title: string; year: number }[];
  // Nome acessível da lista (ex.: "Evolução de cargos").
  label: string;
  className?: string;
};

// Escada de cargos: cada degrau é mais alto que o anterior.
export function RoleLadder({ steps, label, className }: RoleLadderProps) {
  const classes = ["role-ladder", className].filter(Boolean).join(" ");

  return (
    <ol
      className={classes}
      aria-label={label}
      style={{ "--role-ladder-steps": steps.length } as CSSProperties}
    >
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={
            index === steps.length - 1
              ? "role-ladder__step role-ladder__step--current"
              : "role-ladder__step"
          }
          style={{ "--role-ladder-step": index + 1 } as CSSProperties}
        >
          <span className="role-ladder__title">{step.title}</span>
          <span className="role-ladder__year">{step.year}</span>
        </li>
      ))}
    </ol>
  );
}
