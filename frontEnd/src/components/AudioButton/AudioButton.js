import React, { useState } from "react";
import iconAudio from "../../images/btAudio.png";
import "./AudioButton.css";

const AudioButton = ({ text }) => {
  const [isReading, setIsReading] = useState(false);

  const leerChiste = () => {
    if (!isReading) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);

      utterance.onend = () => {
        setIsReading(false);
      };
      setIsReading(true);
    } else {
      speechSynthesis.cancel();
      setIsReading(false);
    }
  };

  return (
    <img
      title="Escuchar"
      alt=""
      className="btnAudio"
      src={iconAudio}
      onClick={leerChiste}
    />
  );
};

export default AudioButton;
