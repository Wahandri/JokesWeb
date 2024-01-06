import React, { useState } from "react";
import { useUserContext } from "../../UserContext";
import "./CreateJoke.css";
import AudioButton from "../AudioButton/AudioButton";
import apiUrl from "../configURL";

const CreateJoke = () => {
  const { user } = useUserContext();
  const [jokeText, setJokeText] = useState("");
  const [message, setMessage] = useState("");

  const charLimit = 240;

  const handleTextAreaChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= charLimit) {
      setJokeText(newText);
    }
  };

  const getCharCountColor = () => {
    if (jokeText.length === 240) {
      return "red";
    } else if (jokeText.length > 200) {
      return "#ffa600";
    }
    return "green";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación de longitud del texto del chiste
    if (jokeText.length > charLimit) {
      setMessage(
        "El chiste es demasiado largo. Debe tener menos de 240 caracteres."
      );
      return; // No envíes el chiste al servidor si es demasiado largo
    }

    try {
      const response = await fetch(`${apiUrl}/jokes/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: jokeText, author: user.username }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Chiste agregado correctamente:", data);

        setMessage("Chiste añadido correctamente");
        setJokeText("");
      } else {
        const errorData = await response.json();
        console.error("Error al agregar el chiste:", errorData.error);

        setMessage("Error al agregar el chiste: " + errorData.error);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setMessage(
        "Error al enviar el formulario. Inténtalo de nuevo más tarde."
      );
    }
  };

  return (
    <div className="pading">
      <div className="flexRow">
        <div className="boxComponent ">
          <form className="flex boxArea" onSubmit={handleSubmit}>
            <textarea
              className="textAreaCreateJoke"
              rows="5"
              cols="40"
              id="textAreaCreate"
              placeholder="Escribe tu chiste aquí (máximo 240 caracteres)"
              value={jokeText}
              onChange={handleTextAreaChange}
              required
            />
            <div>
              <span
                style={{
                  color: getCharCountColor(),
                  marginRight: "15px",
                  backgroundColor: "aliceblue",
                  borderRadius: "10px",
                }}
              >
                {jokeText.length}/{charLimit}
              </span>
              <AudioButton text={jokeText} />
            </div>
            <button className="bt buttonSubmit" type="submit">
              Añadir Chiste
            </button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreateJoke;
