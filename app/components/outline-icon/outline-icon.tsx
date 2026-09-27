type OutlineIconProps = {
  // Desenho do ícone num quadro de 24×24, em traço (sem preenchimento).
  path: string;
  className?: string;
};

// Ícone decorativo de traço na cor do texto; o rótulo fica no elemento ao lado.
export function OutlineIcon({ path, className }: OutlineIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
