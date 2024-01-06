import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Jokes from "../../components/Jokes/Jokes";
import { useUserContext } from "../../UserContext";
import User from "../../components/User/User";
import FavoritesJokes from "../../components/FavoritesJokes/FavoritesJokes";
import OwnJokes from "../../components/OwnJokes/OwnJokes";
import UserData from "../../components/UserData/UserData";
import CreateJoke from "../../components/CreateJoke/CreateJoke";
import TopJokes from "../../components/TopJokes/TopJokes";
import DeleteUser from "../../components/DeleteUser/DeleteUser";

function PrivateLayout() {
  const PrivateRoute = ({ element, path }) => {
    const { user } = useUserContext();

    return user ? element : <Navigate to="/" />;
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/jokes" element={<PrivateRoute element={<Jokes />} />} />
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
        <Route path="/top" element={<PrivateRoute element={<TopJokes />} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default PrivateLayout;
