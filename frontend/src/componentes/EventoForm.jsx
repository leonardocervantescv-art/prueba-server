import React, { useState, useEffect } from 'react'
import axios from 'axios'

const EventoForm = ({ evento, onSuccess }) => {
  const [Fecha, setFecha] = useState('')
  const [Descripcion, setDescripcion] = useState('')

  useEffect(() => {
    if (evento) {
      setFecha(evento.Fecha.slice(0,10))
      setDescripcion(evento.Descripcion)
    } else {
      setFecha('')
      setDescripcion('')
    }
  }, [evento])

  const submit = async e => {
    e.preventDefault()
    try {
      if (evento) {
        await axios.put(`http://localhost:3001/api/aside/eventos/${evento.id_evento}`, { Fecha, Descripcion })
      } else {
        await axios.post('http://localhost:3001/api/aside/eventos', { Fecha, Descripcion })
      }
      onSuccess()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={submit} className="mb-3 p-3 border rounded">
      <h5>{evento ? 'Editar Evento' : 'Nuevo Evento'}</h5>
      <input type="date" className="form-control mb-2"
        value={Fecha} onChange={e => setFecha(e.target.value)} required />
      <textarea className="form-control mb-2" placeholder="Descripción"
        value={Descripcion} onChange={e => setDescripcion(e.target.value)} required />
      <button className="btn btn-primary">
        {evento ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  )
}

export default EventoForm
