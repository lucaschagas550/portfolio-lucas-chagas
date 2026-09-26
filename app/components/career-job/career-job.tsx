import { TechChips } from "~/components/tech-chips/tech-chips";
import type { TechIconSlug } from "~/data/tech-stack";

import "./career-job.css";

type CareerJobProps = {
  company: string;
  location: string;
  // Modelo de trabalho já no idioma da página (ex.: "Remoto").
  workMode?: string;
  // Textos já no idioma da página e períodos já formatados.
  roles: { title: string; period: string; current?: boolean }[];
  summary?: string;
  achievements: { metric?: string; text: string }[];
  stack: { name: string; iconSlug?: TechIconSlug }[];
  labels: {
    current: string;
    achievements: string;
    stack: string;
  };
};

// Conteúdo de uma empresa na linha do tempo da História.
export function CareerJob({
  company,
  location,
  workMode,
  roles,
  summary,
  achievements,
  stack,
  labels,
}: CareerJobProps) {
  return (
    <div className="career-job">
      <h3 className="career-job__company">{company}</h3>
      <ul className="career-job__roles">
        {roles.map((role) => (
          <li key={role.period} className="career-job__role">
            <span className="career-job__role-title">
              {role.title}
              {role.current && (
                <span className="career-job__badge">{labels.current}</span>
              )}
            </span>
            <span className="career-job__period">{role.period}</span>
          </li>
        ))}
      </ul>
      <p className="career-job__location">
        {location}
        {workMode && (
          <>
            {" "}
            <span className="career-job__work-mode">{workMode}</span>
          </>
        )}
      </p>
      {summary && <p className="career-job__summary">{summary}</p>}
      {achievements.length > 0 && (
        <ul
          className="career-job__achievements"
          aria-label={labels.achievements}
        >
          {achievements.map((achievement) => (
            <li
              key={achievement.text}
              className={
                achievement.metric
                  ? "career-job__achievement career-job__achievement--metric"
                  : "career-job__achievement"
              }
            >
              {achievement.metric ? (
                <span className="career-job__metric">{achievement.metric}</span>
              ) : (
                <span className="career-job__bullet" aria-hidden="true" />
              )}{" "}
              <span className="career-job__achievement-text">
                {achievement.text}
              </span>
            </li>
          ))}
        </ul>
      )}
      {stack.length > 0 && (
        <details className="career-job__stack">
          <summary className="career-job__stack-toggle">{labels.stack}</summary>
          <TechChips items={stack} className="career-job__chips" />
        </details>
      )}
    </div>
  );
}
