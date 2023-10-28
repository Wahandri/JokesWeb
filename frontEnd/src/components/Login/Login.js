import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css";
import { useUserContext } from '../../UserContext';
import apiUrl from '../configURL';
import jwt_decode from 'jwt-decode';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const checkTokenValidity = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        // Token es válido, inicia sesión automáticamente
        setUser(decodedToken.user);
        navigate(-1);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setUser(data.user);
        onLogin(data.user);
        navigate('/jokes');
      } else {
        const data = await response.json();
        console.error('Error al iniciar sesión:', data.error);
        alert('Datos no válidos');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Error al enviar el formulario');
    }
  };

  useEffect(() => {
    // Verificar si ya hay un token almacenado y es válido
    checkTokenValidity();
  }, []);

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
        <button className='bt' type="submit">
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
