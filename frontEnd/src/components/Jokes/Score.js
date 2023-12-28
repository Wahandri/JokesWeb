import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Jokes.css";
import score1 from "../../images/score0.png";
import score2 from "../../images/score1.png";
import score3 from "../../images/score2.png";
import score4 from "../../images/score3.png";
import score5 from "../../images/score4.png";
import apiUrl from "../configURL";
import MyAlert from "../MyAlert/MyAlert";

export default function Score({ chiste, user }) {
  const [userScore, setUserScore] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [averageScore, setAverageScore] = useState(0);
  const [alertState, setAlertState] = useState({
    isOpen: false,
    message: "",
    onConfirm: () => {},
    onCancel: () => {},
  });
  const navigate = useNavigate();

  const fetchAverageScore = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/jokes/${chiste._id}/average-score`
      );
      if (response.ok) {
        const data = await response.json();
        setAverageScore(data.averageScore);
      }
    } catch (error) {
      console.error("Error al obtener la puntuación promedio:", error);
    }
  };

  useEffect(() => {
    if (user && chiste.userScores) {
      const userScoreData = chiste.userScores.find(
        (score) => score.email === user.email
      );
      if (userScoreData) {
        setUserScore(userScoreData.score);
        setHasVoted(true); // Marca que el usuario ha votado
      } else {
        setUserScore(0);
      }
    }
  }, [user, chiste]);

  useEffect(() => {
    fetchAverageScore();
  }, [chiste]);

  const handleScoreClick = async (value) => {
    try {
      if (!user) {
        setAlertState({
          isOpen: true,
          message: "Debes iniciar sesión para agregar a favoritos",
          onConfirm: () => {
            setAlertState({ isOpen: false });
            navigate("/login");
          },
          onCancel: () => setAlertState({ isOpen: false }),
        });
        return;
      }

      if (!user || !chiste || !chiste._id) {
        console.error("Datos de entrada no válidos o chiste sin ID");
        return;
      }

      // Verifica si el usuario ya ha votado
      const userScoreData = chiste.userScores.find(
        (score) => score.email === user.email
      );

      if (userScoreData) {
        // El usuario ya ha votado, no realiza ninguna acción
        return;
      }

      // El usuario no ha votado antes, realiza una solicitud POST para crear un nuevo voto
      const response = await fetch(`${apiUrl}/jokes/${chiste._id}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: value,
          userEmail: user.email,
        }),
      });

      if (response.ok) {
        // Actualiza la puntuación del usuario y marca que ha votado
        setUserScore(value);
        setHasVoted(true);

        // Después de votar con éxito, realiza una solicitud para obtener la puntuación promedio actualizada
        fetchAverageScore();
      } else {
        console.error("Error al puntuar el chiste:", response.statusText);
        alert("Error al puntuar el chiste. Inténtalo de nuevo más tarde.");
      }
    } catch (error) {
      console.error("Error al puntuar el chiste:", error);
      alert("Error al puntuar el chiste. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div className="score-container">
      {/* <p>Puntuación Promedio: {averageScore.toFixed(2)}</p>   */}
      {hasVoted ? (
        <img
          title="Puntuación media"
          className={`averageScore score-image ${
            averageScore >= 1 && averageScore <= 1.6
              ? "selected"
              : averageScore >= 1.61 && averageScore <= 2.5
              ? "selected"
              : averageScore >= 2.51 && averageScore <= 3.5
              ? "selected"
              : averageScore >= 3.51 && averageScore <= 4.2
              ? "selected"
              : "selected"
          }`}
          src={
            averageScore >= 1 && averageScore <= 1.6
              ? score1
              : averageScore >= 1.61 && averageScore <= 2.5
              ? score2
              : averageScore >= 2.51 && averageScore <= 3.5
              ? score3
              : averageScore >= 3.51 && averageScore <= 4.2
              ? score4
              : score5
          }
          alt={`Puntuación ${averageScore.toFixed(2)}`}
        />
      ) : (
        <div className="score-start">
          <img
            className={`score-image score-button ${
              userScore === 1 ? "selected" : ""
            }`}
            src={score1}
            alt="Puntuación 1"
            onClick={() => handleScoreClick(1)}
          />
          <img
            className={`score-image score-button ${
              userScore === 2 ? "selected" : ""
            }`}
            src={score2}
            alt="Puntuación 2"
            onClick={() => handleScoreClick(2)}
          />
          <img
            className={`score-image score-button ${
              userScore === 3 ? "selected" : ""
            }`}
            src={score3}
            alt="Puntuación 3"
            onClick={() => handleScoreClick(3)}
          />
          <img
            className={`score-image score-button ${
              userScore === 4 ? "selected" : ""
            }`}
            src={score4}
            alt="Puntuación 4"
            onClick={() => handleScoreClick(4)}
          />
          <img
            className={`score-image score-button ${
              userScore === 5 ? "selected" : ""
            }`}
            src={score5}
            alt="Puntuación 5"
            onClick={() => handleScoreClick(5)}
          />
        </div>
      )}
      <MyAlert {...alertState} />
    </div>
  );
}
