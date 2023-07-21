import React, { useState, useEffect } from 'react';
import "./JokeCard.css";

export default function JokeCard() {
  const [chiste, setChiste] = useState('');

  const obtenerChisteAleatorio = async () => {
    try {
        const respuesta = await fetch('http://localhost:3001/jokes/random')
        const data = await respuesta.json();
        setChiste(data.joke.text);
      
    } catch (error) {
        return error
    }}
    

    

  useEffect(() => {
    // Obtener un chiste aleatorio al montar el componente
    obtenerChisteAleatorio();
  }, []);

  return (
    <div className="body">
      <div className='card'>
        <div className='chiste'><h1>{chiste}</h1></div>
        {/* Agrega el controlador de eventos onClick al elemento botón */}
        <button className='random' onClick={obtenerChisteAleatorio}>Otro chiste</button>
      </div>
    </div> 
  );
}
