const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// 1. Configuración del Servidor
const app = express();
const PORT = process.env.PORT || 5000;

// 2. Middlewares (Permisos y formato de datos)
app.use(cors()); // Permite conexiones desde tu Frontend (React)
app.use(express.json()); // Permite recibir datos en formato JSON

// 3. Conexión a Supabase (Backend)
// Intenta leer las llaves del archivo .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

let supabase;

if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Conexión a Supabase establecida correctamente.');
} else {
    console.warn('⚠️ ADVERTENCIA: No se encontraron las llaves de Supabase en el archivo .env');
}

// 4. Rutas (Endpoints)

// Ruta de prueba base
app.get('/', (req, res) => {
    res.send('🚀 Servidor Backend de Inmobiliaria funcionando correctamente.');
});

// Ejemplo: Ruta para calcular precios (Lógica de negocio segura)
app.post('/api/reservas/cotizar', (req, res) => {
    try {
        const { precioNoche, noches } = req.body;
        
        if (!precioNoche || !noches) {
            return res.status(400).json({ error: 'Faltan datos para cotizar.' });
        }

        // Simulación de cálculo complejo (Impuestos, tarifas, descuentos)
        const subtotal = precioNoche * noches;
        const tarifaServicio = subtotal * 0.10; // 10%
        const total = subtotal + tarifaServicio;

        res.json({
            success: true,
            desglose: {
                subtotal,
                tarifaServicio,
                total
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Iniciar el Servidor
app.listen(PORT, () => {
    console.log(`\n---------------------------------------------------------`);
    console.log(`📡 Servidor escuchando en: http://localhost:${PORT}`);
    console.log(`---------------------------------------------------------\n`);
});