import React, { useState } from "react";
import "../styles/login.css";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        window.location.href = "/dashboard"; //Router navigate
      } else {
        setError(data.message || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-container">
      <h1>Sign in to NotCopy</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuario o Correo</label>
        <input
          type="text"
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input type="submit" value="Sign in" />
      </form>

      {error && <p className="error">{error}</p>}

      <div className="footer">
        <p>
          Nuevo en NotCopy? <a href="/register">Crea una cuenta</a>
        </p>
      </div>
    </div>
  );
}
