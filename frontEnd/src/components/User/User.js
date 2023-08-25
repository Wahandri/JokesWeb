import React from 'react';
import { useUserContext } from '../../UserContext';
import "./User.css";

export default function User() {
  const { user } = useUserContext();

  return (
    <div className='flex'>
      <div>
        <h1>Bienvenido, {user.username}</h1>
      </div>
      <div className='tusChistes flex'>
        <h2 className='h2TusChistes'>Tus chistes</h2>
      </div>
    </div>
  );
}
