import type { ComponentProps } from "react";

import type { SocialLink, SocialLinkIcon } from "~/data/social-links";
import { classNames } from "~/utils/class-names";

import "./social-links.css";

// Marcas em silhueta (preenchidas), num quadro de 24×24.
const iconPaths: Record<SocialLinkIcon, string> = {
  github:
    "M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.39 7.86 10.91.57.1.79-.25.79-.55 0-.27-.01-1.17-.02-2.13-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.73 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.21.66.79.55A10.99 10.99 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z",
  linkedin:
    "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
  email:
    "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1.4 2 7.1 5.68a.9.9 0 0 0 1 0L19.6 7H4.4ZM20 8.4l-6.9 5.52a2.9 2.9 0 0 1-3.2 0L4 8.4V17h16V8.4Z",
};

type SocialLinksProps = ComponentProps<"ul"> & { links: SocialLink[] };

export function SocialLinks({ links, className, ...props }: SocialLinksProps) {
  return (
    <ul className={classNames("social-links", className)} {...props}>
      {links.map((link) => (
        <li key={link.name} className="social-links__item">
          <a
            className="social-links__link"
            href={link.href}
            aria-label={link.name}
            {...(link.href.startsWith("mailto:")
              ? {}
              : { target: "_blank", rel: "noopener noreferrer" })}
          >
            <svg
              viewBox="0 0 24 24"
              className="social-links__icon"
              aria-hidden="true"
            >
              <path d={iconPaths[link.icon]} />
            </svg>
            <span className="social-links__tooltip" aria-hidden="true">
              {link.name}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
