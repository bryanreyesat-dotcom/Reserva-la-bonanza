import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, CreditCard, User, Calendar, Car, Sparkles, CheckCircle } from 'lucide-react';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale';
import { differenceInDays } from 'date-fns';

// Registramos el idioma español para el calendario
registerLocale('es', es);

const ReservationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 1. DATOS DEL CLIENTE
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', email: '', telefono: '',
    tipoDocumento: 'CC', numeroDocumento: ''
  });

  // 2. ESTADOS DE FECHA
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // 3. SERVICIOS ADICIONALES (NUEVO)
  const [wantsCleaning, setWantsCleaning] = useState(false); // Por defecto NO
  const [wantsTaxi, setWantsTaxi] = useState(false);         // Por defecto NO

  // 4. ESTADOS DE PAGO
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    number: '', name: '', expiry: '', cvc: ''
  });

  // 5. ESTADO DE CARGA
  const [isProcessing, setIsProcessing] = useState(false);

  // Recuperar datos de la URL
  const pricePerNight = Number(searchParams.get('price')) || 200000;
  const propertyName = searchParams.get('name') || "Propiedad Exclusiva";
  // Usamos el ID solo para referencia interna (console.log)
  const propertyId = searchParams.get('propertyId') || "0"; 

  // Inicializar fechas desde URL
  useEffect(() => {
    const checkinUrl = searchParams.get('checkin');
    const checkoutUrl = searchParams.get('checkout');
    if (checkinUrl) setStartDate(new Date(checkinUrl));
    if (checkoutUrl) setEndDate(new Date(checkoutUrl));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- CÁLCULOS MONETARIOS ---
  const nights = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const subtotal = nights * pricePerNight;
  
  // Precios de adicionales
  const CLEANING_PRICE = 50000;
  const TAXI_PRICE = 80000;

  // Calculamos el total dinámico
  const totalCleaning = wantsCleaning ? CLEANING_PRICE : 0;
  const totalTaxi = wantsTaxi ? TAXI_PRICE : 0;
  const total = subtotal + totalCleaning + totalTaxi;

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // --- FUNCIÓN DE ENVÍO ---
  // --- FUNCIÓN DE ENVÍO ACTUALIZADA ---
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación visual simple
    if (paymentMethod === 'card' && !cardData.number) {
        alert("⚠️ Por favor ingresa un número de tarjeta.");
        return;
    }

    setIsProcessing(true);

    // Simulación
    setTimeout(() => {
        setIsProcessing(false);
        
        // EN LUGAR DE ALERT, NAVEGAMOS A LA PÁGINA DE ÉXITO
        // Y le pasamos todos los datos importantes para mostrarlos allá
        navigate('/confirmacion', { 
          state: {
            nombre: formData.nombre,
            apellido: formData.apellido,
            propertyName: propertyName,
            total: total,
            nights: nights,
            startDate: startDate,
            endDate: endDate,
            cleaning: wantsCleaning,
            taxi: wantsTaxi
          } 
        });
        
    }, 2000);
  };
  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-indigo-600 font-bold mb-6 transition-colors">
          <ArrowLeft size={20} className="mr-2" /> Volver atrás
        </button>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Finalizar tu Reserva 🔒</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMNA IZQUIERDA */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. FECHAS */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative z-20"> 
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                <Calendar className="text-indigo-600"/> Fechas de Estadía
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                   <p className="text-xs font-bold text-indigo-500 uppercase mb-1">Llegada</p>
                   <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} selectsStart startDate={startDate} endDate={endDate} minDate={new Date()} locale="es" dateFormat="dd/MM/yyyy" className="bg-transparent font-bold text-indigo-900 outline-none w-full cursor-pointer" />
                </div>
                <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                   <p className="text-xs font-bold text-indigo-500 uppercase mb-1">Salida</p>
                   <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate || new Date()} locale="es" dateFormat="dd/MM/yyyy" className="bg-transparent font-bold text-indigo-900 outline-none w-full cursor-pointer" />
                </div>
              </div>
            </section>

            {/* 2. SERVICIOS ADICIONALES (NUEVO SECCIÓN) */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                <Sparkles className="text-indigo-600"/> Servicios Adicionales
              </h2>
              <div className="space-y-3">
                
                {/* Opción Limpieza */}
                <div 
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${wantsCleaning ? 'border-indigo-500 bg-indigo-50' : 'border-gray-100 hover:border-gray-200'}`}
                  onClick={() => setWantsCleaning(!wantsCleaning)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${wantsCleaning ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}>
                      {wantsCleaning && <CheckCircle size={14} className="text-white"/>}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Servicio de Limpieza</p>
                      <p className="text-xs text-gray-500">Limpieza profunda al finalizar estadía</p>
                    </div>
                  </div>
                  <p className="font-bold text-gray-700">+${CLEANING_PRICE.toLocaleString()}</p>
                </div>

                {/* Opción Taxi */}
                <div 
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${wantsTaxi ? 'border-indigo-500 bg-indigo-50' : 'border-gray-100 hover:border-gray-200'}`}
                  onClick={() => setWantsTaxi(!wantsTaxi)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${wantsTaxi ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}>
                      {wantsTaxi && <CheckCircle size={14} className="text-white"/>}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Transporte Privado (Taxi)</p>
                      <p className="text-xs text-gray-500">Recogida Aeropuerto - Hotel</p>
                    </div>
                  </div>
                  <p className="font-bold text-gray-700">+${TAXI_PRICE.toLocaleString()}</p>
                </div>

              </div>
            </section>

            {/* 3. DATOS PERSONALES */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                <User className="text-indigo-600"/> Tus Datos
              </h2>
              <form id="reserva-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required name="nombre" placeholder="Nombre" onChange={handleInputChange} className="p-3 border rounded-xl bg-gray-50 outline-none" />
                <input required name="apellido" placeholder="Apellido" onChange={handleInputChange} className="p-3 border rounded-xl bg-gray-50 outline-none" />
                <input required name="numeroDocumento" placeholder="Cédula / ID" onChange={handleInputChange} className="p-3 border rounded-xl bg-gray-50 outline-none" />
                <input required type="tel" name="telefono" placeholder="Celular" onChange={handleInputChange} className="p-3 border rounded-xl bg-gray-50 outline-none" />
              </form>
            </section>

            {/* 4. MÉTODO DE PAGO */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                <CreditCard className="text-indigo-600"/> Pago Seguro
              </h2>
              <div className="flex gap-4 mb-6">
                <button type="button" onClick={() => setPaymentMethod('card')} className={`flex-1 py-3 px-4 rounded-xl border-2 font-bold flex items-center justify-center gap-2 transition-all ${paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-400'}`}>
                  <CreditCard size={20}/> Tarjeta
                </button>
                <button type="button" onClick={() => setPaymentMethod('nequi')} className={`flex-1 py-3 px-4 rounded-xl border-2 font-bold flex items-center justify-center gap-2 transition-all ${paymentMethod === 'nequi' ? 'border-pink-600 bg-pink-50 text-pink-700' : 'border-gray-200 text-gray-400'}`}>
                  Nequi
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 animate-fadeIn">
                  <input type="text" placeholder="Número de Tarjeta" maxLength="19" className="w-full p-3 border border-gray-200 rounded-xl outline-none" onChange={(e) => setCardData({...cardData, number: e.target.value})} />
                  <div className="flex gap-4">
                    <input type="text" placeholder="MM/AA" className="flex-1 p-3 border border-gray-200 rounded-xl outline-none" />
                    <input type="password" placeholder="CVC" className="flex-1 p-3 border border-gray-200 rounded-xl outline-none" />
                  </div>
                </div>
              )}

              {paymentMethod === 'nequi' && (
                <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 text-center animate-fadeIn">
                   <p className="text-pink-900 text-sm font-medium">Usa el número <strong>300 123 4567</strong> para pagar desde tu app.</p>
                </div>
              )}
            </section>
          </div>

          {/* COLUMNA DERECHA: RESUMEN (Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-28">
              <div className="mb-6 pb-4 border-b border-gray-100">
                <p className="text-xs text-gray-400 font-bold uppercase">Reserva en:</p>
                <h3 className="font-bold text-xl text-gray-900 leading-tight">{propertyName}</h3>
                <p className="text-sm text-gray-500 mt-2 flex items-center gap-1"><Calendar size={14}/> {nights} Noches</p>
              </div>

              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Alojamiento ({nights} n.)</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                
                {/* Muestra Limpieza SOLO si se seleccionó */}
                {wantsCleaning && (
                  <div className="flex justify-between text-indigo-600 font-medium animate-fadeIn">
                    <span>+ Limpieza</span>
                    <span>${CLEANING_PRICE.toLocaleString()}</span>
                  </div>
                )}

                {/* Muestra Taxi SOLO si se seleccionó */}
                {wantsTaxi && (
                  <div className="flex justify-between text-indigo-600 font-medium animate-fadeIn">
                    <span>+ Taxi Aeropuerto</span>
                    <span>${TAXI_PRICE.toLocaleString()}</span>
                  </div>
                )}

                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900 mt-2">
                  <span>Total a Pagar</span>
                  <span className="text-indigo-600">${total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                type="submit" 
                form="reserva-form"
                disabled={nights <= 0 || isProcessing}
                className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 
                  ${isProcessing 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-gradient-to-r from-sky-600 to-indigo-600 hover:shadow-indigo-200 text-white transform active:scale-95'
                  }`}
              >
                {isProcessing ? 'Procesando...' : 'Confirmar y Pagar'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReservationPage;