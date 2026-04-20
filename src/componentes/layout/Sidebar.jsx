"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();

  // Función para verificar si el link es la ruta activa
  const isActive = (path) => pathname === path;

  // Estilos comunes para los links
  const baseLinkStyle = "flex items-center gap-4 px-6 py-4 rounded-2xl font-medium transition-all duration-200";
  const activeLinkStyle = "bg-indigo-600 text-white font-bold shadow-inner";
  const inactiveLinkStyle = "text-teal-100 hover:bg-teal-800/50 hover:text-white";

  return (
    <aside className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-[60] flex flex-col w-72 bg-teal-900 text-white shadow-2xl`}>
      
      {/* BOTÓN CERRAR (MÓVIL) */}
      <button 
        onClick={() => setIsOpen(false)} 
        className="md:hidden absolute top-6 right-6 text-teal-300 hover:text-white transition-colors cursor-pointer"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      {/* LOGO */}
      <div className="p-8 flex justify-center border-b border-teal-800">
        <img src="/logo-ext.png" alt="Logo GOAT" className="h-28 w-auto object-contain filter brightness-0 invert" />
      </div>

      {/* NAVEGACIÓN */}
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
        <Link href="/Dashboard" className={`${baseLinkStyle} ${isActive('/Dashboard') ? activeLinkStyle : inactiveLinkStyle}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          Vista General
        </Link>

        <Link href="/Templo" className={`${baseLinkStyle} ${isActive('/Templo') ? activeLinkStyle : inactiveLinkStyle}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          Mi Templo
        </Link>

        <Link href="/Reportes" className={`${baseLinkStyle} ${isActive('/Reportes') ? activeLinkStyle : inactiveLinkStyle}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12V7H5a2 2 0 010-4h14v4M3 5v14a2 2 0 002 2h16v-5M18 12a2 2 0 000 4h4v-4h-4z"></path></svg>
          Mi Tesoro
        </Link>

        <Link href="/Destino" className={`${baseLinkStyle} ${isActive('/Destino') ? activeLinkStyle : inactiveLinkStyle}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
          Mi Destino
        </Link>
      </nav>

      {/* CERRAR SESIÓN */}
      <div className="p-6 border-t border-teal-800">
        <Link href="/Login" className="flex items-center gap-4 px-6 py-4 text-teal-200 hover:text-white hover:bg-teal-800/50 rounded-2xl font-medium transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Cerrar Sesión
        </Link>
      </div>
    </aside>
  );
}