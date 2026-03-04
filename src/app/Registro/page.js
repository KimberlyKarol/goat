"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Montserrat, Poppins } from 'next/font/google';

// IMPORTAMOS SUPABASE
import { supabase } from '@/lib/supabase';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function Registro() {
  const router = useRouter();

  // Estados
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Función de Registro
  const handleRegistro = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    const { data, error: supabaseError } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          nombres: nombres,
          apellidos: apellidos,
        }
      }
    });

    if (supabaseError) {
      setError(supabaseError.message);
      setCargando(false);
    } else {
      // AQUÍ ESTÁ LA MAGIA: Mandamos el correo por la URL a la página de validación
      router.push(`/Validacion?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-green-100 p-4 relative overflow-hidden ${poppins.className}`}>
      
      {/* Botón Atrás */}
      <Link href="/Login" className="absolute top-8 left-8 md:top-10 md:left-12 flex items-center gap-3 text-gray-800 hover:text-teal-800 transition-all font-bold text-xl md:text-2xl bg-white/40 hover:bg-white/80 px-5 py-2.5 rounded-full backdrop-blur-md z-10 shadow-sm hover:shadow-md">
        <span className="text-2xl md:text-3xl leading-none">&larr;</span> Atrás
      </Link>

      <div className="bg-white rounded-[2rem] p-8 md:p-12 w-full max-w-2xl shadow-2xl relative z-10 mt-16 md:mt-0">
        
        <div className="flex flex-col items-center mb-10">
          <div className="bg-teal-700 p-4 rounded-full text-white mb-4 shadow-md">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
          <h1 className={`${montserrat.className} text-4xl font-black text-gray-900 mb-2`}>Identidad</h1>
          <p className="text-gray-500 font-medium">Tus credenciales de acceso</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl font-medium text-sm text-center border border-red-100">
            {error === 'User already registered' ? 'Este correo ya está registrado.' : error}
          </div>
        )}

        <form onSubmit={handleRegistro} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <label className="block text-gray-900 font-bold mb-2 text-sm ml-1">Nombres:</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>
                <input type="text" required value={nombres} onChange={(e) => setNombres(e.target.value)} placeholder="Ej. Ana Laura" className="w-full bg-[#F5EFE6] rounded-full py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-teal-600 transition-all font-medium text-gray-800" />
              </div>
            </div>

            <div>
              <label className="block text-gray-900 font-bold mb-2 text-sm ml-1">Apellidos:</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>
                <input type="text" required value={apellidos} onChange={(e) => setApellidos(e.target.value)} placeholder="Ej. De la O Escobedo" className="w-full bg-[#F5EFE6] rounded-full py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-teal-600 transition-all font-medium text-gray-800" />
              </div>
            </div>

            <div>
              <label className="block text-gray-900 font-bold mb-2 text-sm ml-1">Correo Electrónico:</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="AnaLau27@gmail.com" className="w-full bg-[#F5EFE6] rounded-full py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-teal-600 transition-all font-medium text-gray-800" />
              </div>
            </div>

            <div>
              <label className="block text-gray-900 font-bold mb-2 text-sm ml-1">Contraseña:</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg></div>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" minLength="6" className="w-full bg-[#F5EFE6] rounded-full py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-teal-600 transition-all tracking-widest text-gray-800" />
              </div>
            </div>

          </div>

          <button 
            type="submit" 
            disabled={cargando}
            className={`w-full mt-8 py-4 rounded-full font-bold text-xl text-white transition-all shadow-md ${cargando ? 'bg-teal-500 cursor-not-allowed' : 'bg-teal-700 hover:bg-teal-800 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer'}`}
          >
            {cargando ? 'Creando cuenta...' : 'Continuar'}
          </button>
        </form>
      </div>
    </div>
  );
}