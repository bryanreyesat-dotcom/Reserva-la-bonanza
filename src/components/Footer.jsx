import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { BRAND } from '../config/brand';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* COLUMNA 1: MARCA */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
             <div className={`w-8 h-8 ${BRAND.colors.bgPrimary} rounded-md flex items-center justify-center text-sm`}>RB</div>
             {BRAND.name}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
             Agencia de turismo especializada en cabañas y apartaestudios en Santa Marta. Experiencias únicas frente al mar.
          </p>
          <div className="flex gap-4">
             {/* Aquí usamos el componente SocialButton */}
             <SocialButton icon={<Facebook size={18}/>} />
             <SocialButton icon={<Instagram size={18}/>} />
             <SocialButton icon={<Twitter size={18}/>} />
          </div>
        </div>

        {/* COLUMNA 2: CONTACTO REAL */}
        <div>
          <h4 className="font-bold mb-6 text-gray-200">Contacto</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-start">
               <MapPin size={18} className={`mr-3 mt-0.5 ${BRAND.colors.primary}`} />
               <span className="max-w-[200px]">{BRAND.info.address}</span>
            </li>
            <li className="flex items-center">
               <Phone size={18} className={`mr-3 ${BRAND.colors.primary}`} />
               <span>{BRAND.info.phone}</span>
            </li>
            <li className="flex items-center">
               <Mail size={18} className={`mr-3 ${BRAND.colors.primary}`} />
               <span>{BRAND.info.email}</span>
            </li>
            <li className="flex items-center text-green-400 font-medium">
               <Clock size={18} className="mr-3" />
               Siempre abierto
            </li>
          </ul>
        </div>

        {/* COLUMNA 3: LEGAL */}
        <div>
           <h4 className="font-bold mb-6 text-gray-200">Legal</h4>
           <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Sobre Nosotros</li>
              <li className="hover:text-white cursor-pointer transition-colors">Términos y Condiciones</li>
              <li className="hover:text-white cursor-pointer transition-colors">Política de Privacidad</li>
              <li className="hover:text-white cursor-pointer transition-colors">RNT (Registro Nacional)</li>
           </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
         <p>© 2025 {BRAND.name} S.A.S. Todos los derechos reservados.</p>
         <div className="flex gap-4 mt-4 md:mt-0">
            <span>Santa Marta, Colombia 🌴</span>
         </div>
      </div>
    </footer>
  );
}

// 👇 ESTA ES LA FUNCIÓN QUE TE FALTABA
// Asegúrate de incluirla al final del archivo, fuera de la función Footer
function SocialButton({ icon }) {
    return (
        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#0E7C7B] hover:text-white cursor-pointer transition-all duration-300">
            {icon}
        </div>
    )
}