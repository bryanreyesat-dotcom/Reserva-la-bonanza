/* ========================================================================
 * SECCIÓN 1: IMPORTACIONES
 * ======================================================================== */
import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

/* ========================================================================
 * SECCIÓN 2: LÓGICA DEL COMPONENTE
 * ======================================================================== */
export const ForgotPasswordModal = ({ isOpen, onClose, showToast }) => {
  // 2.1 Hooks y Estados
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  // 2.2 Control de Visibilidad (Early Return)
  if (!isOpen) return null;

  // 2.3 Manejadores de Eventos (Handlers)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de envío
    showToast(`${t('recover.toast_success')} ${email}`, 'success');
    setEmail('');
    onClose();
  };

/* ========================================================================
 * SECCIÓN 3: RENDERIZADO (JSX)
 * ======================================================================== */
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transform scale-100 transition-all">
        
        {/* Cabecera del Modal (Icono y Título) */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
            <Lock size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            {t('recover.title')}
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            {t('recover.desc')}
          </p>
        </div>
        
        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-500 mb-1">
                {t('recover.label_email')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                placeholder={t('recover.placeholder')} 
              />
            </div>
          </div>
          
          {/* Botones de Acción */}
          <div className="flex space-x-3">
            <button 
                type="button" 
                onClick={onClose} 
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              {t('recover.btn_cancel')}
            </button>
            <button 
                type="submit" 
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-md transition-colors"
            >
              {t('recover.btn_send')}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ForgotPasswordModal;