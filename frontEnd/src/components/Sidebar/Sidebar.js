import React from 'react';
import { Link} from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    
  return (
    <div className="sidebarBox">
        <Link className='linkLi' to="/jokes"><p className='liSidebar'>CHISTES</p></Link>
        <Link className='linkLi' to="/jokes/create"><p className='liSidebar'>AÑADIR CHISTE</p></Link>
        <Link className='linkLi' to="/top"><p className='liSidebar'>TOP 10</p></Link>
        <Link className='linkLi' to="/user"><p className='liSidebar'>PERFIL</p></Link>
        <Link
  className='linkLi'
  to="/"
  onClick={(e) => {
    if (!window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      e.preventDefault(); // Evita la navegación si se hace clic en "Cancelar"
    }
  }}
>
  <p className='liSidebar'>CERRAR SESIÓN</p>
</Link>
    </div>
  );
};

export default Sidebar;
