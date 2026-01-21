import React, { useEffect, useState } from 'react';
import { supabase } from '../../backend/supabaseClient';
import PropertyCard from './PropertyCard';
import { Link } from 'react-router-dom';
// 1. IMPORTAMOS LA FLECHA
import { ArrowLeft } from 'lucide-react';

const GridAlojamientos = ({ limit }) => {
  const [alojamientos, setAlojamientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlojamientos = async () => {
      try {
        setLoading(true);
        let query = supabase.from('alojamientos').select('*');

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) throw error;
        setAlojamientos(data);
      } catch (error) {
        console.error("Error cargando alojamientos:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlojamientos();
  }, [limit]);

  if (loading) return <div className="text-center py-20">Cargando...</div>;
  if (error) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      
      {/* 2. BOTÓN DE VOLVER (Solo se muestra si NO hay límite, o sea, en /propiedades) */}
      {!limit && (
        <div className="mb-8"> {/* Un poco más de margen abajo */}
          <Link 
            to="/" 
            // Usamos 'group' para que el hover del contenedor afecte al icono y al texto
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white border-2 border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300 ease-in-out cursor-pointer"
          >
            {/* El icono se mueve a la izquierda (-translate-x-1) y cambia de color */}
            <ArrowLeft 
              size={20} 
              className="text-gray-400 group-hover:text-blue-600 transition-transform duration-300 group-hover:-translate-x-1" 
            />
            {/* El texto se vuelve un poco más oscuro y azul */}
            <span className="font-bold text-sm text-gray-600 group-hover:text-blue-800 transition-colors uppercase tracking-wider">
              Volver al Inicio
            </span>
          </Link>
        </div>
      )}

      {/* Título */}
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        {limit ? "Destacados" : "Todos nuestros Alojamientos"}
      </h2>
      
      {/* Grid de Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {alojamientos.map((hotel) => (
          <PropertyCard 
            key={hotel.id} 
            data={hotel} 
          />
        ))}
      </div>

      {/* Botón "Ver más" (Solo se muestra si HAY límite, o sea, en el Home) */}
      {limit && (
        <div className="text-center">
          <Link 
            to="/propiedades" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg"
          >
            Ver todas las propiedades
          </Link>
        </div>
      )}
    </div>
  );
};

export default GridAlojamientos;