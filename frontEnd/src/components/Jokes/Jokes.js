import React, { useState, useEffect } from 'react';
import "./Jokes.css";

export default function Jokes() {
  const [chistes, setChistes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Función para obtener la lista de chistes desde la API
  const getJokesList = async (pageNumber) => {
    try {
      const respuesta = await fetch(`http://localhost:3001/jokes?page=${pageNumber}`);
      const data = await respuesta.json();
      setChistes(data.jokes);
      setCurrentPage(pageNumber);
      console.log('Lista de chistes cargada correctamente');
    } catch (error) {
      console.error('Error al obtener la lista de chistes:', error);
    }
  };

  useEffect(() => {
    // Obtener lista de chistes al montar el componente (página 1 por defecto)
    getJokesList(1);
  }, []);

  const nextPage = async () => {
    const nextPageNumber = currentPage + 1;
    try {
      const respuesta = await fetch(`http://localhost:3001/jokes?page=${nextPageNumber}`);
      const data = await respuesta.json();
      if (data.jokes.length > 0) {
        setChistes(data.jokes);
        setCurrentPage(nextPageNumber);
      }
    } catch (error) {
      console.error('Error al obtener la lista de chistes:', error);
    }
  };

  const prevPage = async () => {
    const prevPageNumber = currentPage - 1;
    if (prevPageNumber >= 1) {
      try {
        const respuesta = await fetch(`http://localhost:3001/jokes?page=${prevPageNumber}`);
        const data = await respuesta.json();
        setChistes(data.jokes);
        setCurrentPage(prevPageNumber);
      } catch (error) {
        console.error('Error al obtener la lista de chistes:', error);
      }
    }
  };

  // Función para escuchar el chiste en audio
  const escucharChiste = (chiste) => {
    // Aquí debes implementar la lógica para reproducir el audio del chiste
    // Puedes utilizar librerías o APIs de síntesis de voz para realizar esta tarea
    // Por ejemplo, la Web Speech API de JavaScript puede ser una opción para reproducir el texto en voz.

    // Ejemplo de cómo usar la Web Speech API (Es posible que necesites adaptar esto según tu implementación y necesidades)
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(chiste);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className='jokesContent' >
      <h1>Chistes</h1>
      <div className='boxJokes'>
        <ul className='ul'>
          {chistes.map((chiste) => (
            <li className='li' key={chiste.id}>
              {chiste.text}
              <button  onClick={() => escucharChiste(chiste.text)} className='audioButton'>
                Escuchar
              </button>
            </li>
          ))}
          <div className='buttonBox'>
            <button onClick={prevPage} className='bt' disabled={currentPage === 1}>
              ANTERIOR
            </button>
            <button onClick={nextPage} className='bt'>
              SIGUIENTE
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
}
