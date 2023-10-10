import React, { useState } from 'react';
import { useUserContext } from '../../UserContext';
import './CreateJoke.css';
import Header from '../Header/Header';
import AudioButton from '../AudioButton/AudioButton';
import apiUrl from '../configURL';
import Sidebar from '../Sidebar/Sidebar';

const CreateJoke = () => {
  const { user } = useUserContext();
  const [jokeText, setJokeText] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación de longitud del texto del chiste
    if (jokeText.length > 240) {
      setMessage('El chiste es demasiado largo. Debe tener menos de 240 caracteres.');
      return; // No envíes el chiste al servidor si es demasiado largo
    }

    try {
      const response = await fetch(`${apiUrl}/jokes/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: jokeText, author: user.username }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Chiste agregado correctamente:', data);

        setMessage('Chiste añadido correctamente');
        setJokeText('');
      } else {
        const errorData = await response.json();
        console.error('Error al agregar el chiste:', errorData.error);

        setMessage('Error al agregar el chiste: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setMessage('Error al enviar el formulario. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <>
      <Header title="Añadir chiste" />
      <div className="flexRow">
      <Sidebar/>
        <div className="jokeForm">
          <h2>Añadir Nuevo Chiste</h2>
          <form className="flex" onSubmit={handleSubmit}>
            <textarea
              className="textAreaCreateJoke"
              rows="5"
              cols="40"
              id="textAreaCreate"
              placeholder="Escribe tu chiste aquí (máximo 240 caracteres)"
              value={jokeText}
              onChange={(e) => setJokeText(e.target.value)}
              required
            />
            <div>
              <AudioButton text={jokeText} />
            </div>
            <button className="bt buttonSubmit" type="submit">
              Añadir Chiste
            </button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default CreateJoke;
