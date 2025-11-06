import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import "../styles/Support.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Support = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // Efecto para el scroll del header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleLogout = () => {
    // Aquí puedes agregar la lógica de cierre de sesión
    console.log("Cerrar sesión");
  };

  const faqData = [
    {
      question: "¿Cómo restablezco mi contraseña?",
      answer:
        'Para restablecer tu contraseña, ve a la página de inicio de sesión y haz clic en "¿Olvidaste tu contraseña?". Sigue las instrucciones enviadas a tu correo electrónico para crear una nueva.',
    },
    {
      question: "¿Puedo usar el contenido para fines comerciales?",
      answer:
        'Sí, todo el contenido de NotCopy está bajo la licencia "NC Pro", lo que te permite usarlo en proyectos comerciales, siempre y cuando no se revenda como material stock.',
    },
    {
      question: "¿Qué navegadores son compatibles con NotCopy?",
      answer:
        "NotCopy es totalmente compatible con las últimas versiones de Chrome, Firefox, Safari y Edge. Recomendamos mantener tu navegador actualizado para la mejor experiencia.",
    },
  ];

  return (
    <>
      <div className="animated-bg"></div>

      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <h1>NotCopy</h1>
        <nav>
          <a href="/home">Inicio</a>
          <a href="/downloads">Descargas</a>
          <a href="/dashboard">Favoritos</a>
          <a href="#" className="active">
            Soporte
          </a>
          <a href="/about">Sobre NotCopy</a>
          <a href="/contact">Contacto</a>
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </nav>
      </header>

      <main className="main">
        <div className="support-container">
          <section className="hero">
            <h1>Centro de Ayuda y Soporte</h1>
            <p>
              Encuentra respuestas a preguntas comunes o contáctanos para
              obtener asistencia.
            </p>
          </section>

          {/* SECCIÓN DE PREGUNTAS FRECUENTES (FAQ) */}
          <section className="faq-section">
            <h2>Preguntas Frecuentes (FAQ)</h2>

            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${activeFaq === index ? "active" : ""}`}
              >
                <div
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") toggleFaq(index);
                  }}
                >
                  {faq.question}
                  <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Support;
