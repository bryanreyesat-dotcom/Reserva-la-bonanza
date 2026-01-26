import React, { useState } from 'react';
import { Upload, X, DollarSign, Users, MapPin, Hash, FileText, Image as ImageIcon } from 'lucide-react';

const CreateRoomForm = ({ onCancel, onSave }) => {
  const [images, setImages] = useState([]);
  
  // Estado para guardar los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    roomNumber: '',
    capacity: '',
    price: '',
    address: '',
    description: ''
  });

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar subida de imágenes (Simulado visualmente)
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

  // Función al enviar
  const handleSubmit = () => {
    // Aquí validamos que haya datos antes de guardar
    console.log("Datos a guardar:", formData);
    console.log("Imágenes:", images);
    onSave(); // Llamamos a la función del padre
  };

  return (
    <div className="max-w-4xl mx-auto">
      
      {/* Encabezado del Formulario */}
      <div className="flex items-center justify-between mb-6">
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Publicar Nueva Habitación</h2>
            <p className="text-gray-500 text-sm">Completa la información para que los huéspedes puedan reservar.</p>
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
            
            {/* SECCIÓN 1: FOTOS */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-4">Fotos de la habitación</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Botón para subir */}
                    <label className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors h-32">
                        <Upload className="text-gray-400 mb-2" />
                        <span className="text-xs font-medium text-blue-600">Subir fotos</span>
                        <input type="file" multiple className="hidden" onChange={handleImageUpload} />
                    </label>

                    {/* Previsualización de imágenes */}
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

            {/* SECCIÓN 2: INFORMACIÓN BÁSICA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Nombre */}
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Habitación/Apto</label>
                    <div className="relative">
                        <input 
                            type="text"
                            name="name" // IMPORTANTE
                            value={formData.name} // CONECTADO
                            onChange={handleChange} // CONECTADO
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="Ej. Suite Vista al Mar"
                        />
                        <FileText className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                </div>

                {/* Dirección */}
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección exacta</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="Ej. Calle 10 #5-20, Edificio..."
                        />
                        <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                </div>

                {/* Número Habitación */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Número de Puerta / Apto</label>
                    <div className="relative">
                        <input 
                            type="text"
                            name="roomNumber"
                            value={formData.roomNumber}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="Ej. 304"
                        />
                        <Hash className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                </div>

                {/* Capacidad */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad Máxima (Personas)</label>
                    <div className="relative">
                        <input 
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="Ej. 4"
                        />
                        <Users className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                </div>

                {/* Precio */}
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio por Noche (COP)</label>
                    <div className="relative">
                        <input 
                            type="number" 
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="Ej. 150000"
                        />
                        <DollarSign className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                </div>

                {/* Descripción */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción detallada</label>
                    <textarea 
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="Describe las comodidades: Wifi, Aire Acondicionado, Vista, etc..."
                    ></textarea>
                </div>
            </div>

            {/* BOTÓN FINAL */}
            <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button 
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                    Cancelar
                </button>
                <button 
                    type="button"
                    onClick={handleSubmit}
                    className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                >
                    Publicar Habitación
                </button>
            </div>

        </form>
      </div>
    </div>
  );
};

export default CreateRoomForm;