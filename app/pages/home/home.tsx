import { SocialLinks } from "~/components/social-links/social-links";

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
    </main>
  );
}
