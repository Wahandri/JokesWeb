import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { useUserContext } from '../../UserContext';

export default function User() {
  const { user } = useUserContext();
  const [userJokes, setUserJokes] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  // Utiliza useEffect para cargar los chistes del usuario y calcular la puntuación media
  useEffect(() => {
    // Realiza una solicitud para obtener todos los chistes
    async function fetchAllJokes() {
      try {
        const response = await fetch(`/jokes/alljokes`);
        if (response.ok) {
          const data = await response.json();
          // Filtra los chistes del usuario por su nombre de autor
          const userJokes = data.jokes.filter(joke => joke.author === user.username);
          setUserJokes(userJokes);
          const ratingSum = userJokes.reduce((sum, joke) => sum + joke.score, 0);
          setAverageRating(userJokes.length > 0 ? (ratingSum / userJokes.length).toFixed(2) : 0);
        }
      } catch (error) {
        console.error('Error al cargar los chistes del usuario', error);
      }
    }

    fetchAllJokes();
  }, [user.username]);

  return (
    <div className="pading">
      <Header title="Usuario" />
      <div className="flex">
        <Sidebar />
        <div className="boxComponent">
          <div className="boxComponent boxArea">
            <p>
              <strong>Nombre de usuario:</strong> {user.username}
            </p>
            <p >
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Número de chistes subidos:</strong> {userJokes.length}
            </p>
            {userJokes.length > 0 && (
              <p>
                <strong>Media de puntuaciones de tus chistes:</strong> {averageRating}
              </p>
            )}
            <Link className="linkLi" to="/user/favorites">
              <p className="myBtn">CHISTES FAVORITOS</p>
            </Link>
            <Link className="linkLi" to="/user/own">
              <p className="myBtn">CHISTES PROPIOS</p>
            </Link>
            <Link className="linkLi" to="/user/data">
              <p className="myBtn"> CAMBIAR DATOS DE USUARIO</p>
            </Link>
            <Link className="linkLi" to="/user/delete">
              <p className="myBtn">ELIMINAR USUARIO</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
