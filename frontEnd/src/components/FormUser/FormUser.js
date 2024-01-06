import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./FormUser.css";
import logotipo from "../../images/logotipo.png";
import apiUrl from '../configURL';

export default function FormUser() { 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Nuevo estado para confirmar la contraseña
  const [passwordError, setPasswordError] = useState(''); // Mensaje de error para contraseñas no coincidentes
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
      return; // Detiene la presentación del formulario
    }

    const userData = {
      username,
      email,
      password,
    };

    try {
      const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage
      console.log(token);
      const response = await fetch(`${apiUrl}/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Incluye el token en las cabeceras de la solicitud
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Usuario creado exitosamente');
        console.log('Nuevo Usuario:', data.savedUser);

        alert('Usuario creado correctamente');

        // Limpia los campos del formulario después de crear el usuario
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        setPasswordError(''); // Limpia el mensaje de error

        navigate("/");
      } else {
        console.error('Error al crear el usuario:', data.error);
        alert('Error al ingresar datos');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div className='base-login'>
      <div className="login-card">
        <img className='img' src={logotipo} alt="" />
        <h2>Create User</h2>
        <form className='form-login' onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              placeholder='Username'
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              placeholder='Email'
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              placeholder='Password'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              placeholder='Confirm Password'
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
          <button className='button-login bt' type="submit">Create</button>
        </form>
        <Link to="/">
          <p>Entrar con usuario existente</p>
        </Link>
      </div>
    </div>
  );
}
