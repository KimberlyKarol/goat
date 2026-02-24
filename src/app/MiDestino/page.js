"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Montserrat, Poppins } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function MiDestino() {
  const router = useRouter();
  // Estado para controlar la visibilidad del modal de éxito
  const [showModal, setShowModal] = useState(false);
  // Función que se ejecuta al hacer clic en "Terminado"
  const handleFinish = () => {
    // Mostramos la ventana de éxito
    setShowModal(true);
  };
  // Función para ir al Dashboard desde el modal
  const handleGoToDashboard = () => {
    router.push('/Dashboard');
  };
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
      <Link href="/MiTesoro" className="absolute top-8 left-8 md:top-10 md:left-12 flex items-center gap-3 text-gray-800 hover:text-teal-800 transition-all font-bold text-xl md:text-2xl bg-white/40 hover:bg-white/80 px-5 py-2.5 rounded-full backdrop-blur-md z-10 shadow-sm hover:shadow-md">
        <span className="text-2xl md:text-3xl leading-none">&larr;</span> Atrás
      </Link>

      <img 
        src="/logoext.png" 
        alt="Logo GOAT" 
        className="absolute top-8 right-8 md:top-10 md:right-12 h-16 md:h-28 w-auto object-contain z-10 drop-shadow-sm" 
      />
      {/* TARJETA PRINCIPAL MI DESTINO */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 w-full max-w-4xl shadow-2xl z-10 mt-20 md:mt-0">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-10 border-b border-gray-200 pb-6 gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="bg-teal-700 p-3 rounded-full mb-4 shadow-md text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
              </svg>
            </div>
            <h2 className={`${montserrat.className} text-3xl md:text-4xl font-black text-black`}>
              Mi Destino
            </h2>
            <p className="text-gray-600 text-lg font-medium">
              Visualiza tus metas
            </p>
          </div>

          <div className="bg-teal-600/5 rounded-2xl p-4 max-w-sm flex items-start">
            <svg className="w-6 h-6 text-teal-700 mr-3 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <p className="text-teal-900 font-medium text-sm md:text-base text-left leading-snug">
              Define tu norte. ¿Qué es lo más importante para ti este año?
            </p>
          </div>
        </div>

        <form className="flex flex-col gap-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-stretch">
            <div className="w-full flex flex-col h-full">
              <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Tu Gran Sueño:</label>
              <div className="flex items-start bg-[#F4EBE0] rounded-2xl px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all flex-grow">
                <svg className="w-6 h-6 text-gray-500 mr-3 mt-1 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <textarea 
                  rows="5" 
                  placeholder="Ej. Viajar a Japón, Comprar mi casa, Correr un maratón..." 
                  className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 font-medium resize-none mt-1 h-full" 
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-6 justify-between">
              <div className="w-full">
                <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Fecha Ideal:</label>
                <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all relative">
                  <svg className="w-5 h-5 text-gray-500 mr-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <input 
                    type="date" 
                    className="bg-transparent outline-none w-full text-gray-800 font-medium cursor-pointer" 
                  />
                </div>
              </div>

              <div className="w-full">
                <label className="block text-gray-800 font-bold mb-2 ml-2 text-lg">Categoría:</label>
                <div className="flex items-center bg-[#F4EBE0] rounded-full px-4 py-3 border border-transparent focus-within:border-teal-600 transition-all relative">
                  <svg className="w-5 h-5 text-gray-500 mr-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                  <select defaultValue="" className="bg-transparent outline-none w-full text-gray-800 font-medium appearance-none cursor-pointer">
                    <option value="" disabled>Selecciona una categoría</option>
                    <option value="salud">Salud y Bienestar</option>
                    <option value="finanzas">Finanzas y Patrimonio</option>
                    <option value="viajes">Viajes y Experiencias</option>
                    <option value="profesional">Crecimiento Profesional</option>
                    <option value="personal">Desarrollo Personal</option>
                  </select>
                  <div className="absolute right-4 pointer-events-none text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button 
              type="button" 
              onClick={handleFinish}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold text-xl py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              Terminado
            </button>
          </div>
        </form>
      </div>
      {/* MODAL DE ÉXITO */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4 transition-all duration-300">
          {/* Caja del Modal */}
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl transform transition-all scale-100">
            {/* Ícono de Éxito */}
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6 shadow-inner">
              <svg className="h-12 w-12 text-green-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            {/* Textos del Modal */}
            <h3 className={`${montserrat.className} text-2xl font-black text-gray-900 mb-2`}>
              ¡Registro Exitoso!
            </h3>
            <p className="text-gray-600 font-medium mb-8 text-lg">
              Bienvenido a <span className="font-bold text-teal-700">GOAT</span>. Tu perfil ha sido configurado correctamente.
            </p>
            {/* Botón para ir al Dashboard */}
            <button 
              type="button" 
              onClick={handleGoToDashboard}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold text-lg py-3 rounded-full transition-all shadow-md hover:shadow-lg"
            >
              Comenzar mi viaje
            </button>
          </div>
        </div>
      )}
    </div>
  );
}