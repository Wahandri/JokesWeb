import React from 'react';
import "./Footer.css";
import logo from "./logotipo.png";
import gitHub from "./github.png";
import linkedin from "./linkedin.png";

export default function Footer() {
  return (
    <footer className='footer flexFooter'>
        <div className='flex2'>
            <div className="contenedor-rotacion">
                <img className="rotacion" src={logo} width="70px" alt=''/>
                <div className="texto">
                    <span className="texto-original">Desarrollado por Wahandri</span>
                    <span className="texto-hover">Desarrollado por Manuel García Cobos</span>
                </div>
            </div>
        </div>
        <div className='flex2'>
            
            <p>Mas sobre mi:</p> 

            <a href="https://github.com/Wahandri" target="_blank" rel="noopener noreferrer">
                <img src={gitHub} title='GitHub'  width="40px" alt=''/>
            </a>
            <span> | </span>
            <a href="https://linkedin.com/in/manuel-garcía-cobos-6b5413272" target="_blank" rel="noopener noreferrer">
                <img src={linkedin} title='Linkedin' width="40px" alt=''/>
            </a>
        </div>
    </footer>
  )
}
