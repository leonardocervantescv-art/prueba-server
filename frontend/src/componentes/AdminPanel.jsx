//Componente principal del panel de administración 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SeccionForm from './SeccionForm';
import ContenidoForm from './ContenidoForm';
import Header from './Header';
import { FaAlignCenter } from 'react-icons/fa';



const AdminPanel = () => {
  const [secciones, setSecciones] = useState([]);
  const [seccionSeleccionada, setSeccionSeleccionada] = useState(null);
  const [modoEditar, setModoEditar] = useState(false);
  const [mostrarFormularioContenido, setMostrarFormularioContenido] = useState(null);
  const [contenidoSeleccionado, setContenidoSeleccionado] = useState(null);
  const [modoEditarContenido, setModoEditarContenido] = useState(false);


  const obtenerSecciones = () => {
    axios.get('http://localhost:3001/api/secciones/con-contenido')
      .then(res => setSecciones(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    obtenerSecciones();
  }, []);

  const eliminarSeccion = (id) => {
    if (window.confirm('¿Eliminar esta sección?')) {
      axios.delete(`http://localhost:3001/api/secciones/${id}`)
        .then(() => obtenerSecciones());
    }
  };

  return (
    <>
    <Header  />
    <div className="container mt-4">
      <h2>Panel de Administración</h2>

      <SeccionForm
        seccion={seccionSeleccionada}
        modoEditar={modoEditar}
        onSuccess={() => {
          setSeccionSeleccionada(null);
          setModoEditar(false);
          obtenerSecciones();
        }}
      />

      <hr />
      <h4>Secciones</h4>
      <ul className="list-group">
        {secciones.map(seccion => (
          <li key={seccion.id_secciones} className="list-group-item">
            <strong>{seccion.Nombre}</strong> (Orden: {seccion.Orden})
            <div className="mt-2">
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => {
                  setSeccionSeleccionada(seccion);
                  setModoEditar(true);
                }}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-danger me-2"
                onClick={() => eliminarSeccion(seccion.id_secciones)}
              >
                Eliminar
              </button>
              <button
                className="btn btn-sm btn-success"
                onClick={() => setMostrarFormularioContenido(seccion.id_secciones)}
              >
                Agregar Submenú
              </button>
            </div>

            {mostrarFormularioContenido === seccion.id_secciones && (
              <ContenidoForm
                id_secciones={seccion.id_secciones}
                contenido={contenidoSeleccionado}
                modoEditar={modoEditarContenido}
                onSuccess={() => {
                  setMostrarFormularioContenido(null);
                  setContenidoSeleccionado(null);
                  setModoEditarContenido(false);
                  obtenerSecciones();
                }}
              />
            )}

            <ul className="mt-2">
              {seccion.contenido.map(item => (
                <li key={item.id_contenido}>
                  {item.Titulo}
                  <div className="mt-1">
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => {
                        setContenidoSeleccionado(item);
                        setModoEditarContenido(true);
                        setMostrarFormularioContenido(seccion.id_secciones);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        if (window.confirm('¿Eliminar este submenú?')) {
                          axios.delete(`http://localhost:3001/api/contenido/${item.id_contenido}`)
                            .then(() => obtenerSecciones());
                        }
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default AdminPanel;
