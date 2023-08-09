// frontend/components/Login/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        console.log('Inicio de sesión exitoso');
        alert('¡Bienvenido!');
        setIsLoggedIn(true); // Actualizamos el estado para mostrar el encabezado
        navigate('/jokes'); // Redirigimos a la página de chistes
      } else {
        const data = await response.json(); // Parseamos el mensaje de error
        console.error('Error al iniciar sesión:', data.error);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div className='loginBox'>
      <h2>Iniciar sesión</h2>
      <form className='formLogin' onSubmit={handleSubmit}>
        <input
          placeholder='Email'
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder='Contraseña'
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className='buttonLogin' type="submit">
          Iniciar sesión
        </button>
      </form>
      <Link to="/login/create">
        <p>Crear usuario nuevo</p>
      </Link>
    </div>
  );
};

export default Login;
