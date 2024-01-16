import React from "react";
import { UserProvider } from "./UserContext";
import { JokeProvider } from "./JokeContext";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormUser from "./components/FormUser/FormUser";
import Jokes from "./components/Jokes/Jokes";
import PrivateLayout from "./components/PrivateLayout/PrivateLayout";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import TopJokes from "./components/TopJokes/TopJokes";

function App() {
  return (
    <UserProvider>
      <JokeProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Jokes />} />
            <Route path="/jokes" element={<Jokes />} />
            <Route path="/top" element={<TopJokes />} />
            <Route path="/login/create" element={<FormUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<PrivateLayout />} />
          </Routes>
        </BrowserRouter>
      </JokeProvider>
    </UserProvider>
  );
}

export default App;
