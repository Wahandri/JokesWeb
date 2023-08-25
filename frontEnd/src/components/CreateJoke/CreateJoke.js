import React, { useState } from 'react';
import { useUserContext } from '../../UserContext';
import "./CreateJoke.css";

const CreateJoke = () => {
  const { user } = useUserContext(); // Obtén el usuario actual del contexto
  const [jokeText, setJokeText] = useState('');
  const textArea = document.getElementById("textArea");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Agregar el nuevo chiste a la colección de chistes 
      const response = await fetch('http://localhost:3001/jokes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: jokeText, author: user.username }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Chiste agregado correctamente:', data);
        alert('Chiste añadido correctamente')

        setJokeText(''); // Reiniciar el campo de texto

        textArea.value = "";
      } else {
        const errorData = await response.json();
        console.error('Error al agregar el chiste:', errorData.error);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    
    <div className='createJokeForm'>
      <h2>Añadir Nuevo Chiste</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          id="textAreaCreate"
          placeholder='Escribe el chiste aquí'
          value={jokeText}
          onChange={(e) => setJokeText(e.target.value)}
          required
        />
        <button  className='bt buttonSubmit' type='submit'>Añadir Chiste</button>
      </form>
    </div>
  );
};

export default CreateJoke;
