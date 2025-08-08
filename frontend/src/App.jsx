
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminAside from './componentes/AdminAside';
import AdminPanel from './componentes/AdminPanel';
import AdminProgramas from './componentes/AdminProgramas';
import Inicio from './paginas/Inicio';
import EventoSide from './componentes/EventoSide';
import AdminBanner from './componentes/AdminBanner';
import PaginaGenerica from './paginas/PaginaGenerica';
import PaginaProgramas from './paginas/PaginaProgramas';
import Banner from './componentes/Banner';
import PaginaDetallePrograma from './paginas/PaginaDetallePrograma';
import AdminDetallesProgram from './componentes/AdminDetallesProgram';
import AdminMenu from './componentes/AdminMenu'; // <--- NUEVA LÍNEA
import InicioSesion from './paginas/InicioSesion';
import Login from './componentes/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; 
import './estilo.css';
import './edit.css';
import './program.css';
import './adminMenu.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/sesion" element={<InicioSesion /> } />
        {/* <Route path="/login" element={<Login setUsuario={setUsuario} />} /> */}
        <Route path="/side" element={<EventoSide />} />
        <Route path="/bann" element={<Banner />} />
        <Route path="/:id/:slug" element={<PaginaGenerica />} /> 
        <Route path="/programas/:slug" element={<PaginaProgramas />} />
        <Route path="/admin" element={<AdminMenu />} /> {/* <--- MODIFICADO */}
        <Route path="/admin/secciones" element={<AdminPanel />} />
        <Route path="/admin/contenido" element={<AdminBanner />} />
        <Route path="/admin/aside" element={<AdminAside />} />
        <Route path="/admin/programas" element={<AdminProgramas />} />
        <Route path="/detalle/:slug" element={<PaginaDetallePrograma />} />
        <Route path="/admin/detalles-programas" element={<AdminDetallesProgram />} />
      </Routes>
    </Router>
  );
}

export default App;

 




//             //          /////
//             //        //     //
//             //      //        //
//             //     //          //
//             //     //          //
// //////////////     //          //
//             //     //          //
//             //     //          //
//             //     //          //
//             //     //          //
//             //      //         // 
//             //        /////////
// REVISAR ADMINBANNER ES POSIBLE QUE CON LOS NUEVOS CONTROLADORES SE TENGA QUE CAMBIAR BUSCAR EN CHAT EL  CODIGO DE ADMINBANNER

// https://prismic.io/blog/css-hover-effects PARA HOVERS DISEÑOS

///// PENDIENTE CHECAR LA TABLA QUE SE ELIMINÓ 