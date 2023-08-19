import React from 'react';
import Login from '../Login/Login';
import { useUserContext } from '../../UserContext';
import "./Start.css";
import JokeCard from '../JokeCard/JokeCard';
import logotipo from "../../images/logotipo.png";

export default function Index({ setIsLoggedIn }) {
  const { setUser } = useUserContext(); 

  const handleSuccessfulLogin = (user) => {
    setUser(user); // Establece el usuario en el contexto
    setIsLoggedIn(true); // Actualiza el estado de inicio de sesión
  };

  return (
    <div className='base'>
      <div className='logoContainer'>
        <img className='img' src={logotipo} alt="" />
      </div>
      <div className='indexBox'>
        <div className="jokeCard">
          <JokeCard />
        </div>
        <div className="loginCard">
          
          <Login onLogin={handleSuccessfulLogin} />
        </div>
      </div>
    </div>
  );
}
