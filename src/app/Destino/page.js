"use client";

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { Montserrat, Poppins } from 'next/font/google';

// IMPORTAMOS EL CONTEXTO GLOBAL
import { ThemeContext } from '@/context/ThemeContext';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function Destino() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // EXTRAEMOS EL ESTADO DEL MODO OSCURO
  const { modoOscuro } = useContext(ThemeContext);

  // --- VARIABLES DINÁMICAS PARA EL MODO OSCURO ---
  const themeBg = modoOscuro ? 'bg-gray-900' : 'bg-[#F3F4F6]';
  const cardBg = modoOscuro ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const textPrimary = modoOscuro ? 'text-white' : 'text-gray-900';
  const textSecondary = modoOscuro ? 'text-gray-400' : 'text-gray-500';
  const headerBg = modoOscuro ? 'bg-gray-900/95 border-gray-800' : 'bg-[#F3F4F6]/95 border-gray-200/80';
  const inputBg = modoOscuro ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-800';

  // --- ESTADOS PARA LOS MODALES Y FORMULARIOS ---
  const [isModalPasoOpen, setIsModalPasoOpen] = useState(false);
  const [isModalMetasOpen, setIsModalMetasOpen] = useState(false);
  
  // Estado para el modal de "Añadir Paso"
  const [nuevoPaso, setNuevoPaso] = useState('');
  const [nuevaFechaPaso, setNuevaFechaPaso] = useState('');

  // Estado para el formulario de "Meta Personalizada"
  const [nuevaMetaTitulo, setNuevaMetaTitulo] = useState('');
  const [nuevaMetaCategoria, setNuevaMetaCategoria] = useState('Desarrollo');
  const [nuevaMetaFecha, setNuevaMetaFecha] = useState('');

  // --- LÓGICA INTERACTIVA: HOJA DE RUTA ---
  const [hitos, setHitos] = useState([
    { id: 1, texto: 'Investigar vuelos y hospedaje', completado: true, fecha: 'Completado: 10 Feb 2026' },
    { id: 2, texto: 'Ahorrar los primeros $10,000', completado: true, fecha: 'Completado: 25 Feb 2026', vinculo: 'Vinculado a Mi Tesoro', vinculoIcono: '💰' },
    { id: 3, texto: 'Renovar pasaporte', completado: false, fecha: 'Vence: 15 Mar 2026', esAccionInmediata: true },
    { id: 4, texto: 'Comprar maleta de viaje', completado: false, fecha: 'Vence: 10 May 2026' },
    { id: 5, texto: 'Aprender frases básicas en japonés', completado: false, fecha: 'Vence: 01 Nov 2026' },
  ]);

  // --- LÓGICA INTERACTIVA: METAS SECUNDARIAS ---
  const [metasSecundarias, setMetasSecundarias] = useState([
    { id: 1, titulo: 'Correr un maratón', categoria: 'Salud', fecha: 'Noviembre 2027', progreso: 25, colorTono: 'teal' },
    { id: 2, titulo: 'Comprar mi casa', categoria: 'Finanzas', fecha: 'Abril 2035', progreso: 10, colorTono: 'emerald' }
  ]);

  // --- FUNCIONES DE FORMATEO ---
  // Convierte "YYYY-MM-DD" a "15 Mar 2026"
  const formatearFecha = (fechaString) => {
    if (!fechaString) return 'Por definir';
    const [year, month, day] = fechaString.split('-');
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${day} ${meses[parseInt(month)-1]} ${year}`;
  };

  // Asigna un color dependiendo de la categoría elegida
  const getColorPorCategoria = (categoria) => {
    const colores = {
      'Salud': 'teal',
      'Finanzas': 'emerald',
      'Desarrollo': 'blue',
      'Viajes': 'indigo',
      'Otro': 'purple'
    };
    return colores[categoria] || 'gray';
  };

  // --- FUNCIONES ACCIONABLES ---
  const toggleHito = (id) => {
    setHitos(hitos.map(hito => hito.id === id ? { ...hito, completado: !hito.completado } : hito));
  };

  const handleAgregarPaso = (e) => {
    e.preventDefault();
    if(nuevoPaso.trim() === '') return;
    
    const textoFecha = nuevaFechaPaso ? `Vence: ${formatearFecha(nuevaFechaPaso)}` : 'Vence: Por definir';

    const nuevoHitoObj = {
      id: Date.now(),
      texto: nuevoPaso,
      completado: false,
      fecha: textoFecha // Ahora usa la fecha del calendario
    };
    
    setHitos([...hitos, nuevoHitoObj]);
    setNuevoPaso('');
    setNuevaFechaPaso('');
    setIsModalPasoOpen(false);
  };

  // Agrega una meta desde las plantillas predefinidas
  const handleAgregarMetaPlantilla = (nuevaMeta) => {
    setMetasSecundarias([...metasSecundarias, nuevaMeta]);
    setIsModalMetasOpen(false);
  };

  // Agrega una meta desde el formulario personalizado
  const handleAgregarMetaPersonalizada = (e) => {
    e.preventDefault();
    if(nuevaMetaTitulo.trim() === '') return;

    const textoFecha = nuevaMetaFecha ? formatearFecha(nuevaMetaFecha) : 'Sin fecha límite';

    const nuevaMeta = {
      id: Date.now(),
      titulo: nuevaMetaTitulo,
      categoria: nuevaMetaCategoria,
      fecha: textoFecha,
      progreso: 0,
      colorTono: getColorPorCategoria(nuevaMetaCategoria)
    };

    setMetasSecundarias([...metasSecundarias, nuevaMeta]);
    
    // Limpiar campos y cerrar
    setNuevaMetaTitulo('');
    setNuevaMetaCategoria('Desarrollo');
    setNuevaMetaFecha('');
    setIsModalMetasOpen(false);
  };

  // Calcular progreso general
  const hitosCompletados = hitos.filter(h => h.completado).length;
  const porcentajeProgreso = hitos.length === 0 ? 0 : Math.round((hitosCompletados / hitos.length) * 100);

  return (
    <div className={`flex h-screen w-full overflow-hidden transition-colors duration-500 ${themeBg} ${poppins.className}`}>
      
      {/* OVERLAY MÓVIL */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)}></div>
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
          <Link href="/Templo" className="flex items-center gap-4 px-6 py-4 text-teal-100 hover:bg-teal-800/50 hover:text-white rounded-2xl font-medium transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            Mi Templo
          </Link>
          <Link href="/Reportes" className="flex items-center gap-4 px-6 py-4 text-teal-100 hover:bg-teal-800/50 hover:text-white rounded-2xl font-medium transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12V7H5a2 2 0 010-4h14v4M3 5v14a2 2 0 002 2h16v-5M18 12a2 2 0 000 4h4v-4h-4z"></path></svg>
            Mi Tesoro
          </Link>
          <Link href="/Destino" className="flex items-center gap-4 px-6 py-4 bg-indigo-600 rounded-2xl text-white font-bold transition-all shadow-inner">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
            Mi Destino
          </Link>
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        
        <header className={`flex justify-between items-center p-6 md:p-10 border-b backdrop-blur-xl sticky top-0 z-40 transition-colors duration-500 ${headerBg}`}>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className={`md:hidden p-2 rounded-xl shadow-sm border transition-colors cursor-pointer ${cardBg} ${textPrimary}`}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <div>
              <h1 className={`${montserrat.className} text-2xl md:text-3xl font-black transition-colors duration-500 ${textPrimary}`}>Mi Destino</h1>
              <p className={`font-medium text-sm md:text-base transition-colors duration-500 ${textSecondary}`}>Construye tu futuro paso a paso.</p>
            </div>
          </div>

          <Link href="/Perfil" className={`flex items-center gap-4 px-5 py-2.5 rounded-full shadow-sm border hover:shadow-md transition-all cursor-pointer group ${cardBg}`}>
            <div className="w-10 h-10 bg-teal-100 group-hover:bg-teal-200 rounded-full flex items-center justify-center text-teal-800 font-bold text-lg transition-colors">
              AL
            </div>
          </Link>
        </header>

        <div className="p-6 md:p-10 space-y-6 md:space-y-8 max-w-6xl mx-auto w-full">
          
          {/* TARJETA HERO: VISION BOARD */}
          <div 
            className="rounded-3xl p-8 md:p-10 shadow-lg text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 min-h-[250px]"
            style={{
              backgroundImage: "url('/japon.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
            
            <div className="flex items-center gap-6 relative z-10 w-full md:w-auto flex-1">
              <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-md border border-white/20 shrink-0 hidden sm:block">
                <svg className="w-12 h-12 text-indigo-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-indigo-200 text-sm font-bold tracking-widest uppercase mb-2">Tu Gran Sueño</p>
                <h3 className={`${montserrat.className} text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-md`}>Viajar a Japón</h3>
                
                <div className="mt-5 max-w-md">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-indigo-100 font-medium text-sm">Progreso del plan</span>
                    <span className="font-bold">{porcentajeProgreso}%</span>
                  </div>
                  <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden border border-white/10 backdrop-blur-sm">
                    <div className="bg-indigo-400 h-full rounded-full transition-all duration-700 relative" style={{ width: `${porcentajeProgreso}%` }}>
                      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent to-white/30"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/20 text-center min-w-[200px] w-full md:w-auto relative z-10 shadow-2xl">
              <p className="text-indigo-200 text-sm font-bold uppercase tracking-wider mb-2">Faltan</p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl font-black text-white drop-shadow-md">245</span>
                <span className="text-indigo-200 font-bold text-lg">días</span>
              </div>
              <div className="mt-4 py-2 px-4 bg-white/10 rounded-xl text-indigo-100 text-sm font-medium border border-white/5">
                📅 27 de Enero, 2030
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* WIDGET INTERACTIVO: CHECKLIST DE HITOS */}
            <div className={`rounded-3xl p-6 md:p-8 shadow-sm border transition-colors duration-500 lg:col-span-2 ${cardBg}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`${montserrat.className} text-xl md:text-2xl font-bold transition-colors duration-500 ${textPrimary}`}>Hoja de Ruta</h3>
                
                <button 
                  onClick={() => setIsModalPasoOpen(true)}
                  className={`text-sm font-bold px-4 py-2 rounded-full transition-colors cursor-pointer ${modoOscuro ? 'bg-indigo-900/50 text-indigo-300 hover:bg-indigo-800' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}
                >
                  + Añadir Paso
                </button>
              </div>

              <div className="space-y-3">
                {hitos.map((hito) => (
                  <div 
                    key={hito.id} 
                    onClick={() => toggleHito(hito.id)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border flex items-start gap-4 ${
                      hito.completado 
                        ? (modoOscuro ? 'bg-indigo-900/10 border-indigo-900/30' : 'bg-indigo-50 border-indigo-100') 
                        : hito.esAccionInmediata 
                          ? (modoOscuro ? 'bg-indigo-900/40 border-indigo-500 shadow-md ring-2 ring-indigo-500/20' : 'bg-white border-indigo-400 shadow-md ring-4 ring-indigo-50')
                          : (modoOscuro ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300')
                    }`}
                  >
                    <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors shrink-0 ${
                      hito.completado 
                        ? 'bg-indigo-500 border-indigo-500 text-white' 
                        : hito.esAccionInmediata
                          ? 'border-indigo-400'
                          : (modoOscuro ? 'border-gray-500' : 'border-gray-300')
                    }`}>
                      {hito.completado && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <p className={`font-bold text-lg transition-all duration-300 ${
                          hito.completado ? 'line-through text-gray-400' : hito.esAccionInmediata ? 'text-indigo-600 dark:text-indigo-400' : (modoOscuro ? 'text-gray-200' : 'text-gray-800')
                        }`}>
                          {hito.texto}
                        </p>
                        {!hito.completado && hito.esAccionInmediata && (
                          <span className="text-xs font-black bg-indigo-500 text-white px-2 py-0.5 rounded-md uppercase tracking-wide shrink-0 inline-block w-max">
                            Tu acción inmediata
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className={`text-sm font-medium ${hito.completado ? 'text-gray-400' : (modoOscuro ? 'text-gray-400' : 'text-gray-500')}`}>
                          {hito.fecha}
                        </p>
                        {hito.vinculo && (
                          <span className={`text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1 ${modoOscuro ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>
                            {hito.vinculoIcono} {hito.vinculo}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WIDGET: OTRAS METAS (ESTADO DINÁMICO) */}
            <div className={`rounded-3xl p-6 md:p-8 shadow-sm border transition-colors duration-500 flex flex-col ${cardBg}`}>
              <h3 className={`${montserrat.className} text-xl font-bold mb-6 transition-colors duration-500 ${textPrimary}`}>En la mira</h3>
              
              <div className="space-y-4 flex-1">
                {metasSecundarias.map((meta) => (
                  <div key={meta.id} className={`p-4 rounded-2xl border transition-colors ${modoOscuro ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <p className={`font-bold transition-colors ${textPrimary}`}>{meta.titulo}</p>
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${modoOscuro ? `bg-${meta.colorTono}-900/40 text-${meta.colorTono}-400` : `bg-${meta.colorTono}-100 text-${meta.colorTono}-700`}`}>
                        {meta.categoria}
                      </span>
                    </div>
                    <p className={`text-sm mb-3 transition-colors ${textSecondary}`}>{meta.fecha}</p>
                    <div className={`w-full h-1.5 rounded-full overflow-hidden transition-colors ${modoOscuro ? 'bg-gray-600' : 'bg-gray-200'}`}>
                      <div className={`bg-${meta.colorTono}-500 h-full`} style={{ width: `${meta.progreso}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setIsModalMetasOpen(true)}
                className={`w-full mt-4 py-4 rounded-2xl border-2 border-dashed font-bold transition-colors cursor-pointer text-gray-500 hover:text-gray-900 ${modoOscuro ? 'border-gray-600 hover:bg-gray-700 hover:text-white' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                Explorar nuevas metas
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* ================================================================== */}
      {/* MODAL 1: AÑADIR PASO */}
      {/* ================================================================== */}
      {isModalPasoOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalPasoOpen(false)}></div>
          <div className={`relative w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl transform transition-all ${cardBg}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`${montserrat.className} text-2xl font-black ${textPrimary}`}>Nuevo Paso</h3>
              <button onClick={() => setIsModalPasoOpen(false)} className={`p-2 rounded-full transition-colors ${modoOscuro ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <form onSubmit={handleAgregarPaso} className="space-y-5">
              <div>
                <label className={`block font-bold mb-2 ml-1 text-sm ${textPrimary}`}>¿Qué necesitas hacer?</label>
                <input 
                  type="text" 
                  value={nuevoPaso}
                  onChange={(e) => setNuevoPaso(e.target.value)}
                  placeholder="Ej. Comprar seguro de viajero" 
                  required 
                  autoFocus
                  className={`w-full rounded-xl px-4 py-3 border focus:border-indigo-500 outline-none transition-colors duration-300 font-medium ${inputBg}`} 
                />
              </div>

              {/* NUEVO CAMPO: FECHA DEL PASO */}
              <div>
                <label className={`block font-bold mb-2 ml-1 text-sm ${textPrimary}`}>Fecha límite (Opcional)</label>
                <input 
                  type="date" 
                  value={nuevaFechaPaso}
                  onChange={(e) => setNuevaFechaPaso(e.target.value)}
                  className={`w-full rounded-xl px-4 py-3 border focus:border-indigo-500 outline-none transition-colors duration-300 font-medium cursor-pointer ${inputBg}`} 
                />
              </div>

              <button type="submit" className="w-full mt-4 font-bold py-3.5 rounded-xl transition-all cursor-pointer shadow-md bg-indigo-600 hover:bg-indigo-700 text-white">
                Agregar a mi ruta
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* MODAL 2: CATÁLOGO DE METAS (CON FORMULARIO PERSONALIZADO) */}
      {/* ================================================================== */}
      {isModalMetasOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalMetasOpen(false)}></div>
          <div className={`relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl transform transition-all ${cardBg}`}>
            
            {/* Cabecera del Modal */}
            <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center shrink-0">
              <div>
                <h3 className={`${montserrat.className} text-2xl font-black ${textPrimary}`}>Agregar Nueva Meta</h3>
                <p className={`text-sm mt-1 font-medium ${textSecondary}`}>Construye tu futuro a tu manera.</p>
              </div>
              <button onClick={() => setIsModalMetasOpen(false)} className={`p-2 rounded-full transition-colors ${modoOscuro ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            {/* Contenido con Scroll */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1">
              
              {/* SECCIÓN 1: CREAR META PERSONALIZADA */}
              <div className="mb-8">
                <h4 className={`font-bold text-lg mb-4 flex items-center gap-2 ${textPrimary}`}>
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">1</span> 
                  Crea tu propia meta
                </h4>
                
                <form onSubmit={handleAgregarMetaPersonalizada} className={`p-5 rounded-2xl border ${modoOscuro ? 'bg-gray-800/80 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="space-y-4">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Título de la meta (Ej. Comprar un auto)" 
                        value={nuevaMetaTitulo}
                        onChange={(e) => setNuevaMetaTitulo(e.target.value)}
                        required
                        className={`w-full rounded-xl px-4 py-3 border focus:border-indigo-500 outline-none transition-colors duration-300 font-medium ${inputBg}`} 
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <select 
                          value={nuevaMetaCategoria}
                          onChange={(e) => setNuevaMetaCategoria(e.target.value)}
                          className={`w-full rounded-xl px-4 py-3 border focus:border-indigo-500 outline-none transition-colors duration-300 font-medium cursor-pointer ${inputBg}`}
                        >
                          <option value="Desarrollo">Desarrollo Personal</option>
                          <option value="Finanzas">Finanzas / Ahorro</option>
                          <option value="Salud">Salud y Bienestar</option>
                          <option value="Viajes">Viajes y Experiencias</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>
                      <div>
                        <input 
                          type="date" 
                          value={nuevaMetaFecha}
                          onChange={(e) => setNuevaMetaFecha(e.target.value)}
                          required
                          className={`w-full rounded-xl px-4 py-3 border focus:border-indigo-500 outline-none transition-colors duration-300 font-medium cursor-pointer ${inputBg}`} 
                        />
                      </div>
                    </div>
                    <button type="submit" className="w-full mt-2 font-bold py-3.5 rounded-xl transition-all cursor-pointer bg-gray-900 hover:bg-black text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
                      Crear Meta Personalizada
                    </button>
                  </div>
                </form>
              </div>

              {/* SECCIÓN 2: PLANTILLAS RÁPIDAS */}
              <div>
                <h4 className={`font-bold text-lg mb-4 flex items-center gap-2 ${textPrimary}`}>
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">2</span> 
                  O elige una plantilla sugerida
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div onClick={() => handleAgregarMetaPlantilla({ id: Date.now(), titulo: 'Leer 12 libros', categoria: 'Desarrollo', fecha: 'Diciembre 2026', progreso: 0, colorTono: 'blue' })} className={`p-4 rounded-2xl border cursor-pointer transition-all hover:-translate-y-1 ${modoOscuro ? 'border-gray-700 hover:border-blue-500 bg-gray-800/50 hover:bg-gray-800' : 'border-gray-200 hover:border-blue-400 bg-white hover:shadow-md'}`}>
                    <div className="text-3xl mb-2">📚</div>
                    <h4 className={`font-bold ${textPrimary}`}>Leer 12 libros</h4>
                    <p className={`text-xs mt-1 ${textSecondary}`}>Desarrollo Personal</p>
                  </div>

                  <div onClick={() => handleAgregarMetaPlantilla({ id: Date.now()+1, titulo: 'Fondo de Emergencia', categoria: 'Finanzas', fecha: 'Julio 2026', progreso: 0, colorTono: 'emerald' })} className={`p-4 rounded-2xl border cursor-pointer transition-all hover:-translate-y-1 ${modoOscuro ? 'border-gray-700 hover:border-emerald-500 bg-gray-800/50 hover:bg-gray-800' : 'border-gray-200 hover:border-emerald-400 bg-white hover:shadow-md'}`}>
                    <div className="text-3xl mb-2">🛡️</div>
                    <h4 className={`font-bold ${textPrimary}`}>Fondo de Emergencia</h4>
                    <p className={`text-xs mt-1 ${textSecondary}`}>Finanzas ($10k)</p>
                  </div>

                  <div onClick={() => handleAgregarMetaPlantilla({ id: Date.now()+2, titulo: 'Aprender a Cocinar', categoria: 'Salud', fecha: 'Octubre 2026', progreso: 0, colorTono: 'teal' })} className={`p-4 rounded-2xl border cursor-pointer transition-all hover:-translate-y-1 ${modoOscuro ? 'border-gray-700 hover:border-teal-500 bg-gray-800/50 hover:bg-gray-800' : 'border-gray-200 hover:border-teal-400 bg-white hover:shadow-md'}`}>
                    <div className="text-3xl mb-2">🧑‍🍳</div>
                    <h4 className={`font-bold ${textPrimary}`}>Aprender a Cocinar</h4>
                    <p className={`text-xs mt-1 ${textSecondary}`}>Salud y Bienestar</p>
                  </div>

                  <div onClick={() => handleAgregarMetaPlantilla({ id: Date.now()+3, titulo: 'Aprender Inglés (B2)', categoria: 'Desarrollo', fecha: 'Marzo 2027', progreso: 0, colorTono: 'indigo' })} className={`p-4 rounded-2xl border cursor-pointer transition-all hover:-translate-y-1 ${modoOscuro ? 'border-gray-700 hover:border-indigo-500 bg-gray-800/50 hover:bg-gray-800' : 'border-gray-200 hover:border-indigo-400 bg-white hover:shadow-md'}`}>
                    <div className="text-3xl mb-2">🌎</div>
                    <h4 className={`font-bold ${textPrimary}`}>Inglés Nivel B2</h4>
                    <p className={`text-xs mt-1 ${textSecondary}`}>Desarrollo Profesional</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}