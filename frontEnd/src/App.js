import React from "react";
// import Header from "./components/Header/Header";
import { UserProvider } from './UserContext'; // Importar el contexto de usuario
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import FormUser from "./components/FormUser/FormUser";
import Jokes from "./components/Jokes/Jokes";
import Start from "./components/Start/Start";
import User from "./components/User/User";
import CreateJoke from "./components/CreateJoke/CreateJoke";
import { useUserContext } from './UserContext'; // Importar el contexto de usuario

const PrivateRoute = ({ element, path }) => {
  const { user } = useUserContext();

  return user ? element : <Navigate to="/" />;
};

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login/create" element={<FormUser />} />
            <Route path="/jokes" element={<PrivateRoute element={(<Jokes />)} path="/jokes" />} />
            <Route path="/jokes/create" element={<PrivateRoute element={<CreateJoke />} path="/jokes/create" />} />
            <Route path="/user" element={<PrivateRoute element={<User />} path="/user" />} />
          </Routes>
        </>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
