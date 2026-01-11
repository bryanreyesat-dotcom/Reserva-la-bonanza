/* ========================================================================
 * SECCIÓN 1: IMPORTACIONES Y CONFIGURACIÓN INICIAL
 * ======================================================================== */
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import process from 'process'; 

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ========================================================================
 * SECCIÓN 2: MIDDLEWARES (Seguridad y Formato)
 * ======================================================================== */
app.use(cors());         // Permite conexión desde el Frontend
app.use(express.json()); // Habilita lectura de JSON en el body

/* ========================================================================
 * SECCIÓN 3: CONEXIÓN A BASE DE DATOS (SUPABASE)
 * ======================================================================== */
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

let supabase;

if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ [DB] Conexión a Supabase establecida.');
} else {
    console.warn('⚠️ [DB] ADVERTENCIA: No se encontraron las llaves en .env');
}

// --- SOLUCIÓN AL ERROR ---
// Middleware para inyectar Supabase en cada petición (Así la variable se "usa")
app.use((req, res, next) => {
    req.supabase = supabase;
    next();
});

/* ========================================================================
 * SECCIÓN 4: RUTAS Y ENDPOINTS (API)
 * ======================================================================== */

// --- 4.1 RUTA DE PRUEBA (Health Check) ---
app.get('/', (req, res) => {
    res.send('🚀 Servidor Backend de Inmobiliaria funcionando correctamente.');
});

// --- 4.2 RUTA DE COTIZACIÓN (Ejemplo de Lógica de Negocio) ---
app.post('/api/reservas/cotizar', (req, res) => {
    try {
        const { precioNoche, noches } = req.body;
        
        if (!precioNoche || !noches) {
            return res.status(400).json({ error: 'Faltan datos para cotizar.' });
        }

        const subtotal = precioNoche * noches;
        const tarifaServicio = subtotal * 0.10; // 10% de servicio
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

/* ========================================================================
 * SECCIÓN 5: INICIALIZACIÓN DEL SERVIDOR
 * ======================================================================== */
app.listen(PORT, () => {
    console.log(`\n---------------------------------------------------------`);
    console.log(`📡 Servidor escuchando en: http://localhost:${PORT}`);
    console.log(`---------------------------------------------------------\n`);
});