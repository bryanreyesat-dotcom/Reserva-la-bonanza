import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Blinds, Square } from 'lucide-react';
// 1. Importamos el hook
import { useLanguage } from '../../context/LanguageContext';

const MOCK_DB = [
  { email: 'admin@agencia.com', password: '123', role: 'admin', name: 'Dueño Agencia' },
  { email: 'hotel@paradise.com', password: '123', role: 'hotel', name: 'Hotel Paradise' },
  { email: 'juan@gmail.com', password: '123', role: 'client', name: 'Juan Viajero' },
  { email: 'vip@gold.com', password: '123', role: 'client_vip', name: 'Sr. Gold VIP' }
];

const LoginForm = ({ onLoginSuccess, onForgotPassword, showToast }) => {
  // 2. Activamos la traducción
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
        const user = MOCK_DB.find(u => u.email === formData.email && u.password === formData.password);
        
        if (user) {
            onLoginSuccess(user);
        } else {
            // 3. CAMBIO CLAVE: Usamos la traducción para el mensaje de error
            showToast(t('auth.error_key'), 'error');
            setIsLoading(false);
        }
    }, 1500);
  };

  return (
    <div className="animate-in slide-in-from-left fade-in duration-300">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        {t('auth.login_title')}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Input Email */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            {t('auth.email_label')}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
              placeholder={t('auth.email_ph')} 
            />
          </div>
        </div>
        
        {/* Input Password con PERSIANA */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            {t('auth.password_label')}
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type={showPassword ? "text" : "password"} 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required 
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
              placeholder={t('auth.password_ph')} 
            />
            
            {/* BOTÓN PERSIANA */}
            <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-blue-600 focus:outline-none transition-colors"
                // 4. CAMBIO: Tooltips traducidos
                title={showPassword ? t('auth.tooltip_hide') : t('auth.tooltip_show')}
            >
                {showPassword ? <Square size={18} strokeWidth={1.5} /> : <Blinds size={18} strokeWidth={1.5} />}
            </button>
          </div>
          
          <div className="flex justify-end mt-1">
            <button 
              type="button" 
              onClick={onForgotPassword} 
              className="text-xs text-blue-600 hover:underline hover:text-blue-800 transition-colors"
            >
              {t('auth.forgot_pass')}
            </button>
          </div>
        </div>

        {/* Botón Submit */}
        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all transform flex justify-center items-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
        >
          {isLoading ? (
            <span>{t('auth.btn_validating')}</span>
          ) : (
            <>
                <span>{t('auth.btn_enter')}</span>
                <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
      
      {/* Social y Footer */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-4 text-xs text-gray-400 font-medium">
            {t('auth.or_continue')}
        </span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Google
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="Facebook" />
            Facebook
        </button>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">
            {t('auth.secure_text')}
        </p>
      </div>
    </div>
  );
};

export default LoginForm;