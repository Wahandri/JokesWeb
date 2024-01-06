import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import AudioButton from "../AudioButton/AudioButton";
import "./TopJokes.css";
import top1 from "../../images/top1.png";
import top2 from "../../images/top2.png";
import top3 from "../../images/top3.png";
import apiUrl from "../configURL";

export default function TopJokes() {
  const [topJokes, setTopJokes] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/jokes/alljokes`) // Obtén todos los chistes sin filtros
      .then((response) => response.json())
      .then((data) => {
        // Ordena los chistes de mayor a menor puntuación (score)
        const sortedJokes = data.jokes.sort((a, b) => b.score - a.score);

        // Obtiene solo los primeros 10 chistes
        const top10Jokes = sortedJokes.slice(0, 10);

        setTopJokes(top10Jokes);
      })
      .catch((error) => {
        console.error("Error al obtener los 10 mejores chistes:", error);
      });
  }, []);

  return (
    <div className="pading">
      <Header title="Top 10" />
      <div className="boxJokes flexRow">
        <div className="boxComponent">
          <ul className="ul">
            {topJokes.map((joke, index) => (
              <li className="boxArea" key={joke._id}>
                {index === 0 ? (
                  <img className="medalla" src={top1} alt="Top 1" />
                ) : index === 1 ? (
                  <img className="medalla" src={top2} alt="Top 2" />
                ) : index === 2 ? (
                  <img className="medalla" src={top3} alt="Top 3" />
                ) : (
                  <span className="position">{index + 1}. </span>
                )}
                {joke.text}
                <AudioButton text={joke.text} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
