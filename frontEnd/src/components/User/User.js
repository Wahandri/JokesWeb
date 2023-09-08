import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../UserContext';
import Header from '../Header/Header';
import "./User.css";
import filledStarIcon from "../../images/deleteFavorite.png";
import audioIcon from '../../images/btAudio.png';
import btDelete from '../../images/delete.png';

export default function User() {
  const { user, updateUser } = useUserContext();
  const [favoriteJokes, setFavoriteJokes] = useState([]);
  const [yourJokes, setYourJokes] = useState([]);
  const [showFavoriteJokes, setShowFavoriteJokes] = useState(false);
  const [showYourJokes, setShowYourJokes] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

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

  // Recibir y filtrar chistes propios
  useEffect(() => {
    console.log("Fetching your jokes...");
    fetch('/jokes/alljokes')
      .then(response => response.json())
      .then(data => {
        console.log("All jokes data:", data);
        // Filtrar los chistes por autor
        const filteredJokes = data.jokes.filter(chiste => chiste.author === user.username);
        console.log("Tus chistes propios:", filteredJokes);

        // Actualizar el estado de yourJokes con los chistes filtrados
        setYourJokes(filteredJokes);

        // Calcular la suma de los scores de los chistes filtrados
        const totalScore = filteredJokes.reduce((acumulador, chiste) => {
          return acumulador + chiste.score;
        }, 0);
        setTotalScore(totalScore);
      })
      .catch(error => {
        console.error('Error al obtener todos los chistes:', error);
      });
  }, [user.username]);

  const escucharChiste = (chiste) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(chiste);
    speechSynthesis.speak(utterance);
  };

  const handleRemoveFromFavorites = (chisteId) => {
    if (window.confirm('¿Estás seguro de eliminar el chiste de favoritos?')) {
      console.log("Removing joke from favorites...");
      // Realiza una solicitud para actualizar los chistes favoritos del usuario en el servidor
      fetch(`/users/${user._id}/favorite-jokes/${chisteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log("Updated favorite jokes data:", data);
          setFavoriteJokes(data.favoriteJokes);

          // Actualiza el contexto del usuario con los chistes favoritos actualizados
          updateUser({ ...user, favoriteJokes: data.favoriteJokes });
        })
        .catch(error => {
          console.error('Error al eliminar el chiste de favoritos:', error);
        });
    }
  };

  return (
    <div>
      <Header title="Perfil" />
      <div className='baseUser flex'>
        <div className='helloUser'>
          <h1>Bienvenido, {user.username}</h1>
        </div>
        <div className='totalScore'>
          <h3>Tu puntuación total:  {totalScore}</h3>
        </div>
        <div className='tusChistes flex'>
          <h2 className='h2TusChistes ' onClick={() => setShowFavoriteJokes(!showFavoriteJokes)}>
            Tus chistes favoritos
          </h2>
          <hr className='hr'/>
          {showFavoriteJokes && (
            <ul>
              {favoriteJokes.map(chiste => (
                <li className='jokesUser' key={chiste._id}>
                  {chiste.text}
                  <div className='btsUser'>
                    <img
                      className="imgAudio"
                      src={audioIcon}
                      onClick={() => escucharChiste(chiste.text)}
                      alt="Icono de audio"
                      title="Escuchar"
                    />
                  
                    <img
                      className="imgStar"
                      src={filledStarIcon}
                      alt="Quitar de favoritos"
                      title="Quitar de favoritos"
                      onClick={() => handleRemoveFromFavorites(chiste._id)}
                    />
                  </div> 
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className='tusChistes flex'>
          <h2 className='h2TusChistes' onClick={() => setShowYourJokes(!showYourJokes)}>
            Tus chistes propios
          </h2>
          <hr className='hr'/>
          {showYourJokes && (
            <ul>
              {yourJokes.map(chiste => (
                <li className='jokesUser' key={chiste._id}>
                  {chiste.text}
                  <div className='btUser'>
                    <img
                      className="imgAudio"
                      src={audioIcon}
                      onClick={() => escucharChiste(chiste.text)}
                      alt="Icono de audio"
                      title="Escuchar"
                    />
                  
                    <img
                      className="imgAudio"
                      src={btDelete}
                      
                      alt=""
                      title="Borrar Chiste"
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
