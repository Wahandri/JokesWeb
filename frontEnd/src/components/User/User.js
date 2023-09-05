import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../UserContext';
import { useJokeContext } from '../../JokeContext';
import Header from '../Header/Header';
import "./User.css";
import filledStarIcon from "../../images/filledStarIcon.png";

export default function User() {
  const { user, updateUser } = useUserContext();
  const { handleLikeJoke } = useJokeContext();
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

  const handleRemoveFromFavorites = (chisteId) => {
    if (window.confirm('¿Estás seguro de eliminar el chiste de favoritos?')) {
      // Filtra los IDs de los chistes favoritos para eliminar el chiste seleccionado
      const updatedFavoriteJokes = user.favoriteJokes.filter(id => id !== chisteId);

      // Realiza una solicitud para actualizar los chistes favoritos del usuario en el servidor
      fetch(`http://localhost:3001/users/${user._id}/update-favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favoriteJokes: updatedFavoriteJokes }),
      })
        .then(response => response.json())
        .then(data => {
          setFavoriteJokes(data.favoriteJokes);

          // Actualiza el contexto del usuario con los chistes favoritos actualizados
          updateUser({ ...user, favoriteJokes: updatedFavoriteJokes });
        })
        .catch(error => {
          console.error('Error al actualizar los chistes favoritos:', error);
        });
    }
  };

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
                <img
                  className="imgStar"
                  src={filledStarIcon}
                  alt="Quitar de favoritos"
                  title="Quitar de favoritos"
                  onClick={() => handleRemoveFromFavorites(chiste._id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
