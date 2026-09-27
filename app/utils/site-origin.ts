// Sem barra no fim, para poder concatenar com os caminhos ("/", "/en", ...).
export function normalizeOrigin(origin: string) {
  return origin.replace(/\/+$/, "");
}

// SITE_URL define o endereço público (importante atrás de proxy); sem ele,
// vale a origem da própria requisição.
export function resolveOrigin(request: Request): string {
  return process.env.SITE_URL || new URL(request.url).origin;
}
