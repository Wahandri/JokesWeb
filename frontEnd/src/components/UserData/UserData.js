import React, { useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './UserDate.css';
import { useUserContext } from '../../UserContext';

export default function UserData() {
  const { user, updateUser } = useUserContext();
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showUsernameChangeConfirm, setShowUsernameChangeConfirm] = useState(false);

  const handleChangeUsername = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      setShowUsernameChangeConfirm(true);
    } catch (error) {
      setMessage('Error al cambiar el nombre de usuario. Inténtalo de nuevo más tarde.');
    }
  };

  const confirmUsernameChange = async () => {
    try {
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
        updateUser({ ...user, username: newUsername }); // Actualizar el nombre de usuario en el contexto
        setMessage('Nombre de usuario cambiado exitosamente');
        setNewUsername('');
        setShowUsernameChangeConfirm(false);
      } else {
        const data = await response.json();
        setMessage(data.message || 'Error al cambiar el nombre de usuario.');
        setShowUsernameChangeConfirm(false);
      }
    } catch (error) {
      setMessage('Error al cambiar el nombre de usuario. Inténtalo de nuevo más tarde.');
      setShowUsernameChangeConfirm(false);
    }
  };

  const cancelUsernameChange = () => {
    setShowUsernameChangeConfirm(false);
  };

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setMessage('Las contraseñas no coinciden. Inténtalo de nuevo.');
        return;
      }

      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      const response = await fetch(`/users/change-password/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (response.ok) {
        setMessage('Contraseña cambiada exitosamente');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Error al cambiar la contraseña.');
      }
    } catch (error) {
      setMessage('Error al cambiar la contraseña. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className='pading'>
      <Header title='Cambiar Datos' />
      <div className='flex'>
        <Sidebar />
        <div className='flex colums boxComponent'>
          <div className='boxArea'>
            <p>Nombre de usuario actual: {user.username}</p>
            <input
              type='text'
              placeholder='Nuevo nombre de usuario'
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <button onClick={handleChangeUsername}>Cambiar Nombre de Usuario</button>
            {showUsernameChangeConfirm && (
              <div>
                <p>
                  ¿Estás seguro de que deseas cambiar el nombre de usuario de "{user.username}" a "{newUsername}"?
                </p>
                <button onClick={confirmUsernameChange}>Sí</button>
                <button onClick={cancelUsernameChange}>No</button>
              </div>
            )}
          </div>
          <div className='boxArea'>
            <p>Cambiar Contraseña</p>
            <input
              type='password'
              placeholder='Nueva contraseña'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type='password'
              placeholder='Confirmar contraseña'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleChangePassword}>Cambiar Contraseña</button>
          </div>
          {message && <p className='message'>{message}</p>}
        </div>
      </div>
    </div>
  );
}
