import React from 'react';
import { Link } from 'react-router-dom'; 

import "./Header.css";
import logotipo from "./logotipo.png";
import payaso2 from "./payaso2.png";

export default function Header(props) {
  return (
    <div className='baseHeader'>
      <div className='header'>
        
        <img className='img' src={logotipo} alt='' />
        
        <div><h1>{props.title}</h1></div>
        <Link to="/user">
          <div><img className='img2' src={payaso2} alt='' /></div>
        </Link>
      </div>
      <div > 
        <div className=' boxNav'> 
          <Link to="/jokes/create"> 
            <p className='btnNav'>SUBIR CHISTE</p>
          </Link>
          <Link to="/jokes"> 
            <p className='btnNav'>CHISTES</p>
          </Link>
          <Link to="/user"> 
            <p className='btnNav'>USUARIO</p>
          </Link>
        </div>
      </div>
      
    </div>
  )
}
