import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Briefcase, Building } from 'lucide-react'; 

// 1. IMPORTACIONES (Tus componentes reales)
import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import HeroSection from './components/HeroSection'; 
import FeaturedProperties from './components/FeacturedProperties';
import AllProperties from './components/AllProperties';

// Asegúrate de que esta ruta sea correcta o ajustala si está en otra carpeta
import fondoLogin from "./assets/hero_bg.jpg"; 

// 2. IMPORTACIONES DE AUTENTICACIÓN
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import { ForgotPasswordModal } from './components/auth/ForgotPasswordModal'; 
import Toast from './components/ui/Toast';

// ----------------------------------------------------------------------
// COMPONENTE LOGIN PAGE (Conector)
// ----------------------------------------------------------------------
const LoginPage = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 4000);
  };

  const handleLoginSuccess = (user) => {
    // PASO 7: Guardamos el usuario en el estado global
    onLogin(user); 

    let message = '';
    switch(user.role) {
        case 'admin': message = 'Bienvenido Jefe. Redirigiendo a Admin...'; break;
        case 'hotel': message = `Hola ${user.name}. Redirigiendo a Panel de Hoteles...`; break;
        case 'client_vip': message = `¡Hola VIP ${user.name}! Ofertas exclusivas...`; break;
        default: message = `Bienvenido ${user.name}. Buscando propiedades...`;
    }
    showToast(message, 'success');
  };
  
  return (
    <div className="flex-grow flex items-center justify-center p-4 relative" 
         style={{ 
             backgroundImage: `url(${fondoLogin})`, 
             backgroundSize: 'cover', 
             backgroundPosition: 'center' 
         }}>
       
       <div className="absolute inset-0 bg-black/40 z-0"></div>
       
       <div className="relative z-10 w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-2xl flex overflow-hidden shadow-2xl min-h-[550px]">
        {/* LADO IZQUIERDO */}
        <div className="hidden md:flex w-1/2 bg-blue-600 text-white flex-col justify-between p-10 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
             
             <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-2">Bienvenido</h2>
                <p className="text-blue-100">Accede a tu cuenta de viajero o gestiona tu hotel.</p>
             </div>

             <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full"><Briefcase size={20}/></div>
                    <span className="text-sm">Viajeros frecuentes</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full"><Building size={20}/></div>
                    <span className="text-sm">Gestión Hotelera</span>
                </div>
             </div>

             <div className="relative z-10 text-xs opacity-70">&copy; 2026 ReservaLaBonanza</div>
        </div>

        {/* LADO DERECHO */}
        <div className="w-full md:w-1/2 bg-white flex flex-col">
            <div className="flex w-full border-b border-gray-100">
                <button onClick={() => setActiveTab('login')} className={`flex-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}>Iniciar Sesión</button>
                <button onClick={() => setActiveTab('register')} className={`flex-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'register' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}>Registrarse</button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 relative">
                {activeTab === 'login' ? (
                    <LoginForm 
                        onLoginSuccess={handleLoginSuccess} 
                        onForgotPassword={() => setIsForgotModalOpen(true)} 
                        showToast={showToast} 
                    />
                ) : (
                    <RegisterForm 
                        onRegisterSuccess={(data) => showToast(`Registrado como: ${data.role === 'hotel' ? 'Hotel' : 'Viajero'}`, 'success')} 
                    />
                )}
            </div>
        </div>
       </div>

       <ForgotPasswordModal isOpen={isForgotModalOpen} onClose={() => setIsForgotModalOpen(false)} showToast={showToast} />
       <Toast show={toast.show} message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />
    </div>
  );
};

// ----------------------------------------------------------------------
// APP PRINCIPAL
// ----------------------------------------------------------------------
function App() {
  // PASO 7: Estado Global de Usuario
  const [user, setUser] = useState(null); 

  const handleLogout = () => setUser(null);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-800">
        
        {/* Pasamos 'user' al componente Navbar importado */}
        <Navbar user={user} onLogout={handleLogout} />

        <div className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <FeaturedProperties />
              </>
            } />
            
            <Route path="/propiedades" element={<AllProperties />} />
            
            {/* Pasamos 'setUser' al LoginPage */}
            <Route path="/login" element={<LoginPage onLogin={setUser} />} />
            
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;