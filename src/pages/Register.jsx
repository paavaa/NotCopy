import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import "../styles/register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // función de registro
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // agregar el "displayName" (username)
      await updateProfile(userCredential.user, {
        displayName: username,
      });

      alert("Cuenta creada exitosamente 🎉");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        alert("El correo ya está registrado.");
      } else {
        alert("Error al crear la cuenta.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Crea tu cuenta de NotCopy</h1>

      <form onSubmit={handleRegister}>
        <label htmlFor="username">Nombre de usuario</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="email">Correo</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirm">Confirmar contraseña</label>
        <input
          type="password"
          id="confirm"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creando cuenta..." : "Registrarse"}
        </button>
      </form>

      <div className="footer">
        <p>
          Ya tienes una cuenta? <Link to="/">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
