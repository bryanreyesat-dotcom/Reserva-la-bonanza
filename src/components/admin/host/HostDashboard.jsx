import React from 'react';
import { Plus, TrendingUp, Building, Users } from 'lucide-react';

const HostDashboard = ({ user, onChangeTab }) => {
  return (
    <div className="px-4 py-4 sm:px-0">
      
      {/* Encabezado de Bienvenida */}
      <div className="mb-8 flex justify-between items-end">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Hola, {user?.email?.split('@')[0]} 👋</h1>
            <p className="text-gray-500 mt-1">Aquí tienes el resumen de tus propiedades hoy.</p>
        </div>
        <button 
    onClick={() => onChangeTab('create-room')} // <--- IMPORTANTE: 'create-room'
    className="hidden sm:flex ..."
    >
     ...
     </button>
      </div>

      {/* Tarjetas de Estadísticas (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Ganancias */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp size={48} className="text-green-600"/></div>
            <p className="text-sm font-medium text-gray-500">Ganancias del Mes</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">$0.00</h3>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 mt-4">
                +0% vs mes pasado
            </span>
        </div>

        {/* Card 2: Reservas Activas */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Users size={48} className="text-blue-600"/></div>
            <p className="text-sm font-medium text-gray-500">Reservas Activas</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">0</h3>
            <p className="text-xs text-gray-400 mt-4">Sin reservas pendientes</p>
        </div>

        {/* Card 3: Mis Hoteles */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group cursor-pointer hover:border-blue-200 transition" onClick={() => onChangeTab('properties')}>
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition"><Building size={48} className="text-purple-600"/></div>
            <p className="text-sm font-medium text-gray-500">Mis Hoteles</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">0</h3>
            <p className="text-xs text-blue-600 mt-4 font-medium flex items-center gap-1">Registrar propiedad +</p>
        </div>
      </div>

      {/* Sección "Empty State" (Cuando no hay hoteles) */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building size={32} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Aún no tienes propiedades registradas</h3>
        <p className="text-gray-500 max-w-sm mx-auto mt-2 mb-8">
            Empieza a ganar dinero publicando tu primer hotel, cabaña o apartamento en La Bonanza.
        </p>
        <button 
    onClick={() => onChangeTab('create-room')} // <--- IMPORTANTE: 'create-room'
    className="inline-flex items-center gap-2 ..."
    >
     ...
     </button>
      </div>

    </div>
  );
};

export default HostDashboard;