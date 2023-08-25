import React, { useState, useEffect } from 'react';
import "./Jokes.css";
import emptyStarIcon from "../../images/emptyStarIcon.png";
import filledStarIcon from "../../images/filledStarIcon.png";
import audioIcon from "../../images/btAudio.png"; 
import addJoke from "../../images/addJoke.png";
import { useUserContext } from '../../UserContext';

export default function Jokes() {
  const [chistes, setChistes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useUserContext();

  const getJokesList = async (pageNumber) => {
    try {
      const response = await fetch(`http://localhost:3001/jokes?page=${pageNumber}`);
      const data = await response.json();
      return data.jokes;
    } catch (error) {
      console.error('Error al obtener la lista de chistes:', error);
      return [];
    }
  };

  const loadMoreJokes = async () => {
    if (!loading) {
      setLoading(true);
      const nextPageNumber = currentPage + 1;
      const newJokes = await getJokesList(nextPageNumber);
      if (newJokes.length > 0) {
        setChistes((prevChistes) => [...prevChistes, ...newJokes]);
        setCurrentPage(nextPageNumber);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreJokes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadMoreJokes();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLike = async (jokeId) => {
    try {
      if (!user) {
        alert('Debes iniciar sesión para dar "Me gusta"');
        return;
      }

      const response = await fetch(`http://localhost:3001/jokes/${jokeId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id }),
      });

      if (response.ok) {
        setChistes(prevChistes =>
          prevChistes.map(chiste =>
            chiste._id === jokeId ? { ...chiste, likedByUser: !chiste.likedByUser } : chiste
          )
        );
      } else {
        const data = await response.json();
        alert(data.error);
      }
    } catch (error) {
      console.error('Error al dar "Me gusta":', error);
      alert('Error al dar "Me gusta". Inténtalo de nuevo más tarde.');
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
      <div className='boxJokes'>
        <ul className='ul'>
          {chistes.map((chiste) => (
            <li className='li' key={chiste._id}>
              {chiste.text}
              <div>
              <img
                className='imgStar'
                src={chiste.likedByUser ? filledStarIcon : emptyStarIcon}
                onClick={() => handleLike(chiste._id)}
                alt=""
                title={chiste.likedByUser ? "Eliminar de favoritos" : "Añadir a favoritos"}
              />
              <img
                className='imgAudio'
                src={audioIcon}
                onClick={() => escucharChiste(chiste.text)}
                alt=""
                title='Escuchar'
              />
              </div>
              
            </li>
          ))}
        </ul>
        {loading && <p>Cargando más chistes...</p>}
      </div>
      <div className="floatingIconBox">
        <img 
          className='floatingIcon' 
          src={addJoke} 
          title='Añadir Chiste Nuevo' />
      </div>
    </div>
  );
}
