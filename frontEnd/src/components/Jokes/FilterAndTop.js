import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import top10 from "../../images/top-10.png";

export default function JokesFilters({ onFilterChange }) {
  const [filter, setFilter] = useState('');

  const handleFilterChange = () => {
    // Cuando se cambian los filtros, llama a la función onFilterChange con los nuevos valores
    onFilterChange({ filter });
  };

  return (
    <div className="filters">
      <div>
        <label for='textoBusqueda' >Buscar:</label>
        <input
          id='textoBusqueda'
          className='textoBusqueda'
          type="text"
          placeholder="Filtrar por texto o autor"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onKeyUp={handleFilterChange} // Actualiza los filtros cuando se presiona una tecla
        />
      </div>
      <Link to="/top">
      <img className='iconTop10' src={top10} title='Mejores Chistes' alt="" />
      </Link>
    </div>
  );
}
