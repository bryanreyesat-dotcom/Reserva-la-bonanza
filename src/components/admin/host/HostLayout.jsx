import React, { useState } from 'react';
import { LayoutDashboard, BedDouble, CalendarDays, LogOut } from 'lucide-react';

// Importación de Componentes
import HostDashboard from './HostDashboard';
import MyRooms from './MyRooms';
import CreateRoomForm from './CreateRoomForm';

// Importación de Logo
// Asegúrate de que la ruta sea correcta según dónde guardaste la imagen
import logo from '../../../assets/logo-bonanza.jpeg'; 

const HostLayout = ({ session, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const user = session?.user;

  // Lista de pestañas del menú secundario
  const menuItems = [
    { id: 'dashboard', label: 'Resumen', icon: LayoutDashboard },
    { id: 'rooms', label: 'Habitaciones', icon: BedDouble },
    { id: 'reservations', label: 'Reservas', icon: CalendarDays },
  ];

  // Lógica para decidir qué pantalla mostrar
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': 
        // Pasamos setActiveTab para que los botones del dashboard puedan cambiar la pestaña
        return <HostDashboard user={user} onChangeTab={setActiveTab} />;
      
      case 'create-room':
        // Mostramos el formulario nuevo
        return <CreateRoomForm 
                  onCancel={() => setActiveTab('dashboard')} 
                  onSave={() => {
                      // Aquí iría la lógica de guardar en Supabase
                      alert('¡Habitación guardada correctamente!'); 
                      setActiveTab('rooms'); // Al guardar, nos manda a la lista
                  }} 
                />;

      case 'rooms': 
        return <MyRooms />;

      case 'reservations': 
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <CalendarDays size={48} className="text-gray-300 mb-4"/>
                <p className="text-xl font-medium text-gray-500">Panel de Reservas</p>
                <p className="text-sm text-gray-400">Próximamente podrás gestionar aquí las llegadas y salidas.</p>
            </div>
        );

      default: 
        return <HostDashboard user={user} onChangeTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* 1. ENCABEZADO PRINCIPAL (Marca y Logout) */}
      <header className="bg-white border-b border-gray-200 h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            
            {/* Logo y Nombre */}
            <div className="flex items-center gap-3">
                <img 
                  src={logo} 
                  alt="Reserva La Bonanza" 
                  className="h-14 w-auto object-contain" 
                />
                <span className="text-2xl font-bold text-gray-900 tracking-tight hidden sm:block">
                    Reserva <span className="text-blue-600">La Bonanza</span>
                </span>
            </div>

            {/* Información Usuario + Botón Salir */}
            <div className="flex items-center gap-6">
                <div className="hidden md:block text-right">
                    <p className="text-sm font-medium text-gray-900">
                        {user?.email}
                    </p>
                    <p className="text-xs text-gray-500">Panel de Anfitrión</p>
                </div>
                
                <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

                <button 
                    onClick={onLogout} 
                    className="flex items-center gap-2 text-gray-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-all"
                    title="Cerrar Sesión"
                >
                    <span className="font-medium text-sm hidden sm:block">Salir</span>
                    <LogOut size={20} />
                </button>
            </div>
        </div>
      </header>

      {/* 2. BARRA DE HERRAMIENTAS (Pestañas) */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 h-14 items-center overflow-x-auto no-scrollbar">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`inline-flex items-center gap-2 px-1 h-full border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${
                                isActive 
                                ? 'border-blue-600 text-blue-600' 
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <Icon size={18} />
                            {item.label}
                        </button>
                    );
                })}
            </div>
        </div>
      </div>
      
      {/* 3. CONTENIDO DINÁMICO */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default HostLayout;