import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // IMPORTANTE: Para cambiar de página
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale';
import { differenceInDays } from 'date-fns';
import { Star, ChevronDown } from 'lucide-react';

registerLocale('es', es);

// Ahora recibimos también el nombre y ID para pasarlos al formulario
const BookingCard = ({ 
  pricePerNight = 250000, 
  propertyName = "Villa Bonanza VIP", 
  propertyId = "1",
  rating = 4.8, 
  reviews = 120 
}) => {
  
  const navigate = useNavigate(); // Hook para navegar

  // ESTADOS
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests] = useState(2);
  
  // CÁLCULO DE PRECIOS
  const nights = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const subtotal = nights * pricePerNight;
  const cleaningFee = 50000; 
  const serviceFee = subtotal * 0.10; 
  const total = subtotal + cleaningFee + serviceFee;

  // Formato de moneda COP
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
  };

  // --- FUNCIÓN CLAVE: IR A RESERVAR ---
const handleReservation = () => {
    // 1. Preparamos las fechas (si no hay, mandamos vacío)
    const checkinParam = startDate ? startDate.toISOString() : '';
    const checkoutParam = endDate ? endDate.toISOString() : '';

    // 2. Creamos la URL con lo que tengamos (aunque sea sin fechas)
    const params = new URLSearchParams({
      checkin: checkinParam,
      checkout: checkoutParam,
      price: pricePerNight,
      name: propertyName,
      propertyId: propertyId
    });

    // 3. ¡NOS VAMOS DIRECTO! Sin preguntar, sin alertas.
    navigate(`/reservar?${params.toString()}`);
  };
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sticky top-24 w-full max-w-sm mx-auto z-30">
      
      {/* 1. HEADER: PRECIO Y CALIFICACIÓN */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-2xl font-bold text-gray-900">{formatMoney(pricePerNight)}</span>
          <span className="text-gray-500 text-sm"> / noche</span>
        </div>
        <div className="flex items-center gap-1 text-sm font-bold text-gray-800">
          <Star size={16} fill="currentColor" className="text-yellow-400" />
          <span>{rating}</span>
          <span className="text-gray-400 font-normal underline decoration-gray-300 ml-1">
            ({reviews} reseñas)
          </span>
        </div>
      </div>

      {/* 2. SELECTOR DE FECHAS */}
      <div className="border border-gray-300 rounded-xl mb-4 overflow-hidden">
        <div className="flex border-b border-gray-300">
          <div className="w-1/2 p-3 border-r border-gray-300 hover:bg-gray-50 cursor-pointer relative">
            <label className="block text-[10px] font-bold uppercase text-gray-700">Llegada</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              locale="es"
              placeholderText="Agrega fecha"
              dateFormat="dd/MM/yyyy"
              // --- AGREGAMOS ESTAS 2 LÍNEAS PARA QUE EL CALENDARIO FLOTE BIEN ---
              popperPlacement="bottom-start"
              popperClassName="z-50 shadow-2xl" // Z-50 asegura que quede encima de todo
              className="w-full text-sm outline-none bg-transparent cursor-pointer p-0 text-gray-600"
            />
          </div>
          <div className="w-1/2 p-3 hover:bg-gray-50 cursor-pointer relative">
            <label className="block text-[10px] font-bold uppercase text-gray-700">Salida</label>
             <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || new Date()}
              locale="es"
              placeholderText="Agrega fecha"
              className="w-full text-sm outline-none bg-transparent cursor-pointer p-0 text-gray-600"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>
        
        {/* Selector de Huéspedes (Visual por ahora) */}
        <div className="p-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center">
            <div>
              <label className="block text-[10px] font-bold uppercase text-gray-700">Huéspedes</label>
              <span className="text-sm text-gray-600">{guests} viajeros</span>
            </div>
            <ChevronDown size={16} className="text-gray-500"/>
        </div>
      </div>

      {/* 3. BOTÓN DE RESERVA (CONECTADO) */}
      <button 
        onClick={handleReservation}
        className="w-full bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-indigo-200 active:scale-[0.98] mb-4"
      >
        {nights > 0 ? 'Reservar Ahora' : 'Verificar disponibilidad'}
      </button>

      {/* 4. DESGLOSE DE PRECIOS */}
      {nights > 0 && (
        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 pt-2">
          <p className="text-center text-gray-500 text-sm mb-4">No se hará ningún cargo por ahora</p>
          
          <div className="flex justify-between text-gray-600 text-sm">
            <span className="underline decoration-gray-300">{formatMoney(pricePerNight)} x {nights} noches</span>
            <span>{formatMoney(subtotal)}</span>
          </div>
          
          <div className="flex justify-between text-gray-600 text-sm">
            <span className="underline decoration-gray-300">Tarifa de limpieza</span>
            <span>{formatMoney(cleaningFee)}</span>
          </div>
          
          <div className="flex justify-between text-gray-600 text-sm">
            <span className="underline decoration-gray-300">Comisión de servicio</span>
            <span>{formatMoney(serviceFee)}</span>
          </div>

          <div className="border-t border-gray-200 my-4 pt-4 flex justify-between items-center font-bold text-gray-800 text-lg">
            <span>Total antes de impuestos</span>
            <span>{formatMoney(total)}</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default BookingCard;