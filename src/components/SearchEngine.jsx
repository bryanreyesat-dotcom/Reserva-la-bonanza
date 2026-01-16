import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Calendar as CalendarIcon, User, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es'; // Para poner el calendario en español

// Registramos el idioma español
registerLocale('es', es);

const SearchEngine = () => {
  const navigate = useNavigate();
  
  // Estados para abrir/cerrar menús
  const [showGuestMenu, setShowGuestMenu] = useState(false);
  
  // Referencias para detectar clics fuera
  const guestMenuRef = useRef(null);

  // ESTADO DE BÚSQUEDA
  const [location, setLocation] = useState(''); // Arranca vacío para obligar a elegir
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0
  });

  // Cerrar menús al hacer clic fuera
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
    e.preventDefault(); // Evita que el botón recargue la página
    e.stopPropagation(); // Evita que se cierre el menú
    
    setGuests(prev => {
      const currentVal = prev[type];
      const newVal = operation === 'inc' ? currentVal + 1 : currentVal - 1;
      
      // Validaciones
      if (newVal < 0) return prev; 
      if (type === 'adultos' && newVal < 1) return prev; // Mínimo 1 adulto
      
      return { ...prev, [type]: newVal };
    });
  };

  const handleSearch = (e) => {
    if(e) e.preventDefault();
    
    // Aquí construimos el objeto de filtros limpio
    const filtros = {
      ubicacion: location, // Ejemplo: "Rodadero"
      fechaInicio: startDate,
      fechaFin: endDate,
      adultos: guests.adults,
      ninos: guests.children
    };

    console.log("Enviando filtros:", filtros);
    // Navegamos pasando el estado (state) para que la otra página lo lea
    navigate('/propiedades', { state: filtros });
  };

  return (
    <div className="w-full max-w-6xl mx-auto relative z-50">
      <div className="bg-white rounded-[2rem] shadow-2xl p-2 flex flex-col md:flex-row items-center border border-gray-200">
        
        {/* === 1. DESTINO === */}
        <div className="relative w-full md:w-[30%] px-6 py-2 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-gray-50 rounded-[2rem] transition-colors group">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
            Destino
          </label>
          <div className="flex items-center">
            <MapPin size={22} className="text-gray-400 mr-3 group-hover:text-indigo-600 transition-colors" />
            <select 
              className="w-full text-lg font-bold text-gray-800 outline-none bg-transparent cursor-pointer appearance-none truncate py-1"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="" className="text-gray-400">¿A dónde vas?</option>
              <option value="Santa Marta">Santa Marta (Todo)</option>
              <option value="Rodadero">El Rodadero</option>
              <option value="Taganga">Taganga</option>
              <option value="Pozos Colorados">Pozos Colorados</option>
              <option value="Centro">Centro Histórico</option>
            </select>
          </div>
        </div>

        {/* === 2. CALENDARIO (React Datepicker) === */}
        <div className="relative w-full md:w-[35%] px-6 py-2 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-gray-50 rounded-[2rem] transition-colors group z-50">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
            Entrada / Salida
          </label>
          <div className="flex items-center w-full">
            <CalendarIcon size={22} className="text-gray-400 mr-3 group-hover:text-indigo-600 transition-colors" />
            <div className="w-full custom-datepicker-wrapper">
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => setDateRange(update)}
                isClearable={true}
                placeholderText="Agregar fechas"
                className="w-full text-lg font-bold text-gray-800 outline-none bg-transparent cursor-pointer placeholder-gray-400"
                locale="es"
                dateFormat="dd MMM"
                minDate={new Date()}
                // ESTO HACE QUE EL CALENDARIO SE ABRA ARRIBA O DONDE QUEPA
                popperPlacement="bottom-start" 
                popperModifiers={[
                  {
                    name: "preventOverflow",
                    options: {
                      rootBoundary: "viewport",
                      tether: false,
                      altAxis: true, 
                    },
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* === 3. HUÉSPEDES === */}
        <div ref={guestMenuRef} className="relative w-full md:w-[35%] pl-6 pr-2 py-2">
          <div 
            className="cursor-pointer hover:bg-gray-50 rounded-[2rem] p-2 transition-colors -ml-2 pl-4 flex items-center justify-between"
            onClick={() => setShowGuestMenu(!showGuestMenu)}
          >
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Viajeros
              </label>
              <div className="flex items-center">
                <User size={22} className="text-gray-400 mr-3" />
                <span className="text-lg font-bold text-gray-800 truncate">
                  {guests.adults + guests.children} Huéspedes
                </span>
              </div>
            </div>
            
            {/* BOTÓN BUSCAR */}
            <button 
              onClick={(e) => { e.stopPropagation(); handleSearch(e); }}
              className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg hover:shadow-orange-200 transition-all transform hover:scale-105 flex items-center justify-center ml-4"
            >
              <Search size={24} strokeWidth={3} />
            </button>
          </div>

          {/* === POPUP MENU (Hacia ARRIBA) === */}
          {showGuestMenu && (
            <div className="absolute bottom-[110%] right-0 w-full md:w-80 bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 z-[60] animate-in slide-in-from-bottom-2 fade-in">
              
              {/* Adultos */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <div>
                  <p className="font-bold text-lg text-gray-800">Adultos</p>
                  <p className="text-sm text-gray-400">13 años o más</p>
                </div>
                <div className="flex items-center gap-4">
                  <CounterBtn onClick={(e) => updateGuests('adults', 'dec', e)} disabled={guests.adults <= 1} icon={<Minus size={16}/>} />
                  <span className="w-6 text-center font-bold text-xl text-gray-800">{guests.adults}</span>
                  <CounterBtn onClick={(e) => updateGuests('adults', 'inc', e)} icon={<Plus size={16}/>} />
                </div>
              </div>

              {/* Niños */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg text-gray-800">Niños</p>
                  <p className="text-sm text-gray-400">De 2 a 12 años</p>
                </div>
                <div className="flex items-center gap-4">
                  <CounterBtn onClick={(e) => updateGuests('children', 'dec', e)} disabled={guests.children <= 0} icon={<Minus size={16}/>} />
                  <span className="w-6 text-center font-bold text-xl text-gray-800">{guests.children}</span>
                  <CounterBtn onClick={(e) => updateGuests('children', 'inc', e)} icon={<Plus size={16}/>} />
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
      
      {/* Estilos CSS inline para limpiar el datepicker por defecto */}
      <style>{`
        .react-datepicker-wrapper { width: 100%; }
        .react-datepicker__input-container input { width: 100%; outline: none; }
        .react-datepicker { border-radius: 1.5rem; border: none; box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1); overflow: hidden; font-family: inherit; }
        .react-datepicker__header { background: white; border-bottom: 1px solid #f3f4f6; padding-top: 1rem; }
        .react-datepicker__day--selected, .react-datepicker__day--in-range { background-color: #f97316 !important; color: white; border-radius: 50%; }
        .react-datepicker__day--in-selecting-range { background-color: #ffedd5 !important; color: #f97316; }
        .react-datepicker__day:hover { border-radius: 50%; background-color: #f3f4f6; }
        .react-datepicker__triangle { display: none; }
      `}</style>
    </div>
  );
};

// Componente pequeño de botón
const CounterBtn = ({ onClick, icon, disabled }) => (
  <button 
    type="button" // Importante para no enviar formulario
    onClick={onClick}
    disabled={disabled}
    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${disabled ? 'border-gray-100 text-gray-300' : 'border-gray-200 text-gray-600 hover:border-orange-500 hover:text-orange-500 active:scale-90'}`}
  >
    {icon}
  </button>
);

export default SearchEngine;