import "~/pages/page.css";

export function meta() {
  return [
    { title: "Lucas Chagas | Portfólio" },
    {
      name: "description",
      content: "Portfólio de Lucas Chagas.",
    },
  ];
}

export default function Home() {
  return (
    <main className="page">
      <h1 className="page__title">Lucas Chagas</h1>
      <p className="page__text">Em construção.</p>
    </main>
  );
}
