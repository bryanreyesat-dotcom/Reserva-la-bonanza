import React from 'react';
import { LayoutDashboard, LogOut, User } from 'lucide-react';

const AdminPanel = ({ session, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-blue-900 text-white p-2 rounded-lg">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Panel de Socios</h1>
            <p className="text-xs text-gray-500 uppercase tracking-wider">La Bonanza Admin</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900">Socio Activo</p>
            <p className="text-xs text-gray-500">{session.user.email}</p>
          </div>
          <button onClick={onLogout} className="flex items-center gap-2 text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg font-medium transition">
            <LogOut size={18} /> Salir
          </button>
        </div>
      </nav>
      <main className="flex-1 p-8 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 max-w-3xl mx-auto mt-10">
            <div className="w-20 h-20 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <User size={40} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Bienvenido al Centro de Control</h2>
            <p className="text-gray-500 text-lg mb-8">
              Has ingresado como Super Socio.<br/>
              Aquí podrás gestionar propiedades y reservas.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;