import React from 'react';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';

const ErrorFriendly = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden text-center p-8 animate-in fade-in zoom-in duration-300">
        
        {/* Ícono animado */}
        <div className="mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10 text-orange-500" />
        </div>

        {/* Mensaje Principal */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          ¡Ups! Algo salió mal
        </h2>
        
        {/* Mensaje de Calma */}
        <p className="text-gray-500 mb-8 leading-relaxed">
          No te preocupes, no es culpa tuya. A veces nuestros servidores necesitan un respiro. 
          <br />
          <span className="font-semibold text-indigo-600 block mt-2">
            Ya hemos notificado a nuestro equipo técnico.
          </span>
        </p>

        {/* Botones de Acción */}
        <div className="space-y-3">
          {/* Botón 1: Recargar */}
          <button 
            onClick={() => window.location.reload()} 
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-200 hover:-translate-y-1"
          >
            <RefreshCw size={20} />
            Intentar de nuevo
          </button>

          {/* Botón 2: Volver al inicio (por si recargar no funciona) */}
          <button 
            onClick={() => window.location.href = '/'} 
            className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-50 font-medium py-3 px-6 rounded-xl transition-colors"
          >
            <Home size={20} />
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFriendly;