"use client";

import React, { useState, useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Montserrat, Poppins } from 'next/font/google';

// CONTEXTO Y SUPABASE
import { ThemeContext } from '@/context/ThemeContext'; 
import { supabase } from '@/lib/supabase';

// SERVICIOS
import { useTransacciones } from '@/lib/useTransacciones';
import { destinoService } from '@/lib/destinoService'; 
import HistorialNutricion from '@/lib/HistorialNutricion';

// LAYOUT
import Header from '@/componentes/layout/Header';
import Sidebar from '@/componentes/layout/Sidebar';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

// --- COMPONENTE: TARJETA DE MI TEMPLO ---
const TemploCard = ({ consumoHoy, perfil, cardBg, textPrimary }) => {
  const meta = perfil?.meta_calorias || 2000;
  const progreso = Math.min((consumoHoy.calorias_consumidas / meta) * 100, 100);

  return (
    <div className={`rounded-[2.5rem] p-8 shadow-sm border hover:shadow-md transition-all ${cardBg}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className={`font-black text-xl uppercase tracking-tighter ${textPrimary}`}>Mi Templo</h3>
          <p className="text-slate-400 text-xs font-bold">Estado Nutricional Hoy</p>
        </div>
        <div className="bg-orange-500/10 p-3 rounded-2xl text-orange-500 font-black text-xs">SALUD</div>
      </div>
      <div className="flex justify-between items-end mb-3">
        <span className={`text-4xl font-black ${textPrimary}`}>
          {consumoHoy.calorias_consumidas} <span className="text-sm text-slate-400 font-bold">/ {meta} kcal</span>
        </span>
      </div>
      <div className="w-full h-4 bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden mb-6">
        <div 
          className="bg-gradient-to-r from-orange-400 to-rose-500 h-full transition-all duration-700 shadow-[0_0_10px_rgba(249,115,22,0.4)]" 
          style={{ width: `${progreso}%` }} 
        />
      </div>
      <div className="flex items-center gap-4 bg-blue-500/5 p-4 rounded-2xl border border-blue-500/10">
        <span className="text-2xl">💧</span>
        <div>
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">Hidratación</p>
          <p className={`text-xl font-black ${textPrimary}`}>{consumoHoy.agua_ml} <span className="text-xs font-bold opacity-60">ml consumidos</span></p>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE: TARJETA DE MI TESORO ---
const TesoroCard = ({ ahorro, cardBg, textPrimary }) => {
  const metaSugerida = 10000;
  const progreso = Math.min((ahorro / metaSugerida) * 100, 100);

  return (
    <div className={`rounded-[2.5rem] p-8 shadow-sm border hover:shadow-md transition-all ${cardBg}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className={`font-black text-xl uppercase tracking-tighter ${textPrimary}`}>Mi Tesoro</h3>
          <p className="text-slate-400 text-xs font-bold">Balance de Ahorros</p>
        </div>
        <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-500 font-black text-xs">FINANZAS</div>
      </div>
      <div className="mb-3">
        <p className="text-5xl font-black text-emerald-500 tracking-tighter">${ahorro.toLocaleString()}</p>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Total Acumulado</p>
      </div>
      <div className="w-full h-4 bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden mt-6">
        <div 
          className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full transition-all duration-700 shadow-[0_0_10px_rgba(16,185,129,0.4)]" 
          style={{ width: `${progreso}%` }} 
        />
      </div>
    </div>
  );
};

// --- COMPONENTE: VISION BOARD ---
const VisionBoard = ({ datosPerfil, backgroundImage, isUploading, porcentaje, diasFaltantes, onFileClick, fileInputRef, handleFileChange }) => (
  <div className="relative w-full h-96 rounded-[2.5rem] overflow-hidden shadow-2xl group border-4 border-white/20">
    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${backgroundImage})` }} />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
    <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-3">
          <span className="px-5 py-1.5 bg-teal-500 text-white text-xs font-black rounded-full uppercase tracking-widest shadow-lg">Tu Destino GOAT</span>
          <h2 className={`${montserrat.className} text-4xl md:text-6xl font-black leading-none`}>{datosPerfil?.gran_sueno || "Mi Gran Meta"}</h2>
          <p className="text-teal-200 text-lg font-medium">Faltan <span className="text-white font-bold">{diasFaltantes} días</span> para lograrlo</p>
        </div>
        <div className="flex flex-col items-end gap-3 bg-black/20 backdrop-blur-md p-6 rounded-3xl border border-white/10">
          <p className="text-[10px] font-black uppercase tracking-widest text-teal-300">Progreso de Ruta</p>
          <div className="flex items-center gap-4">
            <div className="w-48 h-3 bg-white/20 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-1000 shadow-lg ${porcentaje < 35 ? 'bg-rose-500' : porcentaje < 75 ? 'bg-yellow-500' : 'bg-emerald-500'}`} style={{ width: `${porcentaje}%` }} />
            </div>
            <span className="font-black text-2xl">{porcentaje}%</span>
          </div>
        </div>
      </div>
    </div>
    <button onClick={onFileClick} className="absolute top-8 right-8 p-4 bg-white/10 hover:bg-teal-500 backdrop-blur-md rounded-full transition-all border border-white/20 shadow-xl">
      {isUploading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <span className="text-xl">📷</span>}
    </button>
    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
  </div>
);

