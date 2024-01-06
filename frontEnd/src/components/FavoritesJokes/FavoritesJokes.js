import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import atras from "../../images/atras.png";
import "./FavoriteJokes.css";
import { useUserContext } from "../../UserContext";
import filledStarIcon from "../../images/deleteFavorite.png";
import AudioButton from "../AudioButton/AudioButton";

export default function FavoritesJokes() {
  const { user } = useUserContext();
  const [favoriteJokes, setFavoriteJokes] = useState([]);

  // Recibir chistes favoritos
  useEffect(() => {
    console.log("Fetching favorite jokes...");
    fetch(`/users/${user._id}/favorite-jokes`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Favorite jokes data:", data);
        setFavoriteJokes(data.favoriteJokes);
      })
      .catch((error) => {
        console.error("Error al obtener los chistes favoritos:", error);
      });
  }, [user._id]);

  // Función para eliminar un chiste de favoritos
  const handleRemoveFromFavorites = (chisteId) => {
    if (window.confirm("¿Estás seguro de eliminar el chiste de favoritos?")) {
      // Realiza una solicitud DELETE para eliminar el chiste de favoritos
      fetch(`/jokes/${chisteId}/favorite`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Updated favorite jokes data:", data);

          // Actualiza el estado de favoriteJokes
          setFavoriteJokes((prevFavoriteJokes) =>
            prevFavoriteJokes.filter((chiste) => chiste._id !== chisteId)
          );
        })
        .catch((error) => {
          console.error("Error al eliminar de favoritos:", error);
        });
    }
  };

  return (
    <div className="pading">
      <div className="flexRow">
        <Link className="" to="/user">
          <img src={atras} alt="Atras" width="40px" />
        </Link>
        <div className="baseUser boxComponent flex">
          <div className="tusChistes flex">
            {favoriteJokes.length > 0 && (
              <ul>
                {favoriteJokes.map((chiste) => (
                  <li className="boxArea jokesUser" key={chiste._id}>
                    {chiste.text}
                    <div className="btsUser">
                      <AudioButton text={chiste.text} />
                      <img
                        className="imgStar"
                        src={filledStarIcon}
                        alt="Quitar de favoritos"
                        title="Quitar de favoritos"
                        onClick={() => handleRemoveFromFavorites(chiste._id)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {favoriteJokes.length === 0 && (
              <h4>No tienes chistes en favoritos.</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
