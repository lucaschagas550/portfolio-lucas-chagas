// O Chrome DevTools pede /.well-known/appspecific/com.chrome.devtools.json
// sozinho. Sem rota, o React Router registra um erro de "No route matches"
// no terminal; respondendo 404 direto o pedido é atendido sem esse ruído.
export function loader() {
  return new Response(null, { status: 404 });
}
