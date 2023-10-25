import React from 'react';
import { Link } from 'react-router-dom'; 

import "./Header.css";
import logotipo from "./logotipo.png";
import payaso2 from "./payaso2.png";

export default function Header(props) {
  return (
    <div className='baseHeader'>
      <div className='header'>
        <div className='imgContainer'>
          <img className='img' src={logotipo} alt='' />
          <span className="developerText">Desarrollado por Wahandri</span>
        </div>
        
        
        <div><h1>{props.title}</h1></div>
        <Link to="/user">
          <img className='img2' src={payaso2} alt='Perfil' />
        </Link>
      </div>
    </div>
  )
}
