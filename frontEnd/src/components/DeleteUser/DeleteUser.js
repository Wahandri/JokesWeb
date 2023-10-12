import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

export default function DeleteUser() {
  return (
    <div>
        <Header title="Eliminar Usuario" />
        <div className='flex'>
            <Sidebar />
            <div>
                Eliminar usuario
            </div>
        </div>
    </div>
  )
}
