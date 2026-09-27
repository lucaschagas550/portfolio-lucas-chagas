// Versão legível de um endereço web: sem protocolo, sem "www." e sem barra final.
export function displayUrl(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}
