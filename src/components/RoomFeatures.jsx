import React, { useState } from 'react';
import { Upload, X, DollarSign, Users, MapPin, Hash, FileText, Check } from 'lucide-react';

const CreateRoomForm = ({ onCancel, onSave }) => {
  const [images, setImages] = useState([]);
  
  // 1. ESTADO PARA LAS COMODIDADES (AMENITIES)
  // Aquí guardaremos los IDs de lo que seleccione el usuario. Ej: ['wifi', 'pool']
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    roomNumber: '',
    capacity: '',
    price: '',
    address: '',
    description: ''
  });

  // Lista de opciones disponibles (Puedes agregar más aquí)
  const amenitiesOptions = [
    { id: 'wifi', label: 'Wifi Gratis' },
    { id: 'ac', label: 'Aire Acondicionado' },
    { id: 'tv', label: 'Smart TV' },
    { id: 'kitchen', label: 'Cocina Equipada' },
    { id: 'pool', label: 'Piscina' },
    { id: 'view', label: 'Vista al Mar' },
    { id: 'parking', label: 'Parqueadero' },
    { id: 'balcony', label: 'Balcón' },
    { id: 'security', label: 'Cajilla de Seguridad' },
    { id: 'coffee', label: 'Cafetera' }
  ];

  // Función para marcar/desmarcar comodidades
  const toggleAmenity = (id) => {
    setSelectedAmenities(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id); // Si ya está, lo quita
      } else {
        return [...prev, id]; // Si no está, lo agrega
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = files.map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  // AL GUARDAR: Juntamos todo en un solo paquete
  const handleSubmit = () => {
    const finalData = {
      ...formData,
      amenities: selectedAmenities, // <--- Aquí va el array JSON para Supabase
      images: images // Nota: Las imágenes requieren un paso extra para subir a Storage luego
    };
    
    console.log("Datos listos para Supabase:", finalData);
    onSave(finalData); // Enviamos los datos al padre
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Publicar Nueva Propiedad</h2>
            <p className="text-gray-500 text-sm">Información de la habitación o apartamento.</p>
        </div>
        <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 font-medium px-4 py-2 hover:bg-gray-100 rounded-lg transition"
        >
            Cancelar
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form className="p-6 md:p-8 space-y-8" onSubmit={(e) => e.preventDefault()}>
            
            {/* 1. FOTOS */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-4">Galería de Fotos</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <label className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors h-32">
                        <Upload className="text-gray-400 mb-2" />
                        <span className="text-xs font-medium text-blue-600">Agregar fotos</span>
                        <input type="file" multiple className="hidden" onChange={handleImageUpload} />
                    </label>

                    {images.map((img, index) => (
                        <div key={index} className="relative group rounded-xl overflow-hidden h-32 border border-gray-200">
                            <img src={img} alt="Preview" className="w-full h-full object-cover" />
                            <button 
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-white/90 text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition shadow-sm"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* 2. DATOS PRINCIPALES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <div className="relative">
                        <input type="text" name="name" value={formData.name} onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Ej. Apartamento Vista Mar" />
                        <FileText className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección / Ubicación</label>
                    <div className="relative">
                        <input type="text" name="address" value={formData.address} onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Ej. Pozos Colorados, Edificio..." />
                        <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Número Apto/Hab</label>
                    <div className="relative">
                        <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Ej. 1305" />
                        <Hash className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad (Personas)</label>
                    <div className="relative">
                        <input type="number" name="capacity" value={formData.capacity} onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Ej. 4" />
                        <Users className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio por Noche (COP)</label>
                    <div className="relative">
                        <input type="number" name="price" value={formData.price} onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Ej. 250000" />
                        <DollarSign className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                </div>
            </div>

            {/* 3. COMODIDADES (NUEVO SECCIÓN) */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Servicios y Comodidades</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {amenitiesOptions.map((option) => {
                        const isSelected = selectedAmenities.includes(option.id);
                        return (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => toggleAmenity(option.id)}
                                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                                    isSelected
                                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
                                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                {isSelected && <Check size={14} className="text-blue-600" />}
                                {option.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 4. DESCRIPCIÓN */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea 
                    name="description" 
                    rows="5" 
                    value={formData.description} 
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Describe los detalles que enamoran..."
                ></textarea>
            </div>

            {/* BOTONES FINALES */}
            <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={onCancel} className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition">
                    Cancelar
                </button>
                <button type="button" onClick={handleSubmit} className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                    Guardar Propiedad
                </button>
            </div>

        </form>
      </div>
    </div>
  );
};

export default CreateRoomForm;