import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css";
import { useUserContext } from '../../UserContext';
import apiUrl from '../configURL';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const token = localStorage.getItem('token');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiUrl}:3001/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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
