import React, { useState } from 'react';
import iconAudio from "../../images/btAudio.png";

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
      className="imgAudio"
      src={iconAudio}
      onClick={leerChiste}
    />
  );
};

export default AudioButton;
