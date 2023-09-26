import React, { useState, useEffect } from 'react';
import "./JokeCard.css";
import iconAudio from "../../images/btAudio.png";
import iconUpdate from "../../images/btUpdate.png";

const JokeCard = () => {
  const [chiste, setChiste] = useState('');
  // const [funny, setFunny] = useState('');
  const [isReading, setIsReading] = useState(false); // Estado para controlar si el chiste está siendo leído

  const obtenerChisteAleatorio = async () => {
    try {
      const respuesta = await fetch('http://localhost:3001/jokes/random');
      const data = await respuesta.json();
      setChiste(data.joke.text);
      // setFunny(data.joke.funny);
    } catch (error) {
      console.error('Error al obtener el chiste:', error);
    }
  };

  const leerChiste = () => {
    if (!isReading) {
      const utterance = new SpeechSynthesisUtterance(chiste);
      speechSynthesis.speak(utterance);

      utterance.onend = () => {
        setIsReading(false);
      };
      setIsReading(true);
    } else {
      speechSynthesis.cancel();
      setIsReading(false);
    }
  };

  useEffect(() => {
    
    obtenerChisteAleatorio();

 
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className='jokeCard'>
      <div className="h4Title">
        <h2 >Tu chiste del día</h2>
      </div>
      <hr className='hr'></hr>
      <div className='chiste'>
        <h4 className='h4' lang='es'>{chiste}</h4>
      </div>

      <div className='buttons'>
        <img 
          title='Otro chiste'
          src={iconUpdate} 
          alt="" 
          className=' imgAudio random' 
          onClick={obtenerChisteAleatorio}
        />
        <img 
          title='Escuchar'
          alt=''
          className='imgAudio'
          src={iconAudio}  
          onClick={leerChiste}/>
      </div>
    </div>
  );
};

export default JokeCard;
