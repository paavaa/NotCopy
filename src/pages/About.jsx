import React, { useEffect } from "react";
import Footer from "../components/Footer";
import "../styles/About.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const About = () => {
  useEffect(() => {
    const header = document.querySelector(".header");
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Versión React de tu función alert()
  const showAlert = (message) => {
    const container = document.createElement("div");
    container.style.cssText =
      "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--accent); color: var(--white); padding: 1.5rem 2.5rem; border-radius: 1rem; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); z-index: 1000; text-align: center; font-family: Inter, sans-serif;";
    container.innerHTML = `<p style="margin-bottom: 1rem; font-weight: 600;">${message}</p><button onclick="this.parentNode.remove()" style="background: var(--white); color: var(--accent); border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer;">Cerrar</button>`;
    document.body.appendChild(container);
  };

  return (
    <div className="about-page">
      <div className="animated-bg"></div>

      <header className="header">
        <h1>NotCopy</h1>
        <nav>
          <a href="home">Inicio</a>
          <a href="downloads">Descargas</a>
          <a href="/dashboard">Favoritos</a>
          <a href="/support">Soporte</a>
          <a href="#" className="active">
            Sobre NotCopy
          </a>
          <a href="/contact">Contacto</a>
          <button
            className="logout-btn"
            onClick={() => showAlert("Sesión cerrada correctamente.")}
          >
            Cerrar sesión
          </button>
        </nav>
      </header>

      <main className="main">
        <div className="about-container">
          {/* Hero / Sección de título */}
          <section className="about-hero">
            <h1>Detrás de NotCopy: Nuestra Misión</h1>
            <p>
              Nacimos de la necesidad de un espacio verdaderamente libre para la
              creatividad. Somos el hub que impulsa proyectos sin las barreras
              de los derechos de autor.
            </p>
          </section>

          {/* Misión y Visión */}
          <section className="mission-vision">
            <h2>¿Quiénes Somos y a Qué Nos Dedicamos?</h2>
            <p>
              NotCopy es una plataforma dedicada a facilitar el acceso a
              contenido multimedia de alta calidad (videos, documentos, libros,
              e imágenes) que está completamente libre de derechos de autor
              (dominio público o licencias Creative Commons Zero - CC0). Nuestra
              misión es simple: empoderar a creadores, educadores y empresas con
              recursos ilimitados, garantizando que su enfoque se mantenga en la
              creación y no en la burocracia legal. Creemos que el acceso
              abierto a la información visual y creativa es el futuro.
            </p>

            <h2>Nuestra Visión</h2>
            <p>
              Convertirnos en el ecosistema de recursos libres más grande y
              confiable del mundo, cultivando una comunidad global de
              colaboradores que comparten su trabajo para el beneficio
              colectivo. Buscamos ser el punto de partida para cualquier
              proyecto que requiera material multimedia de forma legal y sin
              coste.
            </p>
          </section>

          {/* Tarjetas informativas */}
          <section className="info-section">
            <div className="info-card">
              <h2>
                <i className="fas fa-video"></i> Multimedia Ilimitada
              </h2>
              <p>
                Acceso a un vasto catálogo que incluye desde metraje de video de
                alta resolución y colecciones fotográficas únicas, hasta eBooks
                y plantillas de documentos.
              </p>
            </div>

            <div className="info-card">
              <h2>
                <i className="fas fa-lock-open"></i> 100% Libre de Derechos
              </h2>
              <p>
                Todo nuestro contenido es legalmente seguro para uso personal y
                comercial. Descarga, modifica y utiliza sin preocuparte por
                atribuciones o licencias.
              </p>
            </div>

            <div className="info-card">
              <h2>
                <i className="fas fa-users"></i> Comunidad de Colaboradores
              </h2>
              <p>
                Somos impulsados por una red de artistas y profesionales que
                generosamente comparten su trabajo con la comunidad. ¡Tú también
                puedes contribuir!
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
