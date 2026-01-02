import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
// Importamos el hook de idioma
import { useLanguage } from '../context/LanguageContext';

// 1. IMPORTACIONES HABILITADAS
import PropertyCard from './PropertyCard';

// Importación de imágenes desde assets
import imgTaganga from '../assets/hotel_taganga.jpg';
import imgHuasipungo from '../assets/hotel_huasipungo.jpg';
import imgSalinas from '../assets/hotel_salinas.jpg';
import imgMinca from '../assets/hotel_minca.jpg';
import imgBelloHorizonte from '../assets/hotel_bello_horizonte.jpg';

// 2. DATOS COMPLETOS DE LAS 5 PROPIEDADES
const allPropertiesData = [
  { 
    id: 1, 
    img: imgTaganga, 
    title: "El mirador de taganga", 
    type: "Hostal", 
    location: "Cra. 2 #18-208, Taganga", 
    price: "245.000 COP", 
    rating: "5.0" 
  },
  { 
    id: 2, 
    img: imgHuasipungo, 
    title: "Edificio Huasipungo", 
    type: "Hotel", 
    location: "El Rodadero, Santa Marta", 
    price: "120.000 COP", 
    rating: "4.8" 
  },
  { 
    id: 3, 
    img: imgSalinas, 
    title: "Salinas del Mar", 
    type: "Condominio", 
    location: "Pozo Colorado", 
    price: "521.729 COP", 
    rating: "4.9" 
  },
  { 
    id: 4, 
    img: imgMinca, 
    title: "Cabaña Minca Nature", 
    type: "Cabaña", 
    location: "Minca, Sierra Nevada", 
    price: "350.000 COP", 
    rating: "4.7" 
  },
  { 
    id: 5, 
    img: imgBelloHorizonte, 
    title: "Bello Horizonte Suite", 
    type: "Apartamento", 
    location: "Bello Horizonte, Zona Zuca", 
    price: "480.000 COP", 
    rating: "4.9" 
  }
];

const AllProperties = () => {
  // Activamos la traducción
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado con botón de volver */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            {/* Título Traducido */}
            <h1 className="text-3xl font-bold text-gray-900">
              {t('catalog.title')}
            </h1>
            {/* Subtítulo Traducido */}
            <p className="text-gray-500 mt-1">
              {t('catalog.subtitle')}
            </p>
          </div>
          
          <Link 
            to="/" 
            className="flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-full shadow-sm hover:bg-gray-100 font-bold border border-gray-200 transition-all"
          >
            {/* Botón Traducido */}
            <ArrowLeft size={20} /> {t('catalog.back_button')}
          </Link>
        </div>

        {/* Grid de 5 Propiedades */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPropertiesData.map(property => (
            <PropertyCard 
              key={property.id}
              {...property}
              onClick={() => alert(`Próximamente: Detalle de ${property.title}`)}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default AllProperties;