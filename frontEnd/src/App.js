import React, { useState } from "react";
import Header from "./components/Header/Header";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormUser from "./components/FormUser/FormUser";
import Jokes from "./components/Jokes/Jokes";
import Start from "./components/Start/Start";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar el inicio de sesión

  return (
    <BrowserRouter>
      <>
        {/* Muestra el encabezado solo si el usuario ha iniciado sesión */}
        {isLoggedIn && <Header title="WAHAHA" />}

        <div >
          <Routes>
            {/* Página de inicio */}
            <Route path="/" element={<Start setIsLoggedIn={setIsLoggedIn} />} />

            {/* Resto de las rutas */}
            <Route path="/login/create" element={<FormUser />} />
            <Route path="/jokes" element={<Jokes />} />
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
