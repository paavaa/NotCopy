import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2025 NotCopy. Todos los derechos reservados.</p>
      <div className="socials">
        <a href="#" aria-label="Twitter">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" aria-label="GitHub">
          <i className="fab fa-github"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
