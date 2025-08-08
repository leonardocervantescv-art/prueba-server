const express = require('express');
const router = express.Router();
const asideController = require('../controllers/aside.controller');
const upload = require('../uploads/multer');

// EVENTOS
router.get('/eventos', asideController.obtenerEventos);
router.post('/eventos', asideController.crearEvento)
router.put('/eventos/:id', asideController.actualizarEvento);
router.delete('/eventos/:id', asideController.eliminarEvento);

// CONTACTO
router.get('/contacto', asideController.obtenerContacto);   
router.post('/contacto', asideController.crearContacto);
router.put('/contacto/:id', asideController.actualizarContacto);
router.delete('/contacto/:id', asideController.eliminarContacto);

module.exports = router;
