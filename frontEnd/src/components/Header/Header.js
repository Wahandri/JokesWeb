import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link de React Router

import "./Header.css";
import logotipo from "./logotipo.png";
import payaso2 from "./payaso2.png";

export default function Header(props) {
  return (
    <div>
      <div className='header'>
        <div className=""><img className='img' src={logotipo} alt='' /></div>
        <div><h1>{props.title}</h1></div>
        <Link to="/otro-componente">
          <div><img className='img2' src={payaso2} alt='' /></div>
        </Link>
      </div>
      <div > 
        <nav className='boxNav'> 
          <Link to="/jokes/create"> 
            <p className='btNav'>Subir Chiste</p>
          </Link>
          <Link to="/jokes"> 
            <p className='btNav'>CHISTES</p>
          </Link>
          <Link to="/user"> 
            <p className='btNav'>USUARIO</p>
          </Link>
        </nav>
      </div>
      <hr></hr>
    </div>
  )
}
