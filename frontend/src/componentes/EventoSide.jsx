import { useEffect, useState } from 'react';
import axios from 'axios';

const EventoSide = () => {
  const [eventos, setEventos] = useState([]);
  const [horario, setHorario] = useState(null);

  useEffect(() => {
    // Cargar eventos
    axios.get('http://localhost:3001/api/aside/eventos')
      .then(res => {
        console.log('Eventos:', res.data);
        if (Array.isArray(res.data)) setEventos(res.data);
      })
      .catch(err => console.error('Error al cargar eventos:', err));

    // Cargar horarios/contactos
    axios.get('http://localhost:3001/api/aside/contacto')
      .then(res => {
        console.log('Horarios:', res.data);
        // Devuelve un array de filas de Horarios; tomamos la primera
        if (Array.isArray(res.data) && res.data.length > 0) {
          setHorario(res.data[0]);
        }
      })
      .catch(err => console.error('Error al cargar horarios:', err));
  }, []);

  return (
    <div>
          {/* Próximos inicios */}
          <section className="upcoming">
            <h3>PRÓXIMOS INICIOS</h3>
            {Array.isArray(eventos) && eventos.map(evt => (
              <div key={evt.id_evento}>
                <p>{new Date(evt.Fecha).getDate()}</p>
                <p>
                  {new Date(evt.Fecha)
                    .toLocaleString('es-MX', { month: 'long' })}
                  <br />
                  <span>{evt.Descripcion}</span>
                </p>
              </div>
            ))}
            <a href="/eventos" className="vertodos">
              Ver todos
            </a>
          </section>

          {/* Horario de atención */}
          <section className="hours">
            <h3>HORARIO DE ATENCIÓN</h3>
            {horario ? (
              <>
                <p>
                  <span>🕘</span> Lunes a Viernes: {horario.Horario}
                </p>
                <p>
                  <span>S</span> Sábado: {horario.Sabado}
                </p>
                <p>
                  <span>📞</span> Informes: {horario.Informes}
                </p>
                <p>
                  <span>🎓</span> Diplomados: {horario.Diplomados}
                </p>
              </>
            ) : (
              <p>Cargando horario...</p>
            )}
          </section>
    </div>
  );
};

export default EventoSide;
