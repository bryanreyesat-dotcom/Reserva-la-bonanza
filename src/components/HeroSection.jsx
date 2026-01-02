import React from 'react';
import { MapPin, Calendar, User, Search, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext'; 

// import { BRAND } from '../../config/brand'; 
import heroImage from "../assets/hero_bg.jpg"

const BRAND = {
  colors: {
    accentBg: 'bg-indigo-600',
    bgPrimary: 'bg-gray-900' 
  }
};

export default function HeroSection() {
  const { t } = useLanguage(); 

  return (
    <>
      {/* 1. HERO SECTION */}
      <div className="relative h-[650px] w-full bg-gray-900 flex items-center justify-center text-center px-4 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Santa Marta" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 animate-slow-zoom"
        />
        
        <div className="relative z-10 max-w-4xl mx-auto mt-[-40px]">
          <span className="inline-block py-1 px-4 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase mb-6 border border-white/20">
            Santa Marta, Colombia
          </span>
          
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-xl tracking-tight leading-[1.1]">
            {t('hero.title')}
          </h2>
          <p className="text-lg md:text-2xl text-gray-100 font-light mb-10 max-w-2xl mx-auto drop-shadow-md">
             {t('hero.subtitle')}
          </p>
          
          {/* --- BUSCADOR TRADUCIDO --- */}
          <div className="bg-white p-2 md:p-3 rounded-3xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center max-w-5xl mx-auto border border-white/20 backdrop-blur-sm">
            
            {/* Campo Destino */}
            <div className="flex-1 w-full px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100 text-left">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                {t('hero.search_dest')}
              </label>
              <div className="flex items-center">
                <MapPin size={18} className={`text-gray-400 mr-2`} />
                {/* Nota: 'Rodadero' es nombre propio, no se suele traducir, pero podrías hacerlo si quisieras */}
                <input type="text" readOnly value="Rodadero, Sta Marta" className="w-full font-bold text-gray-700 outline-none bg-transparent" />
              </div>
            </div>

            {/* Campo Fechas */}
            <div className="flex-1 w-full px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100 text-left">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                {t('hero.search_dates')}
              </label>
              <div className="flex items-center">
                <Calendar size={18} className="text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder={t('hero.search_dates_ph')} 
                  className="w-full font-bold text-gray-700 outline-none bg-transparent" 
                />
              </div>
            </div>

            {/* Campo Huéspedes */}
            <div className="flex-1 w-full px-6 py-3 text-left">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                {t('hero.search_guests')}
              </label>
              <div className="flex items-center">
                <User size={18} className="text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder={t('hero.search_guests_ph')} 
                  className="w-full font-bold text-gray-700 outline-none bg-transparent" 
                />
              </div>
            </div>

            {/* Botón Buscar */}
            <button className={`w-full md:w-auto ${BRAND.colors.accentBg} hover:opacity-90 text-white font-bold h-14 md:h-12 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center gap-2 mt-2 md:mt-0`}>
              <Search size={20} /> <span className="md:hidden">{t('hero.search_btn')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. BARRA DE CONFIANZA */}
      <div className={`${BRAND.colors.bgPrimary} py-3 text-center text-white text-sm font-medium border-t border-white/10 shadow-inner`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            <div className="flex text-yellow-300">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <span className="font-bold tracking-wide">100% RECOMENDADO</span>
          </div>
          <span className="opacity-90 text-xs md:text-sm font-light">Basado en <span className="font-bold underline cursor-pointer">7 opiniones verificadas</span> en Google Maps</span>
        </div>
      </div>
    </>
  );
}