import { useSyncExternalStore } from "react";

import { useI18n } from "~/i18n/use-i18n";
import { formatLocalTime } from "~/utils/local-time";

const REFRESH_INTERVAL_MS = 15_000;

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, REFRESH_INTERVAL_MS);

  return () => clearInterval(id);
}

// No servidor não há hora: o texto sai só com o lugar, e a hora aparece ao
// hidratar (evita divergência entre o HTML do SSR e o do cliente).
const getServerTime = () => undefined;

export function LocalTime({ className }: { className?: string }) {
  const { locale, t } = useI18n();
  const time = useSyncExternalStore(
    subscribe,
    () => formatLocalTime(new Date(), locale),
    getServerTime,
  );

  return <p className={className}>{t.location.label(time)}</p>;
}
