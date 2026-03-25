// lib/destinoService.js
import { supabase } from './supabase';

export const destinoService = {
  async getDatosCompletos() {
    const { data: perfil } = await supabase.from('perfiles_goat').select('*').single();
    const { data: hitos } = await supabase.from('hitos_ruta').select('*').order('fecha', { ascending: true });
    return { perfil, hitos };
  },

  async borrarHito(id) {
    return await supabase.from('hitos_ruta').delete().eq('id', id);
  },

  async actualizarHito(id, datos) {
    return await supabase.from('hitos_ruta').update(datos).eq('id', id).select();
  },

  async insertarHitos(nuevosHitos) {
    return await supabase.from('hitos_ruta').insert(nuevosHitos).select();
  },

  async actualizarPerfil(id, datos) {
    return await supabase.from('perfiles_goat').update(datos).eq('id', id);
  },

  async limpiarHitos() {
    return await supabase.from('hitos_ruta').delete().neq('id', 0);
  }
};