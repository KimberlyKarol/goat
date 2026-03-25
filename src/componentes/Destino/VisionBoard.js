import React from 'react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });

export default function VisionBoard({ 
  datos, porcentaje, dias, background, 
  onUpload, onDelete, isUploading, isChanging, 
  fileRef, getBarColor 
}) {
  return (
    <div className={`rounded-[2.5rem] p-8 md:p-12 shadow-2xl text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 min-h-[350px] transition-all duration-700 ${isChanging ? 'blur-md opacity-40 scale-95' : 'blur-0 opacity-100 scale-100'}`}
      style={{ backgroundImage: `url('${background}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="absolute top-6 right-6 z-20 flex gap-3">
        {datos?.url_fondo && (
          <button onClick={onDelete} className="bg-red-500/20 hover:bg-red-500/50 backdrop-blur-md text-white p-3 rounded-full border border-red-500/30 transition-all shadow-xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
        <button onClick={onUpload} className="bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full border border-white/30 transition-all shadow-xl">
          {isUploading ? <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div> : <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><circle cx="12" cy="13" r="3" /></svg>}
        </button>
      </div>

      <div className="relative z-10 flex-1 text-left">
        <p className="text-indigo-300 text-xs font-black uppercase mb-3 tracking-widest">Vision Board</p>
        <h3 className={`${montserrat.className} text-4xl md:text-6xl font-black mb-6 uppercase leading-tight drop-shadow-2xl`}>{datos?.gran_sueno}</h3>
        <div className="max-w-md">
          <div className="flex justify-between mb-2 text-xs font-black italic"><span>PROGRESO HACIA EL DESTINO</span><span>{porcentaje}%</span></div>
          <div className="w-full bg-white/20 h-4 rounded-full overflow-hidden border border-white/10">
            <div className={`${getBarColor()} h-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.3)]`} style={{ width: `${porcentaje}%` }}></div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/20 text-center relative z-10 min-w-[220px] shadow-2xl">
        <p className="text-indigo-200 text-xs font-black uppercase mb-1">Faltan</p>
        <div className="flex items-baseline justify-center gap-1"><span className="text-7xl font-black">{dias}</span><span className="text-xl font-bold uppercase">días</span></div>
      </div>
    </div>
  );
}