"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Montserrat, Poppins } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function Reportes() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const transacciones = [
    { id: 1, titulo: 'Nómina Quincenal', fecha: '15 Feb 2026', monto: '+ $7,500.00', tipo: 'ingreso', icono: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 2, titulo: 'Pago de Renta', fecha: '16 Feb 2026', monto: '- $4,500.00', tipo: 'gasto', icono: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 3, titulo: 'Supermercado', fecha: '18 Feb 2026', monto: '- $1,200.00', tipo: 'gasto', icono: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 4, titulo: 'Transferencia a Ahorro', fecha: '20 Feb 2026', monto: '- $1,500.00', tipo: 'ahorro', icono: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  ];

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
      <aside className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-30 flex flex-col w-72 bg-teal-900 text-white shadow-2xl`}>
        <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden absolute top-6 right-6 text-teal-300 hover:text-white transition-colors">
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
          <Link href="#" className="flex items-center gap-4 px-6 py-4 text-teal-100 hover:bg-teal-800/50 hover:text-white rounded-2xl font-medium transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            Mi Templo
          </Link>
          <Link href="/Reportes" className="flex items-center gap-4 px-6 py-4 bg-emerald-700 rounded-2xl text-white font-bold transition-all shadow-inner">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12V7H5a2 2 0 010-4h14v4M3 5v14a2 2 0 002 2h16v-5M18 12a2 2 0 000 4h4v-4h-4z"></path></svg>
            Mi Tesoro
          </Link>
          <Link href="#" className="flex items-center gap-4 px-6 py-4 text-teal-100 hover:bg-teal-800/50 hover:text-white rounded-2xl font-medium transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
            Mi Destino
          </Link>
        </nav>
      </aside>
      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="flex justify-between items-center p-6 md:p-10 border-b border-gray-200/50 bg-white/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 bg-white rounded-xl shadow-sm text-teal-900 border border-gray-100">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <div>
              <h1 className={`${montserrat.className} text-2xl md:text-3xl font-black text-gray-900`}>Reporte Financiero</h1>
              <p className="text-gray-500 font-medium text-sm md:text-base">Febrero 2026</p>
            </div>
          </div>

          <Link href="/Perfil" className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group">
            <div className="w-10 h-10 bg-teal-100 group-hover:bg-teal-200 rounded-full flex items-center justify-center text-teal-800 font-bold text-lg transition-colors">
              AL
            </div>
          </Link>
        </header>

        <div className="p-6 md:p-10 space-y-6 md:space-y-8"> 
          {/* TARJETAS DE RESUMEN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <p className="text-gray-500 font-medium mb-1">Total Ingresos</p>
              <p className="text-3xl font-black text-emerald-600">$15,000.00</p>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <p className="text-gray-500 font-medium mb-1">Total Gastos</p>
              <p className="text-3xl font-black text-rose-600">$5,700.00</p>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <p className="text-gray-500 font-medium mb-1">Ahorro Generado</p>
              <p className="text-3xl font-black text-blue-600">$1,500.00</p>
            </div>
          </div>
          {/* SECCIÓN DE GRÁFICO */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className={`${montserrat.className} text-xl font-bold text-gray-900`}>Flujo de Efectivo</h3>
              <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 outline-none">
                <option>Este mes</option>
                <option>Mes pasado</option>
              </select>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-2 md:gap-4 pt-4 border-b border-gray-100">
              {[40, 70, 45, 90, 65, 30, 85].map((height, index) => (
                <div key={index} className="w-full flex flex-col justify-end items-center group">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs py-1 px-2 rounded mb-2">
                    ${height * 100}
                  </span>
                  <div 
                    style={{ height: `${height}%` }} 
                    className={`w-full max-w-[3rem] rounded-t-lg transition-all duration-500 ${index === 3 ? 'bg-emerald-500' : 'bg-emerald-200 group-hover:bg-emerald-400'}`}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3 text-xs md:text-sm font-medium text-gray-400">
              <span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span>
            </div>
          </div>
          {/* LISTA DE TRANSACCIONES */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200">
            <h3 className={`${montserrat.className} text-xl font-bold text-gray-900 mb-6`}>Transacciones Recientes</h3>
            
            <div className="space-y-4">
              {transacciones.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      tx.tipo === 'ingreso' ? 'bg-emerald-100 text-emerald-600' : 
                      tx.tipo === 'ahorro' ? 'bg-blue-100 text-blue-600' : 'bg-rose-100 text-rose-600'
                    }`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={tx.icono}></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm md:text-base">{tx.titulo}</p>
                      <p className="text-gray-500 text-xs md:text-sm font-medium">{tx.fecha}</p>
                    </div>
                  </div>
                  
                  <div className={`font-black text-sm md:text-lg ${
                    tx.tipo === 'ingreso' ? 'text-emerald-600' : 
                    tx.tipo === 'ahorro' ? 'text-blue-600' : 'text-rose-600'
                  }`}>
                    {tx.monto}
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-4 rounded-2xl border-2 border-gray-100 text-teal-700 font-bold hover:bg-teal-50 hover:border-teal-100 transition-colors cursor-pointer">
              Ver todo el historial
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}