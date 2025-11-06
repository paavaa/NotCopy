import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Home.css";
import "../styles/ImagesPage.css";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import Footer from "../components/Footer";

export default function ImagesPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // API KEY de Pexels
  const PEXELS_API_KEY =
    "TyLEwwsPpK4Zve5alr5151eHDpnYeZCKWcapxfAzcYWUjYvwEzlsuEc0";

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  //header dinámico
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("main-header");
      if (header) header.classList.toggle("scrolled", window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //cargar imágenes de Pexels al montar
  useEffect(() => {
    fetchPexelsImages();
    fetchUserFavorites();
  }, []);

  //obtener imagenes de pexels
  const fetchPexelsImages = async (searchQuery = "") => {
    try {
      setLoading(true);
      const endpoint = searchQuery
        ? `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=30`
        : `https://api.pexels.com/v1/curated?per_page=30`;

      const response = await fetch(endpoint, {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      });

      const data = await response.json();
      setImages(data.photos || []);
    } catch (error) {
      console.error("Error al cargar imágenes:", error);
    } finally {
      setLoading(false);
    }
  };

  //obtener favoritos del usuario
  const fetchUserFavorites = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "favorites"),
        where("userId", "==", user.uid),
        where("category", "==", "images")
      );

      const querySnapshot = await getDocs(q);
      const favs = querySnapshot.docs.map((doc) => ({
        firestoreId: doc.id,
        ...doc.data(),
      }));

      setFavorites(favs);
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
    }
  };

  //buscar imagenes
  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchPexelsImages(searchTerm);
    } else {
      fetchPexelsImages();
    }
  };

  //agregar a favoritos
  const handleAddFavorite = async (image) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Debes iniciar sesión para guardar favoritos");
        return;
      }

      await addDoc(collection(db, "favorites"), {
        userId: user.uid,
        category: "images",
        imageId: image.id,
        title: image.alt || "Imagen sin título",
        url: image.src.large,
        thumbnail: image.src.medium,
        photographer: image.photographer,
        downloadUrl: image.src.original,
        savedAt: new Date(),
      });
      1;

      alert("✅ Imagen agregada a favoritos");
      fetchUserFavorites();
    } catch (error) {
      console.error("Error al agregar favorito:", error);
      alert("Error al guardar favorito");
    }
  };

  //eliminar de favoritos
  const handleRemoveFavorite = async (firestoreId) => {
    try {
      await deleteDoc(doc(db, "favorites", firestoreId));
      alert("🗑️ Imagen eliminada de favoritos");
      fetchUserFavorites();
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
    }
  };

  // mirar si una imagen es favorita
  const isFavorite = (imageId) => {
    return favorites.some((fav) => fav.imageId === imageId);
  };

  // obtener id de firestore de un favorito
  const getFavoriteId = (imageId) => {
    const fav = favorites.find((f) => f.imageId === imageId);
    return fav ? fav.firestoreId : null;
  };

  return (
    <div className="imagepage-container">
      {/* header */}
      <header className="header" id="main-header">
        <h1>NotCopy</h1>
        <nav>
          <Link to="/home">Inicio</Link>
          <Link to="/downloads">Descargas</Link>
          <Link to="/dashboard">Favoritos</Link>
          <Link to="/support">Soporte</Link>
          <Link to="/about">Sobre NotCopy</Link>
          <Link to="/resources">Recursos</Link>
          <Link to="/contact">Contacto</Link>
          <button onClick={handleLogout} className="logout-btn">
            Cerrar sesión
          </button>
        </nav>
      </header>

      <div className="animated-bg"></div>

      <main className="main-content">
        {/*hero*/}
        <section className="hero">
          <div className="hero-content">
            <h1>Galería de Imágenes</h1>
            <br />
            <h2>Miles de fotos de alta calidad</h2>
            <p>Explora, descarga y guarda tus imágenes favoritas.</p>
          </div>
        </section>

        {/* buscador */}
        <section className="search-bar">
          <input
            type="text"
            placeholder="Buscar imágenes: paisajes, tecnología, naturaleza..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </button>
        </section>

        {/* cargando*/}
        {loading && (
          <div className="loading-container">
            <i className="fas fa-spinner fa-spin fa-3x"></i>
            <p>Cargando imágenes...</p>
          </div>
        )}

        {/* grid de imagenes */}
        {!loading && (
          <section className="grid-cards">
            {images.map((image) => (
              <div key={image.id} className="card image-card">
                <img
                  src={image.src.medium}
                  alt={image.alt || "Imagen"}
                  className="image-thumbnail"
                />
                <h3>{image.alt || "Imagen sin título"}</h3>
                <p className="photographer-name">Por: {image.photographer}</p>

                {/* botones*/}
                <div className="card-actions">
                  <a
                    href={image.src.original}
                    download
                    className="btn-card btn-download"
                  >
                    <i className="fas fa-download"></i>
                  </a>

                  {isFavorite(image.id) ? (
                    <button
                      onClick={() =>
                        handleRemoveFavorite(getFavoriteId(image.id))
                      }
                      className="btn-card btn-favorite active"
                    >
                      <i className="fas fa-heart"></i>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddFavorite(image)}
                      className="btn-card btn-favorite"
                    >
                      <i className="far fa-heart"></i>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}
      </main>

      {/* pie de pagina*/}
      <Footer />
    </div>
  );
}
