import React from "react";
import { UserProvider } from "./UserContext";
import { JokeProvider } from "./JokeContext";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import FormUser from "./components/FormUser/FormUser";
import Jokes from "./components/Jokes/Jokes";
import Start from "./components/Start/Start";
import User from "./components/User/User";
import FavoritesJokes from "./components/FavoritesJokes/FavoritesJokes";
import OwnJokes from "./components/OwnJokes/OwnJokes";
import UserData from "./components/UserData/UserData";
import CreateJoke from "./components/CreateJoke/CreateJoke";
import { useUserContext } from "./UserContext";
import TopJokes from "./components/TopJokes/TopJokes";
import DeleteUser from "./components/DeleteUser/DeleteUser";
import Footer from "./components/Footer/Footer";

const PrivateRoute = ({ element, path }) => {
  const { user } = useUserContext();

  return user ? element : <Navigate to="/" />;
};

function App() {
  return (
    <UserProvider>
      <JokeProvider>
        <BrowserRouter>
          <Header />
          <div className="bodyApp">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Jokes />} />
              <Route path="/login/create" element={<FormUser />} />
              <Route path="/login" element={<Start />} />
              <Route
                path="/jokes/create"
                element={<PrivateRoute element={<CreateJoke />} />}
              />

              <Route
                path="/user"
                element={<PrivateRoute element={<User />} />}
              />
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
              <Route path="/top" element={<TopJokes />} />
            </Routes>
          </div>
        </BrowserRouter>
        <Footer />
      </JokeProvider>
    </UserProvider>
  );
}

export default App;
