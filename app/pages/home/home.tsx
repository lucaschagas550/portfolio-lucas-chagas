import { SocialLinks } from "~/components/social-links/social-links";
import { TechMarquee } from "~/components/tech-marquee/tech-marquee";
import { techStack } from "~/data/tech-stack";

import profileImage from "./images/profile.jpg";
import "~/pages/home/home.css";

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
    <main className="home">
      <section className="home__hero">
        <div className="home__hero-image-wrapper">
          <img
            className="home__hero-image"
            src={profileImage}
            alt="Lucas Chagas"
            width={150}
            height={150}
          />
        </div>
        <div className="home__hero-content">
          <SocialLinks className="home__hero-socials" />
          <h1 className="home__hero-title">Lucas Chagas</h1>
          <p className="home__hero-subtitle">Senior Full Stack Engineer</p>
        </div>
      </section>

      <section className="home__about" aria-labelledby="home-about-title">
        <h2 id="home-about-title" className="home__about-title">
          Sobre mim
        </h2>
        <p className="home__about-text">
          Com 6 anos de experiência em desenvolvimento de software, atuo na
          criação de soluções que buscam simplificar processos, resolver
          problemas reais e proporcionar uma melhor experiência aos usuários.
        </p>
        <p className="home__about-text">
          Ao longo da minha trajetória, venho trabalhando com tecnologias como
          .NET Core, C#, Xamarin, APIs REST, ASP.NET Core, Blazor, HTML, CSS,
          Angular, React, SQL, Azure e práticas de CI/CD, sempre buscando
          evoluir tecnicamente e acompanhar as constantes transformações do
          mercado de tecnologia.
        </p>
        <p className="home__about-text">
          Mais do que a escolha de uma tecnologia específica, acredito que o
          desenvolvimento de software deve estar orientado à entrega de valor.
          Por isso, meu foco está na construção de soluções eficientes,
          escaláveis, funcionais e intuitivas, combinando qualidade técnica,
          boas práticas de desenvolvimento e uma experiência positiva para quem
          utiliza o produto.
        </p>
        <TechMarquee items={techStack} className="home__about-marquee" />
      </section>
    </main>
  );
}
