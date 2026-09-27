import { useI18n } from "~/i18n/use-i18n";

import "./availability-badge.css";

type AvailabilityBadgeProps = { available: boolean };

// Status de disponibilidade: o texto carrega a informação; a bolinha é decorativa.
export function AvailabilityBadge({ available }: AvailabilityBadgeProps) {
  const { translations } = useI18n();

  if (!available) return null;

  return (
    <p className="availability-badge">
      <span className="availability-badge__dot" aria-hidden="true" />
      {translations.availability.available}
    </p>
  );
}
