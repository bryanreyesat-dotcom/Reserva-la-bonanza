import React from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react'; // Importamos los iconos necesarios

const Toast = ({ show, message, type, onClose }) => {
  if (!show) return null;

  const isError = type === 'error';
  
  return (
    <div className={`fixed top-5 right-5 z-50 animate-in slide-in-from-right fade-in duration-300 bg-white border-l-4 ${isError ? 'border-red-500' : 'border-blue-500'} shadow-lg rounded-lg p-4 flex items-center gap-3 min-w-[300px]`}>
      <div className={isError ? 'text-red-500' : 'text-blue-500'}>
        {isError ? <AlertCircle size={24} /> : <CheckCircle size={24} />}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-gray-800 text-sm">{isError ? 'Error' : 'Notificación'}</h4>
        <p className="text-xs text-gray-600">{message}</p>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;