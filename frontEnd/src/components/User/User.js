import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../UserContext';
import { useJokeContext } from '../../JokeContext';

import Header from '../Header/Header';
import "./User.css";

export default function User() {
  const { user } = useUserContext();
  const { jokes, handleLikeJoke } = useJokeContext(); // Agrega handleLikeJoke desde el contexto de chistes
  const [favoriteJokes, setFavoriteJokes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/users/${user._id}/favorite-jokes`)
      .then(response => response.json())
      .then(data => {
        setFavoriteJokes(data.favoriteJokes);
      })
      .catch(error => {
        console.error('Error al obtener los chistes favoritos:', error);
      });
  }, [user._id]);

  return (
    <div>
      <Header title="Perfil" />
      <div className='flex'>
        <div>
          <h1>Bienvenido, {user.username}</h1>
        </div>
        <div className='tusChistes flex'>
          <h2 className='h2TusChistes'>Tus chistes favoritos</h2>
          <ul>
            {favoriteJokes.map(chiste => (
              <li key={chiste._id}>
                {chiste.text}
                <button onClick={() => handleLikeJoke(chiste._id)}>Escuchar</button>
                <button onClick={() => handleLikeJoke(chiste._id, true)}>Quitar de favoritos</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
