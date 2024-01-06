import React from "react";
import { UserProvider } from "./UserContext";
import { JokeProvider } from "./JokeContext";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormUser from "./components/FormUser/FormUser";
import Start from "./components/Start/Start";
import PrivateLayout from "./components/PrivateLayout/PrivateLayout";

function App() {
  return (
    <UserProvider>
      <JokeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login/create" element={<FormUser />} />
            <Route path="/*" element={<PrivateLayout />} />
          </Routes>
        </BrowserRouter>
      </JokeProvider>
    </UserProvider>
  );
}

export default App;
