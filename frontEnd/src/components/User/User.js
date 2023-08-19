import React from 'react';
import { useUserContext } from '../../UserContext';

export default function User() {
  const { user } = useUserContext();

  return (
    <div>
      {user ? (
        <div>
          <h2>Bienvenido, {user.username}</h2>
        </div>
      ) : (
        <p>No has iniciado sesión.</p>
      )}
    </div>
  );
}
