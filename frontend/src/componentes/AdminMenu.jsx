import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import '@fortawesome/fontawesome-free/css/all.min.css';


const AdminMenu = () => {
  const panels = [
    { name: 'Secciones', path: '/admin/secciones', icon: 'fa-sitemap' },
    { name: 'Banners y Contenido', path: '/admin/contenido', icon: 'fa-image' },
    { name: 'Programas', path: '/admin/programas', icon: 'fa-book' },
    { name: 'Diplomado y Fechas', path: '/admin/aside', icon: 'fa-calendar-alt' },
    { name: 'Contenido de Programas', path: '/admin/detalles-programas', icon: 'fa-file-alt' },
  ];

  return (
    <>
      <Header />
      <div className="admin-menu container py-5">
        <h2 className="mb-4 text-center fw-bold mdb">Panel de Administración</h2>
        <div className="row g-4">
          {panels.map(panel => (
            <div key={panel.path} className="col-md-6 col-lg-4">
              <NavLink
                to={panel.path}
                className="admin-card card text-center text-decoration-none h-100 shadow-sm"
              >
                <div className="card-body">
                  <i className={`fas ${panel.icon} fa-2x mb-3 text-primary`}></i>
                  <h5 className="card-title">{panel.name}</h5>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
