import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Jokes.css";
import emptyStarIcon from "../../images/emptyStarIcon.png";
import filledStarIcon from "../../images/filledStarIcon.png";
import addJoke from "../../images/addJoke.png";
import AudioButton from "../AudioButton/AudioButton";
import { useUserContext } from "../../UserContext";
import JokesFilters from "./FilterAndTop";
import Score from "./Score";
import apiUrl from "../configURL";

export default function Jokes() {
  const [chistes, setChistes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ filter: "" });
  const { user, updateUser } = useUserContext();
  const loadingRef = useRef(null);
  const [averageScore] = useState(0);

  // Función para cargar chistes desde el servidor
  const fetchJokes = async (page, filter) => {
    try {
      const response = await fetch(
        `${apiUrl}/jokes?page=${page}&filter=${filter}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener la lista de chistes:", error);
      return { ok: false, error };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchJokes(currentPage, filters.filter);
      if (data.ok) {
        if (currentPage === 1) {
          // Si es la primera página, reemplaza los chistes existentes
          setChistes(data.jokes);
        } else {
          // Si no es la primera página, agrega los nuevos chistes al estado existente
          setChistes((prevChistes) => [...prevChistes, ...data.jokes]);
        }
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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, totalPages]);

  // Función para manejar el botón de "Estrella" en un chiste (Añadir a favoritos)
  const handleLike = async (jokeId) => {
    try {
      if (!user) {
        alert("Debes iniciar sesión para agregar a favoritos");
        return;
      }

      const response = await fetch(`${apiUrl}/jokes/${jokeId}/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      });

      if (response.ok) {
        const data = await response.json();

        // Actualizar la lista de chistes en el estado según sea necesario
        setChistes((prevChistes) =>
          prevChistes.map((chiste) =>
            chiste._id === jokeId ? { ...chiste, likedByUser: true } : chiste
          )
        );

        // Actualiza la lista de chistes favoritos en el contexto del usuario
        updateUser({ ...user, favoriteJokes: data.favoriteJokes });
      } else {
        const data = await response.json();
        alert(data.error);
      }
    } catch (error) {
      console.error("Error al agregar/quitar de favoritos:", error);
      alert(
        "Error al agregar/quitar de favoritos. Inténtalo de nuevo más tarde."
      );
    }
  };

  // Función para manejar el botón de "Estrella" en un chiste (Eliminar de favoritos)
  const handleUnlike = async (jokeId) => {
    try {
      if (!user) {
        alert("Debes iniciar sesión para quitar de favoritos");
        return;
      }

      const response = await fetch(`${apiUrl}/jokes/${jokeId}/favorite`, {
        method: "DELETE", // Usar DELETE para eliminar de favoritos
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      });

      if (response.ok) {
        const data = await response.json();

        // Actualizar la lista de chistes en el estado según sea necesario
        setChistes((prevChistes) =>
          prevChistes.map((chiste) =>
            chiste._id === jokeId ? { ...chiste, likedByUser: false } : chiste
          )
        );

        // Actualiza la lista de chistes favoritos en el contexto del usuario
        updateUser({ ...user, favoriteJokes: data.favoriteJokes });
      } else {
        const data = await response.json();
        alert(data.error);
      }
    } catch (error) {
      console.error("Error al agregar/quitar de favoritos:", error);
      alert(
        "Error al agregar/quitar de favoritos. Inténtalo de nuevo más tarde."
      );
    }
  };

  // Función para manejar cambios en los filtros de búsqueda
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Volver a la primera página al aplicar nuevos filtros
  };

  const formatTimeDifference = (createdAt) => {
    const currentTime = new Date();
    const createdAtTime = new Date(createdAt);

    const timeDifference = currentTime - createdAtTime;
    const seconds = Math.floor(timeDifference / 1000);

    if (seconds < 60) {
      return `Hace ${seconds} segundo(s)`;
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
      return `Hace ${minutes} minuto(s)`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `Hace ${hours} hora(s)`;
    }

    const days = Math.floor(hours / 24);
    return `Hace ${days} día(s)`;
  };

  return (
    <div className="jokesContent">
      <JokesFilters onFilterChange={handleFilterChange} />

      <div className="boxJokes">
        <ul className="ul">
          {chistes.map((chiste) => (
            <li className="boxJoke" key={chiste._id}>
              <div className="author">
                <p>{chiste.author}</p>
                <div className="uploadTime">
                  <h6>{formatTimeDifference(chiste.createdAt)}</h6>
                </div>
              </div>
              <div className="flexJoke">
                <div className="chisteText">{chiste.text}</div>
                <div className="boxAudioStart">
                  <AudioButton text={chiste.text} />
                  {user && user.favoriteJokes.includes(chiste._id) ? (
                    <img
                      className="imgStar"
                      src={filledStarIcon}
                      onClick={() => handleUnlike(chiste._id)}
                      alt="Favorito"
                      title="Eliminar de favoritos"
                    />
                  ) : (
                    <img
                      className="imgStar"
                      src={emptyStarIcon}
                      onClick={() => handleLike(chiste._id)}
                      alt="No favorito"
                      title="Añadir a favoritos"
                    />
                  )}
                </div>
              </div>
              <Score chiste={chiste} user={user} averageScore={averageScore} />
            </li>
          ))}
        </ul>
      </div>
      <div ref={loadingRef} className="loading">
        {currentPage < totalPages && <p>Cargando más chistes...</p>}
      </div>
      <div>
        <Link to="/jokes/create">
          <img className="floatingIcon btAddJoke" src={addJoke} alt="" />
        </Link>
      </div>
    </div>
  );
}
