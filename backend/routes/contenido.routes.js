const express = require('express');
const router = express.Router();
const contenidoController = require('../controllers/contenido.controller');

// Crear nuevo contenido
router.post('/', contenidoController.crearContenido);

// Editar contenido existente
router.put('/:id', contenidoController.updateContenido);
//router.put('/:id', contenidoController.editarContenido);

// Eliminar contenido
router.delete('/:id', contenidoController.eliminarContenido);

router.get('/slug/:slug', contenidoController.obtenerContenidoPorSlug);

router.get('/', contenidoController.obtenerTodosLosContenidos);



module.exports = router;


/*
// backend/routes/contenido.routes.js
const express = require('express');
const router = express.Router();
const contenidoController = require('../controllers/contenido.controller');

// Rutas CRUD existentes:
router.post('/', contenidoController.crearContenido);
router.put('/:id', contenidoController.editarContenido);
router.delete('/:id', contenidoController.eliminarContenido);

// Ruta NUEVA para obtener por slug:
router.get('/slug/:slug', contenidoController.obtenerContenidoPorSlug);

module.exports = router;


*/




