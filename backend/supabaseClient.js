import { createClient } from '@supabase/supabase-js'

// 1. Cargamos las variables de entorno que definiste en el paso anterior
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 2. Validación de seguridad para desarrollo
// Si por alguna razón no las encuentra, te avisa en la consola en lugar de fallar en silencio
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ ALERTA CRÍTICA: Faltan las variables de entorno de Supabase en .env')
}

// 3. Creamos y exportamos la única instancia del cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey)