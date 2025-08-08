const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'epdeMexico'; // Reemplázala con una más segura y guárdala en .env

exports.login = (req, res) => {
  const { Usuario, Contrasena } = req.body;

  if (!Usuario || !Contrasena) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  const query = 'SELECT * FROM Usuarios WHERE Usuario = ?';
  db.query(query, [Usuario], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Error del servidor.' });
    if (results.length === 0) return res.status(401).json({ message: 'Usuario no encontrado.' });

    const usuarios = results[0];

    const match = await bcrypt.compare(Contrasena, usuarios.Contrasena);
    if (!match) return res.status(401).json({ message: 'Contraseña incorrecta.' });

    // Crear token JWT
    const token = jwt.sign(
      { id: usuarios.id_usuarios, rol: usuarios.Rol, nombre: usuarios.Nombre },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      usuarios: {
        id: usuarios.id_usuarios,
        nombre: usuarios.Nombre,
        rol: usuarios.Rol,
        Usuario: usuarios.Usuario,
      }
    });
  });
};
