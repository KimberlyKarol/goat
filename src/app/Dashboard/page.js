"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Montserrat, Poppins } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={`flex h-screen w-full bg-[#F3F4F6] overflow-hidden ${poppins.className}`}>
      
      {/* OVERLAY MÓVIL */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* MENÚ LATERAL */}
      <aside 
        className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-30 flex flex-col w-72 bg-teal-900 text-white shadow-2xl`}
      >
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden absolute top-6 right-6 text-teal-300 hover:text-white transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="p-8 flex justify-center border-b border-teal-800">
          <img src="/logoext.png" alt="Logo GOAT" className="h-28 w-auto object-contain drop-shadow-md filter brightness-0 invert" />
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <Link href="/Dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 bg-teal-800 rounded-2xl text-white font-bold transition-all shadow-inner">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Vista General
          </Link>
          
          <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 text-teal-100 hover:bg-teal-800/50 hover:text-white rounded-2xl font-medium transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            Mi Templo
          </Link>

          <Link href="/Reportes" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 text-teal-100 hover:bg-teal-800/50 hover:text-white rounded-2xl font-medium transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12V7H5a2 2 0 010-4h14v4M3 5v14a2 2 0 002 2h16v-5M18 12a2 2 0 000 4h4v-4h-4z"></path></svg>
            Mi Tesoro
          </Link>

          <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 text-teal-100 hover:bg-teal-800/50 hover:text-white rounded-2xl font-medium transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
            Mi Destino
          </Link>
        </nav>

        <div className="p-6 border-t border-teal-800">
          <Link href="/Login" className="flex items-center gap-4 px-6 py-4 text-teal-200 hover:text-white hover:bg-teal-800/50 rounded-2xl font-medium transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Cerrar Sesión
          </Link>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        <header className="flex justify-between items-center p-6 md:p-10">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 bg-white rounded-xl shadow-sm text-teal-900 border border-gray-100 cursor-pointer"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>

          <div className="hidden md:block">
            <h1 className={`${montserrat.className} text-3xl font-black text-gray-900`}>
              Hola, Ana Laura 👋
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Hoy es un gran día para avanzar en tus metas.
            </p>
          </div>

          <Link href="/Perfil" className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group">
            <div className="w-10 h-10 bg-teal-100 group-hover:bg-teal-200 rounded-full flex items-center justify-center text-teal-800 font-bold text-lg transition-colors">
              AL
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-bold text-gray-900 leading-tight group-hover:text-teal-700 transition-colors">Ana Laura</p>
              <p className="text-xs text-gray-500 font-medium">Nivel: Aprendiz</p>
            </div>
          </Link>
        </header>

        <div className="md:hidden px-6 pb-6">
          <h1 className={`${montserrat.className} text-2xl font-black text-gray-900`}>
            Hola, Ana Laura 👋
          </h1>
          <p className="text-gray-500 font-medium text-sm mt-1">
            Hoy es un gran día para avanzar.
          </p>
        </div>

        {/* GRID DE TARJETAS */}
        <div className="px-6 md:px-10 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* TARJETA MI TEMPLO */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-teal-600 group-hover:scale-110 transition-transform">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-teal-100 p-3 rounded-2xl text-teal-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </div>
              <h3 className={`${montserrat.className} text-xl font-bold text-gray-900`}>Mi Templo</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Calorías consumidas</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-gray-900">1,240</span>
                  <span className="text-gray-400 font-medium mb-1">/ 2,000 kcal</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full w-[62%]"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-blue-50 p-3 rounded-2xl">
                  <p className="text-blue-600 text-xs font-bold mb-1">AGUA</p>
                  <p className="text-gray-900 font-bold">1.5 <span className="text-xs font-medium text-gray-500">L</span></p>
                </div>
                <div className="bg-green-50 p-3 rounded-2xl">
                  <p className="text-green-600 text-xs font-bold mb-1">PASOS</p>
                  <p className="text-gray-900 font-bold">4,500 <span className="text-xs font-medium text-gray-500">hoy</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* TARJETA MI TESORO */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative overflow-hidden group lg:col-span-2 flex flex-col justify-between">
             <div className="absolute top-0 right-0 p-4 opacity-5 text-emerald-600 group-hover:scale-110 transition-transform">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.95V5h-2.35v1.73c-1.6.35-2.68 1.49-2.68 2.87 0 1.7 1.36 2.55 3.43 3.05 1.8.42 2.27 1.03 2.27 1.77 0 .94-.87 1.61-2.21 1.61-1.54 0-2.24-.8-2.31-1.84h-1.76c.09 1.58 1.05 2.72 2.68 3.13V20h2.35v-1.76c1.74-.39 2.86-1.54 2.86-3.14 0-1.72-1.3-2.58-3.44-3.09z"/></svg>
            </div>

            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12V7H5a2 2 0 010-4h14v4M3 5v14a2 2 0 002 2h16v-5M18 12a2 2 0 000 4h4v-4h-4z"></path></svg>
                </div>
                <h3 className={`${montserrat.className} text-xl font-bold text-gray-900`}>Mi Tesoro</h3>
              </div>
              <Link href="/Reportes" className="text-teal-700 font-bold text-sm hover:underline bg-teal-50 px-4 py-2 rounded-full transition-colors hover:bg-teal-100">
                Ver detalles
              </Link>
            </div>

            <div className="flex flex-col gap-6 relative z-10">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Balance Disponible</p>
                <div className="flex flex-wrap items-end gap-3 md:gap-4">
                  <p className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">$8,000<span className="text-2xl text-gray-400">.00</span></p>
                  <span className="bg-emerald-100 text-emerald-800 text-sm font-bold px-3 py-1 rounded-full mb-1">+12% este mes</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <p className="text-gray-500 text-sm font-medium mb-2">Progreso de Ahorro Mensual</p>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-2xl font-bold text-gray-900">$2,500</span>
                  <span className="text-sm font-bold text-gray-400">Meta: $5,000</span>
                </div>
                <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full w-[50%] relative">
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent to-white/30"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* TARJETA MI DESTINO */}
          <div className="bg-gradient-to-br from-teal-800 to-teal-900 rounded-3xl p-6 shadow-lg text-white relative overflow-hidden lg:col-span-3 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-700/50 rounded-full blur-3xl"></div>
            
            <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20 shrink-0">
                <svg className="w-8 h-8 text-teal-100" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
              </div>
              <div>
                <p className="text-teal-200 text-sm font-bold tracking-wider uppercase mb-1">Tu Próximo Gran Destino</p>
                <h3 className={`${montserrat.className} text-2xl md:text-3xl font-black text-white`}>Viajar a Japón</h3>
                <p className="text-teal-100 font-medium mt-1">Categoría: Viajes y Experiencias</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center min-w-[180px] w-full md:w-auto relative z-10">
              <p className="text-teal-200 text-xs font-bold uppercase mb-1">Faltan</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black text-white">245</span>
                <span className="text-teal-100 font-medium">días</span>
              </div>
              <p className="text-teal-100 text-xs mt-1">27 / 01 / 2030</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}