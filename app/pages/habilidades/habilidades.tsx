import { SkillGroup } from "~/components/skill-group/skill-group";
import { StatHighlights } from "~/components/stat-highlights/stat-highlights";
import { courses } from "~/data/courses";
import { education } from "~/data/education";
import { highlights } from "~/data/highlights";
import { complementarySkills, specialty } from "~/data/skills";
import { localize, localizeNames } from "~/i18n/localize";
import { pageMeta } from "~/i18n/page-meta";
import { useI18n } from "~/i18n/use-i18n";

import "~/pages/page.css";
import "./habilidades.css";

export function meta({ location }: { location: { pathname: string } }) {
  return pageMeta(location.pathname, "habilidades");
}

export default function Habilidades() {
  const { locale, translations } = useI18n();

  return (
    <main className="page habilidades">
      <header className="habilidades__header">
        <h1 className="page__title">{translations.habilidades.title}</h1>
        <p className="habilidades__intro">{translations.habilidades.intro}</p>
      </header>

      <StatHighlights
        label={translations.habilidades.statsLabel}
        items={highlights.map((highlight) => ({
          ...highlight,
          label: translations.habilidades.stats[highlight.id],
        }))}
      />

      <SkillGroup
        id={specialty.id}
        title={translations.habilidades.specialty.title}
        eyebrow={translations.habilidades.specialty.label}
        description={translations.habilidades.specialty.description}
        skills={localizeNames(specialty.skills, locale)}
        variant="featured"
      />

      <section
        className="habilidades__section"
        aria-labelledby="habilidades-complementary-title"
      >
        <h2
          id="habilidades-complementary-title"
          className="habilidades__section-title reveal"
        >
          {translations.habilidades.complementaryTitle}
        </h2>
        <div className="habilidades__grid">
          {complementarySkills.map((category) => (
            <SkillGroup
              key={category.id}
              id={category.id}
              title={translations.habilidades.categories[category.id]}
              skills={localizeNames(category.skills, locale)}
              headingLevel={3}
              className="reveal"
            />
          ))}
        </div>
      </section>

      <section
        className="habilidades__section"
        aria-labelledby="habilidades-education-title"
      >
        <h2
          id="habilidades-education-title"
          className="habilidades__section-title reveal"
        >
          {translations.habilidades.educationTitle}
        </h2>
        <ul className="habilidades__entries">
          {education.map((item) => (
            <li key={item.institution} className="habilidades__entry reveal">
              <span className="habilidades__entry-title">
                {localize(item.degree, locale)}
              </span>
              <span className="habilidades__entry-detail">
                {item.institution} · {item.period}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="habilidades__section"
        aria-labelledby="habilidades-courses-title"
      >
        <h2
          id="habilidades-courses-title"
          className="habilidades__section-title reveal"
        >
          {translations.habilidades.coursesTitle}
        </h2>
        <ul className="habilidades__entries">
          {courses.map((course) => (
            <li key={course.name} className="habilidades__entry reveal">
              <span className="habilidades__entry-title">{course.name}</span>
              <span className="habilidades__entry-detail">{course.issuer}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
