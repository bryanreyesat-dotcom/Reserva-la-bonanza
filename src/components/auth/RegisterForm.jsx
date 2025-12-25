import React, { useState } from 'react';
import { Briefcase, Building } from 'lucide-react'; 

const RegisterForm = ({ onRegisterSuccess }) => {
  const [role, setRole] = useState('client');
  const [formData, setFormData] = useState({ name: '', lastname: '', email: '', password: '', companyName: '', nit: '' });
  
  // 1. CAMBIO: Nuevo estado para el Checkbox de Términos
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 2. CAMBIO: Validación de seguridad. Si no aceptó términos, no hace nada.
    if (!acceptedTerms) return; 
    
    onRegisterSuccess({ ...formData, role });
  };

  return (
    <div className="animate-in slide-in-from-right fade-in duration-300">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Crear Cuenta</h3>
      <p className="text-sm text-gray-500 mb-6">Selecciona cómo quieres usar la plataforma</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Selector de Rol (Sin cambios aquí) */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <label className={`cursor-pointer relative p-3 border rounded-lg text-center transition-all ${role === 'client' ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500' : 'hover:bg-gray-50'}`}>
            <input type="radio" name="role" value="client" checked={role === 'client'} onChange={() => setRole('client')} className="sr-only" />
            <Briefcase className="mx-auto mb-1" size={20} />
            <span className="text-xs font-semibold">Soy Viajero</span>
          </label>

          <label className={`cursor-pointer relative p-3 border rounded-lg text-center transition-all ${role === 'hotel' ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500' : 'hover:bg-gray-50'}`}>
            <input type="radio" name="role" value="hotel" checked={role === 'hotel'} onChange={() => setRole('hotel')} className="sr-only" />
            <Building className="mx-auto mb-1" size={20} />
            <span className="text-xs font-semibold">Soy Hotel</span>
          </label>
        </div>

        {/* 3. CAMBIO: LÓGICA DE CAMPOS DINÁMICOS 
            Si el rol es 'client' mostramos Nombre/Apellido.
            Si es 'hotel' mostramos Nombre Empresa/NIT. 
        */}
        {role === 'client' ? (
          // --- FORMULARIO PARA VIAJEROS ---
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Nombre</label>
              <input type="text" name="name" required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Tu nombre" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Apellido</label>
              <input type="text" name="lastname" required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Tus apellidos" />
            </div>
          </div>
        ) : (
          // --- FORMULARIO PARA HOTELES (NUEVO) ---
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">Nombre del Establecimiento</label>
              <div className="relative">
                 <Building className="absolute left-3 top-2.5 text-gray-400" size={18} />
                 <input type="text" name="companyName" required onChange={handleChange} className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej: Hotel Gran Paraíso" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">NIT / RUT (Identificación Tributaria)</label>
              <input type="text" name="nit" required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej: 900.123.456-7" />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Email {role === 'hotel' ? 'Corporativo' : ''}</label>
          <input 
            type="email" 
            name="email"
            required 
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder={role === 'hotel' ? "reservas@tuhotel.com" : "correo@ejemplo.com"}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Contraseña</label>
          <input 
            type="password" 
            name="password"
            required 
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder="Crear contraseña"
          />
        </div>

        {/* 4. CAMBIO: CHECKBOX DE TÉRMINOS Y CONDICIONES (OBLIGATORIO) */}
        <div className="flex items-start gap-2 pt-2">
            <input 
                type="checkbox" 
                id="terms" 
                required
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
            />
            <label htmlFor="terms" className="text-xs text-gray-500 leading-tight cursor-pointer">
                Acepto los <a href="#" className="text-blue-600 hover:underline">Términos y Condiciones</a> y la <a href="#" className="text-blue-600 hover:underline">Política de Privacidad</a> de ReservaLaBonanza.
            </label>
        </div>

        <button 
          type="submit" 
          // 5. CAMBIO: Deshabilitamos el botón si no ha aceptado términos
          disabled={!acceptedTerms}
          className={`w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-lg shadow-md transition-all mt-2 ${!acceptedTerms ? 'opacity-50 cursor-not-allowed' : 'transform active:scale-95'}`}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;