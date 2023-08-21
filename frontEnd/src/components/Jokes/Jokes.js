import React, { useState, useEffect } from 'react';
import "./Jokes.css";
import iconoAudio from "../../images/btAudio.png"

export default function Jokes() {
  const [chistes, setChistes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getJokesList = async (pageNumber) => {
    try {
      const respuesta = await fetch(`http://localhost:3001/jokes?page=${pageNumber}`);
      const data = await respuesta.json();
      setChistes((prevChistes) => [...prevChistes, ...data.jokes]);
      setCurrentPage(pageNumber);
      console.log('Lista de chistes cargada correctamente');
    } catch (error) {
      console.error('Error al obtener la lista de chistes:', error);
    }
  };

  useEffect(() => {
    getJokesList(1);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        // El usuario llegó al final de la página, carga más chistes
        nextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

  const nextPage = async () => {
    const nextPageNumber = currentPage + 1;
    try {
      const respuesta = await fetch(`http://localhost:3001/jokes?page=${nextPageNumber}`);
      const data = await respuesta.json();
      if (data.jokes.length > 0) {
        setChistes((prevChistes) => [...prevChistes, ...data.jokes]);
        setCurrentPage(nextPageNumber);
      }
    } catch (error) {
      console.error('Error al obtener la lista de chistes:', error);
    }
  };

  const escucharChiste = (chiste) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(chiste);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className='jokesContent'>
      <h1>Chistes</h1>
        <ul className='ul'>
          {chistes.map((chiste) => (
            <li className='li' key={chiste.id}>
              <div className='flex'>
                <h3 className='h3Joke'>{chiste.text}</h3>
                <img key={chiste.id} className='imgAudio' src={iconoAudio} onClick={() => escucharChiste(chiste.text)} alt="" />
              </div>
            </li>
          ))}
        </ul>
    </div>
  );
}

