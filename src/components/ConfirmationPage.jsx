import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, Calendar, Users, Home, Download } from 'lucide-react';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Recuperamos los datos que nos envió la página anterior
  const data = location.state || {};
  const { nombre, apellido, propertyName, total, nights, startDate, endDate, cleaning, taxi } = data;

  // Si alguien entra directo a esta página sin reservar, lo mandamos al inicio
  if (!location.state) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">⚠️ No hay reserva activa</h2>
        <button onClick={() => navigate('/')} className="bg-indigo-600 text-white px-6 py-2 rounded-full">Ir al Inicio</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-xl mx-auto">
        
        {/* TARJETA DE ÉXITO */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Cabecera Verde */}
          <div className="bg-green-50 p-8 text-center border-b border-green-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-black text-gray-800 mb-2">¡Reserva Exitosa!</h1>
            <p className="text-gray-600">Ya le avisamos al anfitrión que vas en camino.</p>
          </div>

          {/* Cuerpo del Ticket */}
          <div className="p-8 space-y-6">
            
            {/* Detalles Principales */}
            <div className="text-center pb-6 border-b border-gray-100 border-dashed">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">CÓDIGO DE RESERVA</p>
              <p className="text-4xl font-mono font-bold text-indigo-600 tracking-wider">#BKG-{Math.floor(Math.random()*10000)}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="text-gray-400 mt-1" size={20}/>
                <div>
                  <p className="text-sm text-gray-400 font-bold uppercase">Propiedad</p>
                  <p className="font-bold text-gray-800 text-lg">{propertyName || "Propiedad Exclusiva"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Calendar className="text-gray-400 mt-1" size={20}/>
                <div>
                  <p className="text-sm text-gray-400 font-bold uppercase">Fechas</p>
                  <p className="font-bold text-gray-800">
                    {startDate ? new Date(startDate).toLocaleDateString() : 'N/A'} — {endDate ? new Date(endDate).toLocaleDateString() : 'N/A'}
                  </p>
                  <p className="text-sm text-gray-500">Duration: {nights} noches</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="text-gray-400 mt-1" size={20}/>
                <div>
                  <p className="text-sm text-gray-400 font-bold uppercase">Huésped Titular</p>
                  <p className="font-bold text-gray-800 capitalize">{nombre} {apellido}</p>
                </div>
              </div>
            </div>

            {/* Resumen de Pago */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2 border-b border-gray-200 pb-2">Resumen de Pago</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Hospedaje</span>
                  <span>Incluido</span>
                </div>
                {cleaning && (
                  <div className="flex justify-between text-indigo-600">
                    <span>+ Limpieza</span>
                    <span>Pagado</span>
                  </div>
                )}
                {taxi && (
                  <div className="flex justify-between text-indigo-600">
                    <span>+ Taxi</span>
                    <span>Pagado</span>
                  </div>
                )}
                <div className="flex justify-between font-black text-gray-900 text-lg pt-2 border-t border-gray-200 mt-2">
                  <span>Total Pagado</span>
                  <span>${total?.toLocaleString()}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Botones de Acción */}
          <div className="p-4 bg-gray-50 border-t border-gray-100 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <Download size={18}/> Descargar PDF
            </button>
            <button onClick={() => navigate('/')} className="flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
              <Home size={18}/> Volver al Inicio
            </button>
          </div>

        </div>
        
        <p className="text-center text-gray-400 text-xs mt-8">
          Se ha enviado una copia de este recibo a tu correo electrónico.
        </p>

      </div>
    </div>
  );
};

export default ConfirmationPage;