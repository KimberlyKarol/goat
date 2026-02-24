import React from 'react';
import Link from 'next/link';
import { Montserrat, Poppins } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export default function Login() {
  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-pink-50 to-green-200 p-6 relative overflow-hidden ${poppins.className}`}>
      
      {/* ================================================================== */}
      {/* ELEMENTOS DE FONDO SUTILES */}
      {/* ================================================================== */}
      {/* Ícono de SALUD */}
      <svg className="absolute -top-24 -left-24 w-[30rem] h-[30rem] text-teal-900 opacity-5 rotate-12 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      {/* Ícono de FINANZAS */}
      <svg className="absolute -bottom-32 -right-32 w-[34rem] h-[34rem] text-yellow-700 opacity-5 -rotate-12 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.95V5h-2.35v1.73c-1.6.35-2.68 1.49-2.68 2.87 0 1.7 1.36 2.55 3.43 3.05 1.8.42 2.27 1.03 2.27 1.77 0 .94-.87 1.61-2.21 1.61-1.54 0-2.24-.8-2.31-1.84h-1.76c.09 1.58 1.05 2.72 2.68 3.13V20h2.35v-1.76c1.74-.39 2.86-1.54 2.86-3.14 0-1.72-1.3-2.58-3.44-3.09z"/>
      </svg>

      {/* ================================================================== */}
      {/* CONTENIDO PRINCIPAL */}
      {/* ================================================================== */}

      {/* Botón Atrás */}
      <Link href="/Bienvenida" className="absolute top-8 left-8 md:top-10 md:left-12 flex items-center gap-3 text-gray-800 hover:text-teal-800 transition-all font-bold text-xl md:text-2xl bg-white/40 hover:bg-white/80 px-5 py-2.5 rounded-full backdrop-blur-md z-10 shadow-sm hover:shadow-md">
        <span className="text-2xl md:text-3xl leading-none">&larr;</span> Atrás
      </Link>

      {/* Logo GOAT (Alineado con el botón Atrás) */}
      <img 
        src="/logoext.png" 
        alt="Logo GOAT" 
        className="absolute top-8 right-8 md:top-10 md:right-12 h-16 md:h-28 w-auto object-contain z-10 drop-shadow-sm" 
      />

      {/* Tarjeta de Login Flotante - Con mt-16 para evitar que choque con el header en móviles */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 w-full max-w-lg shadow-2xl text-center z-10 mt-16 md:mt-0">
        
        {/* Saludo */}
        <h2 className={`${montserrat.className} text-3xl md:text-4xl font-black text-black mb-2`}>
          ¡Te damos la bienvenida!
        </h2>
        <p className="text-gray-700 text-lg font-medium mb-8">
          Tu proceso te está esperando...
        </p>

        {/* Formulario */}
        <form className="flex flex-col gap-5 mb-8 text-left">
          
          {/* Input Correo */}
          <div className="w-full">
            <label className="block text-gray-800 font-semibold mb-2 ml-2">Correo</label>
            <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all">
              <svg className="w-5 h-5 text-gray-600 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <input 
                type="email" 
                placeholder="GOAT@ejemplo.com" 
                className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 font-medium"
              />
            </div>
          </div>

          {/* Input Contraseña */}
          <div className="w-full">
            <label className="block text-gray-800 font-semibold mb-2 ml-2">Contraseña</label>
            <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all">
              <svg className="w-5 h-5 text-gray-600 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
              </svg>
              <input 
                type="password" 
                placeholder="••••••••••••" 
                className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 tracking-widest"
              />
            </div>
          </div>
        </form>

        {/* Botón Ingresar */}
        <div className="mt-8">
          <Link href="/Dashboard" className="w-full flex justify-center bg-teal-700 hover:bg-teal-800 text-white font-bold text-xl py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1">
            Ingresar
          </Link>
        </div>

        {/* Enlace de registro */}
        <p className="text-gray-600 font-medium text-sm md:text-base">
          ¿Aún no tienes cuenta? <Link href="/Registro" className="text-teal-700 font-bold hover:underline">Regístrate</Link>
        </p>

      </div>
    </div>
  );
}