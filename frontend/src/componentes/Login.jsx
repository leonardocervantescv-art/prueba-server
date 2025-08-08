import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUsuario }) => {
  const [usuario, setUsuarioInput] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:3001/api/auth/login', {
        Usuario: usuario,
        Contrasena: contrasena,
      });

      // Guardar token y datos del usuario
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('usuario', JSON.stringify(res.data.usuarios)); // ojo: backend responde con "usuarios"

      // Actualiza estado global o context si lo tienes
      setUsuario(res.data.usuarios);

      // Redirigir al panel
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="usuario" className="form-label">Usuario</label>
          <input
            type="text"
            className="form-control"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuarioInput(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contrasena" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
