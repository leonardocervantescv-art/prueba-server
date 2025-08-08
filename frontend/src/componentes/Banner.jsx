// frontend/src/componentes/Banner.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Banner = ({ slug }) => {
  const [bannerPath, setBannerPath] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchBanner = async () => {
      try {
        // Llamamos a /api/banner/slug/:slug
        const res = await axios.get(`http://localhost:3001/api/banner/slug/${slug}`);
        // Asegúrate de que el backend responda { Banner: "/uploads/banners/xxx.jpg" }
        if (res.data.Banner) {
          setBannerPath(res.data.Banner);
        } else {
          setBannerPath(null);
        }
      } catch (err) {
        console.error('[Banner] Error al obtener banner:', err);
        setBannerPath(null);
      }
    };

    fetchBanner();
  }, [slug]);

  if (!bannerPath) return null;

  // Aquí construimos la URL completa: 
  // si bannerPath === "/uploads/banners/1657891234567.jpg"
  // entonces <img src="http://localhost:3001/uploads/banners/1657891234567.jpg" />
  //const fullUrl = `http://localhost:3001${bannerPath}`;

  return (
    <div className="banner-container">
        <img src={`http://localhost:3001${bannerPath}`} alt={`Banner de ${slug}`} />  
    </div>
  );
};

export default Banner;

// classname imagen w-full object-cover