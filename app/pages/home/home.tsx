import { ResumeLink } from "~/components/resume-link/resume-link";
import { SocialLinks } from "~/components/social-links/social-links";
import { TechMarquee } from "~/components/tech-marquee/tech-marquee";
import { techStack } from "~/data/tech-stack";
import { pageMeta } from "~/i18n/page-meta";
import { useI18n } from "~/i18n/use-i18n";

import profileImage from "./images/profile.jpg";
import "~/pages/home/home.css";

export function meta({ location }: { location: { pathname: string } }) {
  return pageMeta(location.pathname, "home");
}

export default function Home() {
  const { t } = useI18n();

  return (
    <main className="home">
      <section className="home__hero">
        <div className="home__hero-image-wrapper">
          <img
            className="home__hero-image"
            src={profileImage}
            alt="Lucas Chagas"
            width={150}
            height={150}
          />
        </div>
        <div className="home__hero-content">
          <SocialLinks className="home__hero-socials" />
          <h1 className="home__hero-title">Lucas Chagas</h1>
          <p className="home__hero-subtitle">{t.home.role}</p>
          <ResumeLink variant="button" className="home__hero-resume" />
        </div>
      </section>

      <section className="home__about" aria-labelledby="home-about-title">
        <h2 id="home-about-title" className="home__about-title">
          {t.home.aboutTitle}
        </h2>
        {t.home.about.map((paragraph) => (
          <p key={paragraph} className="home__about-text">
            {paragraph}
          </p>
        ))}
        <TechMarquee
          items={techStack}
          label={t.home.techLabel}
          className="home__about-marquee"
        />
      </section>
    </main>
  );
}
