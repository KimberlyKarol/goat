import React from 'react';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });

export default function Header({ perfil, modoOscuro, fechaHoy }) {
  const textPrimary = modoOscuro ? 'text-white' : 'text-gray-900';
  const headerBg = modoOscuro ? 'bg-gray-900/95 border-gray-800' : 'bg-[#F3F4F6]/95 border-gray-200/80';

  return (
    <header className={`flex flex-col md:flex-row justify-between items-center px-8 py-6 sticky top-0 z-40 gap-4 border-b ${headerBg}`}>
      <div className="flex flex-col">
        <h1 className={`${montserrat.className} text-3xl md:text-4xl font-black ${textPrimary} flex items-center gap-2`}>
          Hola, {perfil?.nombres?.split(' ')[0] || "Kimberly"} 👋
        </h1>
        <p className="text-slate-500 font-medium capitalize">{fechaHoy}</p>
      </div>

      <div className="flex items-center gap-6">
        {/* Índice GOAT */}
        <div className="hidden md:flex items-center gap-2 bg-slate-400/50 px-4 py-2 rounded-full border border-slate-500 shadow-sm">
           <span className="text-xs font-black text-slate-900 uppercase tracking-tighter">Índice GOAT:</span>
           <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-rose-500 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">T</div>
              <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">$</div>
              <div className="w-6 h-6 rounded-full bg-indigo-500 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">✈️</div>
           </div>
           <span className="text-xs font-black text-teal-400 ml-2">Equilibrado</span>
        </div>

        <Link href="/Perfil" className="flex items-center gap-3 bg-white p-1 pr-5 rounded-full border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <img 
            src={perfil?.avatar_url || "https://ui-avatars.com/api/?name=Kimberly&background=random"} 
            className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" 
            alt="Avatar"
          />
          <div className="flex flex-col">
            <span className="font-black text-sm text-slate-900 leading-none">{perfil?.nombres?.split(' ')[0] || "Kimberly"}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Nivel GOAT</span>
          </div>
        </Link>
      </div>
    </header>
  );
}