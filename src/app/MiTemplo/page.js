"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Montserrat, Poppins } from 'next/font/google';

// IMPORTAMOS EL PUENTE DE SUPABASE
import { supabase } from '@/lib/supabase';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function MiTemplo() {
  const router = useRouter();

  // --- 1. ESTADOS PARA GUARDAR LO QUE EL USUARIO ESCRIBE ---
  const [edad, setEdad] = useState('');
  const [peso, setPeso] = useState('');
  const [alergias, setAlergias] = useState('');
  const [estatura, setEstatura] = useState('');
  const [genero, setGenero] = useState('');
  const [actividadFisica, setActividadFisica] = useState('');

  // Estados para manejar la carga visual y errores
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // --- 2. FUNCIÓN PARA GUARDAR EN SUPABASE ---
  const handleGuardarTemplo = async (e) => {
    e.preventDefault(); 
    setCargando(true);
    setError(null);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error("No hay una sesión activa. Por favor, regresa al Login e inicia sesión.");
      }

      // --- CORRECCIÓN AQUÍ: Convertimos el texto de alergias en un Array ---
      // Si el usuario escribe "Nueces, Polen", esto lo convierte en ["Nueces", "Polen"]
      // Si no escribe nada, envía un array vacío []
      const listaAlergias = alergias 
        ? alergias.split(',').map(item => item.trim()) 
        : [];

      // B. Guardamos los datos en la gran tabla 'perfiles_goat'
      const { error: dbError } = await supabase
        .from('perfiles_goat')
        .upsert({
          id: user.id, 
          edad: parseInt(edad),
          peso: parseFloat(peso),
          alergias: listaAlergias, // ENVIAMOS EL ARRAY CORREGIDO
          estatura: parseFloat(estatura),
          genero: genero,
          actividad_fisica: actividadFisica
        });

      if (dbError) throw dbError;

      router.push('/MiTesoro'); 

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-pink-50 to-green-200 p-6 relative overflow-hidden ${poppins.className}`}>
      
      {/* ELEMENTOS DE FONDO */}
      <svg className="absolute -top-24 -left-24 w-[30rem] h-[30rem] text-teal-900 opacity-5 rotate-12 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      
      {/* NAVEGACIÓN SUPERIOR */}
      <Link href="/Validacion" className="absolute top-8 left-8 md:top-10 md:left-12 flex items-center gap-3 text-gray-800 hover:text-teal-800 transition-all font-bold text-xl md:text-2xl bg-white/40 hover:bg-white/80 px-5 py-2.5 rounded-full backdrop-blur-md z-10 shadow-sm hover:shadow-md">
        <span className="text-2xl md:text-3xl leading-none">&larr;</span> Atrás
      </Link>

      <img src="/logoext.png" alt="Logo GOAT" className="absolute top-8 right-8 md:top-10 md:right-12 h-16 md:h-28 w-auto object-contain z-10 drop-shadow-sm" />
      
      {/* TARJETA PRINCIPAL */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 w-full max-w-5xl shadow-2xl z-10 mt-20 md:mt-0">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-10 border-b border-gray-200 pb-6 gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="bg-teal-700 p-3 rounded-full mb-4 shadow-md text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h2 className={`${montserrat.className} text-3xl md:text-4xl font-black text-black`}>Mi Templo</h2>
            <p className="text-gray-600 text-lg font-medium">Datos para tu salud física</p>
          </div>
          <div className="bg-teal-600/5 rounded-2xl p-4 max-w-sm flex items-start">
            <svg className="w-6 h-6 text-teal-700 mr-3 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-teal-900 font-medium text-sm md:text-base text-left leading-snug">Estos datos nos ayudan a calcular tu ingesta calórica e hidratación ideal.</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl font-medium text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleGuardarTemplo} className="flex flex-col gap-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* INPUTS - Se mantienen igual pero alergias ahora acepta texto y se convierte antes de guardar */}
            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Edad:</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all">
                <input type="number" required value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="25" className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 font-medium" />
                <span className="text-gray-400 font-medium ml-2">años</span>
              </div>
            </div>

            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Peso:</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all">
                <input type="number" step="0.1" required value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="60" className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 font-medium" />
                <span className="text-gray-400 font-medium ml-2">kg</span>
              </div>
            </div>

            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Alergias:</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all">
                <input type="text" value={alergias} onChange={(e) => setAlergias(e.target.value)} placeholder="Nueces, Cacao" className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 font-medium" />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Estatura:</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all">
                <input type="number" required value={estatura} onChange={(e) => setEstatura(e.target.value)} placeholder="165" className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 font-medium" />
                <span className="text-gray-400 font-medium ml-2">cm</span>
              </div>
            </div>

            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Género:</label>
              <div className={`flex items-center rounded-full p-1 border h-[52px] ${genero ? 'bg-[#F4EBE0] border-transparent' : 'bg-white border-gray-300'}`}>
                <button type="button" onClick={() => setGenero('Femenino')} className={`flex-1 flex justify-center items-center h-full rounded-full transition-all ${genero === 'Femenino' ? 'bg-rose-400 text-white shadow-md' : 'text-gray-500'}`}>
                  Femenino
                </button>
                <button type="button" onClick={() => setGenero('Masculino')} className={`flex-1 flex justify-center items-center h-full rounded-full transition-all ${genero === 'Masculino' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-500'}`}>
                  Masculino
                </button>
              </div>
            </div>

            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Actividad física:</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all">
                <select required value={actividadFisica} onChange={(e) => setActividadFisica(e.target.value)} className="bg-transparent outline-none w-full text-gray-800 font-medium cursor-pointer appearance-none">
                  <option value="" disabled>Selecciona tu nivel</option>
                  <option value="sedentario">Poca o ninguna</option>
                  <option value="ligera">Ligera</option>
                  <option value="moderada">Moderada</option>
                  <option value="intensa">Intensa</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button type="submit" disabled={cargando || !genero} className={`w-full text-white font-bold text-xl py-4 rounded-full transition-all ${cargando || !genero ? 'bg-gray-400' : 'bg-teal-700 hover:bg-teal-800'}`}>
              {cargando ? 'Guardando...' : 'Siguiente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}