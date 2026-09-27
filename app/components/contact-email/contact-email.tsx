import { useEffect, useState } from "react";

import { OutlineIcon } from "~/components/outline-icon/outline-icon";
import { useI18n } from "~/i18n/use-i18n";
import { classNames } from "~/utils/class-names";

import "./contact-email.css";

type CopyStatus = "idle" | "copied" | "error";

const COPIED_RESET_MS = 3000;

const COPY_ICON = "M9 9h10v12H9zM5 15V3h10";
const CHECK_ICON = "M5 12.5l4.5 4.5L19 7.5";
const MAIL_ICON = "M3 5h18v14H3zM3 6l9 7 9-7";

type ContactEmailProps = { email: string };

// O endereço em destaque, com as ações de copiar e de abrir o app de e-mail.
export function ContactEmail({ email }: ContactEmailProps) {
  const { translations } = useI18n();
  const [status, setStatus] = useState<CopyStatus>("idle");
  const at = email.lastIndexOf("@");
  const isCopied = status === "copied";

  useEffect(() => {
    if (!isCopied) return;

    const id = setTimeout(() => setStatus("idle"), COPIED_RESET_MS);

    return () => clearTimeout(id);
  }, [isCopied]);

  // Sem a API (contexto inseguro, permissão negada), cai no erro orientando a
  // copiar à mão.
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="contact-email">
      {/* <wbr> deixa o endereço quebrar antes do "@" em telas estreitas. */}
      <p className="contact-email__address">
        <span
          className={classNames(
            "contact-email__text",
            isCopied && "contact-email__text--copied",
          )}
        >
          {email.slice(0, at)}
          <wbr />
          {email.slice(at)}
        </span>
      </p>
      <div className="contact-email__actions">
        <button
          type="button"
          className="contact-email__button contact-email__button--solid"
          onClick={copyEmail}
        >
          <OutlineIcon
            className="contact-email__icon"
            path={isCopied ? CHECK_ICON : COPY_ICON}
          />
          {isCopied
            ? translations.contactEmail.copied
            : translations.contactEmail.copy}
        </button>
        <a className="contact-email__button" href={`mailto:${email}`}>
          <OutlineIcon className="contact-email__icon" path={MAIL_ICON} />
          {translations.contactEmail.write}
        </a>
      </div>
      <p className="contact-email__status" role="status">
        {isCopied && (
          <span className="visually-hidden">
            {translations.contactEmail.copied}
          </span>
        )}
        {status === "error" && (
          <span className="contact-email__error">
            {translations.contactEmail.copyError}
          </span>
        )}
      </p>
    </div>
  );
}
