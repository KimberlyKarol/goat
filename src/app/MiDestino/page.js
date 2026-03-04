"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Montserrat, Poppins } from 'next/font/google';

// IMPORTAMOS SUPABASE
import { supabase } from '@/lib/supabase';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function MiDestinoRegistro() {
  const router = useRouter();

  // Estados para las metas
  const [granSueno, setGranSueno] = useState('');
  const [fechaIdeal, setFechaIdeal] = useState('');
  const [categoriaSueno, setCategoriaSueno] = useState('');

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const handleGuardarDestino = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error("No hay una sesión activa.");

      // USAMOS UPDATE para finalizar el perfil
      const { error: dbError } = await supabase
        .from('perfiles_goat')
        .update({
          gran_sueno: granSueno,
          fecha_ideal: fechaIdeal,
          categoria_sueno: categoriaSueno
        })
        .eq('id', user.id);

      if (dbError) throw dbError;

      // ¡REGISTRO COMPLETADO! Vamos al Dashboard
      router.push('/Dashboard'); 

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-pink-50 to-green-200 p-6 relative overflow-hidden ${poppins.className}`}>
      
      {/* Botón Atrás */}
      <Link href="/MiTesoro" className="absolute top-8 left-8 md:top-10 md:left-12 flex items-center gap-3 text-gray-800 hover:text-teal-800 transition-all font-bold text-xl md:text-2xl bg-white/40 hover:bg-white/80 px-5 py-2.5 rounded-full backdrop-blur-md z-10 shadow-sm">
        <span className="text-2xl md:text-3xl leading-none">&larr;</span> Atrás
      </Link>

      <img src="/logoext.png" alt="Logo GOAT" className="absolute top-8 right-8 md:top-10 md:right-12 h-16 md:h-28 w-auto object-contain z-10 drop-shadow-sm" />
      
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 w-full max-w-4xl shadow-2xl z-10 mt-20 md:mt-0">
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-10 border-b border-gray-200 pb-6 gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="bg-teal-700 p-3 rounded-full mb-4 shadow-md text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
            </div>
            <h2 className={`${montserrat.className} text-3xl md:text-4xl font-black text-black`}>Mi Destino</h2>
            <p className="text-gray-600 text-lg font-medium">Visualiza tus metas</p>
          </div>
          <div className="bg-teal-600/5 rounded-2xl p-4 max-w-sm flex items-start border border-teal-100">
            <svg className="w-6 h-6 text-teal-700 mr-3 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p className="text-teal-900 font-medium text-sm md:text-base text-left leading-snug">Define tu norte. ¿Qué es lo más importante para ti este año?</p>
          </div>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl font-medium text-sm text-center">{error}</div>}

        <form onSubmit={handleGuardarDestino} className="flex flex-col gap-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            {/* TU GRAN SUEÑO */}
            <div className="w-full md:row-span-2">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Tu Gran Sueño:</label>
              <div className="flex bg-[#F4EBE0] rounded-2xl p-4 border border-transparent focus-within:border-teal-600 transition-all h-full min-h-[120px]">
                <svg className="w-6 h-6 text-gray-500 mr-3 shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                <textarea 
                  required 
                  value={granSueno} 
                  onChange={(e) => setGranSueno(e.target.value)} 
                  placeholder="Ej. Viajar a Japón, Comprar mi casa, Correr un maratón..." 
                  className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 font-medium resize-none"
                />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Fecha Ideal:</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all">
                <input type="date" required value={fechaIdeal} onChange={(e) => setFechaIdeal(e.target.value)} className="bg-transparent outline-none w-full text-gray-800 font-medium cursor-pointer" />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Categoría:</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all relative">
                <svg className="w-5 h-5 text-gray-500 mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                <select required value={categoriaSueno} onChange={(e) => setCategoriaSueno(e.target.value)} className="bg-transparent outline-none w-full text-gray-800 font-medium appearance-none cursor-pointer">
                  <option value="" disabled>Selecciona una categoría</option>
                  <option value="Salud y Bienestar">Salud y Bienestar</option>
                  <option value="Finanzas y Patrimonio">Finanzas y Patrimonio</option>
                  <option value="Viajes y Experiencias">Viajes y Experiencias</option>
                  <option value="Crecimiento Profesional">Crecimiento Profesional</option>
                  <option value="Desarrollo Personal">Desarrollo Personal</option>
                </select>
                <div className="absolute right-4 pointer-events-none text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button type="submit" disabled={cargando} className={`w-full flex justify-center text-white font-bold text-xl py-4 rounded-full transition-all duration-300 shadow-md ${cargando ? 'bg-gray-400 cursor-wait' : 'bg-teal-700 hover:bg-teal-800 hover:shadow-xl hover:-translate-y-1'}`}>
              {cargando ? 'Finalizando...' : 'Terminado'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}