import React, { useEffect, useState } from 'react';
import btDelete from '../../images/delete.png';
import MediaIcon from "../MediaScore/MediaScore";
import AudioButton from '../AudioButton/AudioButton';

const ChistesPropios = ({ user, token }) => {
  const [yourJokes, setYourJokes] = useState([]);

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
        console.error('Error al obtener todos los chistes:', error);
      });
  }, [user.username]);

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
      <h2>Tus chistes propios</h2>
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
              <MediaIcon averageScore={chiste.score} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ChistesPropios;
