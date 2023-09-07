import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link de React Router

import "./Header.css";
import logotipo from "./logotipo.png";
import payaso2 from "./payaso2.png";

export default function Header(props) {
  return (
    <div className='baseHeader'>
      <div className='header'>
        <div className=""><img className='img' src={logotipo} alt='' /></div>
        <div><h1>{props.title}</h1></div>
        <Link to="/user">
          <div><img className='img2' src={payaso2} alt='' /></div>
        </Link>
      </div>
      <div > 
        <div className=' boxNav'> 
          <Link to="/jokes/create"> 
            <h4 className='btnNav'>SUBIR CHISTE</h4>
          </Link>
          <Link to="/jokes"> 
            <h4 className='btnNav'>CHISTES</h4>
          </Link>
          <Link to="/user"> 
            <h4 className='btnNav'>USUARIO</h4>
          </Link>
        </div>
      </div>
      
    </div>
  )
}
