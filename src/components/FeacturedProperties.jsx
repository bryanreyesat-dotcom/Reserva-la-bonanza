import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropertyCard from './PropertyCard'; 
import { BRAND } from '../config/brand';
// Importamos el hook de idioma
import { useLanguage } from '../context/LanguageContext';

import imgTaganga from "../assets/hotel_taganga.jpg";
import imgHuasipungo from "../assets/hotel_huasipungo.jpg";
import imgSalinas from "../assets/hotel_salinas.jpg"

const FeaturedProperties = () => {
  // Activamos la traducción
  const { t } = useLanguage();

  // Datos de ejemplo (NOTA: Los títulos y nombres de lugares suelen dejarse en su idioma original
  // o venir de una base de datos, por eso estos textos no los metemos en translation.js)
  const featuredProperties = [
    {
      id: 1,
      img: imgTaganga,
      title: "El mirador de taganga",
      type: "hostal",
      location: "Cra. 2 #18-208, taganga",
      price: "245.000 COP",
      rating: "5.0"
    },
    {
      id: 2,
      img: imgHuasipungo,
      title: "Edificio Huasipungo",
      type: "Hotel",
      location: "El Rodadero, Santa Marta, Carrera 1A # 5-50",
      price: "12.000 COP",
      rating: "4.8"
    },
    {
      id: 3,
      img: imgSalinas,
      title: "Salinas del Mar",
      type: "Condominio",
      location: "Cr 4 #102 76 Torre, Pozo Colorado",
      price: "521.729 COP",
      rating: "4.9"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 bg-gray-50">
      
      {/* Encabezado Traducido */}
      <div className="text-center mb-16">
        <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          {t('properties.section_title')}
        </h3>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          {t('properties.section_subtitle')}
        </p>
      </div>

      {/* Grid de Propiedades */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredProperties.map((prop, index) => (
           <PropertyCard 
             key={index}
             {...prop}
             onClick={() => alert("¡Aquí iríamos al detalle!")}
           />
        ))}
      </div>

      {/* Botón Traducido */}
      <div className="text-center mt-16">
        <Link 
          to="/propiedades" 
          className={`inline-flex items-center gap-2 border-2 ${BRAND.colors.borderPrimary || 'border-gray-900'} ${BRAND.colors.primary || 'text-gray-900'} font-bold py-3 px-10 rounded-full hover:bg-teal-50 transition-colors mx-auto`}
        >
          {t('properties.btn_view_all')} <ArrowRight size={18} />
        </Link>
      </div>
      
    </div>
  );
};

export default FeaturedProperties;