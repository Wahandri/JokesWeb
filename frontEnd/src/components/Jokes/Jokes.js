import React, { useState, useEffect } from 'react';
import Header from "../Header/Header"
import "./Jokes.css";
import emptyStarIcon from "../../images/emptyStarIcon.png";
import filledStarIcon from "../../images/filledStarIcon.png";
import audioIcon from "../../images/btAudio.png";
// import addJoke from "../../images/addJoke.png";
import { useUserContext } from '../../UserContext';

export default function Jokes() {
  const [chistes, setChistes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Total de páginas disponibles
  const { user } = useUserContext();

  const getJokesList = async (page) => {
    try {
      const response = await fetch(`http://localhost:3001/jokes?page=${page}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener la lista de chistes:', error);
      return { ok: false, error };
    }
  };

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
                score: chiste.score + (chiste.likedByUser ? -1 : 1)
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getJokesList(currentPage);
      if (data.ok) {
        setChistes(data.jokes);
        setTotalPages(Math.ceil(data.totalJokes / 5)); // Calcula el total de páginas
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <div>
      <Header title="Chistes" />
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
                {chiste.text}
                <div>
                  <div>
                    <img
                      className="imgStar"
                      src={chiste.likedByUser ? filledStarIcon : emptyStarIcon}
                      onClick={() => handleLike(chiste._id)}
                      alt={chiste.likedByUser ? 'Favorito' : 'No favorito'}
                      title={
                        chiste.likedByUser
                          ? 'Eliminar de favoritos'
                          : 'Añadir a favoritos'
                      }
                    />
                    <h4>{chiste.score}</h4>
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
    </div>
  );
}