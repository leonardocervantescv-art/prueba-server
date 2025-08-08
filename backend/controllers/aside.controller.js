const db = require('../db');

// EVENTOS
exports.obtenerEventos = (req, res) => {
  db.query('SELECT * FROM EventosAside', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.crearEvento = (req, res) => {
  const { Fecha, Descripcion } = req.body;
  const sql = 'INSERT INTO EventosAside (Fecha, Descripcion) VALUES (?, ?)';
  db.query(sql, [Fecha, Descripcion], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Evento creado', id: result.insertId });
  });
};

exports.actualizarEvento = (req, res) => {
  const { id } = req.params;
  const { Fecha, Descripcion } = req.body;
  const sql = 'UPDATE EventosAside SET Fecha=?, Descripcion=? WHERE id_evento=?';
  db.query(sql, [Fecha, Descripcion, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Evento actualizado' });
  });
};

exports.eliminarEvento = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM EventosAside WHERE id_evento=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Evento eliminado' });
  });
};

// CONTACTO
exports.obtenerContacto = (req, res) => {
  db.query('SELECT * FROM Horarios', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.crearContacto = (req, res) => {
  const { Horario, Sabado, Informes, Diplomados } = req.body;
  db.query('INSERT INTO Horarios (Horario, Sabado, Informes, Diplomados) VALUES (?, ?, ?, ?)', 
  [Horario, Sabado, Informes, Diplomados], 
  (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Contacto creado', id: result.insertId });
  });
};

exports.actualizarContacto = (req, res) => {
  const { id } = req.params;
  const { Horario, Sabado, Informes, Diplomados } = req.body;
  db.query('UPDATE Horarios SET Horario=?, Sabado=?, Informes=?, Diplomados=? WHERE id_horarios=?', 
  [Horario, Sabado, Informes, Diplomados, id], 
  (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Contacto actualizado' });
  });
};

exports.eliminarContacto = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Horarios WHERE id_horarios=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Contacto eliminado' });
  });
};
