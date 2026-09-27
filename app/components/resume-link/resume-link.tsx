import type { ComponentProps } from "react";

import { OutlineIcon } from "~/components/outline-icon/outline-icon";
import { resumeFiles } from "~/data/resume";
import { useI18n } from "~/i18n/use-i18n";
import { classNames } from "~/utils/class-names";

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
  const { locale, translations } = useI18n();
  const classes = classNames(
    "resume-link",
    variant === "button" && "resume-link--button",
    className,
  );

  return (
    <a className={classes} href={resumeFiles[locale]} download {...props}>
      <OutlineIcon
        className="resume-link__icon"
        path="M12 3v12M6 11l6 6 6-6M5 21h14"
      />
      {translations.resume.label}
    </a>
  );
}
