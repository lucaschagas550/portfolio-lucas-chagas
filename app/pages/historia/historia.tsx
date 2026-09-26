import { CareerJob } from "~/components/career-job/career-job";
import {
  CareerTimeline,
  type CareerTimelineItem,
} from "~/components/career-timeline/career-timeline";
import { RoleLadder } from "~/components/role-ladder/role-ladder";
import {
  beforeTech,
  careerTimeline,
  roleProgression,
  type CareerEntry,
  type CareerJob as CareerJobData,
} from "~/data/career";
import { education } from "~/data/education";
import type { Locale } from "~/i18n/locale";
import { localize } from "~/i18n/localize";
import type { Messages } from "~/i18n/messages";
import { pageMeta } from "~/i18n/page-meta";
import { useI18n } from "~/i18n/use-i18n";
import { formatPeriod } from "~/utils/format-period";

import "~/pages/page.css";
import "./historia.css";

export function meta({ location }: { location: { pathname: string } }) {
  return pageMeta(location.pathname, "historia");
}

function jobItem(
  job: CareerJobData,
  locale: Locale,
  t: Messages["historia"],
): CareerTimelineItem {
  return {
    id: job.id,
    year: job.year,
    current: job.roles.some((role) => !role.end),
    content: (
      <CareerJob
        company={job.company}
        location={job.location}
        workMode={job.workMode && t.workMode[job.workMode]}
        roles={job.roles.map((role) => ({
          title: localize(role.title, locale),
          period: formatPeriod(role.start, role.end, locale, t.present),
          current: !role.end,
        }))}
        summary={job.summary && localize(job.summary, locale)}
        achievements={job.achievements.map((achievement) => ({
          metric: achievement.metric,
          text: localize(achievement.text, locale),
        }))}
        stack={job.stack.map((skill) => ({
          name: localize(skill.name, locale),
          iconSlug: skill.iconSlug,
        }))}
        labels={{
          current: t.current,
          achievements: t.achievementsLabel,
          stack: t.stackToggle(job.stack.length),
        }}
      />
    ),
  };
}

function timelineItems(
  entries: CareerEntry[],
  locale: Locale,
  t: Messages["historia"],
): CareerTimelineItem[] {
  return entries.flatMap((entry) => {
    if (entry.kind === "job") return [jobItem(entry, locale, t)];

    const degree = education.find((item) => item.id === entry.educationId);
    if (!degree) return [];

    return [
      {
        id: degree.id,
        year: entry.year,
        marker: "education" as const,
        content: (
          <div className="historia__milestone">
            <h3 className="historia__milestone-title">
              {localize(degree.degree, locale)}
            </h3>
            <p className="historia__milestone-detail">{degree.institution}</p>
            <p className="historia__milestone-detail">{degree.period}</p>
          </div>
        ),
      },
    ];
  });
}

export default function Historia() {
  const { locale, t } = useI18n();

  return (
    <main className="page historia">
      <header className="historia__header">
        <h1 className="page__title">{t.historia.title}</h1>
        <p className="historia__intro">{t.historia.intro}</p>
      </header>

      <RoleLadder
        label={t.historia.ladderLabel}
        steps={roleProgression.map((step) => ({
          title: localize(step.title, locale),
          year: step.year,
        }))}
      />

      <section
        className="historia__section"
        aria-labelledby="historia-timeline-title"
      >
        <h2 id="historia-timeline-title" className="historia__section-title">
          {t.historia.timelineTitle}
        </h2>
        <CareerTimeline
          items={timelineItems(careerTimeline, locale, t.historia)}
        />
      </section>

      <section
        className="historia__section"
        aria-labelledby="historia-before-tech-title"
      >
        <h2 id="historia-before-tech-title" className="historia__section-title">
          {t.historia.beforeTechTitle}
        </h2>
        <CareerTimeline
          variant="muted"
          items={timelineItems(beforeTech, locale, t.historia)}
        />
      </section>
    </main>
  );
}
