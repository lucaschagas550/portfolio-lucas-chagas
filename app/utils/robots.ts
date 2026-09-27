import { normalizeOrigin } from "~/utils/site-origin";

export function buildRobots(origin: string): string {
  return `User-agent: *
Allow: /

Sitemap: ${normalizeOrigin(origin)}/sitemap.xml
`;
}
