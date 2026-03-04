"use client";

import React, { useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Montserrat, Poppins } from 'next/font/google';

// IMPORTAMOS SUPABASE
import { supabase } from '@/lib/supabase';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

// Componente interno que usa useSearchParams
function FormularioValidacion() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const email = searchParams.get('email') || 'tu correo';

  // AHORA SON 8 ESPACIOS EN BLANCO
  const [codigo, setCodigo] = useState(['', '', '', '', '', '', '', '']);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  
  const inputRefs = useRef([]);

  // --- LÓGICA DE LOS 8 CUADRITOS ---
  const handleChange = (e, index) => {
    // Ahora permite letras y números, y lo convierte a mayúsculas para que se vea mejor
    const value = e.target.value.toUpperCase(); 
    
    // Evita símbolos raros, solo letras y números
    if (/[^A-Z0-9]/.test(value)) return; 

    const nuevoCodigo = [...codigo];
    nuevoCodigo[index] = value;
    setCodigo(nuevoCodigo);

    // Salta al siguiente cuadrito (ahora el límite es 7 en lugar de 5)
    if (value !== '' && index < 7) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && codigo[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // --- LÓGICA PARA VERIFICAR EN SUPABASE REAL ---
  const handleValidar = async (e) => {
    e.preventDefault();
    const tokenCompleto = codigo.join(''); 

    // Verificamos que tenga los 8 caracteres
    if (tokenCompleto.length < 8) {
      setError("Por favor ingresa los 8 caracteres completos.");
      return;
    }

    setCargando(true);
    setError(null);

    try {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: email,
        token: tokenCompleto,
        type: 'signup' // Verifica que sea un registro nuevo
      });

      if (verifyError) throw verifyError;

      // ¡ÉXITO! Lo mandamos a Mi Templo
      router.push('/MiTemplo');

    } catch (err) {
      console.error(err);
      setError("Código incorrecto o expirado. Revisa tu correo e intenta de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 md:p-12 w-full max-w-lg shadow-2xl relative text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-teal-700 p-4 rounded-full text-white shadow-md">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
      </div>
      
      <h1 className={`${montserrat.className} text-3xl font-black text-gray-900 mb-2`}>Revisa tu correo</h1>
      <p className="text-gray-500 font-medium mb-8">
        Hemos enviado un código seguro a <br/>
        <strong className="text-teal-700 break-all">{email}</strong>
      </p>

      {error && (
        <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-xl font-bold text-sm border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleValidar}>
        {/* LOS 8 CUADRITOS AJUSTADOS PARA MÓVIL */}
        <div className="flex justify-center gap-1.5 md:gap-2 mb-8">
          {codigo.map((digito, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digito}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-12 md:w-12 md:h-14 text-center text-lg md:text-xl font-black text-gray-800 bg-[#F5EFE6] rounded-lg outline-none focus:ring-2 focus:ring-teal-600 transition-all border border-transparent focus:border-teal-500 shadow-inner uppercase"
            />
          ))}
        </div>

        <button 
          type="submit" 
          disabled={cargando}
          className={`w-full py-4 rounded-full font-bold text-lg text-white transition-all shadow-md ${cargando ? 'bg-teal-500 cursor-wait' : 'bg-teal-700 hover:bg-teal-800 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer'}`}
        >
          {cargando ? 'Validando...' : 'Validar y Continuar'}
        </button>
      </form>
    </div>
  );
}

// Componente Principal que envuelve todo
export default function Validacion() {
  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-green-100 p-4 relative ${poppins.className}`}>
      
      {/* Botón Atrás */}
      <Link href="/Login" className="absolute top-8 left-8 flex items-center gap-2 text-gray-800 hover:text-teal-800 transition-all font-bold text-xl bg-white/50 hover:bg-white/80 px-5 py-2 rounded-full backdrop-blur-md z-10 shadow-sm">
        <span>&larr;</span> Atrás
      </Link>

      {/* Logo */}
      <img src="/logoext.png" alt="Logo GOAT" className="absolute top-8 right-8 h-12 w-auto object-contain z-10 drop-shadow-sm" />

      {/* Suspense es necesario en Next.js 13+ al usar SearchParams */}
      <Suspense fallback={<div className="text-teal-800 font-bold">Cargando validador...</div>}>
        <FormularioValidacion />
      </Suspense>
    </div>
  );
}