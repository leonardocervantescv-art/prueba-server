import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../componentes/Header';
import Banner from '../componentes/Banner';
import EventoSide from '../componentes/EventoSide';

const PaginaDetallePrograma = () => {
  const { slug } = useParams();
  const [detalle, setDetalle] = useState(null);
  const [error, setError] = useState(null);
  const [bloques, setBloques] = useState([]);
  const [bloqueActivo, setBloqueActivo] = useState(null);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/programas/slug/${slug}`);
        setDetalle(res.data);
      } catch (err) {
        console.error('[PaginaDetallePrograma] Error al obtener detalle:', err);
        setError('Detalle del programa no encontrado.');
      }
    };

    const fetchBloques = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/bloques/slug/${slug}`);
        setBloques(res.data);
        if (res.data.length > 0) setBloqueActivo(res.data[0].id_bloque);
      } catch (err) {
        console.error('Error al obtener bloques:', err);
      }
    };

    fetchDetalle();
    fetchBloques();
  }, [slug]);

  if (error) {
    return (
      <div>
        <Header />
        <h2 className="text-danger text-center mt-4">{error}</h2>
      </div>
    );
  }

  if (!detalle) {
    return (
      <div>
        <Header />
        <p className="text-center mt-4">Cargando…</p>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <Header />

      <div className="slider-banner">
        <Banner slug={slug} />
      </div>

      <div className="row">
        <aside className="col-md-3 mb-3">
          <EventoSide />
        </aside>
        <section className="content col-md-9">
          {detalle.Banner && (
            <img
              src={`http://localhost:3001${detalle.Banner}`}
              alt={detalle.Nombre}
              className="img-fluid mb-4"
            />
          )}
          <h1 className="mb-3">{detalle.Nombre}</h1>
          <div dangerouslySetInnerHTML={{ __html: detalle.Texto || '' }} />

          {/* Bloques académicos */}
          {bloques.length > 0 && (
            <div className="mt-5">
              <h4 className="text-success">PROGRAMA ACADÉMICO</h4>
              <ul className="nav nav-tabs mb-3">
                {bloques.map((bloque) => (
                  <li className="nav-item" key={bloque.id_bloque}>
                    <button
                      className={`nav-link ${bloqueActivo === bloque.id_bloque ? 'active' : ''}`}
                      onClick={() => setBloqueActivo(bloque.id_bloque)}
                    >
                      {bloque.bloque_nombre}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="border rounded p-3 bg-white">
                {bloques.map((bloque) =>
                  bloque.id_bloque === bloqueActivo ? (
                    <div key={bloque.id_bloque}>
                      <ul>
                        {bloque.contenido
                          .split('\n')
                          .filter(linea => linea.trim() !== '')
                          .map((linea, index) => (
                            <li key={index}>
                              <span className="text-warning me-1">▶ </span>
                              {linea}
                            </li>
                          ))}
                      </ul>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}
          
        </section>
      </div>
    </div>
  );
};

export default PaginaDetallePrograma;
