import { createClient } from '@supabase/supabase-js';

// Acedemos às variáveis de ambiente que configurámos no ficheiro .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Criamos e exportamos a constante de conexão para que todo o nosso sistema a possa utilizar
export const supabase = createClient(supabaseUrl, supabaseAnonKey);