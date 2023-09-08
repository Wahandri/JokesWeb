import React from "react";
import { UserProvider } from './UserContext';
import { JokeProvider } from './JokeContext';
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import FormUser from "./components/FormUser/FormUser";
import Jokes from "./components/Jokes/Jokes";
import Start from "./components/Start/Start";
import User from "./components/User/User";
import CreateJoke from "./components/CreateJoke/CreateJoke";
import { useUserContext } from './UserContext';

const PrivateRoute = ({ element, path }) => {
  const { user } = useUserContext();

  return user ? element : <Navigate to="/" />;
};

function App() {
  return (
    <UserProvider>
      <JokeProvider> 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login/create" element={<FormUser />} />
            <Route path="/jokes" element={<PrivateRoute element={<Jokes />} />} />
            <Route path="/jokes/create" element={<PrivateRoute element={<CreateJoke />} />} />
            <Route path="/user" element={<PrivateRoute element={<User />} />} />
          </Routes>
        </BrowserRouter>
      </JokeProvider>
    </UserProvider>
  );
}

export default App;
