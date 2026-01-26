import React from 'react';
import { Plus, Search, MoreVertical, BedDouble, User, DollarSign } from 'lucide-react';

const MyRooms = () => {
  // DATOS DE EJEMPLO (Simulando lo que vendrá de la Base de Datos)
  const habitaciones = [
    { id: 1, nombre: 'Apartamento 101', tipo: 'Suite', precio: 150000, estado: 'disponible', capacidad: 4 },
    { id: 2, nombre: 'Cabaña del Mar', tipo: 'Cabaña', precio: 250000, estado: 'ocupado', capacidad: 6 },
    { id: 3, nombre: 'Habitación Estándar', tipo: 'Doble', precio: 80000, estado: 'mantenimiento', capacidad: 2 },
  ];

  const getStatusColor = (estado) => {
    switch(estado) {
        case 'disponible': return 'bg-green-100 text-green-700 border-green-200';
        case 'ocupado': return 'bg-blue-100 text-blue-700 border-blue-200';
        case 'mantenimiento': return 'bg-orange-100 text-orange-700 border-orange-200';
        default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 sm:p-0">
      
      {/* Cabecera de la sección */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Mis Habitaciones</h2>
            <p className="text-gray-500 text-sm">Administra la disponibilidad y precios de tus unidades.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all hover:scale-105 active:scale-95">
            <Plus size={20} />
            <span>Nueva Habitación</span>
        </button>
      </div>

      {/* Barra de Filtros (Visual) */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex gap-4">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
                type="text" 
                placeholder="Buscar habitación..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
        <select className="border border-gray-200 rounded-lg px-4 py-2 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Todos los estados</option>
            <option>Disponibles</option>
            <option>Ocupados</option>
        </select>
      </div>

      {/* Lista de Habitaciones (Tarjetas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habitaciones.map((room) => (
            <div key={room.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5 relative group">
                
                {/* Menú de tres puntos (opciones) */}
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1">
                    <MoreVertical size={20} />
                </button>

                <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                        <BedDouble size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">{room.nombre}</h3>
                        <p className="text-sm text-gray-500">{room.tipo}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(room.estado)} uppercase tracking-wide`}>
                        {room.estado}
                    </span>
                    <div className="flex items-center text-gray-600 text-sm font-medium">
                        <DollarSign size={16} />
                        {room.precio.toLocaleString()} <span className="text-gray-400 font-normal ml-1">/noche</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <User size={16} />
                        <span>Max. {room.capacidad} pers.</span>
                    </div>
                    <button className="text-blue-600 font-medium hover:underline">Editar</button>
                </div>
            </div>
        ))}

        {/* Tarjeta para agregar nueva (Visual extra) */}
        <button className="border-2 border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all min-h-[180px]">
            <Plus size={32} className="mb-2" />
            <span className="font-medium">Agregar otra habitación</span>
        </button>
      </div>
    </div>
  );
};

export default MyRooms;