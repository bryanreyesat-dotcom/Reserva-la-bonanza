import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';

 import logo from '../assets/logo-bonanza.jpg';

const Navbar = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 1. NAVBAR FIJO (Fixed) */}
      {/* Usamos 'fixed' para que siempre esté arriba. 'bg-white' para que no sea transparente. */}
      <nav className="fixed top-0 w-full z-50 bg-white shadow-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* CAMBIO IMPORTANTE: h-16 en móvil (más delgado) y md:h-20 en PC */}
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* --- A. LOGO --- */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg">
              <img 
                src={logo} 
                alt="Logo Reserva Bonanza" 
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover shadow-lg" 
              />
              </div>
              {/* Texto del logo ajustado ligeramente en móvil */}
              <span className="font-bold text-lg md:text-xl text-gray-800 tracking-tight">Reserva<span className="text-indigo-600">Bonanza</span></span>
            </Link>

            {/* --- B. MENÚ DE ESCRITORIO --- */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition">Inicio</Link>
              <Link to="/propiedades" className="text-gray-600 hover:text-indigo-600 font-medium transition">Propiedades</Link>
              
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
                    Hola, {user.name}
                  </span>
                  <button onClick={onLogout} className="text-gray-500 hover:text-red-500 transition" title="Cerrar sesión">
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link to="/login">
                  <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 transform hover:-translate-y-0.5">
                    Iniciar Sesión
                  </button>
                </Link>
              )}
            </div>

            {/* --- C. BOTÓN HAMBURGUESA --- */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-indigo-600 focus:outline-none p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* --- D. MENÚ DESPLEGABLE MÓVIL --- */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">
                Inicio
              </Link>
              <Link to="/propiedades" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">
                Propiedades
              </Link>
              
              <div className="border-t border-gray-100 my-2 pt-2">
                {user ? (
                  <div className="space-y-3">
                     <div className="px-3 text-sm text-gray-500">Sesión iniciada como <span className="font-bold text-gray-800">{user.name}</span></div>
                     <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="w-full text-left px-3 py-2 text-red-600 font-medium hover:bg-red-50 rounded-md">
                       Cerrar Sesión
                     </button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 bg-indigo-600 text-white text-center rounded-lg font-medium hover:bg-indigo-700">
                    Iniciar Sesión
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 2. ESPACIADOR (Spacer) */}
      {/* Este div invisible empuja el contenido hacia abajo exactamente la altura del navbar.
          h-16 en móvil, h-20 en PC. Así tu frase NUNCA quedará oculta detrás del menú. */}
      <div className="h-16 md:h-20 bg-white"></div>
    </>
  );
};

export default Navbar;