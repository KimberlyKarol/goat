"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Montserrat, Poppins } from 'next/font/google';

// IMPORTAMOS SUPABASE
import { supabase } from '@/lib/supabase';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function MiTesoroRegistro() {
  const router = useRouter();

  // Estados para las finanzas
  const [ingresoMensual, setIngresoMensual] = useState('');
  const [gastoFijo, setGastoFijo] = useState('');
  const [metaAhorro, setMetaAhorro] = useState('');
  const [deudas, setDeudas] = useState('');

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const handleGuardarTesoro = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error("No hay una sesión activa.");

      // USAMOS UPDATE para no borrar los datos de salud previos
      const { error: dbError } = await supabase
        .from('perfiles_goat')
        .update({
          ingreso_mensual: parseFloat(ingresoMensual),
          gasto_fijo: parseFloat(gastoFijo),
          meta_ahorro: parseFloat(metaAhorro),
          deudas: parseFloat(deudas)
        })
        .eq('id', user.id); // Condición: Actualiza donde el ID sea el de este usuario

      if (dbError) throw dbError;

      // Avanzamos a la última pantalla del onboarding
      router.push('/MiDestino'); 

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
      <Link href="/MiTemplo" className="absolute top-8 left-8 md:top-10 md:left-12 flex items-center gap-3 text-gray-800 hover:text-teal-800 transition-all font-bold text-xl md:text-2xl bg-white/40 hover:bg-white/80 px-5 py-2.5 rounded-full backdrop-blur-md z-10 shadow-sm">
        <span className="text-2xl md:text-3xl leading-none">&larr;</span> Atrás
      </Link>

      <img src="/logoext.png" alt="Logo GOAT" className="absolute top-8 right-8 md:top-10 md:right-12 h-16 md:h-28 w-auto object-contain z-10 drop-shadow-sm" />
      
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 w-full max-w-4xl shadow-2xl z-10 mt-20 md:mt-0">
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-10 border-b border-gray-200 pb-6 gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="bg-teal-700 p-3 rounded-full mb-4 shadow-md text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
            </div>
            <h2 className={`${montserrat.className} text-3xl md:text-4xl font-black text-black`}>Mi Tesoro</h2>
            <p className="text-gray-600 text-lg font-medium">Tus finanzas personales</p>
          </div>
          <div className="bg-teal-600/5 rounded-2xl p-4 max-w-sm flex items-start border border-teal-100">
            <svg className="w-6 h-6 text-teal-700 mr-3 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            <p className="text-teal-900 font-medium text-sm md:text-base text-left leading-snug">La información financiera es privada y solo se usa para tus proyecciones.</p>
          </div>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl font-medium text-sm text-center">{error}</div>}

        <form onSubmit={handleGuardarTesoro} className="flex flex-col gap-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Ingreso Mensual Neto:</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all">
                <span className="text-gray-500 font-bold mr-2">$</span>
                <input type="number" required value={ingresoMensual} onChange={(e) => setIngresoMensual(e.target.value)} placeholder="15000" className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 font-medium" />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Meta de Ahorro (Mensual):</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all">
                <span className="text-gray-500 font-bold mr-2">$</span>
                <input type="number" required value={metaAhorro} onChange={(e) => setMetaAhorro(e.target.value)} placeholder="5000" className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 font-medium" />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Gasto Fijo Principal:</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all">
                <span className="text-gray-500 font-bold mr-2">$</span>
                <input type="number" required value={gastoFijo} onChange={(e) => setGastoFijo(e.target.value)} placeholder="5000" className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 font-medium" />
              </div>
              <p className="text-xs text-gray-500 ml-4 mt-2">Renta, hipoteca, colegiaturas, etc.</p>
            </div>

            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Deudas Totales:</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all">
                <span className="text-gray-500 font-bold mr-2">$</span>
                <input type="number" required value={deudas} onChange={(e) => setDeudas(e.target.value)} placeholder="2000" className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 font-medium" />
              </div>
              <p className="text-xs text-gray-500 ml-4 mt-2">Tarjetas de crédito o préstamos.</p>
            </div>
          </div>

          <div className="mt-8">
            <button type="submit" disabled={cargando} className={`w-full flex justify-center text-white font-bold text-xl py-4 rounded-full transition-all duration-300 shadow-md ${cargando ? 'bg-gray-400 cursor-wait' : 'bg-teal-700 hover:bg-teal-800 hover:shadow-xl hover:-translate-y-1'}`}>
              {cargando ? 'Guardando...' : 'Siguiente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}