import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn
} from "react-icons/fa";
import { Link } from 'react-router-dom';


// convierte acentos y espacios en url valida 
const slugify = texto => texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');



const Header = () => {
  const [secciones, setSecciones] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/secciones/con-contenido')
      .then(response => {
        setSecciones(response.data);
      })
      .catch(error => {
        console.error('Error al cargar secciones:', error);
      });
  }, []);  

  return (
    <Navbar style={{ backgroundColor: '#041b2d'}} expand="lg" className="header-navbar py-3" variant="dark">
      <Container fluid className="px-5 d-flex justify-content-between">

        {/* LOGOS */}
        <div className="d-flex align-items-center">
          <Link to="/">
            <img
              src="/img/logo.png"
              alt="EP de México"
              style={{ height: "40px", marginRight: "10px" }}
            />
          </Link>
        </div>

        {/* MENÚ DINÁMICO */}
        <Nav className="mx-auto">
          {secciones.map(seccion => (
            <NavDropdown
              key={seccion.id_secciones}
              title={seccion.Nombre}
              id={`seccion-${seccion.id_secciones}`}
            >
              {seccion.contenido.map(item => (
                <NavDropdown.Item as={Link} to={`/${slugify(seccion.Nombre)}/${slugify(item.Titulo)}`}>  {/* NAVEGACION ENTRE SUBMENÚS*/}
                  {item.Titulo}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          ))}
        </Nav>

        {/* REDES SOCIALES */}
        <div className="d-flex align-items-center gap-3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF color="white" /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram color="white" /></a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok color="white" /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn color="white" /></a>
        </div>

      </Container>
    </Navbar>
  );
};

export default Header;
