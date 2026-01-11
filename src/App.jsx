/* ========================================================================
 * SECCIÓN 1: IMPORTACIONES Y LIBRERÍAS
 * ======================================================================== */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LayoutDashboard, LogOut, User, Briefcase, Building } from 'lucide-react';

/* ========================================================================
 * SECCIÓN 2: COMPONENTES LOCALES Y RECURSOS
 * ======================================================================== */
// Contextos
import { LanguageProvider } from './context/LanguageContext';

// Componentes Públicos (Web)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import FeaturedProperties from './components/FeacturedProperties';
import AllProperties from './components/AllProperties';

// Componentes Privados (App Interna)
import Dashboard from './components/Dashboard';

// Autenticación
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import { ForgotPasswordModal } from './components/auth/ForgotPasswordModal';
import Toast from './components/ui/Toast';

// Backend y Assets
import { supabase } from '../backend/supabaseClient';
import fondoLogin from "./assets/hero_bg.jpg";

/* ========================================================================
 * SECCIÓN 3: CONFIGURACIÓN GLOBAL
 * ======================================================================== */
const SOCIOS_EMAILS = [
  'toncelbryan17@gmail.com',
  'luboguarnizojoserafa@gmail.com',
  'labonanzar@gmail.com'
];

/* ========================================================================
 * SECCIÓN 4: SUB-COMPONENTES INTERNOS (Admin & Login)
 * ======================================================================== */

// --- 4.1 COMPONENTE: PANEL DE ADMIN (SOCIOS) ---
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

// --- 4.2 COMPONENTE: PÁGINA DE LOGIN/REGISTRO ---
const LoginPage = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 4000);
  };

  const handleLoginSuccess = (session) => {
    const userToPass = session?.user || session;
    if (userToPass) {
        onLogin({ user: userToPass });
    }
    showToast('Bienvenido', 'success');
  };
  
  return (
    <div className="flex-grow flex items-center justify-center p-4 relative" style={{ backgroundImage: `url(${fondoLogin})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
       <div className="absolute inset-0 bg-black/40 z-0"></div>
       <div className="relative z-10 w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-2xl flex overflow-hidden shadow-2xl min-h-[550px]">
        {/* Panel Izquierdo (Decorativo) */}
        <div className="hidden md:flex w-1/2 bg-blue-600 text-white flex-col justify-between p-10 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
             
             <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-2">Bienvenido</h2>
                <p className="text-blue-100">Inicia sesión para continuar</p>
             </div>
             
             <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3"><div className="bg-white/20 p-2 rounded-full"><Briefcase size={20}/></div><span className="text-sm">Viajeros</span></div>
                <div className="flex items-center gap-3"><div className="bg-white/20 p-2 rounded-full"><Building size={20}/></div><span className="text-sm">Hoteles</span></div>
             </div>
             <div className="relative z-10 text-xs opacity-70 mt-auto">© 2024 La Bonanza</div>
        </div>

        {/* Panel Derecho (Formularios) */}
        <div className="w-full md:w-1/2 bg-white flex flex-col">
            <div className="flex w-full border-b border-gray-100">
                <button onClick={() => setActiveTab('login')} className={`flex-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}>Iniciar Sesión</button>
                <button onClick={() => setActiveTab('register')} className={`flex-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'register' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}>Registrarse</button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 relative">
                {activeTab === 'login' ? (
                    <LoginForm onLoginSuccess={handleLoginSuccess} onForgotPassword={() => setIsForgotModalOpen(true)} showToast={showToast} />
                ) : (
                    <RegisterForm onRegisterSuccess={() => showToast('Registro exitoso', 'success')} />
                )}
            </div>
        </div>
       </div>
       <ForgotPasswordModal isOpen={isForgotModalOpen} onClose={() => setIsForgotModalOpen(false)} showToast={showToast} />
       <Toast show={toast.show} message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />
    </div>
  );
};

/* ========================================================================
 * SECCIÓN 5: COMPONENTE PRINCIPAL (APP)
 * ======================================================================== */
function App() {
  
  // 5.1 ESTADOS Y VARIABLES
  const [user, setUser] = useState(null); 
  const [session, setSession] = useState(null); 
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // 5.2 LÓGICA DE CONTROL (Funciones)
  const actualizarEstado = (newSession) => {
    if (!newSession?.user?.email) {
      setSession(null);
      setUser(null);
      setIsAdmin(false);
      return;
    }
    setSession(newSession);
    setUser(newSession.user);

    const emailUsuario = newSession.user.email.toLowerCase().trim();
    const esSocio = SOCIOS_EMAILS.includes(emailUsuario);
    setIsAdmin(esSocio);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setIsAdmin(false);
    window.location.href = '/'; 
  };

  // 5.3 EFECTOS (Carga inicial y cambios de sesión)
  useEffect(() => {
    const obtenerSesion = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) console.log("Error sesión:", error);
      actualizarEstado(session);
      setLoading(false); 
    };
    
    obtenerSesion();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      actualizarEstado(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 5.4 RENDERIZADO DE VISTAS (Lo que ve el usuario)
  
  // Pantalla de Carga
  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

  // VISTA A: PANEL ADMIN (Socios)
  if (session && isAdmin) {
    return (
        <LanguageProvider>
           <AdminPanel session={session} onLogout={handleLogout} />
        </LanguageProvider>
    );
  }

  // VISTA B: DASHBOARD PERSONAL (Usuarios/Hoteles)
  if (session && !isAdmin) {
    return (
      <LanguageProvider>
         <Dashboard session={session} />
      </LanguageProvider>
    );
  }

  // VISTA C: PÁGINA PÚBLICA (Sin loguear)
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-800">
          <Navbar user={session?.user} onLogout={handleLogout} />
          <div className="flex-grow flex flex-col">
            <Routes>
              <Route path="/" element={<><HeroSection /><FeaturedProperties /></>} />
              <Route path="/propiedades" element={<AllProperties />} />
              <Route path="/login" element={<LoginPage onLogin={actualizarEstado} />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;