import type { ComponentProps } from "react";

import { AvailabilityBadge } from "~/components/availability-badge/availability-badge";
import { LocalTime } from "~/components/local-time/local-time";
import { OutlineIcon } from "~/components/outline-icon/outline-icon";
import { ResumeLink } from "~/components/resume-link/resume-link";
import { SocialLinks } from "~/components/social-links/social-links";
import { availability } from "~/data/availability";
import { socialLinks } from "~/data/social-links";
import { useI18n } from "~/i18n/use-i18n";
import { classNames } from "~/utils/class-names";

import "./footer.css";

const sourceCodeUrl =
  "https://github.com/lucaschagas550/portfolio-lucas-chagas";

type FooterProps = ComponentProps<"footer"> & { year?: number };

export function Footer({
  year = new Date().getFullYear(),
  className,
  ...props
}: FooterProps) {
  const { translations } = useI18n();

  return (
    <footer
      className={classNames("footer", "surface-bar", className)}
      {...props}
    >
      <div className="footer__inner">
        <div className="footer__main">
          <div className="footer__about">
            <p className="footer__credits">
              {translations.footer.credits}{" "}
              <svg
                viewBox="0 0 24 24"
                className="footer__heart"
                role="img"
                aria-label={translations.footer.heart}
              >
                <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
              </svg>
            </p>
            <p className="footer__tech">{translations.footer.tech}</p>
          </div>

          <div className="footer__contact">
            <SocialLinks links={socialLinks} />
            <AvailabilityBadge available={availability.available} />
            <LocalTime className="footer__location" />
            <ResumeLink />
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            {translations.footer.copyright(year)}
          </p>
          <a
            className="footer__link"
            href={sourceCodeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {translations.footer.sourceCode}
          </a>
          <button
            type="button"
            className="footer__top-button"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <OutlineIcon
              className="footer__top-icon"
              path="M12 19V5M5 12l7-7 7 7"
            />
            {translations.footer.backToTop}
          </button>
        </div>
      </div>
    </footer>
  );
}
