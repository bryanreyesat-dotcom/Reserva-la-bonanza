import React, { useEffect, useState } from 'react';
import { supabase } from '../../backend/supabaseClient'; // Tu archivo de conexión
import PropertyCard from './PropertyCard'; // Tu tarjeta

const GridAlojamientos = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para pedir los datos a Supabase
    const fetchAlojamientos = async () => {
      try {
        setLoading(true);
        // "Dame todo lo que haya en la tabla alojamientos"
        const { data, error } = await supabase
          .from('alojamientos')
          .select('*');

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
  }, []);

  // ESTADOS DE CARGA Y ERROR
  if (loading) return <div className="text-center py-20">Cargando hoteles...</div>;
  if (error) return <div className="text-center text-red-500 py-20">Error: {error}</div>;

  // RENDERIZADO DE LA LISTA
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Nuestros Alojamientos</h2>
      
      {/* AQUÍ ES DONDE PASAMOS LA "DATA" CORRECTAMENTE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {alojamientos.map((hotel) => (
          <PropertyCard 
            key={hotel.id} 
            data={hotel} // <--- AQUÍ está la clave: pasamos el objeto completo como "data"
          />
        ))}
      </div>
    </div>
  );
};

export default GridAlojamientos;