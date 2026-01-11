/* ========================================================================
 * SECCIÓN 1: IMPORTACIONES
 * ======================================================================== */
import React from 'react';
import { MapPin, Star, ArrowRight, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/* ========================================================================
 * SECCIÓN 2: COMPONENTE PRINCIPAL
 * ======================================================================== */
const PropertyCard = ({ img, title, type, location, price, rating, onClick }) => {
  // 2.1 Hooks
  const { t } = useLanguage();

  // 2.2 Manejador para el botón de favorito
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Evita que el click se propague a la tarjeta (no abre detalles)
    // Aquí iría la lógica para guardar en favoritos
    console.log("Añadido a favoritos:", title);
  };

/* ========================================================================
 * SECCIÓN 3: RENDERIZADO (JSX)
 * ======================================================================== */
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col h-full"
    >
      
      {/* --- A. SECCIÓN SUPERIOR (IMAGEN) --- */}
      <div className="relative h-72 overflow-hidden">
        
        {/* Imagen con efecto Zoom */}
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Degradado (Mejora contraste) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
        
        {/* Badge de Tipo */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800 uppercase tracking-wider shadow-sm border border-white/50">
          {type}
        </div>
        
        {/* Botón Favorito */}
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-black/20 hover:bg-white text-white hover:text-red-500 transition-all backdrop-blur-md border border-white/10 group-hover:scale-110 active:scale-95"
          aria-label="Añadir a favoritos"
        >
          <Heart size={18} />
        </button>
      </div>

      {/* --- B. SECCIÓN INFERIOR (INFO) --- */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* Título y Rating */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-1 pr-2">
            {title}
          </h3>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100 shadow-sm flex-shrink-0">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-bold text-gray-800">{rating}</span>
          </div>
        </div>

        {/* Ubicación */}
        <div className="flex items-start gap-2 text-gray-500 text-sm mb-6 flex-grow">
          <MapPin size={16} className="mt-1 flex-shrink-0 text-indigo-400" />
          <span className="line-clamp-2 leading-relaxed">{location}</span>
        </div>

        {/* Footer de la Card: Precio y Acción */}
        <div className="pt-5 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              {t('properties.price_night')}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-indigo-600">{price}</span>
            </div>
          </div>
          
          {/* Botón Flecha Animada */}
          <button className="bg-gray-50 group-hover:bg-indigo-600 text-gray-900 group-hover:text-white p-3 rounded-2xl transition-all duration-300 shadow-sm group-hover:shadow-indigo-300/50">
            <ArrowRight size={20} className="transform transition-transform duration-300 group-hover:-rotate-45" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default PropertyCard;