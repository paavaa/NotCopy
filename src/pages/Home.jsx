import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="site-header">
        <h1>NotCopy</h1>
        <nav>
          <Link to="/profile">Perfil</Link>
          <Link to="/settings">Ajustes</Link>
          <button onClick={handleLogout} className="logout-btn">
            Cerrar sesión
          </button>
        </nav>
      </header>

      <div className="layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li>
              <Link to="/home">Inicio</Link>
            </li>
            <li>
              <Link to="/downloads">Descargas</Link>
            </li>
            <li>
              <Link to="/dashboard">Favoritos</Link>
            </li>
            <li>
              <Link to="/support">Soporte</Link>
            </li>
            <li>
              <Link to="/about">Sobre NotCopy</Link>
            </li>
            <li>
              <Link to="/resources">Recursos</Link>
            </li>
            <li>
              <Link to="/contact">Contacto</Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <div className="content">
          <h1>NotCopy</h1>
          <br />
          <h2>Empieza tu viaje creativo</h2>
          <p>Todo lo que necesitas para crear, sin restricciones.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <p>&copy; 2025 NotCopy. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
