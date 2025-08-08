const express = require('express');
const router = express.Router();
const seccionesController = require('../controllers/secciones.controller');

// Obtener todas las secciones
router.get('/', seccionesController.obtenerSecciones);

// Obtener secciones con contenido
router.get('/con-contenido', seccionesController.obtenerSeccionesConContenido);

// Obtener secciones con items
router.get('/con-items', seccionesController.obtenerSeccionesConItems);

// Obtener una sección por ID
router.get('/:id', seccionesController.obtenerSeccionPorId);

// Crear una nueva sección
router.post('/', seccionesController.crearSeccion);

// Actualizar sección por ID
router.put('/:id', seccionesController.actualizarSeccion);

// Eliminar sección por ID
router.delete('/:id', seccionesController.eliminarSeccion);


module.exports = router;
