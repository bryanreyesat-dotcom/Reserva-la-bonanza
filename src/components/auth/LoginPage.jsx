import React, { useState } from 'react';
import { Briefcase, Building } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import Toast from '../ui/Toast';
import fondoLogin from "../../assets/hero_hg.jpg"; // Ajusta esta ruta si tu imagen se llama diferente

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
        {/* Panel Izquierdo */}
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

        {/* Panel Derecho */}
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

export default LoginPage;