// --- COMPONENTE PRINCIPAL: DASHBOARD ---
export default function Dashboard() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { modoOscuro } = useContext(ThemeContext);

  // Estados
  const { totales: totalesFinancieros } = useTransacciones();
  const [perfil, setPerfil] = useState(null);
  const [hitos, setHitos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [consumoHoy, setConsumoHoy] = useState({ id: null, calorias_consumidas: 0, agua_ml: 0 });
  const [historial, setHistorial] = useState([]);

  // Estilos de tema
  const themeBg = modoOscuro ? 'bg-gray-900' : 'bg-[#F3F4F6]';
  const cardBg = modoOscuro ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const textPrimary = modoOscuro ? 'text-white' : 'text-gray-900';
  const fechaHoy = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

  const cargarDatosDashboard = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push('/Login');

      const { perfil: dataDestino, hitos: dataHitos } = await destinoService.getDatosCompletos();
      if (dataDestino) setPerfil(dataDestino);
      if (dataHitos) setHitos(dataHitos);

      const hoy = new Date().toLocaleDateString('en-CA'); 
      let { data: consumo } = await supabase.from('consumo_diario').select('*').eq('usuario_id', user.id).eq('fecha', hoy).maybeSingle();

      if (!consumo) {
        const { data: nuevo } = await supabase.from('consumo_diario').insert([{ usuario_id: user.id, fecha: hoy, calorias_consumidas: 0, agua_ml: 0 }]).select().single();
        consumo = nuevo;
      }
      if (consumo) setConsumoHoy(consumo);

      const { data: dataHistorial } = await supabase.from('consumo_diario').select('*').eq('usuario_id', user.id).order('fecha', { ascending: false }).limit(7);
      setHistorial(dataHistorial || []);

    } catch (error) { console.error(error); } finally { setCargando(false); }
  };

  useEffect(() => { cargarDatosDashboard(); }, [router]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const filePath = `fondos_metas/${perfil.id}-${Date.now()}`;
      await supabase.storage.from('imagenes_metas').upload(filePath, file);
      const { data: { publicUrl } } = supabase.storage.from('imagenes_metas').getPublicUrl(filePath);
      await destinoService.actualizarPerfil(perfil.id, { url_fondo: publicUrl });
      setPerfil({ ...perfil, url_fondo: publicUrl });
    } catch (e) { alert("Error al subir"); } finally { setIsUploading(false); }
  };

  const diasFaltantes = perfil?.fecha_ideal ? Math.max(0, Math.ceil((new Date(perfil.fecha_ideal) - new Date()) / 86400000)) : 0;
  const porcentajeReal = hitos.length === 0 ? 0 : Math.round((hitos.filter(h => h.completado).length / hitos.length) * 100);

  if (cargando) return <div className={`h-screen flex items-center justify-center ${themeBg} text-teal-500 font-bold animate-pulse`}>Sincronizando tu Destino GOAT...</div>;

  return (
    <div className={`flex h-screen w-full transition-colors duration-500 ${themeBg} overflow-hidden ${poppins.className}`}>
      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />

      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        {!isMobileMenuOpen && (
          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden absolute top-7 left-6 z-50 p-2 bg-teal-900 text-white rounded-lg shadow-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        )}

        <Header perfil={perfil} modoOscuro={modoOscuro} fechaHoy={fechaHoy} />

        <div className="p-6 md:p-10 flex flex-col gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TemploCard consumoHoy={consumoHoy} perfil={perfil} cardBg={cardBg} textPrimary={textPrimary} />
            <TesoroCard ahorro={totalesFinancieros.ahorro} cardBg={cardBg} textPrimary={textPrimary} />
          </div>

          <VisionBoard 
            datosPerfil={perfil}
            backgroundImage={perfil?.url_fondo || 'https://loremflickr.com/1600/900/success'}
            isUploading={isUploading}
            porcentaje={porcentajeReal}
            diasFaltantes={diasFaltantes}
            onFileClick={() => fileInputRef.current.click()}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
          />

          <HistorialNutricion historial={historial} modoOscuro={modoOscuro} perfil={perfil} />
        </div>
      </main>
    </div>
  );
}