import Header from "../componentes/Header"; // Asegúrate de que la ruta sea correcta




const Inicio = () => {
  return (
    <>
      <Header />

      <section className="video-container">
        <video autoPlay muted loop aria-label="Video promocional de EPMTY.COM">
          <source src="/video/GDL.mp4" type="video/mp4" />
          Tu navegador no soporta video HTML5.
        </video>
      </section>

      <br /><br />

      <div className="wrapper" id="mty">
        <h2 className="campus">CAMPUS GUADALAJARA</h2>
        <img className="img-mty" src="/img/IMG01.png" alt="campusmonterrey" />
        <div className="text-box">
          <p><strong>EP de México</strong>, es la universidad líder latinoamericana de educación en salud.</p>
          <p>Con presencia en 26 Estados del país a través de sus 5 Campus: Puebla, Mérida,
            Guadalajara, Monterrey y Virtual. Nos hemos consolidado como una institución de prestigio
            en donde lo más importante son nuestros Alumnos, lo que nos obliga a estar en permanente
            mejora continua de todos los servicios educativos que brindamos.
          </p>
          <h3><img className="flechas" src="/img/flecha-correcta.png" alt="" />¡Únete y sé parte de la Gran Comunidad EP de
            México!<img className="flechas" src="/img/izquierda.png" alt="" /></h3>
        </div>
      </div>

      <img className="img-fr" src="/img/IMG02.png" alt="frasemty" />

      <div className="img-ccro">
        <a href="#"><img className="btnimg" src="/img/btncom.png" alt="comunidad" /></a>
        <a href="https://stethos.mx/index.php/es/" target="_blank"><img className="btnimg" src="/img/btnrevin.png" alt="revista" /></a>
        <a href="https://occcs.mx/" target="_blank"><img className="btnimg" src="/img/btnocccs.png" alt="occcs" /></a>
      </div>

      <section>
        <h1 className="title">OFERTA ACADÉMICA</h1>
      </section>

      <section className="gallery container">
        <div className="card">
          <a href="/programas/enterate#diplomados">
            <img src="/img/diplomados.png" alt="Diplomados" />
          </a>
        </div>
        <div className="card">
          <a href="/programas/enterate">
            <img src="/img/posgrados.png" alt="Posgrados" />
          </a>
        </div>
      </section>

      <section>
        <div className="container-btnbajos">
          <a href="/programas/dip-paramedico-avanzado" className="btn-circle">
            <img src="/img/btnb2.svg" alt="btnb2" />
          </a>
          <a href="/programas/dip-clinica-de-cateter" className="btn-circle">
            <img src="/img/btnb3.svg" alt="btnb3" />
          </a>
          <a href="/programas/dip-auxiliar-de-enfermeria-en-ciam" className="btn-circle">
            <img src="/img/btnb1.svg" alt="btnb1" />
          </a>
        </div>
      </section>
    </>
  );
};

export default Inicio;
