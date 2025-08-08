//Backend del panel del header

const db = require('../db');

exports.obtenerSecciones = (req, res) => {
  db.query('SELECT * FROM Secciones ORDER BY Orden ASC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.obtenerSeccionPorId = (req, res) => {
  db.query('SELECT * FROM Secciones WHERE id_secciones = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

exports.crearSeccion = (req, res) => {
  const { Nombre, Orden } = req.body;
  db.query('INSERT INTO Secciones (Nombre, Orden) VALUES (?, ?)', [Nombre, Orden], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Sección creada', id: result.insertId });
  });
};

exports.actualizarSeccion = (req, res) => {
  const { Nombre, Orden } = req.body;
  db.query('UPDATE Secciones SET Nombre=?, Orden=? WHERE id_secciones=?', [Nombre, Orden, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Sección actualizada' });
  });
};

exports.eliminarSeccion = (req, res) => {
  db.query('DELETE FROM Secciones WHERE id_secciones=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Sección eliminada' });
  });
};

exports.obtenerSeccionesConContenido = (req, res) => {
  const sql = `
    SELECT s.*, c.id_contenido, c.Titulo, c.Banner
    FROM Secciones s
    LEFT JOIN Contenido c ON s.id_secciones = c.id_secciones
    ORDER BY s.Orden ASC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const seccionesMap = {};

    results.forEach(row => {
      if (!seccionesMap[row.id_secciones]) {
        seccionesMap[row.id_secciones] = {
          id_secciones: row.id_secciones,
          Nombre: row.Nombre,
          Orden: row.Orden,
          contenido: []
        };
      }

      if (row.id_contenido) {
        seccionesMap[row.id_secciones].contenido.push({
          id_contenido: row.id_contenido,
          Titulo: row.Titulo,
          Banner: row.Banner
        });
      }
    });

    res.json(Object.values(seccionesMap));
  });
};

exports.obtenerSeccionesConItems = (req, res) => {
  const sql = `
    SELECT s.id_secciones, s.Nombre AS seccion, s.Orden,
           i.id_item, i.Nombre AS item, i.Ruta
    FROM Secciones s
    LEFT JOIN SeccionItems i ON s.id_secciones = i.id_secciones
    ORDER BY s.Orden ASC, i.id_item ASC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // Agrupar por secciones
    const secciones = [];
    const map = {};

    results.forEach(row => {
      if (!map[row.id_secciones]) {
        map[row.id_secciones] = {
          id: row.id_secciones,
          nombre: row.seccion,
          items: []
        };
        secciones.push(map[row.id_secciones]);
      }

      if (row.id_item) {
        map[row.id_secciones].items.push({
          nombre: row.item,
          ruta: row.Ruta
        });
      }
    });

    res.json(secciones);
  });
};




