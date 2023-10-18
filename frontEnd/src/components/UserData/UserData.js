import React, { useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { useUserContext } from '../../UserContext';

export default function UserData() {
  const { user } = useUserContext();
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleChangeUsername = async () => {
    try {
      // Realizar la solicitud para cambiar el nombre de usuario
      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      const response = await fetch(`/users/change/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ username: newUsername }),
      });

      if (response.ok) {
        setError(null);
      } else {
        const data = await response.json();
        setError(data.message || 'Error al cambiar el nombre de usuario.');
      }
    } catch (error) {
      setError('Error al cambiar el nombre de usuario. Inténtalo de nuevo más tarde.');
    }
  };

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setError('Las contraseñas no coinciden. Inténtalo de nuevo.');
        return;
      }

      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      // Realizar la solicitud para cambiar la contraseña
      const response = await fetch(`/users/change-password/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (response.ok) {
        setError(null);
      } else {
        const data = await response.json();
        setError(data.message || 'Error al cambiar la contraseña.');
      }
    } catch (error) {
      setError('Error al cambiar la contraseña. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div>
      <Header title="Datos de Usuario" />
      <div className="flex">
        <Sidebar />
        <div className="flex">
          <div>
            <p>Nombre de usuario actual: {user.username}</p>
            <input
              type="text"
              placeholder="Nuevo nombre de usuario"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <button onClick={handleChangeUsername}>Cambiar Nombre de Usuario</button>
          </div>
          <div>
            <p>Cambiar Contraseña</p>
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleChangePassword}>Cambiar Contraseña</button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}
