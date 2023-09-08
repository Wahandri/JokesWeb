import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import './Jokes.css';
import emptyStarIcon from '../../images/emptyStarIcon.png';
import filledStarIcon from '../../images/filledStarIcon.png';
import addJoke from "../../images/addJoke.png"
import audioIcon from '../../images/btAudio.png';
import { useUserContext } from '../../UserContext';
import JokesFilters from './JokesFilters';

export default function Jokes() {
  const [chistes, setChistes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ filter: '' });
  const { user } = useUserContext();
  const loadingRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getJokesList(currentPage, filters);
      if (data.ok) {
        setChistes(prevChistes => [...prevChistes, ...data.jokes]); // Agrega los nuevos chistes al estado existente
        setTotalPages(Math.ceil(data.totalJokes / 5));
      }
    };

    fetchData();
  }, [currentPage, filters]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        loadingRef.current &&
        loadingRef.current.getBoundingClientRect().bottom <= window.innerHeight
      ) {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, totalPages]);

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
            chiste._id === jokeId
              ? {
                ...chiste,
                likedByUser: !chiste.likedByUser,
                score: chiste.score + (chiste.likedByUser ? -1 : 1),
              }
              : chiste
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

  const getJokesList = async (page, filters) => {
    try {
      const response = await fetch(`http://localhost:3001/jokes?page=${page}&filter=${filters.filter}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener la lista de chistes:', error);
      return { ok: false, error };
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div>
      <Header title="Chistes" />
      <JokesFilters onFilterChange={handleFilterChange} />
      <div className="jokesContent">
        <div className="boxJokes">
          <ul className="ul">
            {chistes.map((chiste) => (
              <li className="li" key={chiste._id}>
                <div className='author'>
                  <p>{chiste.author}</p>
                </div>
                <div>
                  {chiste.text}
                </div>
                <div className='score-start'>
                  <img
                    className="imgAudio"
                    src={audioIcon}
                    onClick={() => escucharChiste(chiste.text)}
                    alt="Icono de audio"
                    title="Escuchar"
                  />
                  <h4>{chiste.score}</h4>
                  <img
                    className="imgStar"
                    src={chiste.likedByUser ? filledStarIcon : emptyStarIcon}
                    onClick={() => handleLike(chiste._id)}
                    alt={chiste.likedByUser ? 'Favorito' : 'No favorito'}
                    title={chiste.likedByUser ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div ref={loadingRef} className="loading">
          {currentPage < totalPages && <p>Cargando más chistes...</p>}
        </div>
      </div>
      <div>
        <Link to="/jokes/create">
          <img
            className='floatingIcon btAddJoke'
            src={addJoke} alt=""
          />
        </Link>
      </div>
    </div>
  );
}
