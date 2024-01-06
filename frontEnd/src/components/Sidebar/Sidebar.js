import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import exit2 from "../../images/exit2.png";
import sidebar from "../../images/sidebar.png";
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const handleLogout = () => {
    // Eliminando el token del localStorage
    localStorage.removeItem('token');
    // Redirige al usuario a la página de inicio de sesión
    navigate('/');
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className='boxSidebar'>
      <div className={`sidebar-container ${showSidebar ? 'visible' : ''}`}>
      
      {showSidebar && (
        <div className="sidebarBox">
          <Link className='linkLi' to="/jokes"><p className="myBtn">CHISTES</p></Link>
          <Link className='linkLi' to="/jokes/create"><p className="myBtn">AÑADIR CHISTE</p></Link>
          <Link className='linkLi' to="/top"><p className="myBtn">TOP 10</p></Link>
          <Link className='linkLi' to="/user"><p className="myBtn">PERFIL</p></Link>
          <div className='boxBtnExit' onClick={() => setConfirmLogout(true)}>
            <img className='btnExit' src={exit2} alt="" />
          </div>
        </div>
      )}
      {confirmLogout && (
        <div className="logoutConfirm">
          <p>¿Estás seguro de que quieres cerrar sesión?</p>
          <div className='flexRow'>
            <button className='myBtn linkLi' onClick={handleLogout}>Aceptar</button>
            <button className='myBtn linkLi' onClick={() => setConfirmLogout(false)}>Cancelar</button> 
          </div>
        </div>
      )}
      </div>
      <div className="" onClick={toggleSidebar}>
        <img title='Barra Lateral' className='btnSidebar' src={sidebar} alt="" />
      </div>
    </div>
  );
};

export default Sidebar;
