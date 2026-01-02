import React, { useState, useEffect } from 'react';
import { Server, CheckCircle, XCircle, Activity } from 'lucide-react';

const TestBackend = () => {
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');
  const [cotizacion, setCotizacion] = useState(null);

  // URL de tu backend (Asegúrate de que coincida con el puerto de tu servidor Node)
  const BACKEND_URL = 'http://localhost:5000';

  const checkConnection = async () => {
    setStatus('loading');
    setCotizacion(null);
    try {
      // 1. Intenta conectar con la ruta raíz '/'
      const response = await fetch(`${BACKEND_URL}/`);
      if (!response.ok) throw new Error('Error en la respuesta');
      
      const text = await response.text();
      setMessage(text);
      setStatus('success');

      // 2. Si conecta, intentamos probar la lógica de cotización (POST)
      // Simulamos enviar datos de una reserva
      const quoteResponse = await fetch(`${BACKEND_URL}/api/reservas/cotizar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelId: 1,
          usuarioId: 'test-user',
          fechaInicio: '2023-12-01',
          fechaFin: '2023-12-04'
        })
      });
      
      const quoteData = await quoteResponse.json();
      if(quoteData.success) {
        setCotizacion(quoteData.cotizacion);
      }

    } catch (error) {
      console.error("Error conectando:", error);
      setStatus('error');
      setMessage('No se pudo conectar con el Backend (localhost:5000)');
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md border border-gray-100 mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Server size={20} className="text-indigo-600" />
          Estado del Backend
        </h2>
        <button 
          onClick={checkConnection}
          className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition"
        >
          Reintentar
        </button>
      </div>

      {/* Indicador de Estado Principal */}
      <div className={`p-4 rounded-lg flex items-center gap-3 ${
        status === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
        status === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
        'bg-blue-50 text-blue-800 border border-blue-200'
      }`}>
        {status === 'loading' && <Activity className="animate-pulse" />}
        {status === 'success' && <CheckCircle />}
        {status === 'error' && <XCircle />}
        
        <div>
          <p className="font-bold text-sm">
            {status === 'loading' ? 'Conectando...' : 
             status === 'success' ? 'Conectado Exitosamente' : 
             'Error de Conexión'}
          </p>
          <p className="text-xs opacity-80">{message}</p>
        </div>
      </div>

      {/* Resultado de la Prueba de Lógica (Cotización) */}
      {status === 'success' && cotizacion && (
        <div className="mt-4 border-t pt-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Prueba de Lógica de Negocio (Node.js)</h3>
          <div className="bg-gray-50 p-3 rounded text-sm space-y-1 font-mono text-gray-700">
            <div className="flex justify-between">
              <span>Precio Base:</span>
              <span>${cotizacion.precioNoche.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-indigo-600">
              <span>Temporada Alta (+20%):</span>
              <span>{cotizacion.cargos.temporadaAlta ? 'SÍ' : 'NO'}</span>
            </div>
            <div className="flex justify-between font-bold border-t border-gray-200 pt-1 mt-1">
              <span>Total Calculado:</span>
              <span>${cotizacion.totalPagar.toLocaleString()}</span>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 text-center">
            Este cálculo fue realizado por el servidor, no por el frontend.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 text-xs text-gray-500">
          <p className="font-bold">Posibles soluciones:</p>
          <ul className="list-disc pl-4 mt-1 space-y-1">
            <li>Asegúrate de que la terminal del backend esté corriendo (`npm start`).</li>
            <li>Verifica que el puerto sea el 5000.</li>
            <li>Revisa que no haya errores en la consola del backend.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TestBackend;