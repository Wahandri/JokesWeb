import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useUserContext } from "../../UserContext";
import User from "../../components/User/User";
import FavoritesJokes from "../../components/FavoritesJokes/FavoritesJokes";
import OwnJokes from "../../components/OwnJokes/OwnJokes";
import UserData from "../../components/UserData/UserData";
import CreateJoke from "../../components/CreateJoke/CreateJoke";
import DeleteUser from "../../components/DeleteUser/DeleteUser";

function PrivateLayout() {
  const { user } = useUserContext();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectTo) {
      navigate(redirectTo);
    }
  }, [redirectTo, navigate]);

  const handleLoginRedirect = (path) => {
    setRedirectTo(path);
    setShowLoginDialog(true);
  };

  const handleLoginConfirmed = () => {
    setShowLoginDialog(false);
    navigate("/login", { state: { from: redirectTo } });
  };

  const handleLoginCancelled = () => {
    setShowLoginDialog(false);
    setRedirectTo(null);
  };

  const PrivateRoute = ({ element, path }) => {
    if (user) {
      return element;
    } else {
      handleLoginRedirect(path);
      return null; // Aquí podrías renderizar un componente de carga o nada
    }
  };

  return (
    <div className="boxPrivateLayout">
      {showLoginDialog && (
        <div>
          {/* Tu componente de cuadro de diálogo de confirmación aquí */}
          <p>¿Quieres hacer login?</p>
          <button onClick={handleLoginConfirmed}>Sí</button>
          <button onClick={handleLoginCancelled}>Cancelar</button>
        </div>
      )}

      <Routes>
        <Route
          path="/jokes/create"
          element={<PrivateRoute element={<CreateJoke />} />}
        />
        <Route path="/user" element={<PrivateRoute element={<User />} />} />
        <Route
          path="/user/favorites"
          element={<PrivateRoute element={<FavoritesJokes />} />}
        />
        <Route
          path="/user/own"
          element={<PrivateRoute element={<OwnJokes />} />}
        />
        <Route
          path="/user/data"
          element={<PrivateRoute element={<UserData />} />}
        />
        <Route
          path="/user/delete"
          element={<PrivateRoute element={<DeleteUser />} />}
        />
        {/* Añade aquí más rutas privadas según sea necesario */}
      </Routes>
      <Footer />
    </div>
  );
}

export default PrivateLayout;
