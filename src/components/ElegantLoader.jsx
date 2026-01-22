import React from 'react';

const ElegantLoader = () => {
  return (
    // 1. Contenedor principal: Ocupa toda la pantalla, centra todo y tiene un fondo semitransparente borroso
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm transition-all">
      
      <div className="relative flex flex-col items-center">
        {/* 2. La animación del Spinner */}
        {/* Círculo exterior (índigo claro) */}
        <div className="w-16 h-16 rounded-full border-4 border-indigo-200 animate-[spin_3s_linear_infinite]"></div>
        
        {/* Círculo interior (índigo fuerte, gira más rápido en sentido contrario) */}
        <div className="absolute top-0 w-16 h-16 rounded-full border-t-4 border-indigo-600 animate-[spin_1.5s_ease-in-out_infinite]"></div>
        
        {/* 3. Texto opcional elegante debajo */}
        <p className="mt-4 text-indigo-900 font-medium text-sm tracking-wider uppercase animate-pulse">
          Preparando tu experiencia...
        </p>
      </div>
    </div>
  );
};

export default ElegantLoader;