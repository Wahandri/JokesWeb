import React, { useState, useEffect } from "react";
import "./JokeCard.css";
import iconUpdate from "../../images/btUpdate.png";
import AudioButton from "../AudioButton/AudioButton";
import apiUrl from "../configURL";

const JokeCard = () => {
  const [chiste, setChiste] = useState("");

  const obtenerChisteAleatorio = async () => {
    try {
      const respuesta = await fetch(`${apiUrl}/jokes/random`);
      const data = await respuesta.json();
      setChiste(data.joke.text);
      // setFunny(data.joke.funny);
    } catch (error) {
      console.error("Error al obtener el chiste:", error);
    }
  };

  useEffect(() => {
    obtenerChisteAleatorio();

    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="jokeCard randomJoke">
      <div>
        <h2 className="h2">Chiste aleatorio</h2>
        <hr className="hr"></hr>
        <h4 className="h4" lang="es">
          {chiste}
        </h4>
      </div>
      <div className="buttons">
        <img
          title="Otro chiste"
          src={iconUpdate}
          alt=""
          className=" btnReload random"
          onClick={obtenerChisteAleatorio}
        />
        <AudioButton text={chiste} />
      </div>
    </div>
  );
};

export default JokeCard;
