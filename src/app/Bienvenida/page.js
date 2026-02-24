import React from 'react';
import { Montserrat, Poppins } from 'next/font/google';
import Link from 'next/link';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700', '800', '900']
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700']
});

export default function Bienvenida() {
  return (
    <div className={`min-h-screen w-full flex flex-col bg-gradient-to-br from-pink-200 via-pink-50 to-green-200 overflow-hidden ${poppins.className}`}>
      
      {/* Encabezado */}
      <header className="w-full p-6 md:px-12 lg:px-24 flex items-center justify-between z-10">
        <div className="flex items-center">
          <img 
            src="/logoext.png" 
            alt="Logo GOAT" 
            className="h-20 md:h-24 lg:h-28 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300" 
          />
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 w-full flex flex-col md:flex-row md:items-center justify-center">
        
        {/* Logo Principal */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16">
          <img
            src="/logo.png"
            alt="Ilustración principal GOAT"
            className="h-auto object-contain max-w-xs md:max-w-sm drop-shadow-2xl transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Texto y Botón */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-left p-8 md:p-12 lg:p-16">

          <h1 className={`${montserrat.className} text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tight`}>
            Diseña la vida <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
              que mereces.
            </span>
          </h1>

          <p className="text-gray-700 text-xl md:text-2xl mb-10 font-medium max-w-xl leading-relaxed">
            Una aplicación web diseñada para que los jóvenes tomen el control de su salud, sus finanzas y su futuro.
          </p>

          <Link href="/Login" className="group bg-teal-700 hover:bg-teal-800 text-white font-bold py-4 px-10 rounded-full text-lg w-fit transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1">
            Comenzar mi viaje
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
          </Link>
        </div>

      </main>
    </div>
  );
}