import { resolveOrigin } from "~/utils/site-origin";
import { buildSitemap } from "~/utils/sitemap";

export function loader({ request }: { request: Request }) {
  return new Response(buildSitemap(resolveOrigin(request)), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
