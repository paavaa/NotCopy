import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  return (
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
          <Link to="/contact">
            <i className="fas fa-envelope"></i> Contacto
          </Link>
        </li>
      </ul>
    </aside>
  );
}
