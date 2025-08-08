// src/components/AdminAside.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EventoForm from './EventoForm'
import ContactoForm from './ContactoForm'
import Header from './Header'


const AdminAside = () => {
  const [eventos, setEventos] = useState([])
  const [contactos, setContactos] = useState([])
  const [editingEvento, setEditingEvento] = useState(null)
  const [editingContacto, setEditingContacto] = useState(null)

  const fetchData = () => {
    axios.get('http://localhost:3001/api/aside/eventos') // MUESTRA LOS EVENTOS CREADOS ABAJO DEL FORMULARIO
      .then(res => setEventos(res.data))

    axios.get('http://localhost:3001/api/aside/contacto') // MUESTRA LOS HORARIOS ABAJO DEL FORMULARIO
      .then(res => setContactos(res.data))
  }

  useEffect(fetchData, [])

  const eliminar = (tipo, id) => {
    const url = tipo === 'evento'
      ? `http://localhost:3001/api/aside/eventos/${id}`
      : `http://localhost:3001/api/aside/contacto/${id}`
    if (!window.confirm('¿Seguro?')) return
    axios.delete(url).then(fetchData)
  }

  return (
    <>
    <Header />
    <div className="container mt-4">
      <h3>Administración del Aside</h3>

      <section className="mb-5">
        <h4> <strong>Eventos</strong></h4>
        <EventoForm
          evento={editingEvento}
          onSuccess={() => {
            setEditingEvento(null)
            fetchData()
          }}
        />
        <ul className="list-group">
          {eventos.map(e => (
            <li key={e.id_evento} className="list-group-item d-flex justify-content-between">
              <span>
                <strong>{e.Descripcion}</strong> — {new Date(e.Fecha).toLocaleDateString()}
              </span>
              <div>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => setEditingEvento(e)}
                >Editar</button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => eliminar('evento', e.id_evento)}
                >Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4><strong>Contactos y Horarios</strong></h4>
        <ContactoForm
          contacto={editingContacto}
          onSuccess={() => {
            setEditingContacto(null)
            fetchData()
          }}
        />
        <ul className="list-group">
          {contactos.map(c => (
            <li key={c.id_horarios} className="list-group-item d-flex justify-content-between">
              <span>{c.Horario} <br /> {c.Sabado}  <br /> {c.Informes}  <br /> {c.Diplomados}</span>
              <div>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => setEditingContacto(c)}
                >Editar</button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => eliminar('contacto', c.id_horarios)}
                >Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
        <br />
      </section>
    </div>
    </>
  )
}

export default AdminAside
