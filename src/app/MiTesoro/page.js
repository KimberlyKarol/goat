import React from 'react';
import Link from 'next/link';
import { Montserrat, Poppins } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function MiTesoro() {
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
      <Link href="/MiTemplo" className="absolute top-8 left-8 md:top-10 md:left-12 flex items-center gap-3 text-gray-800 hover:text-teal-800 transition-all font-bold text-xl md:text-2xl bg-white/40 hover:bg-white/80 px-5 py-2.5 rounded-full backdrop-blur-md z-10 shadow-sm hover:shadow-md">
        <span className="text-2xl md:text-3xl leading-none">&larr;</span> Atrás
      </Link>

      <img 
        src="/logoext.png" 
        alt="Logo GOAT" 
        className="absolute top-8 right-8 md:top-10 md:right-12 h-16 md:h-28 w-auto object-contain z-10 drop-shadow-sm" 
      />
      {/* TARJETA PRINCIPAL MI TESORO */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 w-full max-w-4xl shadow-2xl z-10 mt-20 md:mt-0">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-10 border-b border-gray-200 pb-6 gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="bg-teal-700 p-3 rounded-full mb-4 shadow-md text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M21 12V7H5a2 2 0 010-4h14v4" />
                <path d="M3 5v14a2 2 0 002 2h16v-5" />
                <path d="M18 12a2 2 0 000 4h4v-4h-4z" />
              </svg>
            </div>
            <h2 className={`${montserrat.className} text-3xl md:text-4xl font-black text-black`}>
              Mi Tesoro
            </h2>
            <p className="text-gray-600 text-lg font-medium">
              Tus finanzas personales
            </p>
          </div>

          <div className="bg-teal-600/5 rounded-2xl p-4 max-w-sm flex items-start">
            <svg className="w-6 h-6 text-teal-700 mr-3 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0110 0v4"></path>
            </svg>
            <p className="text-teal-900 font-medium text-sm md:text-base text-left leading-snug">
              La información financiera es privada y solo se usa para tus proyecciones.
            </p>
          </div>
        </div>

        {/* Formulario */}
        <form className="flex flex-col gap-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* 1. Ingreso Mensual Neto */}
            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Ingreso Mensual Neto:</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all">
                <svg className="w-5 h-5 text-gray-500 mr-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
                <span className="text-gray-600 font-bold mr-1 select-none pointer-events-none">$</span>
                {/* CAMBIO AQUÍ: type="text" con inputMode="numeric" y placeholder con coma */}
                <input type="text" inputMode="numeric" placeholder="15,000" className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 font-medium" />
              </div>
            </div>
            {/* 2. Meta de Ahorro */}
            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Meta de Ahorro (Mensual):</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all">
                <svg className="w-5 h-5 text-gray-500 mr-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
                <span className="text-gray-600 font-bold mr-1 select-none pointer-events-none">$</span>
                <input type="text" inputMode="numeric" placeholder="5,000" className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 font-medium" />
              </div>
            </div>
            {/* 3. Gasto Fijo Principal */}
            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Gasto Fijo Principal:</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all">
                <svg className="w-5 h-5 text-gray-500 mr-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path>
                </svg>
                <span className="text-gray-600 font-bold mr-1 select-none pointer-events-none">$</span>
                <input type="text" inputMode="numeric" placeholder="5,000" className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 font-medium" />
              </div>
              <p className="text-gray-500 text-sm ml-4 mt-2 font-medium">Renta, hipoteca, colegiaturas, etc.</p>
            </div>
            {/* 4. Deudas Totales */}
            <div className="w-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Deudas Totales:</label>
              <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all">
                <svg className="w-5 h-5 text-gray-500 mr-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                <span className="text-gray-600 font-bold mr-1 select-none pointer-events-none">$</span>
                <input type="text" inputMode="numeric" placeholder="2,000" className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 font-medium" />
              </div>
              <p className="text-gray-500 text-sm ml-4 mt-2 font-medium">Tarjetas de crédito o préstamos.</p>
            </div>
          </div>
          <div className="mt-8">
            <Link href="/MiDestino" className="w-full flex justify-center bg-teal-700 hover:bg-teal-800 text-white font-bold text-xl py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1">
              Siguiente
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}