"use client";

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { Montserrat, Poppins } from 'next/font/google';

// IMPORTAMOS EL CONTEXTO GLOBAL
import { ThemeContext } from '@/context/ThemeContext';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function Templo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // EXTRAEMOS EL ESTADO DEL MODO OSCURO GLOBAL
  const { modoOscuro } = useContext(ThemeContext);

  // --- VARIABLES DINÁMICAS PARA EL MODO OSCURO ---
  const themeBg = modoOscuro ? 'bg-gray-900' : 'bg-[#F3F4F6]';
  const cardBg = modoOscuro ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const textPrimary = modoOscuro ? 'text-white' : 'text-gray-900';
  const textSecondary = modoOscuro ? 'text-gray-400' : 'text-gray-500';
  
  // CORRECCIÓN 1: Header más sólido (95% opacidad) para evitar solapamiento en el scroll
  const headerBg = modoOscuro ? 'bg-gray-900/95 border-gray-800' : 'bg-[#F3F4F6]/95 border-gray-200/80';

  // --- LÓGICA INTERACTIVA: RASTREADOR DE AGUA ---
  const metaAgua = 2.5; // Meta de 2.5 Litros
  const [aguaConsumida, setAguaConsumida] = useState(1.0); // Inicia en 1 Litro
  
  const agregarVaso = () => {
    if (aguaConsumida < metaAgua) {
      setAguaConsumida(prev => parseFloat((prev + 0.25).toFixed(2))); // Suma 250ml
    }
  };

  const porcentajeAgua = (aguaConsumida / metaAgua) * 100;

  return (
    <div className={`flex h-screen w-full overflow-hidden transition-colors duration-500 ${themeBg} ${poppins.className}`}>
      
      {/* OVERLAY MÓVIL */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* MENÚ LATERAL (SIDEBAR) */}
      <aside className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-30 flex flex-col w-72 bg-teal-900 text-white shadow-2xl`}>
        <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden absolute top-6 right-6 text-teal-300 hover:text-white transition-colors cursor-pointer">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="p-8 flex justify-center border-b border-teal-800">
          <img src="/logoext.png" alt="Logo GOAT" className="h-28 w-auto object-contain drop-shadow-md filter brightness-0 invert" />
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <Link href="/Dashboard" className="flex items-center gap-4 px-6 py-4 text-teal-100 hover:bg-teal-800/50 hover:text-white rounded-2xl font-medium transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Vista General
          </Link>
          
          <Link href="/Templo" className="flex items-center gap-4 px-6 py-4 bg-teal-700 rounded-2xl text-white font-bold transition-all shadow-inner">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            Mi Templo
          </Link>

          <Link href="/Reportes" className="flex items-center gap-4 px-6 py-4 text-teal-100 hover:bg-teal-800/50 hover:text-white rounded-2xl font-medium transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12V7H5a2 2 0 010-4h14v4M3 5v14a2 2 0 002 2h16v-5M18 12a2 2 0 000 4h4v-4h-4z"></path></svg>
            Mi Tesoro
          </Link>
          <Link href="/Destino" className="flex items-center gap-4 px-6 py-4 text-teal-100 hover:bg-teal-800/50 hover:text-white rounded-2xl font-medium transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
            Mi Destino
          </Link>
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        
        {/* CORRECCIÓN 1: z-50 y backdrop-blur-xl para solucionar el solapamiento al hacer scroll */}
        <header className={`flex justify-between items-center p-6 md:p-10 border-b backdrop-blur-xl sticky top-0 z-50 transition-colors duration-500 ${headerBg}`}>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className={`md:hidden p-2 rounded-xl shadow-sm border transition-colors cursor-pointer ${cardBg} ${textPrimary}`}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <div>
              <h1 className={`${montserrat.className} text-2xl md:text-3xl font-black transition-colors duration-500 ${textPrimary}`}>Mi Templo</h1>
              <p className={`font-medium text-sm md:text-base transition-colors duration-500 ${textSecondary}`}>Tu cuerpo es tu refugio. Cuídalo.</p>
            </div>
          </div>

          <Link href="/Perfil" className={`flex items-center gap-4 px-5 py-2.5 rounded-full shadow-sm border hover:shadow-md transition-all cursor-pointer group ${cardBg}`}>
            <div className="w-10 h-10 bg-teal-100 group-hover:bg-teal-200 rounded-full flex items-center justify-center text-teal-800 font-bold text-lg transition-colors">
              AL
            </div>
          </Link>
        </header>

        <div className="p-6 md:p-10 space-y-6 md:space-y-8">
          
          {/* ================================================================== */}
          {/* FILA 1: WIDGETS PRINCIPALES */}
          {/* ================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. CALORÍAS (NARANJA) */}
            <div className={`rounded-3xl p-6 shadow-sm border transition-colors duration-500 relative overflow-hidden ${cardBg}`}>
              <div className="absolute top-0 right-0 p-4 opacity-5 text-orange-500">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-2xl transition-colors ${modoOscuro ? 'bg-orange-900/40 text-orange-400' : 'bg-orange-100 text-orange-500'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path></svg>
                </div>
                <h3 className={`${montserrat.className} text-xl font-bold transition-colors duration-500 ${textPrimary}`}>Calorías</h3>
              </div>
              <p className={`text-sm font-medium mb-1 transition-colors duration-500 ${textSecondary}`}>Consumidas hoy</p>
              <div className="flex items-end gap-2 mb-3">
                <span className={`text-4xl font-black transition-colors duration-500 ${modoOscuro ? 'text-orange-400' : 'text-orange-500'}`}>1,240</span>
                <span className={`font-medium mb-1 transition-colors duration-500 ${textSecondary}`}>/ 2,000 kcal</span>
              </div>
              <div className={`w-full h-3 rounded-full overflow-hidden transition-colors ${modoOscuro ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="bg-orange-400 h-full rounded-full w-[62%] relative">
                  <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent to-white/30"></div>
                </div>
              </div>
              <p className={`text-xs mt-3 text-right font-medium transition-colors ${modoOscuro ? 'text-gray-400' : 'text-gray-500'}`}>Faltan 760 kcal</p>
            </div>

            {/* 2. AGUA (AZUL) */}
            <div className={`rounded-3xl p-6 shadow-sm border transition-colors duration-500 flex flex-col justify-between ${cardBg}`}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-2xl transition-colors ${modoOscuro ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                  </div>
                  <h3 className={`${montserrat.className} text-xl font-bold transition-colors duration-500 ${textPrimary}`}>Hidratación</h3>
                </div>
                <div className="flex justify-between items-end mb-2">
                  <span className={`text-4xl font-black transition-colors duration-500 ${modoOscuro ? 'text-blue-400' : 'text-blue-600'}`}>{aguaConsumida} <span className="text-xl">L</span></span>
                  <span className={`font-medium mb-1 transition-colors duration-500 ${textSecondary}`}>Meta: {metaAgua} L</span>
                </div>
                <div className={`w-full h-6 rounded-full overflow-hidden transition-colors border ${modoOscuro ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-100'}`}>
                  <div style={{ width: `${Math.min(porcentajeAgua, 100)}%` }} className="bg-blue-500 h-full rounded-full relative transition-all duration-500 ease-out flex items-center justify-end pr-2">
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent to-white/30"></div>
                    {porcentajeAgua >= 20 && <span className="text-white text-xs font-bold relative z-10">{Math.round(porcentajeAgua)}%</span>}
                  </div>
                </div>
              </div>
              <button onClick={agregarVaso} disabled={aguaConsumida >= metaAgua} className={`w-full mt-4 py-3 rounded-xl font-bold transition-all cursor-pointer flex justify-center items-center gap-2 ${aguaConsumida >= metaAgua ? (modoOscuro ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed') : (modoOscuro ? 'bg-blue-900/50 text-blue-300 hover:bg-blue-800' : 'bg-blue-50 text-blue-700 hover:bg-blue-100')}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
                {aguaConsumida >= metaAgua ? '¡Meta alcanzada!' : 'Tomé 1 vaso (250ml)'}
              </button>
            </div>

          </div>

          {/* ================================================================== */}
          {/* FILA 2: MENÚ INTELIGENTE E IMPACTO GOAT */}
          {/* ================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* IZQUIERDA: MENÚ INTELIGENTE */}
            <div className={`lg:col-span-2 rounded-3xl p-6 md:p-8 shadow-sm border transition-colors duration-500 ${cardBg}`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h3 className={`${montserrat.className} text-xl font-bold transition-colors duration-500 ${textPrimary}`}>Tu Menú Inteligente de Hoy</h3>
                
                {/* ETIQUETAS CLÍNICAS */}
                <div className="flex flex-wrap gap-2">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors ${modoOscuro ? 'bg-teal-900/40 text-teal-300 border border-teal-800' : 'bg-teal-50 text-teal-700 border border-teal-100'}`}>
                    ✨ Objetivo: 2,000 kcal
                  </span>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors ${modoOscuro ? 'bg-rose-900/30 text-rose-300 border border-rose-800' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                    🚫 Libre de: Nueces y Cacao
                  </span>
                </div>
              </div>

              {/* LISTA DE COMIDAS (CORRECCIÓN 2: Ahora suman exactamente 2000 kcal) */}
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl border transition-colors flex gap-4 items-center ${modoOscuro ? 'border-gray-700 hover:bg-gray-800/80' : 'border-gray-100 hover:bg-gray-50'}`}>
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-2xl shrink-0">🍳</div>
                  <div className="flex-1">
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1 transition-colors ${textSecondary}`}>Desayuno</p>
                    <p className={`font-bold transition-colors ${textPrimary}`}>Bowl de avena con plátano y chía</p>
                  </div>
                  <span className={`font-black transition-colors ${modoOscuro ? 'text-orange-400' : 'text-orange-500'}`}>450 kcal</span>
                </div>

                <div className={`p-4 rounded-2xl border transition-colors flex gap-4 items-center ${modoOscuro ? 'border-gray-700 hover:bg-gray-800/80' : 'border-gray-100 hover:bg-gray-50'}`}>
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-2xl shrink-0">🥗</div>
                  <div className="flex-1">
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1 transition-colors ${textSecondary}`}>Comida</p>
                    <p className={`font-bold transition-colors ${textPrimary}`}>Pollo a la plancha con quinoa y vegetales</p>
                  </div>
                  <span className={`font-black transition-colors ${modoOscuro ? 'text-orange-400' : 'text-orange-500'}`}>750 kcal</span>
                </div>

                {/* NUEVO: Snack / Colación para que las matemáticas cuadren a 2,000 */}
                <div className={`p-4 rounded-2xl border transition-colors flex gap-4 items-center ${modoOscuro ? 'border-gray-700 hover:bg-gray-800/80' : 'border-gray-100 hover:bg-gray-50'}`}>
                  <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center text-2xl shrink-0">🍎</div>
                  <div className="flex-1">
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1 transition-colors ${textSecondary}`}>Snack</p>
                    <p className={`font-bold transition-colors ${textPrimary}`}>Yogur griego con manzana y canela</p>
                  </div>
                  <span className={`font-black transition-colors ${modoOscuro ? 'text-orange-400' : 'text-orange-500'}`}>400 kcal</span>
                </div>

                <div className={`p-4 rounded-2xl border transition-colors flex gap-4 items-center ${modoOscuro ? 'border-gray-700 hover:bg-gray-800/80' : 'border-gray-100 hover:bg-gray-50'}`}>
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-2xl shrink-0">🍲</div>
                  <div className="flex-1">
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1 transition-colors ${textSecondary}`}>Cena</p>
                    <p className={`font-bold transition-colors ${textPrimary}`}>Tostadas horneadas de atún</p>
                  </div>
                  <span className={`font-black transition-colors ${modoOscuro ? 'text-orange-400' : 'text-orange-500'}`}>400 kcal</span>
                </div>
              </div>
            </div>

            {/* DERECHA: IMPACTO GOAT */}
            <div className="lg:col-span-1 bg-gradient-to-br from-teal-800 to-teal-900 rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-500/30 rounded-full blur-2xl"></div>
              
              <div>
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm border border-white/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <h3 className={`${montserrat.className} text-xl font-bold`}>Impacto GOAT</h3>
                </div>

                <div className="mb-6 relative z-10">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-teal-100 text-sm font-medium">Energía Vital Actual</span>
                    <span className="font-black text-xl">90%</span>
                  </div>
                  <div className="w-full bg-black/20 h-2.5 rounded-full overflow-hidden border border-white/10">
                    <div className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full w-[90%] relative">
                       <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent to-white/30"></div>
                    </div>
                  </div>
                </div>

                <p className="text-teal-50 font-medium text-sm md:text-base leading-relaxed relative z-10 bg-black/10 p-4 rounded-2xl border border-white/5">
                  ¡Excelente hidratación! Tu nivel de energía física y enfoque están en su punto máximo hoy. Esto aumenta drásticamente tu productividad para completar el ahorro de tu <strong className="text-white">Viaje a Japón</strong>.
                </p>
              </div>
            </div>

          </div>

          {/* ================================================================== */}
          {/* FILA 3: PLANES DE ALIMENTACIÓN (CON BOTONES DE REGISTRO) */}
          {/* ================================================================== */}
          <div className={`rounded-3xl p-6 md:p-8 shadow-sm border transition-colors duration-500 ${cardBg}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2.5 rounded-xl transition-colors ${modoOscuro ? 'bg-green-900/40 text-green-400' : 'bg-green-100 text-green-600'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              <h3 className={`${montserrat.className} text-xl font-bold transition-colors duration-500 ${textPrimary}`}>Planes de Alimentación Personalizados</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Receta 1 */}
              <div className={`p-5 md:p-6 rounded-2xl border transition-colors flex flex-col justify-between ${modoOscuro ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl drop-shadow-sm">🥗</span>
                    <h4 className={`text-lg font-bold leading-tight transition-colors ${textPrimary}`}>Ensalada de Quinoa Mediterránea con Pollo al Limón</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <p className={`leading-relaxed transition-colors ${textSecondary}`}>
                      <strong className={`font-bold uppercase tracking-wider text-xs mr-1 ${modoOscuro ? 'text-teal-400' : 'text-teal-600'}`}>Ingredientes:</strong>
                      150g pechuga de pollo, 50g quinoa (peso en seco), pepino, tomates cherry, aceitunas negras, jugo de limón, 1 cdta aceite de oliva.
                    </p>
                    <p className={`leading-relaxed transition-colors ${textSecondary}`}>
                      <strong className={`font-bold uppercase tracking-wider text-xs mr-1 ${modoOscuro ? 'text-orange-400' : 'text-orange-500'}`}>Preparación:</strong>
                      Cocinar la quinoa. Asar el pollo con limón y hierbas. Mezclar todo con los vegetales frescos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Receta 2 */}
              <div className={`p-5 md:p-6 rounded-2xl border transition-colors flex flex-col justify-between ${modoOscuro ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl drop-shadow-sm">🥩</span>
                    <h4 className={`text-lg font-bold leading-tight transition-colors ${textPrimary}`}>Bowl de Ternera y Batata (Camote) Asada</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <p className={`leading-relaxed transition-colors ${textSecondary}`}>
                      <strong className={`font-bold uppercase tracking-wider text-xs mr-1 ${modoOscuro ? 'text-teal-400' : 'text-teal-600'}`}>Ingredientes:</strong>
                      200g carne de res magra (molida o trozos), 200g batata, 1/2 aguacate, brócoli al vapor, arroz integral (opcional como base).
                    </p>
                    <p className={`leading-relaxed transition-colors ${textSecondary}`}>
                      <strong className={`font-bold uppercase tracking-wider text-xs mr-1 ${modoOscuro ? 'text-orange-400' : 'text-orange-500'}`}>Preparación:</strong>
                      Hornear la batata en cubos. Saltear la carne con especias. Servir con aguacate para grasas saludables.
                    </p>
                  </div>
                </div>
              </div>

              {/* Receta 3 */}
              <div className={`p-5 md:p-6 rounded-2xl border transition-colors flex flex-col justify-between ${modoOscuro ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl drop-shadow-sm">🐟</span>
                    <h4 className={`text-lg font-bold leading-tight transition-colors ${textPrimary}`}>Filete de Tilapia al Papillote con Verduras</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <p className={`leading-relaxed transition-colors ${textSecondary}`}>
                      <strong className={`font-bold uppercase tracking-wider text-xs mr-1 ${modoOscuro ? 'text-teal-400' : 'text-teal-600'}`}>Ingredientes:</strong>
                      1 filete de tilapia (o pescado blanco), zanahoria en juliana, calabacita, hierbas frescas, ajo, chorrito de vino blanco. <span className="font-bold text-rose-500">CERO SAL AÑADIDA.</span>
                    </p>
                    <p className={`leading-relaxed transition-colors ${textSecondary}`}>
                      <strong className={`font-bold uppercase tracking-wider text-xs mr-1 ${modoOscuro ? 'text-orange-400' : 'text-orange-500'}`}>Preparación:</strong>
                      Envolver el pescado y verduras en papel aluminio. Hornear 20 min. Sazonar con las hierbas y limón al final.
                    </p>
                  </div>
                </div>
              </div>

              {/* Receta 4 */}
              <div className={`p-5 md:p-6 rounded-2xl border transition-colors flex flex-col justify-between ${modoOscuro ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl drop-shadow-sm">🍝</span>
                    <h4 className={`text-lg font-bold leading-tight transition-colors ${textPrimary}`}>Pasta Primavera Cremosa (con Calabaza)</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <p className={`leading-relaxed transition-colors ${textSecondary}`}>
                      <strong className={`font-bold uppercase tracking-wider text-xs mr-1 ${modoOscuro ? 'text-teal-400' : 'text-teal-600'}`}>Ingredientes:</strong>
                      Pasta integral, pechuga de pavo en cubitos, salsa hecha licuando calabaza cocida con un poco de leche y queso parmesano.
                    </p>
                    <p className={`leading-relaxed transition-colors ${textSecondary}`}>
                      <strong className={`font-bold uppercase tracking-wider text-xs mr-1 ${modoOscuro ? 'text-orange-400' : 'text-orange-500'}`}>Preparación:</strong>
                      Cocer la pasta. Sofreír el pavo. Mezclar con la "falsa salsa de queso" hecha de calabaza.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}