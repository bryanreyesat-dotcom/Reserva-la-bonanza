/* ========================================================================
 * SECCIÓN 1: IMPORTACIONES
 * ======================================================================== */
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../backend/supabaseClient';
import { LogOut, Building, MapPin, Calendar, DollarSign, User, Search } from 'lucide-react';

/* ========================================================================
 * SECCIÓN 2: LÓGICA DEL COMPONENTE
 * ======================================================================== */
const Dashboard = ({ session }) => {
  
  // 2.1 Estados
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2.2 Efecto: Cargar Perfil de Usuario
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error('Error cargando perfil:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (session) getProfile();
  }, [session]);

  // 2.3 Manejador: Cerrar Sesión
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  // 2.4 Renderizado de Carga (Spinner)
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

/* ========================================================================
 * SECCIÓN 3: RENDERIZADO (JSX)
 * ======================================================================== */
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* --- 3.1 BARRA DE NAVEGACIÓN (NAVBAR) --- */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div>
          <h1 className="text-xl font-bold text-blue-600">Reserva la Bonanza</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">
                {profile?.full_name || profile?.company_name}
            </p>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
                {profile?.role === 'hotel' ? 'Socio Hotelero' : 'Viajero'}
            </p>
          </div>
          
          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <User size={20} />
          </div>
          
          <button 
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
            title="Cerrar Sesión"
          >
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      {/* --- 3.2 CONTENIDO PRINCIPAL --- */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Saludo Personalizado */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl font-bold text-gray-800">
            Hola, <span className="text-blue-600">{profile?.role === 'hotel' ? profile?.company_name : profile?.full_name?.split(' ')[0]}</span> 👋
          </h2>
          <p className="text-gray-500 mt-1">
            {profile?.role === 'hotel' 
              ? 'Aquí tienes el resumen de tus propiedades hoy.' 
              : '¿A dónde te gustaría escapar hoy?'}
          </p>
        </div>

        {/* --- 3.3 VISTA CONDICIONAL: HOTELERO --- */}
        {profile?.role === 'hotel' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* KPIs / Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card: Ganancias */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">Ganancias del Mes</h3>
                  <div className="p-2 bg-green-50 text-green-600 rounded-lg"><DollarSign size={20}/></div>
                </div>
                <p className="text-2xl font-bold text-gray-800">$0.00</p>
                <span className="text-xs text-green-600 font-medium">+0% vs mes pasado</span>
              </div>
              
              {/* Card: Reservas */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">Reservas Activas</h3>
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Calendar size={20}/></div>
                </div>
                <p className="text-2xl font-bold text-gray-800">0</p>
                <span className="text-xs text-gray-400">Sin reservas pendientes</span>
              </div>

              {/* Card: Propiedades */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">Mis Hoteles</h3>
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Building size={20}/></div>
                </div>
                <p className="text-2xl font-bold text-gray-800">0</p>
                <button className="text-xs text-blue-600 font-medium hover:underline mt-1">Registrar propiedad +</button>
              </div>
            </div>

            {/* Empty State (Sin propiedades) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="max-w-md mx-auto">
                <Building className="mx-auto text-gray-300 mb-4" size={48} />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Aún no tienes propiedades registradas</h3>
                <p className="text-gray-500 mb-6 text-sm">Empieza a ganar dinero publicando tu primera habitación o hotel.</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                  Publicar mi primer hotel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- 3.4 VISTA CONDICIONAL: VIAJERO --- */}
        {profile?.role === 'client' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            
            {/* Buscador */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20}/>
                  <input type="text" placeholder="¿A dónde quieres ir?" className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"/>
                </div>
                <div className="flex-1 relative">
                  <Calendar className="absolute left-3 top-3.5 text-gray-400" size={20}/>
                  <input type="date" className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-500"/>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 hover:shadow-lg">
                  <Search size={20}/> Buscar
                </button>
              </div>
            </div>

            {/* Recomendados */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Destinos Recomendados</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Card Ejemplo 1 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 group cursor-pointer hover:-translate-y-1">
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=400" alt="Hotel" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                     <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-800">★ 4.8</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-800">Hotel Paradiso</h4>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mb-3"><MapPin size={14}/> Santa Marta, Colombia</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-xs text-gray-400 block">Desde</span>
                        <span className="text-lg font-bold text-blue-600">$120.000</span>
                      </div>
                      <button className="text-sm bg-gray-50 hover:bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg transition-colors border border-gray-200">Ver detalles</button>
                    </div>
                  </div>
                </div>

                {/* Card Ejemplo 2 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 group cursor-pointer hover:-translate-y-1">
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400" alt="Hotel" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-800">Resort Vista Mar</h4>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mb-3"><MapPin size={14}/> Cartagena, Colombia</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-xs text-gray-400 block">Desde</span>
                        <span className="text-lg font-bold text-blue-600">$250.000</span>
                      </div>
                      <button className="text-sm bg-gray-50 hover:bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg transition-colors border border-gray-200">Ver detalles</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;