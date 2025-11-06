import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ImagesPage from "./pages/ImagesPage";
import About from "./pages/About";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resources/images"
          element={
            <ProtectedRoute>
              <ImagesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <Support />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        {/*mas rutas cuando esten las otras paginas:
        
        <Route
          path="/resources/videos"
          element={
            <ProtectedRoute>
              <VideosPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/resources/audio"
          element={
            <ProtectedRoute>
              <AudioPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/resources/docs"
          element={
            <ProtectedRoute>
              <DocsPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/resources/gifs"
          element={
            <ProtectedRoute>
              <GifsPage />
            </ProtectedRoute>
          }
        />
        
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
