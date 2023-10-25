import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import exit from "../../images/exit.png";
import exit2 from "../../images/exit2.png";
import salida from "../../images/salida.png";
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleLogout = () => {
    // Eliminando el token del localStorage
    localStorage.removeItem('token');
    // Redirige al usuario a la página de inicio de sesión
    navigate('/');
  };

  return (
    <div className="sidebarBox">
      <Link className='linkLi' to="/jokes"><p className="myBtn">CHISTES</p></Link>
      <Link className='linkLi' to="/jokes/create"><p className="myBtn">AÑADIR CHISTE</p></Link>
      <Link className='linkLi' to="/top"><p className="myBtn">TOP 10</p></Link>
      <Link className='linkLi' to="/user"><p className="myBtn">PERFIL</p></Link>
      <div className='boxBtnExit' onClick={() => setConfirmLogout(true)}>
        <img className='btnExit' src={exit2} alt="" />
      </div>
      {confirmLogout && (
        <div className="logout-confirm">
          <p>¿Estás seguro de que quieres cerrar sesión?</p>
          <button className='myBtn linkLi' onClick={handleLogout}>Aceptar</button>
          <button className='myBtn linkLi' onClick={() => setConfirmLogout(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
