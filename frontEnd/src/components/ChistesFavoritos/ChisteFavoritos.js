// ChistesFavoritos.js
import React, { useEffect, useState } from 'react';
import filledStarIcon from "../../images/deleteFavorite.png";
import AudioButton from '../AudioButton/AudioButton';

const ChistesFavoritos = ({ token, user }) => {
  const [favoriteJokes, setFavoriteJokes] = useState([]);

  // Recibir chistes favoritos
  useEffect(() => {
    console.log("Fetching favorite jokes...");
    fetch(`/users/${user._id}/favorite-jokes`)
      .then(response => response.json())
      .then(data => {
        console.log("Favorite jokes data:", data);
        setFavoriteJokes(data.favoriteJokes);
      })
      .catch(error => {
        console.error('Error al obtener los chistes favoritos:', error);
      });
  }, [user._id]);

  const handleRemoveFromFavorites = (chisteId) => {
    if (window.confirm('¿Estás seguro de eliminar el chiste de favoritos?')) {
      // Realiza una solicitud DELETE para eliminar el chiste de favoritos
      fetch(`/jokes/${chisteId}/favorite`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user._id }),
      })
        .then(response => response.json())
        .then(data => {
          console.log("Updated favorite jokes data:", data);
          
          // Actualiza el estado de favoriteJokes
          setFavoriteJokes(prevFavoriteJokes => prevFavoriteJokes.filter(chiste => chiste._id !== chisteId));
        })
        .catch(error => {
          console.error('Error al eliminar de favoritos:', error);
        });
    }
  };

  return (
    <div>
      <h2>Tus chistes favoritos</h2>
      <ul>
        {favoriteJokes.length === 0 ? (
          <h4>No tienes chistes en favoritos.</h4>
        ) : (
          favoriteJokes.map(chiste => (
            <li className='jokesUser' key={chiste._id}>
              {chiste.text}
              <div className='btsUser'>
                <AudioButton text={chiste.text} />
                <img
                  className="imgStar"
                  src={filledStarIcon}
                  alt="Quitar de favoritos"
                  title="Quitar de favoritos"
                  onClick={() => handleRemoveFromFavorites(chiste._id)}
                />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ChistesFavoritos;
