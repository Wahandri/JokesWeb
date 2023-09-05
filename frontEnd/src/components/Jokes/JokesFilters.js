import React, { useState } from 'react';

export default function JokesFilters({ onFilterChange }) {
  const [filter, setFilter] = useState('');

  const handleFilterChange = () => {
    // Cuando se cambian los filtros, llama a la función onFilterChange con los nuevos valores
    onFilterChange({ filter });
  };

  return (
    <div className="filters">
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
  );
}
