import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../UserContext';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import AudioButton from '../AudioButton/AudioButton';
import btDelete from '../../images/delete.png';
import MediaIcon from '../MediaScore/MediaScore';

export default function YourJokes() {
  const { user } = useUserContext();
  const [yourJokes, setYourJokes] = useState([]);
  const token = localStorage.getItem('token');

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
      })
      .catch(error => {
        console.error('Error al obtener tus chistes propios:', error);
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

  return (
    <div>
      <Header title="Tus Chistes Propios" />
      <div className='flexRow'>
        <Sidebar />
        <div className='baseUser flex'>

          <div className='helloUser'>
            <h1>Bienvenido, {user.username}</h1>
          </div>
          <div className='tusChistes flex'>
            {yourJokes.length > 0 && (
              <ul>
                {yourJokes.map(chiste => (
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
                      />
                      <MediaIcon averageScore={chiste.score} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {yourJokes.length === 0 && (
              <h4>No hay chistes propios.</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
