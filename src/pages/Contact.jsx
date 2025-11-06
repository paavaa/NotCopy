import React, { useState } from "react";
import "../styles/Contact.css";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías integrar envío por API o Firebase
    setAlertMessage("¡Mensaje enviado con éxito! Te contactaremos pronto.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      {/* Fondo animado */}
      <div className="animated-bg"></div>

      {/* Encabezado */}
      <header className="header">
        <h1>NotCopy</h1>
        <nav>
          <a href="/home">Inicio</a>
          <a href="/downloads">Descargas</a>
          <a href="/dashboard">Favoritos</a>
          <a href="/support">Soporte</a>
          <a href="/about">Sobre NotCopy</a>
          <a href="#" className="active">
            Contacto
          </a>
          <button className="logout-btn">Cerrar sesión</button>
        </nav>
      </header>

      {/* Contenido principal */}
      <main className="main">
        <div className="contact-layout">
          {/* Columna principal del formulario */}
          <section className="form-column">
            <div className="hero">
              <h1>Ponte en Contacto</h1>
              <p>
                Estamos aquí para ayudarte. Envíanos un mensaje y responderemos
                en un plazo de 24 horas.
              </p>
              <hr />
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="ejemplo@notcopy.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Asunto</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Problema de descarga u otro"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Describe tu solicitud o problema aquí..."
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Enviar Mensaje
              </button>
            </form>
          </section>

          {/* Columna lateral con la información de contacto */}
          <aside className="info-column">
            <div className="contact-info-block">
              <h3>Información Directa</h3>

              <div className="contact-detail">
                <i className="fas fa-envelope"></i>
                <p>soporte@notcopy.com</p>
              </div>

              <div className="contact-detail">
                <i className="fas fa-phone-alt"></i>
                <p>604 555 123 456</p>
              </div>

              <div className="contact-detail">
                <i className="fas fa-business-time"></i>
                <p>Lun-Vie: 9:00 - 18:00</p>
              </div>

              <div className="contact-detail">
                <i className="fas fa-map-marker-alt"></i>
                <p>Sede Central, Ciudad Digital, Medellín</p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Pie de página */}
      <Footer />
    </>
  );
};

export default Contact;
