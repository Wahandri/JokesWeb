import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./FormUser.css";
import logotipo from "../../images/logotipo.png";


export default function FormUser() { 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      username,
      email,
      password
    };

    try {
      const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

      const response = await fetch('http://localhost:3003/users/create', {
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

        

        // Puedes mostrar un mensaje de éxito, redirigir a otra página, etc.
      } else {
        console.error('Error al crear el usuario:', data.error);
        // Puedes mostrar un mensaje de error o tomar acciones específicas en caso de error.
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }};

    

    

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
          <Link to="/">
            <button className='button-login bt'  type="submit">Create</button>
          </Link>
        </form>
        <Link to="/">
          <p>Entrar con usuario existente</p>
        </Link>
      </div>
    </div>
  );
}
