"use client";

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { Montserrat, Poppins } from 'next/font/google';

// IMPORTAMOS EL CONTEXTO GLOBAL
import { ThemeContext } from '@/context/ThemeContext';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function Reportes() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- ESTADOS PARA LOS MODALES ---
  const [isModalTransaccionOpen, setIsModalTransaccionOpen] = useState(false);
  const [isModalHistorialOpen, setIsModalHistorialOpen] = useState(false);
  const [estadoGuardar, setEstadoGuardar] = useState('Guardar Transacción');
  
  // NUEVO: Estado para el botón de descarga
  const [estadoDescarga, setEstadoDescarga] = useState('Descargar Reporte (CSV)');

  // EXTRAEMOS EL ESTADO DEL MODO OSCURO GLOBAL
  const { modoOscuro } = useContext(ThemeContext);

  // --- VARIABLES DINÁMICAS PARA EL MODO OSCURO ---
  const themeBg = modoOscuro ? 'bg-gray-900' : 'bg-[#F3F4F6]';
  const cardBg = modoOscuro ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const textPrimary = modoOscuro ? 'text-white' : 'text-gray-900';
  const textSecondary = modoOscuro ? 'text-gray-400' : 'text-gray-500';
  const headerBg = modoOscuro ? 'bg-gray-900/95 border-gray-800' : 'bg-[#F3F4F6]/95 border-gray-200/80';
  const selectBg = modoOscuro ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-700';
  const hoverRow = modoOscuro ? 'hover:bg-gray-700 hover:border-gray-600' : 'hover:bg-gray-50 hover:border-gray-100';
  const inputBg = modoOscuro ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-800';

  // --- DATOS SIMULADOS ---
  const transacciones = [
    { id: 1, titulo: 'Nómina Quincenal', fecha: '15 Feb 2026', monto: '+ $7,500.00', tipo: 'ingreso', categoria: 'Ingreso Fijo', catColor: modoOscuro ? 'bg-teal-900/40 text-teal-400' : 'bg-teal-100 text-teal-700', icono: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 2, titulo: 'Pago de Renta', fecha: '16 Feb 2026', monto: '- $4,500.00', tipo: 'gasto', categoria: 'Vivienda', catColor: modoOscuro ? 'bg-purple-900/40 text-purple-400' : 'bg-purple-100 text-purple-700', icono: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 3, titulo: 'Supermercado', fecha: '18 Feb 2026', monto: '- $1,200.00', tipo: 'gasto', categoria: 'Comida', catColor: modoOscuro ? 'bg-orange-900/40 text-orange-400' : 'bg-orange-100 text-orange-600', icono: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 4, titulo: 'Transferencia a Ahorro', fecha: '20 Feb 2026', monto: '- $1,500.00', tipo: 'ahorro', categoria: 'Meta: Viajar a Japón', catColor: modoOscuro ? 'bg-indigo-900/40 text-indigo-300' : 'bg-indigo-100 text-indigo-700', icono: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  ];

  // Historial extendido para el modal
  const historialCompleto = [
    ...transacciones,
    { id: 5, titulo: 'Suscripción Streaming', fecha: '10 Feb 2026', monto: '- $250.00', tipo: 'gasto', categoria: 'Entretenimiento', catColor: modoOscuro ? 'bg-pink-900/40 text-pink-400' : 'bg-pink-100 text-pink-700', icono: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
    { id: 6, titulo: 'Venta de artículo', fecha: '05 Feb 2026', monto: '+ $800.00', tipo: 'ingreso', categoria: 'Ingreso Extra', catColor: modoOscuro ? 'bg-teal-900/40 text-teal-400' : 'bg-teal-100 text-teal-700', icono: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 7, titulo: 'Recarga Transporte', fecha: '02 Feb 2026', monto: '- $300.00', tipo: 'gasto', categoria: 'Transporte', catColor: modoOscuro ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-100 text-blue-700', icono: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
  ];

  // --- FUNCIÓN PARA SIMULAR EL GUARDADO DE TRANSACCIÓN ---
  const handleGuardarTransaccion = (e) => {
    e.preventDefault(); 
    setEstadoGuardar('Guardando...');
    setTimeout(() => {
      setEstadoGuardar('¡Agregada con éxito!');
      setTimeout(() => {
        setIsModalTransaccionOpen(false);
        setEstadoGuardar('Guardar Transacción');
      }, 1000);
    }, 1500);
  };

  // --- NUEVA FUNCIÓN PARA DESCARGAR EL REPORTE ---
  const handleDescargarReporte = () => {
    // 1. Cambiamos el estado a "Generando"
    setEstadoDescarga('Generando documento... ⏳');
    
    setTimeout(() => {
      // 2. Preparamos los datos de la tabla para el archivo
      const encabezados = "ID,Concepto,Fecha,Monto,Categoria\n";
      const filas = historialCompleto.map(tx => 
        `${tx.id},"${tx.titulo}","${tx.fecha}","${tx.monto}","${tx.categoria}"`
      ).join("\n");
      const contenidoCSV = encabezados + filas;

      // 3. Creamos un archivo Blob (Archivo Virtual)
      const blob = new Blob([contenidoCSV], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      // 4. Creamos un enlace invisible y forzamos el clic para descargar
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Reporte_GOAT_Febrero.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 5. Cambiamos el estado a "Éxito"
      setEstadoDescarga('¡Descarga completada! ✅');

      // 6. Regresamos el botón a la normalidad después de 3 segundos
      setTimeout(() => {
        setEstadoDescarga('Descargar Reporte (CSV)');
      }, 3000);

    }, 1500); // Finge que tarda 1.5 segundos en generarlo
  };

  return (
    <div className={`flex h-screen w-full overflow-hidden transition-colors duration-500 ${themeBg} ${poppins.className}`}>
      
      {/* OVERLAY MÓVIL MENÚ */}
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
          <Link href="/Reportes" className="flex items-center gap-4 px-6 py-4 bg-emerald-700 rounded-2xl text-white font-bold transition-all shadow-inner">
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
        
        {/* HEADER */}
        <header className={`flex justify-between items-center p-6 md:p-10 border-b backdrop-blur-xl sticky top-0 z-50 transition-colors duration-500 ${headerBg}`}>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className={`md:hidden p-2 rounded-xl shadow-sm border transition-colors cursor-pointer ${cardBg} ${textPrimary}`}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <div>
              <h1 className={`${montserrat.className} text-2xl md:text-3xl font-black transition-colors duration-500 ${textPrimary}`}>Reporte Financiero</h1>
              <p className={`font-medium text-sm md:text-base transition-colors duration-500 ${textSecondary}`}>Febrero 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* BOTÓN NUEVA TRANSACCIÓN */}
            <button 
              onClick={() => setIsModalTransaccionOpen(true)}
              className={`hidden md:flex items-center gap-2 font-bold px-5 py-2.5 rounded-full transition-colors shadow-sm cursor-pointer border ${
                modoOscuro 
                  ? 'bg-emerald-900/40 text-emerald-400 border-emerald-800 hover:bg-emerald-800' 
                  : 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
              Nueva Transacción
            </button>

            <Link href="/Perfil" className={`flex items-center gap-4 px-5 py-2.5 rounded-full shadow-sm border hover:shadow-md transition-all cursor-pointer group ${cardBg}`}>
              <div className="w-10 h-10 bg-teal-100 group-hover:bg-teal-200 rounded-full flex items-center justify-center text-teal-800 font-bold text-lg transition-colors">
                AL
              </div>
            </Link>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-6 md:space-y-8">
          
          {/* TARJETAS DE RESUMEN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`rounded-3xl p-6 shadow-sm border transition-colors duration-500 ${cardBg}`}>
              <p className={`font-medium mb-1 transition-colors duration-500 ${textSecondary}`}>Total Ingresos</p>
              <p className={`text-3xl font-black transition-colors duration-500 ${modoOscuro ? 'text-emerald-400' : 'text-emerald-600'}`}>$15,000.00</p>
            </div>
            <div className={`rounded-3xl p-6 shadow-sm border transition-colors duration-500 ${cardBg}`}>
              <p className={`font-medium mb-1 transition-colors duration-500 ${textSecondary}`}>Total Gastos</p>
              <p className={`text-3xl font-black transition-colors duration-500 ${modoOscuro ? 'text-rose-400' : 'text-rose-600'}`}>$5,700.00</p>
            </div>
            <div className={`rounded-3xl p-6 shadow-sm border transition-colors duration-500 ${cardBg}`}>
              <p className={`font-medium mb-1 transition-colors duration-500 ${textSecondary}`}>Ahorro Generado</p>
              <p className={`text-3xl font-black transition-colors duration-500 ${modoOscuro ? 'text-blue-400' : 'text-blue-600'}`}>$1,500.00</p>
            </div>
          </div>

          {/* FILA 2: GRÁFICO Y PROYECCIÓN */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* SECCIÓN DE GRÁFICO */}
            <div className={`lg:col-span-2 rounded-3xl p-6 md:p-8 shadow-sm border transition-colors duration-500 flex flex-col ${cardBg}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`${montserrat.className} text-xl font-bold transition-colors duration-500 ${textPrimary}`}>Flujo de Efectivo</h3>
                <select className={`text-sm rounded-lg px-3 py-2 outline-none transition-colors duration-300 cursor-pointer ${selectBg}`}>
                  <option>Este mes</option>
                  <option>Mes pasado</option>
                </select>
              </div>
              
              <div className={`h-64 flex items-end justify-between gap-2 md:gap-4 pt-4 border-b transition-colors duration-500 ${modoOscuro ? 'border-gray-700' : 'border-gray-100'}`}>
                {[40, 70, 45, 90, 65, 30, 85].map((height, index) => (
                  <div key={index} className="w-full flex flex-col justify-end items-center group h-full">
                    <span className={`opacity-0 group-hover:opacity-100 transition-opacity text-xs py-1 px-2 rounded mb-2 ${modoOscuro ? 'bg-gray-700 text-white' : 'bg-gray-800 text-white'}`}>
                      ${height * 100}
                    </span>
                    <div 
                      style={{ height: `${height}%` }} 
                      className={`w-full max-w-[3rem] rounded-t-lg transition-all duration-500 
                        ${index === 3 
                          ? (modoOscuro ? 'bg-emerald-400' : 'bg-emerald-500') 
                          : (modoOscuro ? 'bg-emerald-900/50 group-hover:bg-emerald-600' : 'bg-emerald-200 group-hover:bg-emerald-400')}`}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3 text-xs md:text-sm font-medium text-gray-400">
                <span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span>
              </div>
            </div>

            {/* PROYECCIÓN DE TU DESTINO */}
            <div className="lg:col-span-1 bg-gradient-to-br from-indigo-800 to-indigo-950 rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-2xl"></div>
              
              <div>
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm border border-white/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                  </div>
                  <h3 className={`${montserrat.className} text-xl font-bold`}>Proyección de tu Destino</h3>
                </div>

                <div className="mb-6 relative z-10 text-center">
                  <p className="text-indigo-200 font-medium text-sm mb-1 uppercase tracking-widest">Ritmo de ahorro actual</p>
                  <p className="text-4xl font-black text-white drop-shadow-sm">$1,500 <span className="text-lg font-medium text-indigo-300">/ mes</span></p>
                </div>

                <div className="relative z-10 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center shadow-inner">
                  <p className="text-indigo-50 font-medium text-sm md:text-base leading-relaxed">
                    Al ritmo de ahorro actual, alcanzarás tu meta para <strong>'Viajar a Japón'</strong> en <strong>8 meses</strong>. <br/><br/>
                    <span className="text-emerald-300 font-bold">¡Vas en tiempo perfecto! ✈️</span>
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* GOAT INSIGHTS */}
          <div className={`rounded-2xl p-5 border shadow-sm flex items-start gap-4 transition-colors ${modoOscuro ? 'bg-teal-900/20 border-teal-800' : 'bg-teal-50 border-teal-100'}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${modoOscuro ? 'bg-teal-900/50' : 'bg-white shadow-sm'}`}>
              💡
            </div>
            <div>
              <h4 className={`font-bold mb-1 transition-colors ${modoOscuro ? 'text-teal-400' : 'text-teal-900'}`}>GOAT Insight: Salud & Dinero</h4>
              <p className={`text-sm leading-relaxed transition-colors ${modoOscuro ? 'text-teal-100' : 'text-teal-800'}`}>
                Esta semana registraste <strong>4 comidas hechas en casa</strong> en 'Mi Templo'. Esto redujo tus gastos de comida en <strong>$600 MXN</strong>, acercándote <strong>3 días más</strong> a tu Viaje a Japón. ¡Excelente trabajo!
              </p>
            </div>
          </div>

          {/* LISTA DE TRANSACCIONES */}
          <div className={`rounded-3xl p-6 md:p-8 shadow-sm border transition-colors duration-500 ${cardBg}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`${montserrat.className} text-xl font-bold transition-colors duration-500 ${textPrimary}`}>Transacciones Recientes</h3>
              
              {/* Botón flotante para móvil (NUEVA TRANSACCIÓN) */}
              <button 
                onClick={() => setIsModalTransaccionOpen(true)}
                className="md:hidden bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-full shadow-md cursor-pointer transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
              </button>
            </div>
            
            <div className="space-y-4">
              {transacciones.map((tx) => (
                <div key={tx.id} className={`flex items-center justify-between p-4 rounded-2xl transition-colors border border-transparent cursor-pointer ${hoverRow}`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full transition-colors duration-500 ${
                      tx.tipo === 'ingreso' ? (modoOscuro ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-100 text-emerald-600') : 
                      tx.tipo === 'ahorro' ? (modoOscuro ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-100 text-blue-600') : 
                      (modoOscuro ? 'bg-rose-900/40 text-rose-400' : 'bg-rose-100 text-rose-600')
                    }`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={tx.icono}></path>
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className={`font-bold text-sm md:text-base transition-colors duration-500 ${textPrimary}`}>{tx.titulo}</p>
                        <span className={`hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${tx.catColor}`}>
                          {tx.categoria}
                        </span>
                      </div>
                      <p className={`text-xs md:text-sm font-medium transition-colors duration-500 ${textSecondary}`}>{tx.fecha}</p>
                    </div>
                  </div>
                  <div className={`font-black text-sm md:text-lg transition-colors duration-500 ${
                    tx.tipo === 'ingreso' ? (modoOscuro ? 'text-emerald-400' : 'text-emerald-600') : 
                    tx.tipo === 'ahorro' ? (modoOscuro ? 'text-blue-400' : 'text-blue-600') : 
                    (modoOscuro ? 'text-rose-400' : 'text-rose-600')
                  }`}>
                    {tx.monto}
                  </div>
                </div>
              ))}
            </div>
            
            {/* BOTÓN INTERACTIVO: VER HISTORIAL */}
            <button 
              onClick={() => setIsModalHistorialOpen(true)}
              className={`w-full mt-6 py-4 rounded-2xl border-2 font-bold transition-colors cursor-pointer
              ${modoOscuro 
                ? 'border-gray-700 text-teal-400 hover:bg-gray-700/50 hover:border-gray-600' 
                : 'border-gray-100 text-teal-700 hover:bg-teal-50 hover:border-teal-100'
              }`}
            >
              Ver todo el historial
            </button>
          </div>

        </div>
      </main>

      {/* ================================================================== */}
      {/* MODAL 1: NUEVA TRANSACCIÓN */}
      {/* ================================================================== */}
      {isModalTransaccionOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalTransaccionOpen(false)}></div>
          
          <div className={`relative w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl transform transition-all scale-100 ${cardBg}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`${montserrat.className} text-2xl font-black ${textPrimary}`}>Nueva Transacción</h3>
              <button onClick={() => setIsModalTransaccionOpen(false)} className={`p-2 rounded-full transition-colors ${modoOscuro ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <form onSubmit={handleGuardarTransaccion} className="space-y-5">
              {/* Selectores de Tipo */}
              <div className="grid grid-cols-3 gap-3">
                <label className="cursor-pointer">
                  <input type="radio" name="tipo" className="peer sr-only" defaultChecked />
                  <div className={`text-center py-2 rounded-xl border-2 font-bold text-sm transition-all peer-checked:bg-emerald-100 peer-checked:text-emerald-700 peer-checked:border-emerald-500 ${modoOscuro ? 'border-gray-700 text-gray-400 hover:bg-gray-700' : 'border-gray-100 text-gray-500 hover:bg-gray-50'}`}>
                    Ingreso
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input type="radio" name="tipo" className="peer sr-only" />
                  <div className={`text-center py-2 rounded-xl border-2 font-bold text-sm transition-all peer-checked:bg-rose-100 peer-checked:text-rose-700 peer-checked:border-rose-500 ${modoOscuro ? 'border-gray-700 text-gray-400 hover:bg-gray-700' : 'border-gray-100 text-gray-500 hover:bg-gray-50'}`}>
                    Gasto
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input type="radio" name="tipo" className="peer sr-only" />
                  <div className={`text-center py-2 rounded-xl border-2 font-bold text-sm transition-all peer-checked:bg-blue-100 peer-checked:text-blue-700 peer-checked:border-blue-500 ${modoOscuro ? 'border-gray-700 text-gray-400 hover:bg-gray-700' : 'border-gray-100 text-gray-500 hover:bg-gray-50'}`}>
                    Ahorro
                  </div>
                </label>
              </div>

              <div>
                <label className={`block font-bold mb-2 ml-1 text-sm ${textPrimary}`}>Monto ($)</label>
                <input type="number" placeholder="0.00" required className={`w-full rounded-xl px-4 py-3 border focus:border-teal-600 outline-none transition-colors duration-300 font-bold text-lg ${inputBg}`} />
              </div>

              <div>
                <label className={`block font-bold mb-2 ml-1 text-sm ${textPrimary}`}>Concepto</label>
                <input type="text" placeholder="Ej. Pago de Internet" required className={`w-full rounded-xl px-4 py-3 border focus:border-teal-600 outline-none transition-colors duration-300 font-medium ${inputBg}`} />
              </div>

              <div>
                <label className={`block font-bold mb-2 ml-1 text-sm ${textPrimary}`}>Categoría</label>
                <select className={`w-full rounded-xl px-4 py-3 border focus:border-teal-600 outline-none transition-colors duration-300 font-medium cursor-pointer ${inputBg}`}>
                  <option>Comida</option>
                  <option>Vivienda</option>
                  <option>Transporte</option>
                  <option>Entretenimiento</option>
                  <option className="font-bold text-indigo-600">Meta: Viajar a Japón</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={estadoGuardar !== 'Guardar Transacción'}
                className={`w-full mt-4 font-bold py-3.5 rounded-xl transition-all cursor-pointer shadow-md
                  ${estadoGuardar === 'Guardar Transacción' 
                      ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                      : estadoGuardar === 'Guardando...' 
                        ? (modoOscuro ? 'bg-gray-700 text-gray-400 cursor-wait shadow-none' : 'bg-gray-200 text-gray-500 cursor-wait shadow-none') 
                        : 'bg-emerald-500 text-white'
                  }`}
              >
                {estadoGuardar}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* MODAL 2: VER HISTORIAL COMPLETO */}
      {/* ================================================================== */}
      {isModalHistorialOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalHistorialOpen(false)}></div>
          
          <div className={`relative w-full max-w-3xl max-h-[85vh] rounded-3xl flex flex-col shadow-2xl transform transition-all scale-100 ${cardBg}`}>
            
            {/* Cabecera del Modal */}
            <div className={`p-6 md:p-8 border-b flex justify-between items-center shrink-0 ${modoOscuro ? 'border-gray-700' : 'border-gray-100'}`}>
              <div>
                <h3 className={`${montserrat.className} text-2xl font-black ${textPrimary}`}>Historial Completo</h3>
                <p className={`font-medium mt-1 text-sm ${textSecondary}`}>Todas tus transacciones de Febrero 2026</p>
              </div>
              <button onClick={() => setIsModalHistorialOpen(false)} className={`p-2 rounded-full transition-colors ${modoOscuro ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Lista escrolleable (Usa el array extendido) */}
            <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-4">
              {historialCompleto.map((tx) => (
                <div key={tx.id} className={`flex items-center justify-between p-4 rounded-2xl transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600 ${modoOscuro ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full transition-colors duration-500 ${
                      tx.tipo === 'ingreso' ? (modoOscuro ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-100 text-emerald-600') : 
                      tx.tipo === 'ahorro' ? (modoOscuro ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-100 text-blue-600') : 
                      (modoOscuro ? 'bg-rose-900/40 text-rose-400' : 'bg-rose-100 text-rose-600')
                    }`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={tx.icono}></path>
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className={`font-bold text-sm md:text-base ${textPrimary}`}>{tx.titulo}</p>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${tx.catColor}`}>
                          {tx.categoria}
                        </span>
                      </div>
                      <p className={`text-xs md:text-sm font-medium ${textSecondary}`}>{tx.fecha}</p>
                    </div>
                  </div>
                  <div className={`font-black text-sm md:text-lg ${
                    tx.tipo === 'ingreso' ? (modoOscuro ? 'text-emerald-400' : 'text-emerald-600') : 
                    tx.tipo === 'ahorro' ? (modoOscuro ? 'text-blue-400' : 'text-blue-600') : 
                    (modoOscuro ? 'text-rose-400' : 'text-rose-600')
                  }`}>
                    {tx.monto}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pie del Modal: BOTÓN DE DESCARGA ACTIVO */}
            <div className={`p-6 border-t shrink-0 ${modoOscuro ? 'border-gray-700' : 'border-gray-100'}`}>
               <button 
                onClick={handleDescargarReporte}
                disabled={estadoDescarga !== 'Descargar Reporte (CSV)'}
                className={`w-full py-3.5 rounded-xl font-bold transition-colors cursor-pointer flex justify-center items-center gap-2
                  ${estadoDescarga === 'Descargar Reporte (CSV)'
                    ? 'text-teal-700 bg-teal-50 hover:bg-teal-100 dark:text-teal-400 dark:bg-teal-900/30 dark:hover:bg-teal-900/50'
                    : estadoDescarga === 'Generando documento... ⏳'
                      ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-wait'
                      : 'bg-emerald-500 text-white shadow-md'
                  }`}
               >
                 {estadoDescarga === 'Descargar Reporte (CSV)' && (
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                 )}
                 {estadoDescarga}
               </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}