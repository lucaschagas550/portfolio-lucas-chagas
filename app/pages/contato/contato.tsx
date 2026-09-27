import { AvailabilityBadge } from "~/components/availability-badge/availability-badge";
import { ContactEmail } from "~/components/contact-email/contact-email";
import { LocalTime } from "~/components/local-time/local-time";
import { ResumeLink } from "~/components/resume-link/resume-link";
import { availability } from "~/data/availability";
import {
  contactEmail,
  socialLinks,
  type SocialLink,
} from "~/data/social-links";
import { pageMeta } from "~/i18n/page-meta";
import { useI18n } from "~/i18n/use-i18n";
import { displayUrl } from "~/utils/display-url";

import "~/pages/page.css";
import "./contato.css";

export function meta({ location }: { location: { pathname: string } }) {
  return pageMeta(location.pathname, "contato");
}

// O e-mail já é o destaque da página; aqui ficam só os outros canais.
type ChannelLink = SocialLink & { icon: Exclude<SocialLink["icon"], "email"> };

const channelLinks = socialLinks.filter(
  (link): link is ChannelLink => link.icon !== "email",
);

export default function Contato() {
  const { translations } = useI18n();

  return (
    <main className="page contato">
      <header className="contato__header">
        <h1 className="page__title">{translations.contato.title}</h1>
        <p className="contato__intro">{translations.contato.intro}</p>
        <div className="contato__status">
          <AvailabilityBadge available={availability.available} />
          <LocalTime className="contato__location" />
        </div>
      </header>

      <ContactEmail email={contactEmail} />

      <section
        className="contato__section"
        aria-labelledby="contato-channels-title"
      >
        <h2 id="contato-channels-title" className="contato__section-title">
          {translations.contato.channelsTitle}
        </h2>
        <ul className="contato__channels">
          {channelLinks.map((link) => (
            <li key={link.name} className="contato__channel">
              <a
                className="contato__channel-name contato__channel-link"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}{" "}
                <span className="visually-hidden">
                  {translations.contato.newTab}
                </span>
              </a>
              <div className="contato__channel-info">
                <span className="contato__channel-handle">
                  {displayUrl(link.href)}
                </span>
                <span className="contato__channel-detail">
                  {translations.contato.channels[link.icon]}
                </span>
              </div>
            </li>
          ))}
          <li className="contato__channel">
            <span className="contato__channel-name">
              {translations.contato.resumeTitle}
            </span>
            <div className="contato__channel-info">
              <span className="contato__channel-detail">
                {translations.contato.resumeDescription}
              </span>
              <ResumeLink className="contato__channel-resume" />
            </div>
          </li>
        </ul>
      </section>
    </main>
  );
}
