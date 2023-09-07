import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import './Jokes.css';
import emptyStarIcon from '../../images/emptyStarIcon.png';
import filledStarIcon from '../../images/filledStarIcon.png';
import addJoke from "../../images/addJoke.png"
import audioIcon from '../../images/btAudio.png';
import { useUserContext } from '../../UserContext';
import JokesFilters from './JokesFilters'; // Importa el componente de filtros

export default function Jokes() {
  const [chistes, setChistes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ filter: '' }); // Agrega el estado de los filtros
  const { user } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getJokesList(currentPage, filters); // Pasa los filtros a la función de obtención de chistes
      if (data.ok) {
        const filteredChistes = data.jokes.map(chiste => ({
          ...chiste,
          likedByUser: user.favoriteJokes.includes(chiste._id),
        }));
        setChistes(filteredChistes);
        setTotalPages(Math.ceil(data.totalJokes / 5));
      }
    };

    fetchData();
  }, [currentPage, user.favoriteJokes, filters]); // Agrega filters a las dependencias

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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getJokesList = async (page, filters) => {
    try {
      const response = await fetch(`http://localhost:3001/jokes?page=${page}&filter=${filters.filter}`, {
        method: 'GET', // Cambia a GET para obtener los chistes con filtros
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
    // Actualiza los filtros y reinicia la página a la primera al aplicar un nuevo filtro
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div>
      <Header title="Chistes" />
      <JokesFilters onFilterChange={handleFilterChange} /> {/* Agrega los filtros */}
      <div className="jokesContent">
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
          <span>Página {currentPage} de {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
        </div>
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
                <div>
                  <img
                    className="imgAudio"
                    src={audioIcon}
                    onClick={() => escucharChiste(chiste.text)}
                    alt="Icono de audio"
                    title="Escuchar"
                  />
                </div>
                <div className='score-start'>
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
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
          <span>Página {currentPage} de {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
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
