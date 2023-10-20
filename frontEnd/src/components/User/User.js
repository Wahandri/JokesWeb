import React from 'react';
import { Link} from 'react-router-dom';
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "../../UserContext";
import "../../JokeContext";



export default function User() {
  return (
    <div className='pading'>
      <Header  title="Usuario"/>  
      <div className='flex '>
        <Sidebar />
        <div className='boxComponent'>
          <Link className='linkLi' to="/user/favorites"><p className='myBtn'>CHISTES FAVORITOS</p></Link>
          <Link className='linkLi' to="/user/own"><p className='myBtn'>CHISTES PROPIOS</p></Link>
          <Link className='linkLi' to="/user/data"><p className='myBtn'> CAMBIAR DATOS DE USUARIO</p></Link>
          <Link className='linkLi' to="/user/delete"><p className='myBtn'>ELIMINAR USUARIO</p></Link>
        </div>
      </div> 
    </div>
  )
}
