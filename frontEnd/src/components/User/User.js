import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../UserContext';
import Header from '../Header/Header';
import "./User.css";
import filledStarIcon from "../../images/deleteFavorite.png";
import AudioButton from '../AudioButton/AudioButton';
import btDelete from '../../images/delete.png';
import MediaIcon from "../MediaScore/MediaScore";


export default function User() {
  const { user, updateUser } = useUserContext();
  const [favoriteJokes, setFavoriteJokes] = useState([]);
  const [yourJokes, setYourJokes] = useState([]);
  const [showFavoriteJokes, setShowFavoriteJokes] = useState(false);
  const [showYourJokes, setShowYourJokes] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const token = localStorage.getItem('token');

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


  // Función para eliminar un chiste
  const deleteJoke = async (chisteId) => {
    if (window.confirm('¿Estás seguro de eliminar este chiste?')) {
      try {
        console.log("Deleting joke...");
  
        // Realiza una solicitud para eliminar el chiste de la base de datos
        const response = await fetch(`/jokes/${chisteId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        console.log("Respuesta del servidor:", response.status);
  
        if (response.ok) {
          console.log("Chiste eliminado correctamente.");
          // Actualizar lista de Chistes Propios
          const updatedYourJokes = yourJokes.filter(chiste => chiste._id !== chisteId);
          setYourJokes(updatedYourJokes);
          
        } else {
          const data = await response.json();
          console.error('Error al eliminar el chiste:', data.error);
          alert(data.error);
        }
      } catch (error) {
        console.error('Error al eliminar el chiste:', error);
        alert('Error al eliminar el chiste. Inténtalo de nuevo más tarde.');
      }
    } else {
      console.log("Cancelado por el usuario.");
    }
  };
  
  
  


 // Eliminar un chiste de favoritos
  const handleRemoveFromFavorites = (chisteId) => {
    if (window.confirm('¿Estás seguro de eliminar el chiste de favoritos?')) {
      // Realiza una solicitud DELETE para eliminar el chiste de favoritos
      fetch(`/jokes/${chisteId}/favorite`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id }),
      })
        .then(response => response.json())
        .then(data => {
          console.log("Updated favorite jokes data:", data);
          
          // Actualiza el estado de favoriteJokes y yourJokes
          setFavoriteJokes(prevFavoriteJokes => prevFavoriteJokes.filter(chiste => chiste._id !== chisteId));
          setYourJokes(prevYourJokes => prevYourJokes.filter(chiste => chiste._id !== chisteId));

          // Actualiza el contexto del usuario con los chistes favoritos actualizados
          updateUser({ ...user, favoriteJokes: data.favoriteJokes });
        })
        .catch(error => {
          console.error('Error al eliminar de favoritos:', error);
        });
    }
  };


  // Puntuacion media de tus chistes
  

  

  return (
    <div>
      <Header title="Perfil" />
      <div className='baseUser flex'>
        <div className='helloUser'>
          <h1>Bienvenido, {user.username}</h1>
        </div>
        {/* <div className='totalScore'>
          <h3>Tu puntuación total:  {totalScore}</h3>
        </div> */}
        <div className='tusChistes flex'>
          <h2 className='h2TusChistes ' onClick={() => setShowFavoriteJokes(!showFavoriteJokes)}>
            Tus chistes favoritos
          </h2>
          <hr className='hr'/>
          {showFavoriteJokes && (
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
          )}
        </div>
        <div className='tusChistes flex'>
          <h2 className='h2TusChistes' onClick={() => setShowYourJokes(!showYourJokes)}>
            Tus chistes propios
          </h2>
          <hr className='hr'/>
          {showYourJokes && (
            <ul>
              {yourJokes.length === 0 ? (
                <h4>No hay chistes propios.</h4>
              ) : (
                yourJokes.map(chiste => (
                  <li className='jokesUser' key={chiste._id}>
                    {chiste.text}
                    <div className='btsUser'>
                     <AudioButton text={chiste.text} />
                      <img
                        className="imgDelete"
                        src={btDelete}
                        alt="Eliminar chiste"
                        title="Eliminar chiste"
                        onClick={() => deleteJoke(chiste._id)}
                        style={{ width: '24px', height: '24px' }}
                      />
                    </div> 
                    <MediaIcon  averageScore={chiste.score} />
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
