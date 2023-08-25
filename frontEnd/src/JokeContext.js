import React, { createContext, useContext, useState, useCallback } from 'react';

const JokeContext = createContext();

export function useJokeContext() {
  return useContext(JokeContext);
}

export function JokeProvider({ children }) {
  const [jokes, setJokes] = useState([]);

  const addJokes = useCallback((newJokes) => {
    setJokes((prevJokes) => [...prevJokes, ...newJokes]);
  }, []);

  const likeJoke = async (jokeId, userId) => {
    try {
      const response = await fetch(`http://localhost:3001/jokes/${jokeId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        console.log('Me gusta agregado exitosamente');
      } else {
        const data = await response.json();
        console.error('Error al dar "Me gusta":', data.error);
      }
    } catch (error) {
      console.error('Error al dar "Me gusta":', error);
    }
  };

  const value = {
    jokes,
    addJokes,
    likeJoke,
  };

  return <JokeContext.Provider value={value}>{children}</JokeContext.Provider>;
}
