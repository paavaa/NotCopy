import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/Home.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import Footer from "../components/Footer.jsx";

export default function Recursos() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // efecto para el header dinamico
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("main-header");
      if (header) header.classList.toggle("scrolled", window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="home-container">
        {/* header */}
        <header className="header" id="main-header">
          <h1>NotCopy</h1>
          <nav>
            <Link to="/home">Inicio</Link>
            <Link to="/downloads">Descargas</Link>
            <Link to="/dashboard">Favoritos</Link>
            <Link to="/support">Soporte</Link>
            <Link to="/about">Sobre NotCopy</Link>
            <Link to="/contact">Contacto</Link>
            <button onClick={handleLogout} className="logout-btn">
              Cerrar sesión
            </button>
          </nav>
        </header>

        <div className="animated-bg"></div>

        <section className="hero">
          <div className="hero-content">
            <h1>Bienvenido a NotCopy</h1>
            <br />
            <h2>Tu biblioteca multimedia</h2>
            <p>
              Explora videos, imágenes, audio, GIFs y documentos sin límites.
            </p>
          </div>
        </section>

        {/* buscador */}
        <section className="search-bar">
          <input type="text" placeholder="Buscar recursos..." />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </section>

        {/* grid de tarjetas */}
        <div className="grid-cards">
          <div className="card">
            <i className="fas fa-video fa-3x"></i>
            <h3>Videos</h3>
            <p>Time-lapses, drones y motion graphics.</p>
            <Link to="/resources/videos" className="btn-card">
              Ver más
            </Link>
          </div>

          <div className="card">
            <i className="fas fa-file-alt fa-3x"></i>
            <h3>Documentos</h3>
            <p>Whitepapers, manuales y plantillas.</p>
            <Link to="/resources/docs" className="btn-card">
              Ver más
            </Link>
          </div>

          <div className="card">
            <i className="fas fa-image fa-3x"></i>
            <h3>Imágenes</h3>
            <p>Fotografía, ilustraciones y vectores.</p>
            <Link to="/resources/images" className="btn-card">
              Ver más
            </Link>
          </div>

          <div className="card">
            <i className="fas fa-music fa-3x"></i>
            <h3>Audio</h3>
            <p>Beats, loops y efectos de sonido.</p>
            <Link to="/resources/audio" className="btn-card">
              Ver más
            </Link>
          </div>

          <div className="card">
            <i className="fas fa-grin-squint fa-3x"></i>
            <h3>GIFs</h3>
            <p>Reacciones, loops y animaciones cortas.</p>
            <Link to="/resources/gifs" className="btn-card">
              Ver más
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
