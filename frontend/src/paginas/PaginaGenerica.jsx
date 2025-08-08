// frontend/src/pages/PaginaGenerica.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../componentes/Header';
import Banner from '../componentes/Banner';
import EventoSide from '../componentes/EventoSide';


const PaginaGenerica = () => {
  const { slug } = useParams();
  const [contenido, setContenido] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContenido = async () => {
      try {
        // Llamamos al endpoint genérico por slug
        const res = await axios.get(`http://localhost:3001/api/contenido/slug/${slug}`);
        console.log('[DEBUG] Contenido recibido: ', res.data);  
        setContenido(res.data); 
      } catch (err) {
        console.error('[PaginaGenerica] Error al obtener contenido:', err);
        setError('Página no encontrada.');
      }
    };
    fetchContenido();
  }, [slug]);

  if (error) {  
    return (
      <div>
        <Header />
        <h2 style={{ color: 'red' }}>{error}</h2>
      </div>
    );
  }

  if (!contenido) {
    return (
      <div>
        <Header />
        <p>Cargando…</p>
      </div>
    );
  }       

  return (
    <div className="container-fluid">
      <Header />

      <div className="slider-banner">
        {/* Pasamos contenido.slug a <Banner /> */}
        <Banner slug={contenido.slug} />
      </div>

      <div className="row">
        <aside className="col-md-3 mb-3">
          <EventoSide />
        </aside>
        <section className="content col-md-9">
          <div
            dangerouslySetInnerHTML={{ __html: contenido.Texto || '' }}
          />
        </section>
      </div>
    </div>
  );
};

export default PaginaGenerica;
