import { Link, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function Dashboard() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Efecto para cambiar estilo del header al hacer scroll
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

  // Cargar favoritos del usuario
  useEffect(() => {
    fetchUserFavorites();
  }, []);

  const fetchUserFavorites = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      console.log("🔍 Usuario actual:", user?.uid); // DEBUG

      if (!user) {
        console.log("❌ No hay usuario autenticado");
        navigate("/");
        return;
      }

      const q = query(
        collection(db, "favorites"),
        where("userId", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);
      console.log("📊 Documentos encontrados:", querySnapshot.size); // DEBUG

      const favs = querySnapshot.docs.map((doc) => {
        console.log("📄 Documento:", doc.id, doc.data()); // DEBUG
        return {
          firestoreId: doc.id,
          ...doc.data(),
        };
      });

      console.log("✅ Favoritos cargados:", favs); // DEBUG
      setFavorites(favs);
    } catch (error) {
      console.error("❌ Error al cargar favoritos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar favorito
  const handleRemoveFavorite = async (firestoreId) => {
    const confirmDelete = window.confirm("¿Eliminar este favorito?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "favorites", firestoreId));
      alert("🗑️ Favorito eliminado");
      fetchUserFavorites();
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
      alert("Error al eliminar");
    }
  };

  // Filtrar favoritos
  const filteredFavorites = filter
    ? favorites.filter((fav) => fav.category === filter)
    : favorites;

  // Contar por categoría
  const countByCategory = (category) => {
    return favorites.filter((fav) => fav.category === category).length;
  };

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

      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <main className="main">
        {/* Título */}
        <div className="favorites-header">
          <h1>⭐ Mis Favoritos</h1>
          <p>
            {favorites.length > 0
              ? `Tienes ${favorites.length} elementos guardados`
              : "No tienes favoritos guardados aún"}
          </p>
        </div>

        {/* Buscador y filtro */}
        <section className="controls">
          <input
            type="search"
            className="search-input"
            placeholder="Buscar en tus favoritos..."
          />
          <select
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Todos ({favorites.length})</option>
            <option value="images">
              Imágenes ({countByCategory("images")})
            </option>
            <option value="videos">Videos ({countByCategory("videos")})</option>
            <option value="audio">Audio ({countByCategory("audio")})</option>
            <option value="gifs">GIFs ({countByCategory("gifs")})</option>
            <option value="docs">Documentos ({countByCategory("docs")})</option>
          </select>
        </section>

        {/* Loading */}
        {loading && (
          <div className="loading-favorites">
            <i className="fas fa-spinner fa-spin fa-3x"></i>
            <p>Cargando favoritos...</p>
          </div>
        )}

        {/* Lista de favoritos */}
        {!loading && filteredFavorites.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-heart fa-4x"></i>
            <h2>No hay favoritos aquí</h2>
            <p>
              {filter
                ? "No tienes favoritos en esta categoría"
                : "Comienza a explorar y guarda tus recursos favoritos"}
            </p>
            <Link to="/resources" className="btn-card">
              <i className="fas fa-search"></i> Explorar Recursos
            </Link>
          </div>
        )}

        {/* Grid de favoritos */}
        {!loading && filteredFavorites.length > 0 && (
          <section className="favorites-grid">
            {filteredFavorites.map((fav) => (
              <div key={fav.firestoreId} className="favorite-card">
                {/* Imagen/Thumbnail */}
                {fav.thumbnail && (
                  <div className="favorite-image">
                    <img src={fav.thumbnail} alt={fav.title} />
                    <span className="category-badge">{fav.category}</span>
                  </div>
                )}

                {/* Contenido */}
                <div className="favorite-content">
                  <h3>{fav.title}</h3>
                  {fav.photographer && (
                    <p className="photographer">Por: {fav.photographer}</p>
                  )}
                  {fav.savedAt && (
                    <p className="saved-date">
                      Guardado:{" "}
                      {fav.savedAt.toDate
                        ? fav.savedAt.toDate().toLocaleDateString()
                        : new Date(fav.savedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* Acciones */}
                <div className="favorite-actions">
                  <a
                    href={fav.downloadUrl || fav.url}
                    download
                    className="btn-action"
                    title="Descargar"
                  >
                    <i className="fas fa-download"></i>
                  </a>
                  <button
                    onClick={() => handleRemoveFavorite(fav.firestoreId)}
                    className="btn-action btn-delete"
                    title="Eliminar"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
