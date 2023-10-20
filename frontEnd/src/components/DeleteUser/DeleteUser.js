import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { useUserContext } from '../../UserContext';

export default function DeleteUser() {
  const { user, updateUser } = useUserContext();
  const history = useNavigate();
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState(null);

  const handleDeleteAccount = async () => {
    if (confirmation === user.email) {
      try {
        // Obtiene el token del almacenamiento local
        const token = localStorage.getItem('token');
        // Asegúrate de tener un token válido
        if (!token) {
          return;
        }

        // Realiza la solicitud DELETE con el token en el encabezado
        const response = await fetch(`/users/${user._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // Elimina el usuario del contexto y redirige al inicio
          updateUser(null);
          history('/');
        } else {
          const data = await response.json();
          setError(data.message || 'Error al eliminar la cuenta.');
        }
      } catch (error) {
        setError('Error al eliminar la cuenta. Inténtalo de nuevo más tarde.');
      }
    } else {
      setError('Por favor, confirma la eliminación ingresando tu email.');
    }
  };

  return (
    <div className='pading'>
      <Header title="Eliminar Usuario" />
      <div className='flex'>
        <Sidebar />
        <div className='boxArea'>
          <p>¿Estás seguro de que deseas eliminar tu cuenta de usuario? Esta acción no se puede deshacer.</p>
          <p>Para confirmar, escribe "TU EMAIL" en el campo de abajo:</p>
          <input
            placeholder={user.email}
            type="text"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
          />
          <button onClick={handleDeleteAccount}>Confirmar eliminación</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}
