import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react'; // Asegúrate de tener instalada la librería lucide-react

// Usamos 'export const' para coincidir con la importación con llaves { } en tu App.jsx
export const ForgotPasswordModal = ({ isOpen, onClose, showToast }) => {
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica real de envío de correo
    showToast(`Hemos enviado un enlace de recuperación a ${email}`, 'success');
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transform scale-100 transition-all">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
            <Lock size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Recuperar Contraseña</h3>
          <p className="text-sm text-gray-500 mt-2">Ingresa tu correo y te enviaremos las instrucciones.</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-500 mb-1">Email Registrado</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                placeholder="ejemplo@correo.com" 
              />
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 font-medium transition-colors">
              Cancelar
            </button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-md transition-colors">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;