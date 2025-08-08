import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../componentes/Header';
import Banner from '../componentes/Banner';
import { useNavigate } from 'react-router-dom';

const PaginaProgramas = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [contenido, setContenido] = useState(null);
  const [programas, setProgramas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContenidoYProgramas = async () => {
      try {
        // Obtener el contenido actual
        const resContenido = await axios.get(`http://localhost:3001/api/contenido/slug/${slug}`);
        setContenido(resContenido.data);

        // Obtener programas relacionados con el contenido
        const resProgramas = await axios.get(`http://localhost:3001/api/programas/${resContenido.data.id_contenido}`);
        setProgramas(resProgramas.data);
      } catch (err) {
        console.error('Error al obtener datos:', err);
        setError('Página no encontrada.');
      }
    };

    fetchContenidoYProgramas();
  }, [slug]);

const handleClick = (slug) => {
  navigate(`/detalle/${slug}`);
};


  return (
    <div className="pagina-programas container-fluid px-3">
      <Header />
      <Banner />
      <div className="text-center mb-4 card-title">
        <h1 className="mdb hover-underline">{slug.replace(/-/g, ' ').toUpperCase()}</h1>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-md-10">
          <div className="album py-5">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-4 justify-content-center">
                {programas.map((programa, index) => (
                  <div className="col" key={index}>
                    <div className="card flip-card">
                      <div className="card-inner">
                        <div className="card-front">
                          <p className="txt-program">{programa.Nombre}</p>
                        </div>
                        <div className="card-back">
                          <p>{programa.Descripcion}</p>
                          <button className="btn btn-light mt2" onClick={() => handleClick(programa.slug)}>Ver más</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {error && (
                <div className="text-center mt-4 text-danger">
                  <p>{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginaProgramas;
