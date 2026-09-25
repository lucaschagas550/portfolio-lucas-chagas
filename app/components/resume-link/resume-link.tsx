import type { ComponentProps } from "react";

import { resumeFiles } from "~/data/resume";
import { useI18n } from "~/i18n/use-i18n";

import "./resume-link.css";

type ResumeLinkProps = Omit<
  ComponentProps<"a">,
  "href" | "download" | "children"
> & {
  variant?: "link" | "button";
};

// Baixa o currículo no idioma da página. "button" é a versão de destaque.
export function ResumeLink({
  variant = "link",
  className,
  ...props
}: ResumeLinkProps) {
  const { locale, t } = useI18n();
  const classes = [
    "resume-link",
    variant === "button" && "resume-link--button",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={classes} href={resumeFiles[locale]} download {...props}>
      <svg
        viewBox="0 0 24 24"
        className="resume-link__icon"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3v12M6 11l6 6 6-6M5 21h14" />
      </svg>
      {t.resume.label}
    </a>
  );
}
