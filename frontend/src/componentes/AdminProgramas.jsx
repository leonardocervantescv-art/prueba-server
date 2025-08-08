// componentes/AdminProgramas.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
const AdminProgramas = () => {
  const [contenidos, setContenidos] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [id_contenido, setIdContenido] = useState("");
  const [formulario, setFormulario] = useState({ Nombre: "", Descripcion: "" });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [programaEditarId, setProgramaEditarId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/contenido/")
      .then(res => setContenidos(res.data))
      .catch(err => console.error("Error al cargar contenidos:", err));
  }, []);

  useEffect(() => {
    if (id_contenido) {
      axios.get(`http://localhost:3001/api/programas/${id_contenido}`)
        .then(res => setProgramas(res.data))
        .catch(err => console.error("Error al cargar programas:", err));
    }
  }, [id_contenido]);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };


  const generarSlug = (nombre) => {
    return nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };


  const handleGuardar = async () => {
    if (!formulario.Nombre || !formulario.Descripcion || !id_contenido) return alert("Faltan campos");

    try {
      if (modoEdicion) {
        const slug = generarSlug(formulario.Nombre);
        await axios.put(`http://localhost:3001/api/programas/${programaEditarId}`, {
          ...formulario,
          slug
        });
      } else {
        await axios.post("http://localhost:3001/api/programas", {
          ...formulario,
          id_contenido
        });
      }
      setFormulario({ Nombre: "", Descripcion: "" });
      setModoEdicion(false);
      setProgramaEditarId(null);
      const res = await axios.get(`http://localhost:3001/api/programas/${id_contenido}`);
      setProgramas(res.data);
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  };

  const handleEditar = (programa) => {
    setFormulario({ Nombre: programa.Nombre, Descripcion: programa.Descripcion });
    setModoEdicion(true);
    setProgramaEditarId(programa.id_programas);
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Seguro que deseas eliminar este programa?")) {
      try {
        await axios.delete(`http://localhost:3001/api/programas/${id}`);
        const res = await axios.get(`http://localhost:3001/api/programas/${id_contenido}`);
        setProgramas(res.data);
      } catch (err) {
        console.error("Error al eliminar:", err);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container my-4">
        <h2 className="text-center mb-4">Panel de Administración de Programas</h2>

        {/* Selector de submenú */}
        <div className="mb-3">
          <label className="form-label">Selecciona un submenú</label>
          <select
            className="form-select"
            value={id_contenido}
            onChange={(e) => setIdContenido(e.target.value)}
          >
            <option value="">-- Selecciona --</option>
            {contenidos.map((contenido) => (
              <option key={contenido.id_contenido} value={contenido.id_contenido}>
                {contenido.Titulo}
              </option>
            ))}
          </select>
        </div>

        {/* Formulario */}
        <div className="card p-3 mb-4">
          <h5>{modoEdicion ? "Editar programa" : "Agregar nuevo programa"}</h5>
          <input
            type="text"
            name="Nombre"
            className="form-control my-2"
            placeholder="Nombre del programa"
            value={formulario.Nombre}
            onChange={handleChange}
          />
          <textarea
            name="Descripcion"
            className="form-control my-2"
            placeholder="Descripción del programa"
            value={formulario.Descripcion}
            onChange={handleChange}
          />
          <button onClick={handleGuardar} className="btn btn-primary">
            {modoEdicion ? "Actualizar" : "Guardar"}
          </button>
        </div>

        {/* Tarjetas */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-4 justify-content-center">
          {programas.map((programa) => (
            <div className="col" key={programa.id_programas}>
              <div className="card flip-card admin-card">
                <div className="card-inner">
                  <div className="card-front">
                    <p className="txt-program">{programa.Nombre}</p>
                  </div>
                  <div className="card-back">
                    <p>{programa.Descripcion}</p>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditar(programa)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(programa.id_programas)}>Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminProgramas;
