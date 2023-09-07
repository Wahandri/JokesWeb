import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../UserContext';
import { useJokeContext } from '../../JokeContext';
import Header from '../Header/Header';
import "./User.css";
import filledStarIcon from "../../images/filledStarIcon.png";
import audioIcon from '../../images/btAudio.png';


export default function User() {
  const { user, updateUser } = useUserContext();
  const { handleLikeJoke } = useJokeContext();
  const [favoriteJokes, setFavoriteJokes] = useState([]);
  const [yourJokes, setYourJokes] = useState([]);
  const [showFavoriteJokes, setShowFavoriteJokes] = useState(false);
  const [showYourJokes, setShowYourJokes] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  // Recibir chistes favoritos
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

  // Recibir y filtrar chistes propios
  useEffect(() => {
    fetch('http://localhost:3001/jokes/alljokes')
      .then(response => response.json())
      .then(data => {
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
  }, []);


  
  

  const escucharChiste = (chiste) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(chiste);
    speechSynthesis.speak(utterance);
  };

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
      <div className='baseUser flex'>
        <div className='helloUser'>
          <h1>Bienvenido, {user.username}</h1>
        </div>
        <div className='totalScore'>
          <h3>Tu puntuación total:  {totalScore}</h3>
        </div>
        <div className='tusChistes flex'>
          <h2 className='h2TusChistes' onClick={() => setShowFavoriteJokes(!showFavoriteJokes)}>
            Tus chistes favoritos
          </h2>
          {showFavoriteJokes && (
            <ul>
              {favoriteJokes.map(chiste => (
                <li key={chiste._id}>
                  {chiste.text}
                  <div>
                  <img
                    className="imgAudio"
                    src={audioIcon}
                    onClick={() => escucharChiste(chiste.text)}
                    alt="Icono de audio"
                    title="Escuchar"
                  />
                </div>
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
          )}
        </div>
        <div className='tusChistes flex'>
          <h2 className='h2TusChistes' onClick={() => setShowYourJokes(!showYourJokes)}>
            Tus chistes propios
          </h2>
          {showYourJokes && (
            <ul>
              {yourJokes.map(chiste => (
                <li key={chiste._id}>
                  {chiste.text}
                  <div>
                    <img
                      className="imgAudio"
                      src={audioIcon}
                      onClick={() => escucharChiste(chiste.text)}
                      alt="Icono de audio"
                      title="Escuchar"
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
