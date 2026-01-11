/* ========================================================================
 * SECCIÓN 1: IMPORTACIONES
 * ======================================================================== */
import React, { useState } from 'react';
import { Briefcase, Building } from 'lucide-react'; 
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../../backend/supabaseClient';

/* ========================================================================
 * SECCIÓN 2: LÓGICA DEL COMPONENTE
 * ======================================================================== */
const RegisterForm = ({ onRegisterSuccess, showToast }) => {
  
  // 2.1 Hooks y Estados
  const { t } = useLanguage();
  const [role, setRole] = useState('client'); // 'client' | 'hotel'
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const [formData, setFormData] = useState({ 
    name: '', 
    lastname: '', 
    email: '', 
    password: '', 
    companyName: '', 
    nit: '' 
  });

  // 2.2 Manejadores (Handlers)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) return;
    setLoading(true);

    try {
        // A. Crear usuario en Supabase Auth (Correo y Contraseña)
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
        });

        if (authError) throw authError;

        if (authData.user) {
            // B. Preparar datos para la tabla pública 'profiles'
            const profileData = {
                id: authData.user.id, // Vinculamos con el ID de Auth
                role: role,
                full_name: role === 'client' ? `${formData.name} ${formData.lastname}` : null,
                company_name: role === 'hotel' ? formData.companyName : null,
                nit: role === 'hotel' ? formData.nit : null
            };

            // C. Insertar en la base de datos
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([profileData]);

            if (profileError) throw profileError;

            // D. Éxito
            if (showToast) showToast('¡Cuenta creada con éxito!', 'success');
            
            // Notificar al componente padre
            onRegisterSuccess({ ...formData, role });
        }

    } catch (error) {
        console.error("Error registro:", error.message);
        const msg = error.message === 'User already registered' ? 'El usuario ya está registrado' : error.message;
        
        if (showToast) {
            showToast(msg, 'error');
        } else {
            alert(msg);
        }
    } finally {
        setLoading(false);
    }
  };

/* ========================================================================
 * SECCIÓN 3: RENDERIZADO (JSX)
 * ======================================================================== */
  return (
    <div className="animate-in slide-in-from-right fade-in duration-300">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        {t('register.title')}
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        {t('register.subtitle')}
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Selector de Rol (Tabs Visuales) */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <label className={`cursor-pointer relative p-3 border rounded-lg text-center transition-all ${role === 'client' ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500' : 'hover:bg-gray-50'}`}>
            <input type="radio" name="role" value="client" checked={role === 'client'} onChange={() => setRole('client')} className="sr-only" />
            <Briefcase className="mx-auto mb-1" size={20} />
            <span className="text-xs font-semibold">
              {t('register.role_traveler')}
            </span>
          </label>

          <label className={`cursor-pointer relative p-3 border rounded-lg text-center transition-all ${role === 'hotel' ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500' : 'hover:bg-gray-50'}`}>
            <input type="radio" name="role" value="hotel" checked={role === 'hotel'} onChange={() => setRole('hotel')} className="sr-only" />
            <Building className="mx-auto mb-1" size={20} />
            <span className="text-xs font-semibold">
              {t('register.role_hotel')}
            </span>
          </label>
        </div>

        {/* CAMPOS DINÁMICOS SEGÚN ROL */}
        {role === 'client' ? (
          /* --- FORMULARIO PARA VIAJEROS --- */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                {t('register.name')}
              </label>
              <input type="text" name="name" required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t('register.name_ph')} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                {t('register.lastname')}
              </label>
              <input type="text" name="lastname" required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t('register.lastname_ph')} />
            </div>
          </div>
        ) : (
          /* --- FORMULARIO PARA HOTELES --- */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">
                {t('register.company_name')}
              </label>
              <div className="relative">
                  <Building className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <input type="text" name="companyName" required onChange={handleChange} className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t('register.company_ph')} />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">
                {t('register.nit')}
              </label>
              <input type="text" name="nit" required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t('register.nit_ph')} />
            </div>
          </div>
        )}

        {/* CAMPOS COMUNES (Email y Password) */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            {role === 'hotel' ? t('register.email_corp') : t('register.email')}
          </label>
          <input 
            type="email" 
            name="email"
            required 
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder={role === 'hotel' ? t('register.email_corp_ph') : t('register.email_ph')}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            {t('register.password')}
          </label>
          <input 
            type="password" 
            name="password"
            required 
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder={t('register.password_ph')}
          />
        </div>

        {/* CHECKBOX DE TÉRMINOS */}
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
                {t('register.accept_terms')} <a href="#" className="text-blue-600 hover:underline">{t('register.terms_link')}</a> {t('register.and')} <a href="#" className="text-blue-600 hover:underline">{t('register.privacy_link')}</a> {t('register.of_brand')}
            </label>
        </div>

        {/* BOTÓN DE REGISTRO */}
        <button 
          type="submit" 
          disabled={!acceptedTerms || loading}
          className={`w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-lg shadow-md transition-all mt-2 ${(!acceptedTerms || loading) ? 'opacity-50 cursor-not-allowed' : 'transform active:scale-95'}`}
        >
          {loading ? 'Creando cuenta...' : t('register.btn_register')}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;