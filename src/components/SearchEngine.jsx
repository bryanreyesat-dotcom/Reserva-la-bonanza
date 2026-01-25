import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Calendar as CalendarIcon, User, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale'; // Corrección en la importación para versiones nuevas

// Registramos el idioma español
registerLocale('es', es);

const SearchEngine = () => {
  const navigate = useNavigate();
  
  // Estados para abrir/cerrar menús
  const [showGuestMenu, setShowGuestMenu] = useState(false);
  const guestMenuRef = useRef(null);

  // ESTADOS DE BÚSQUEDA
  const [location, setLocation] = useState(''); 
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0
  });

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (guestMenuRef.current && !guestMenuRef.current.contains(event.target)) {
        setShowGuestMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [guestMenuRef]);

  // Lógica de contadores (Huéspedes)
  const updateGuests = (type, operation, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setGuests(prev => {
      const currentVal = prev[type];
      const newVal = operation === 'inc' ? currentVal + 1 : currentVal - 1;
      
      if (newVal < 0) return prev; 
      if (type === 'adults' && newVal < 1) return prev; 
      
      return { ...prev, [type]: newVal };
    });
  };
  
  const handleSearch = (e) => {
    if(e) e.preventDefault();
    
    const params = new URLSearchParams();

    // 1. UBICACIÓN
    if (location && location !== "Santa Marta") {
      params.append('busqueda', location);
    }

    // 2. FECHAS (Aquí está la lógica de los "3 días")
    if (startDate) params.append('checkin', startDate.toISOString());
    if (endDate) params.append('checkout', endDate.toISOString());

    // 3. HUÉSPEDES
    params.append('adultos', guests.adults);
    params.append('ninos', guests.children);

    // Navegar a la página de resultados
    navigate(`/propiedades?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto relative z-40 -mt-10 px-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-2 flex flex-col md:flex-row items-center border border-gray-100 animate-in fade-in-up duration-500">
        
        {/* === 1. DESTINO === */}
        <div className="relative w-full md:w-[30%] px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 rounded-[2rem] transition-colors group">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 group-hover:text-sky-600 transition-colors">
            Destino
          </label>
          <div className="flex items-center">
            <MapPin size={20} className="text-gray-400 mr-2 group-hover:text-sky-600 transition-colors" />
            <select 
              className="w-full text-base font-bold text-gray-700 outline-none bg-transparent cursor-pointer appearance-none truncate"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">¿A dónde vas?</option>
              <option value="Santa Marta">Santa Marta (Todo)</option>
              <option value="Rodadero">El Rodadero</option>
              <option value="Taganga">Taganga</option>
              <option value="Pozos Colorados">Pozos Colorados</option>
              <option value="Centro">Centro Histórico</option>
            </select>
          </div>
        </div>

        {/* === 2. CALENDARIO MODERNO === */}
        <div className="relative w-full md:w-[40%] px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 rounded-[2rem] transition-colors group z-50">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 group-hover:text-indigo-600 transition-colors">
            Check-in / Check-out
          </label>
          <div className="flex items-center w-full">
            <CalendarIcon size={20} className="text-gray-400 mr-2 group-hover:text-indigo-600 transition-colors" />
            <div className="w-full custom-datepicker-wrapper">
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => setDateRange(update)}
                isClearable={true}
                placeholderText="Agregar fechas"
                className="w-full text-base font-bold text-gray-700 outline-none bg-transparent cursor-pointer placeholder-gray-400"
                locale="es"
                dateFormat="dd MMM"
                minDate={new Date()}
                popperPlacement="bottom"
              />
            </div>
          </div>
        </div>

        {/* === 3. HUÉSPEDES === */}
        <div ref={guestMenuRef} className="relative w-full md:w-[30%] pl-6 pr-2 py-2 flex items-center justify-between hover:bg-gray-50 rounded-[2rem] cursor-pointer transition-colors"
             onClick={() => setShowGuestMenu(!showGuestMenu)}>
          
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Viajeros
            </label>
            <div className="flex items-center">
              <User size={20} className="text-gray-400 mr-2" />
              <span className="text-base font-bold text-gray-700 truncate">
                {guests.adults + guests.children} Huéspedes
              </span>
            </div>
          </div>
            
          {/* BOTÓN DE BÚSQUEDA (Gradiente Azul) */}
          <button 
            onClick={(e) => { e.stopPropagation(); handleSearch(e); }}
            className="bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-lg hover:shadow-indigo-200 transition-all transform hover:scale-105 flex items-center justify-center ml-2"
          >
            <Search size={20} strokeWidth={3} />
          </button>

          {/* === POPUP MENU DE HUÉSPEDES === */}
          {showGuestMenu && (
            <div className="absolute top-[120%] right-0 w-full md:w-80 bg-white rounded-3xl shadow-xl p-6 border border-gray-100 z-[60] cursor-default animate-in fade-in slide-in-from-top-5">
              
              {/* Adultos */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
                <div>
                  <p className="font-bold text-gray-800">Adultos</p>
                  <p className="text-xs text-gray-400">13 años o más</p>
                </div>
                <div className="flex items-center gap-3">
                  <CounterBtn onClick={(e) => updateGuests('adults', 'dec', e)} disabled={guests.adults <= 1} icon={<Minus size={14}/>} />
                  <span className="w-4 text-center font-bold text-gray-800">{guests.adults}</span>
                  <CounterBtn onClick={(e) => updateGuests('adults', 'inc', e)} icon={<Plus size={14}/>} />
                </div>
              </div>

              {/* Niños */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-800">Niños</p>
                  <p className="text-xs text-gray-400">De 2 a 12 años</p>
                </div>
                <div className="flex items-center gap-3">
                  <CounterBtn onClick={(e) => updateGuests('children', 'dec', e)} disabled={guests.children <= 0} icon={<Minus size={14}/>} />
                  <span className="w-4 text-center font-bold text-gray-800">{guests.children}</span>
                  <CounterBtn onClick={(e) => updateGuests('children', 'inc', e)} icon={<Plus size={14}/>} />
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
      
      {/* ESTILOS DEL CALENDARIO (TEMA AZUL) */}
      <style>{`
        .react-datepicker-wrapper { width: 100%; }
        .react-datepicker__input-container input { width: 100%; outline: none; }
        .react-datepicker { border-radius: 1.5rem; border: none; box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.15); font-family: inherit; overflow: hidden; }
        .react-datepicker__header { background: white; border-bottom: 1px solid #f3f4f6; padding-top: 1rem; }
        .react-datepicker__current-month { color: #374151; font-weight: 800; text-transform: capitalize; margin-bottom: 0.5rem; }
        .react-datepicker__day-name { color: #9ca3af; font-weight: 700; text-transform: uppercase; font-size: 0.7rem; }
        
        /* Días Seleccionados (Fondo Azul Índigo) */
        .react-datepicker__day--selected, 
        .react-datepicker__day--range-end,
        .react-datepicker__day--range-start { 
            background-color: #4f46e5 !important; /* Indigo-600 */
            color: white !important; 
            border-radius: 50%; 
            font-weight: bold;
        }
        
        /* Rango intermedio (Azul clarito) */
        .react-datepicker__day--in-range,
        .react-datepicker__day--in-selecting-range { 
            background-color: #e0e7ff !important; /* Indigo-100 */
            color: #4f46e5 !important;
            border-radius: 0;
        }
        
        .react-datepicker__day--range-start { border-top-left-radius: 50%; border-bottom-left-radius: 50%; }
        .react-datepicker__day--range-end { border-top-right-radius: 50%; border-bottom-right-radius: 50%; }
        
        .react-datepicker__day:hover { border-radius: 50%; background-color: #f3f4f6; }
        .react-datepicker__day--keyboard-selected { background-color: transparent; color: inherit; }
        .react-datepicker__triangle { display: none; }
        .react-datepicker__navigation-icon::before { border-color: #4b5563; border-width: 2px 2px 0 0; }
      `}</style>
    </div>
  );
};

// Componente pequeño de botón auxiliar
const CounterBtn = ({ onClick, icon, disabled }) => (
  <button 
    type="button" 
    onClick={onClick}
    disabled={disabled}
    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${disabled ? 'border-gray-100 text-gray-300' : 'border-gray-200 text-gray-600 hover:border-indigo-600 hover:text-indigo-600 active:scale-90'}`}
  >
    {icon}
  </button>
);

export default SearchEngine;