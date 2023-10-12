import React from 'react';
import { Link} from 'react-router-dom';
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "../../UserContext";
import "../../JokeContext";



export default function User() {
  return (
    <div>
      <Header  title="Usuario"/>  
      <div className='flex'>
        <Sidebar />
        <div>
        <Link className='linkLi' to="/user/favorites"><p className='liSidebar'>CHISTES FAVORITOS</p></Link>
        <Link className='linkLi' to="/user/own"><p className='liSidebar'>CHISTES PROPIOS</p></Link>
        <Link className='linkLi' to="/user/data"><p className='liSidebar'>DATOS DE USUARIO</p></Link>
        <Link className='linkLi' to="/user/delete"><p className='liSidebar'>ELIMINAR USUARIO</p></Link>
        </div>
      </div> 
    </div>
  )
}
