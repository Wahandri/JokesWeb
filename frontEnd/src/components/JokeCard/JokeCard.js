import React, { useState, useEffect } from 'react';
import "./JokeCard.css";

const JokeCard = () => {
  const [chiste, setChiste] = useState('');
  const [funny, setFunny] = useState('');
  const [isReading, setIsReading] = useState(false); // Estado para controlar si el chiste está siendo leído

  const obtenerChisteAleatorio = async () => {
    try {
      const respuesta = await fetch('http://localhost:3001/jokes/random');
      const data = await respuesta.json();
      setChiste(data.joke.text);
      setFunny(data.joke.funny);
    } catch (error) {
      console.error('Error al obtener el chiste:', error);
    }
  };

  const leerChiste = () => {
    if (!isReading) {
      const utterance = new SpeechSynthesisUtterance(chiste);
      speechSynthesis.speak(utterance);
      setIsReading(true);
    } else {
      speechSynthesis.cancel();
      setIsReading(false);
    }
  };

  useEffect(() => {
    // Obtener un chiste aleatorio al montar el componente
    obtenerChisteAleatorio();

    // Detener la lectura al desmontar el componente
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className='jokeCard'>
      <p>Chiste aleatorio</p>
      <div className='chiste'>
        <h4 lang='es'>{chiste}</h4>
        <div>
          <h3>{funny}</h3>
        </div>
      </div>

      <div>
        <button className='random' onClick={obtenerChisteAleatorio}>
          Otro chiste
        </button>
        <button className='read' onClick={leerChiste}>
          {isReading ? 'Detener lectura' : 'Leer chiste'}
        </button>
      </div>
    </div>
  );
};

export default JokeCard;
