import React, { useState, useEffect } from 'react';

const BackendStatus = () => {
  const [status, setStatus] = useState('cargando'); // 'cargando', 'exito', 'error'
  const [mensaje, setMensaje] = useState('');

  // Intentamos conectar con tu servidor local
  const checkConnection = async () => {
    try {
      const response = await fetch('http://localhost:5000/');
      if (response.ok) {
        const text = await response.text();
        setMensaje(text);
        setStatus('exito');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error conectando al backend:", error);
      setStatus('error');
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  // Si hay error, mostramos una alerta roja discreta
  if (status === 'error') {
    return (
      <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg z-50 flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        <div>
          <p className="font-bold text-sm">Sin conexión al Backend</p>
          <p className="text-xs">Asegúrate de que la terminal negra esté corriendo.</p>
        </div>
      </div>
    );
  }

  // Si es exitoso, mostramos una alerta verde
  if (status === 'exito') {
    return (
      <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg z-50 flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <div>
          <p className="font-bold text-sm">Backend Conectado 🚀</p>
          <p className="text-xs">{mensaje}</p>
        </div>
      </div>
    );
  }

  return null; // No mostrar nada mientras carga
};

export default BackendStatus;