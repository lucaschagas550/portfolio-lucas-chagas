import "~/pages/page.css";

export function meta() {
  return [
    { title: "História | Lucas Chagas" },
    {
      name: "description",
      content: "A trajetória profissional de Lucas Chagas.",
    },
  ];
}

export default function Historia() {
  return (
    <main className="page">
      <h1 className="page__title">História</h1>
      <p className="page__text">Em construção.</p>
    </main>
  );
}
