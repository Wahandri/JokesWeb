import React from 'react'
import "./Header.css";
import "./logotipo.png";

export default function Header(props) {
  return (
    <div className='header'>
        <div className=""><img className='img' src="logotipo.png" alt='' /></div>
        <div>
          <h1 className=''>{props.title}</h1>
        </div>
        <div className=''><img className='img2' src="./payaso2.png" alt='' /></div>
    </div>
  )
}
