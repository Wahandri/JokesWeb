import React, { useState, useEffect } from 'react';
import "./Jokes.css";
import iconoAudio from "../../images/btAudio.png"

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
              <img key={chiste.id} className='imgAudio' src={iconoAudio}  onClick={() => escucharChiste(chiste.text)} alt="" />
            </li>
          ))}
          <div className='buttonBox'>
            <button onClick={prevPage} className='buttonLogin' disabled={currentPage === 1}>
              ANTERIOR
            </button>
            <button onClick={nextPage} className='buttonLogin'>
              SIGUIENTE
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
}
