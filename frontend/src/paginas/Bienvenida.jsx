import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventoSide from '../componentes/EventoSide';
import Header from '../componentes/Header';
import Banner from '../componentes/Banner';

const PaginaBienvenida = () => {
  const [contenido, setContenido] = useState(null);

  useEffect(() => {
    const fetchContenido = async () => {
      try {
        // Llamamos a la ruta que acabamos de crear:
        const res = await axios.get(`http://localhost:3001/api/contenido/slug/${slug}`);
        setContenido(res.data);
      } catch (error) {
        console.error('Error al obtener el contenido de bienvenida:', error);
      }
    };

    fetchContenido();
  }, []);
    return (
        <div className="container-fluid">
            <Header />

            <div className="slider-banner">
        {contenido && (
          // nota: res.data trae { id: 1, Titulo: "...", Banner: "/uploads/..." }
          <Banner idContenido={contenido.id} />
        )}
      </div>


            <div className="row">
                {/* Aside izquierdo */}
                <aside className="col-md-3 mb-3 ">
                    <EventoSide />
                </aside>
                {/* Contenido principal */}

                <section className="content col-md-9">
                    <h3 className="text-center">Estimados:</h3>

                    <p>Reciban la más cordial bienvenida a EP de México, la Institución LÍDER en la República Mexicana en
                        Educación Médica Continua y Posgrados.</p>
                    <p>Hace 23 años nos percatamos de la imperante y permanente necesidad de educación continua de los
                        profesionales de la salud en el país ante el gran reto de estos de preservar la salud y a veces la vida
                        de las personas.</p>
                    <p>Por lo que en el año 2001 nos propusimos la creación de una Institución Única en el País con la profunda
                        convicción de alcanzar la Excelencia a través de la Educación.</p>
                    <p>Desde su Fundación hasta la fecha EP de México ha procurado contar con programas de vanguardia y alta
                        calidad académica respaldado por catedráticos con experiencia, calidad moral y un gran dominio para la
                        impartición de conocimientos. Lo que nos ha convertido en La Institución LÍDER y REFERENTE para
                        profesionales de la Salud de cerca de 28 Estados de México.</p>
                    <p>SER parte de la Comunidad EP de México, es SER parte de uno de los Grupo de Profesionales de Salud mejor
                        preparados en el País, de individuos con una mística de superación y permanente necesidad de aprendizaje
                        en PRO de ellos mismos, sus familias y de las comunidades a las que sirven.</p>
                    <p>Si tú aún no eres parte de esta Comunidad te invitamos a formar parte de ella y te garantizamos que todas
                        tus expectativas serán cubiertas.</p>
                    <p>Sin más que externar te reitero mis consideraciones y un gran saludo.</p>
                    <p><strong>Dr. Héctor José Domínguez Mendoza</strong></p>
                    <p><strong>Rector</strong></p>
                    <p style={{ textDecoration: 'underline' }}><strong>Sistema EP de México</strong></p>
                </section>

            </div>
        </div>
    )
}

export default PaginaBienvenida


/*  

    const fetchContenido = async () => {
      try {
        // Llamamos al endpoint genérico por slug
        const res = await axios.get(`http://localhost:3001/api/contenido/slug/${slug}`);
        setContenido(res.data);
      } catch (err) {
        console.error('[PaginaGenerica] Error al obtener contenido:', err);
        setError('Página no encontrada.');
      }
    };

*/


// ('http://localhost:3001/api/contenido/bienvenida')