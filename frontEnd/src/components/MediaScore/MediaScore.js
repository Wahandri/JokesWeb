import React from 'react';
import "./MediaScore.css";
import score1 from '../../images/score0.png';
import score2 from '../../images/score1.png';
import score3 from '../../images/score2.png';
import score4 from '../../images/score3.png';
import score5 from '../../images/score4.png';

export default function MediaIcon({ averageScore }) {
  // Función para determinar qué ícono mostrar en función de la puntuación media
  const getMediaIcon = (score) => {
    if (score >= 1 && score <= 1.6) {
      return score1;
    } else if (score >= 1.61 && score <= 2.5) {
      return score2;
    } else if (score >= 2.51 && score <= 3.5) {
      return score3;
    } else if (score >= 3.51 && score <= 4.2) {
      return score4;
    } else {
      return score5;
    }
  };

  return (
    <img
      className="media-icon"
      src={getMediaIcon(averageScore)}
      alt={`Puntuación media: ${averageScore.toFixed(2)}`}
      title={`Puntuación media: ${averageScore.toFixed(2)}`}
    />
  );
}
