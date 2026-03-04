import { createClient } from '@supabase/supabase-js';

// Leemos las variables ocultas de tu archivo .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Creamos y exportamos el "cliente" (el puente de conexión)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);