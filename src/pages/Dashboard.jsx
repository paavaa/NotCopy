import { Link, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // efecto para cambiar estilo del header al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("main-header");
      if (header) {
        header.classList.toggle("scrolled", window.scrollY > 50);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Header */}
      <header className="header" id="main-header">
        <h1>NotCopy</h1>
        <nav>
          <Link to="/profile">Perfil</Link>
          <Link to="/settings">Ajustes</Link>
          <button onClick={handleLogout} className="logout-btn">
            Cerrar sesión
          </button>
        </nav>
      </header>

      {/* Fondo animado */}
      <div className="animated-bg"></div>

      <div className="layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li>
              <Link to="/home">
                <i className="fas fa-home"></i> Inicio
              </Link>
            </li>
            <li>
              <Link to="/downloads">
                <i className="fas fa-download"></i> Descargas
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="active">
                <i className="fas fa-star"></i> Favoritos
              </Link>
            </li>
            <li>
              <Link to="/support">
                <i className="fas fa-headset"></i> Soporte
              </Link>
            </li>
            <li>
              <Link to="/about">
                <i className="fas fa-info-circle"></i> Sobre NotCopy
              </Link>
            </li>
            <li>
              <Link to="/resources">
                <i className="fas fa-folder"></i> Recursos
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <i className="fas fa-envelope"></i> Contacto
              </Link>
            </li>
          </ul>
        </aside>

        {/* Contenido principal */}
        <main className="main">
          {/* Buscador y filtro */}
          <section className="controls">
            <input
              type="search"
              className="search-input"
              placeholder="Buscar videos, imágenes o audio…"
            />
            <select className="filter-select">
              <option value="">Todos</option>
              <option value="videos">Videos</option>
              <option value="imagenes">Imágenes</option>
              <option value="audio">Audio</option>
              <option value="documentos">Documentos</option>
            </select>
          </section>

          {/* Tarjetas */}
          <section className="grid-cards">
            <div className="card">
              <i className="fas fa-video fa-3x"></i>
              <h3>Videos</h3>
              <p>Tus videos más recientes.</p>
              <a href="#" className="btn-card">
                Ver más
              </a>
            </div>

            <div className="card">
              <i className="fas fa-image fa-3x"></i>
              <h3>Imágenes</h3>
              <p>Explora tus galerías.</p>
              <a href="#" className="btn-card">
                Ver más
              </a>
            </div>

            <div className="card">
              <i className="fas fa-music fa-3x"></i>
              <h3>Audio</h3>
              <p>Reproduce tus pistas.</p>
              <a href="#" className="btn-card">
                Ver más
              </a>
            </div>

            <div className="card">
              <i className="fas fa-file-alt fa-3x"></i>
              <h3>Documentos</h3>
              <p>Accede a tus archivos.</p>
              <a href="#" className="btn-card">
                Ver más
              </a>
            </div>

            <div className="card">
              <i className="fas fa-laugh-beam fa-3x"></i>
              <h3>Gifs</h3>
              <p>Reacciona a tus gifs.</p>
              <a href="#" className="btn-card">
                Ver más
              </a>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 NotCopy. Todos los derechos reservados.</p>
        <div className="socials">
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </footer>
    </>
  );
}
