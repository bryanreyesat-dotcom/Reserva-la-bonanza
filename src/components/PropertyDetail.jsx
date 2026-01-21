import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../backend/supabaseClient';
import { useLanguage } from '../context/LanguageContext';
import { Wifi, Wind, Waves, ArrowLeft, MapPin, Star } from 'lucide-react';

const PropertyDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        // Seleccionamos TODO (*) de la tabla
        const { data, error } = await supabase
          .from('alojamientos')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setHotel(data);
      } catch (error) {
        console.error("Error cargando hotel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center text-gray-500 font-medium">{t('details.loading')}</div>;
  if (!hotel) return <div className="text-center py-20 text-red-500">Hotel no encontrado</div>;

  // --- LÓGICA BLINDADA PARA IMÁGENES (SALVAVIDAS) ---
  
  // 1. Imagen por defecto si todo falla (Gris)
  const fallbackImage = "https://via.placeholder.com/800x600?text=No+Image+Available";

  // 2. Intentamos obtener la imagen principal, si no existe, usamos el fallback
  const mainImage = hotel.imagen_url || fallbackImage;

  // 3. Preparamos la galería. 
  //    Si 'hotel.galeria' existe y tiene fotos, úsala.
  //    Si NO, crea un array repitiendo la imagen principal 5 veces para rellenar el mosaico.
  let images = [];
  
  if (hotel.galeria && Array.isArray(hotel.galeria) && hotel.galeria.length > 0) {
      images = hotel.galeria;
  } else {
      // Si borraste la columna galería, entrará aquí y usará la foto principal repetida
      images = [mainImage, mainImage, mainImage, mainImage, mainImage];
  }

  // Aseguramos que siempre haya al menos 5 elementos para que el CSS no se rompa
  const displayImages = [...images];
  while (displayImages.length < 5) {
    displayImages.push(mainImage);
  }

  // --- FIN LÓGICA IMÁGENES ---

  const descriptionText = hotel.descripcion 
    ? hotel.descripcion 
    : t('details.default_desc').replace('{hotelName}', hotel.titulo);

  const precio = new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', maximumFractionDigits: 0
  }).format(hotel.precio_noche);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      <Link to="/propiedades" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors font-medium">
        <ArrowLeft size={20} className="mr-2" /> 
        {t('details.back')}
      </Link>

      {/* Galería Mosaico */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3 h-[400px] md:h-[500px] mb-10 rounded-3xl overflow-hidden shadow-xl">
        {/* Foto Principal (Grande) */}
        <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer h-full">
           <img 
             src={displayImages[0]} 
             alt="Principal" 
             onError={(e) => e.target.src = fallbackImage} // Si la URL está rota, pone la gris
             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
           />
           <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
        </div>
        
        {/* Fotos Secundarias (Pequeñas) */}
        {displayImages.slice(1, 5).map((img, index) => (
            <div key={index} className="hidden md:block relative overflow-hidden h-full">
                <img 
                    src={img} 
                    alt={`Vista ${index + 2}`}
                    onError={(e) => e.target.src = fallbackImage} 
                    className="w-full h-full object-cover opacity-95 hover:opacity-100 transition-all hover:scale-110 duration-500" 
                />
            </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        
        {/* Info Izquierda */}
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3 leading-tight">{hotel.titulo}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm md:text-base">
                <span className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                    <MapPin size={16}/> {hotel.ubicacion || 'Santa Marta'}
                </span>
                <span className="flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full font-medium">
                    <Star size={16} className="fill-yellow-500 text-yellow-500"/> {hotel.calificacion || '4.8'}
                </span>
            </div>
          </div>

          <div className="prose prose-lg text-gray-600">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{t('details.description')}</h3>
            <p className="leading-relaxed">{descriptionText}</p>
          </div>

          <div className="border-t border-b border-gray-100 py-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{t('details.services')}</h3>
            <div className="flex flex-wrap gap-4 md:gap-8">
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl">
                  <Wifi className="text-blue-600" size={24}/>
                  <span className="font-semibold text-gray-700">{t('details.wifi')}</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl">
                  <Wind className="text-blue-600" size={24}/>
                  <span className="font-semibold text-gray-700">{t('details.ac')}</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl">
                  <Waves className="text-blue-600" size={24}/>
                  <span className="font-semibold text-gray-700">{t('details.pool')}</span>
                </div>
            </div>
          </div>
        </div>

        {/* Tarjeta Derecha */}
        <div className="w-full md:w-[350px] flex-shrink-0 sticky top-24 z-10">
            <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                            {t('details.price_night')}
                        </p>
                        <p className="text-3xl font-extrabold text-gray-900">{precio}</p>
                    </div>
                </div>
                <button className="w-full bg-[#117e76] hover:bg-[#0f6b64] text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:shadow-[#117e76]/40 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mb-4">
                    {t('details.book_now')}
                </button>
                <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    <span>{t('details.no_charge')}</span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetail;