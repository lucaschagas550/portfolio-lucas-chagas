import { buildRobots } from "~/utils/robots";
import { resolveOrigin } from "~/utils/site-origin";

export function loader({ request }: { request: Request }) {
  return new Response(buildRobots(resolveOrigin(request)), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
