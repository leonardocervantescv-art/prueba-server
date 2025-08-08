//Componente del Panel
//este componente y ContenidoForm se coumunica con AdminPanel

import React, { useState, useEffect } from 'react';
import axios from 'axios';




const SeccionForm = ({ seccion, modoEditar, onSuccess }) => {
  const [Nombre, setNombre] = useState('');
  const [Orden, setOrden] = useState('');

  useEffect(() => {
    if (modoEditar && seccion) {
      setNombre(seccion.Nombre);
      setOrden(seccion.Orden);
    } else {
      setNombre('');
      setOrden('');
    }
  }, [modoEditar, seccion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const datos = { Nombre, Orden };

    const url = 'http://localhost:3001/api/secciones';
    const peticion = modoEditar
      ? axios.put(`${url}/${seccion.id_secciones}`, datos)
      : axios.post(url, datos);

    peticion
      .then(() => onSuccess())
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h4>{modoEditar ? 'Editar Sección' : 'Agregar Sección'}</h4>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Nombre"
          className="form-control"
          value={Nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <input
          type="number"
          placeholder="Orden"
          className="form-control"
          value={Orden}
          onChange={e => setOrden(e.target.value)}
          required
        />
      </div>
      <button className="btn btn-primary" type="submit">
        {modoEditar ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  );
};

export default SeccionForm;
