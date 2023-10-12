import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

export default function UserData() {
  return (
    <div>
        <Header title="Datos de Usuario" />
        <div className='flex'>
            <Sidebar />
            <div>
                Datos usuario
            </div>
        </div>
    </div>
  )
}
