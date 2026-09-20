import "~/pages/page.css";

export function meta() {
  return [
    { title: "Contato | Lucas Chagas" },
    {
      name: "description",
      content: "Entre em contato com Lucas Chagas.",
    },
  ];
}

export default function Contato() {
  return (
    <main className="page">
      <h1 className="page__title">Contato</h1>
      <p className="page__text">Em construção.</p>
    </main>
  );
}
