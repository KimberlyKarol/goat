"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Montserrat, Poppins } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function MiTemplo() {
  const [genero, setGenero] = useState('');

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-pink-50 to-green-200 p-6 relative overflow-hidden ${poppins.className}`}>
      {/* ELEMENTOS DE FONDO SUTILES */}
      <svg className="absolute -top-24 -left-24 w-[30rem] h-[30rem] text-teal-900 opacity-5 rotate-12 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      <svg className="absolute -bottom-32 -right-32 w-[34rem] h-[34rem] text-yellow-700 opacity-5 -rotate-12 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.95V5h-2.35v1.73c-1.6.35-2.68 1.49-2.68 2.87 0 1.7 1.36 2.55 3.43 3.05 1.8.42 2.27 1.03 2.27 1.77 0 .94-.87 1.61-2.21 1.61-1.54 0-2.24-.8-2.31-1.84h-1.76c.09 1.58 1.05 2.72 2.68 3.13V20h2.35v-1.76c1.74-.39 2.86-1.54 2.86-3.14 0-1.72-1.3-2.58-3.44-3.09z"/>
      </svg>
      {/* NAVEGACIÓN SUPERIOR */}
      <Link href="/Validacion" className="absolute top-8 left-8 md:top-10 md:left-12 flex items-center gap-3 text-gray-800 hover:text-teal-800 transition-all font-bold text-xl md:text-2xl bg-white/40 hover:bg-white/80 px-5 py-2.5 rounded-full backdrop-blur-md z-10 shadow-sm hover:shadow-md">
        <span className="text-2xl md:text-3xl leading-none">&larr;</span> Atrás
      </Link>

      <img 
        src="/logoext.png" 
        alt="Logo GOAT" 
        className="absolute top-8 right-8 md:top-10 md:right-12 h-16 md:h-28 w-auto object-contain z-10 drop-shadow-sm" 
      />
      {/* TARJETA PRINCIPAL MI TEMPLO */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 w-full max-w-5xl shadow-2xl z-10 mt-20 md:mt-0">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-10 border-b border-gray-200 pb-6 gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="bg-teal-700 p-3 rounded-full mb-4 shadow-md text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h2 className={`${montserrat.className} text-3xl md:text-4xl font-black text-black`}>
              Mi Templo
            </h2>
            <p className="text-gray-600 text-lg font-medium">
              Datos para tu salud física
            </p>
          </div>
          <div className="bg-teal-600/5 rounded-2xl p-4 max-w-sm flex items-start">
            {/* Ícono de Información */}
            <svg className="w-6 h-6 text-teal-700 mr-3 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-teal-900 font-medium text-sm md:text-base text-left leading-snug">
              Estos datos nos ayudan a calcular tu ingesta calórica e hidratación ideal.
            </p>
          </div>
        </div>

        <form className="flex flex-col gap-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Edad:</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all">
                <input type="number" placeholder="25" className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 font-medium" />
                <span className="text-gray-400 font-medium select-none whitespace-nowrap ml-2">años</span>
              </div>
            </div>

            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Peso:</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all">
                <input type="number" placeholder="60" className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 font-medium" />
                <span className="text-gray-400 font-medium select-none whitespace-nowrap ml-2">kg</span>
              </div>
            </div>

            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Alergias:</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all">
                <input type="text" placeholder="Nueces, Cacao" className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 font-medium" />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Estatura:</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all">
                <svg className="w-5 h-5 text-gray-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path>
                </svg>
                <input type="number" placeholder="165" className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 font-medium" />
                <span className="text-gray-400 font-medium select-none whitespace-nowrap ml-2">cm</span>
              </div>
            </div>

            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Género:</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full p-1 border border-transparent focus-within:border-teal-600 transition-all">
                <button 
                  type="button"
                  onClick={() => setGenero('Femenino')}
                  className={`flex-1 flex justify-center items-center py-2 rounded-full transition-all duration-300 ${
                    genero === 'Femenino' 
                      ? 'bg-teal-700 text-white shadow-md' 
                      : 'text-gray-500 hover:text-teal-700 hover:bg-teal-600/10'
                  }`}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a5 5 0 100 10 5 5 0 000-10zM7 13.913a8.964 8.964 0 00-5 8.087h2a6.969 6.969 0 0116 0h2a8.964 8.964 0 00-5-8.087A6.983 6.983 0 0012 14a6.983 6.983 0 00-5-.087z"/>
                  </svg>
                </button>
                <button 
                  type="button"
                  onClick={() => setGenero('Masculino')}
                  className={`flex-1 flex justify-center items-center py-2 rounded-full transition-all duration-300 ${
                    genero === 'Masculino' 
                      ? 'bg-teal-700 text-white shadow-md' 
                      : 'text-gray-500 hover:text-teal-700 hover:bg-teal-600/10'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Actividad física:</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all relative">
                <select defaultValue="" className="bg-transparent outline-none w-full text-gray-800 font-medium appearance-none cursor-pointer">
                  <option value="" disabled>Selecciona tu nivel</option>
                  <option value="sedentario">Poca o ninguna</option>
                  <option value="ligera">Ligera (1-3 días/semana)</option>
                  <option value="moderada">Moderada (3-5 días/semana)</option>
                  <option value="intensa">Intensa (6-7 días/semana)</option>
                </select>
                <div className="absolute right-4 pointer-events-none text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/MiTesoro" className="w-full flex justify-center bg-teal-700 hover:bg-teal-800 text-white font-bold text-xl py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1">
              Siguiente
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}