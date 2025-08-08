const express = require('express');
const cors = require('cors');
const app = express();

const seccionesRoutes = require('./routes/secciones.routes');
const asideRoutes = require('./routes/aside.routes');
const contenidoRoutes = require('./routes/contenido.routes');
const bannerRoutes = require('./routes/banner.routes');
const programasRoutes = require('./routes/programas.routes');
const bloquesRoutes = require('./routes/bloques.routes')
const authRoutes = require('./routes/auth.routes');
const path = require('path');  //LINEA NECESARIA PARA USAR LA LINEA 22
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/secciones', seccionesRoutes);
app.use('/api/aside', asideRoutes);
app.use('/api/eventos', asideRoutes);
app.use('/api/contenido', contenidoRoutes);
app.use('/api/banner', bannerRoutes);
app.use('/api/programas', programasRoutes);
app.use('/api/bloques', bloquesRoutes);
//app.use('/api/detalles-programa', detallesRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));      // LINEA 10 PARA PODER USAR 


app.listen(3001, () => {
    console.log('Servidor backend corriendo en puerto 3001');
});





















//const tipoContenidoRoutes = require('./routes/tipoContenido.routes');
//const usuariosRoutes = require('./routes/usuarios.routes');
// 
// 
// //app.use('/api/tipos', tipoContenidoRoutes);
// //app.use('/uploads', express.static('public/uploads'));
// // app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// //app.use('/api/usuarios', usuariosRoutes);