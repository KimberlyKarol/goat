"use client";

import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Montserrat, Poppins } from 'next/font/google';

// IMPORTAMOS EL CONTEXTO Y SUPABASE
import { ThemeContext } from '@/context/ThemeContext'; 
import { supabase } from '@/lib/supabase';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function Dashboard() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const { modoOscuro } = useContext(ThemeContext);

  // --- ESTADOS PARA SUPABASE ---
  const [perfil, setPerfil] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [cargando, setCargando] = useState(true);

  // --- MODO OSCURO ---
  const themeBg = modoOscuro ? 'bg-gray-900' : 'bg-[#F3F4F6]';
  const cardBg = modoOscuro ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const textPrimary = modoOscuro ? 'text-white' : 'text-gray-900';
  const textSecondary = modoOscuro ? 'text-gray-400' : 'text-gray-500';

  // --- FECHA ACTUAL ---
  const fechaHoy = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

  // --- REGISTRO (MI TEMPLO) ---
  const [agua, setAgua] = useState(1.5);
  const [calorias, setCalorias] = useState(1240);

  const registrarAguaRapido = () => setAgua(prev => parseFloat((prev + 0.25).toFixed(2)));
  const registrarCaloriasRapido = () => setCalorias(prev => prev + 150); 

  // --- TAREAS DIARIAS (ROADMAP) ---
  const [tareas, setTareas] = useState([
    { id: 1, texto: 'Tomar 2L de agua', completada: false },
    { id: 2, texto: 'Ahorrar $50 pesos', completada: false },
    { id: 3, texto: 'Leer sobre visados', completada: false },
    { id: 4, texto: 'Caminar 30 mins', completada: true }
  ]);

  const toggleTarea = (id) => {
    setTareas(tareas.map(t => t.id === id ? { ...t, completada: !t.completada } : t));
  };

  // --- NOTIFICACIONES SIMULADAS ---
  const listaNotificaciones = [
    { id: 1, titulo: '¡Hora de hidratarse!', mensaje: 'No has tomado agua en 3 horas.', tiempo: 'Hace 5 min', icono: '💧', bg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-500' },
    { id: 2, titulo: 'Meta financiera', mensaje: 'Estás a $500 de tu meta mensual.', tiempo: 'Hace 2 hrs', icono: '💰', bg: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-500' },
    { id: 3, titulo: 'Racha de pasos', mensaje: '¡Llevas 3 días cumpliendo tu meta!', tiempo: 'Ayer', icono: '🔥', bg: 'bg-rose-100 dark:bg-rose-900/40 text-rose-500' },
  ];

  // --- TRAER DATOS DE SUPABASE ---
  useEffect(() => {
    async function cargarDatos() {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          router.push('/Login');
          return;
        }

        if (user.user_metadata?.nombres) {
          setNombreUsuario(user.user_metadata.nombres.split(' ')[0]);
        }

        const { data, error: dbError } = await supabase
          .from('perfiles_goat')
          .select('*')
          .eq('id', user.id)
          .single();

        if (dbError && dbError.code !== 'PGRST116') throw dbError;
        if (data) setPerfil(data);

      } catch (error) {
        console.error("Error cargando perfil:", error);
      } finally {
        setCargando(false);
      }
    }
    cargarDatos();
  }, [router]);

  // CÁLCULO DE DÍAS RESTANTES PARA EL SUEÑO
  let diasRestantes = '--';
  if (perfil?.fecha_ideal) {
    const hoy = new Date();
    const meta = new Date(perfil.fecha_ideal);
    const diferencia = meta.getTime() - hoy.getTime();
    diasRestantes = Math.ceil(diferencia / (1000 * 3600 * 24));
    if (diasRestantes < 0) diasRestantes = 0; // Si ya pasó la fecha
  }

  // --- PANTALLA DE CARGA ---
  if (cargando) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${themeBg} ${poppins.className}`}>
        <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-700 rounded-full animate-spin mb-4"></div>
        <p className={`font-bold text-lg animate-pulse ${textPrimary}`}>Cargando tu progreso en GOAT...</p>
      </div>
    );
  }

  return (
    <div className={`flex h-screen w-full transition-colors duration-500 ${themeBg} overflow-hidden ${poppins.className}`}>
      
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
      {isNotifOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)}></div>
      )}

      {/* MENÚ LATERAL */}
      <aside className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-30 flex flex-col w-72 bg-teal-900 text-white shadow-2xl`}>
        <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden absolute top-6 right-6 text-teal-300 hover:text-white transition-colors cursor-pointer">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="p-8 flex justify-center border-b border-teal-800">
          <img src="/logoext.png" alt="Logo GOAT" className="h-28 w-auto object-contain drop-shadow-md filter brightness-0 invert" />
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <Link href="/Dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 bg-teal-800 rounded-2xl text-white font-bold transition-all shadow-inner">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Vista General
          </Link>
          <Link href="/Templo" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 text-teal-100 hover:bg-teal-800/50 hover:text-white rounded-2xl font-medium transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            Mi Templo
          </Link>
          <Link href="/Reportes" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 text-teal-100 hover:bg-teal-800/50 hover:text-white rounded-2xl font-medium transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12V7H5a2 2 0 010-4h14v4M3 5v14a2 2 0 002 2h16v-5M18 12a2 2 0 000 4h4v-4h-4z"></path></svg>
            Mi Tesoro
          </Link>
          <Link href="/Destino" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 text-teal-100 hover:bg-teal-800/50 hover:text-white rounded-2xl font-medium transition-all">
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
        
        {/* HEADER */}
        <header className={`flex justify-between items-center p-6 md:px-10 md:py-8 border-b backdrop-blur-md sticky top-0 z-30 transition-colors duration-500 ${modoOscuro ? 'bg-gray-900/80 border-gray-800' : 'bg-[#F3F4F6]/80 border-transparent'}`}>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className={`md:hidden p-2 rounded-xl shadow-sm border transition-colors cursor-pointer ${cardBg} ${textPrimary}`}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <div className="hidden md:block">
              {/* SALUDO DINÁMICO */}
              <h1 className={`${montserrat.className} text-3xl font-black transition-colors duration-500 ${textPrimary}`}>
                Hola, {nombreUsuario || 'GOAT'} 👋
              </h1>
              <p className={`font-medium mt-1 transition-colors duration-500 ${textSecondary} capitalize`}>
                {fechaHoy}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* ÍNDICE GOAT */}
            <div className="hidden lg:flex items-center gap-2 mr-4 bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
              <span className={`text-xs font-bold ${textPrimary}`}>Índice GOAT:</span>
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full border-2 border-[#F3F4F6] dark:border-gray-900 bg-rose-500 flex items-center justify-center"><span className="text-[10px] text-white">T</span></div>
                <div className="w-6 h-6 rounded-full border-2 border-[#F3F4F6] dark:border-gray-900 bg-emerald-500 flex items-center justify-center"><span className="text-[10px] text-white">$</span></div>
                <div className="w-6 h-6 rounded-full border-2 border-[#F3F4F6] dark:border-gray-900 bg-indigo-500 flex items-center justify-center"><span className="text-[10px] text-white">✈</span></div>
              </div>
              <span className="text-sm font-black text-teal-600 dark:text-teal-400 ml-1">Equilibrado</span>
            </div>

            {/* NOTIFICACIONES */}
            <div className="relative z-50">
              <button onClick={() => setIsNotifOpen(!isNotifOpen)} className={`relative p-2.5 rounded-full transition-colors cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${textPrimary}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#F3F4F6] dark:border-gray-900"></span>
              </button>

              {isNotifOpen && (
                <div className={`absolute right-0 mt-3 w-80 sm:w-96 rounded-3xl shadow-2xl border transition-all animate-fade-in-up origin-top-right ${modoOscuro ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                  <div className={`absolute -top-2 right-3 w-4 h-4 rotate-45 border-l border-t ${modoOscuro ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}></div>
                  <div className={`relative p-5 border-b rounded-t-3xl flex justify-between items-center ${modoOscuro ? 'border-gray-700' : 'border-gray-100'}`}>
                    <h3 className={`${montserrat.className} text-lg font-bold ${textPrimary}`}>Notificaciones</h3>
                    <span className="text-xs bg-rose-100 text-rose-600 px-3 py-1 rounded-full font-bold">3 nuevas</span>
                  </div>
                  <div className="max-h-[350px] overflow-y-auto">
                    {listaNotificaciones.map(notif => (
                      <div key={notif.id} className={`p-5 border-b last:border-0 transition-colors cursor-pointer ${modoOscuro ? 'border-gray-700/50 hover:bg-gray-700/30' : 'border-gray-50 hover:bg-gray-50'}`}>
                        <div className="flex gap-4 items-start">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-2xl ${notif.bg}`}>{notif.icono}</div>
                          <div>
                            <p className={`text-sm font-bold mb-0.5 ${textPrimary}`}>{notif.titulo}</p>
                            <p className={`text-sm leading-snug mb-2 ${textSecondary}`}>{notif.mensaje}</p>
                            <p className={`text-xs font-bold ${modoOscuro ? 'text-gray-500' : 'text-gray-400'}`}>{notif.tiempo}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={`p-4 text-center border-t rounded-b-3xl text-sm font-bold transition-colors cursor-pointer ${modoOscuro ? 'border-gray-700 text-teal-400 hover:bg-gray-700/50' : 'border-gray-100 text-teal-700 hover:bg-gray-50'}`}>
                    Marcar todas como leídas
                  </div>
                </div>
              )}
            </div>

            {/* AVATAR DINÁMICO */}
            <Link href="/Perfil" className={`flex items-center gap-3 px-2 py-2 md:px-5 md:py-2.5 rounded-full shadow-sm border hover:shadow-md transition-all cursor-pointer group ${cardBg}`}>
              <div className="w-9 h-9 md:w-10 h-10 bg-teal-100 group-hover:bg-teal-200 rounded-full flex items-center justify-center text-teal-800 font-bold text-base md:text-lg transition-colors">
                {nombreUsuario ? nombreUsuario.substring(0, 2).toUpperCase() : 'GT'}
              </div>
              <div className="hidden sm:block text-left pr-2">
                <p className={`text-sm font-bold leading-tight group-hover:text-teal-500 transition-colors duration-500 ${textPrimary}`}>
                  {nombreUsuario || 'Perfil'}
                </p>
              </div>
            </Link>
          </div>
        </header>

        <div className="p-6 md:p-10 pb-10 flex flex-col gap-6 md:gap-8">
          
          {/* FILA 2: LOS TRES PILARES */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* TARJETA MI TEMPLO */}
            <div className={`rounded-3xl p-6 shadow-sm border hover:shadow-md transition-all duration-500 relative flex flex-col justify-between ${cardBg}`}>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-rose-100 p-2.5 rounded-xl text-rose-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <h3 className={`${montserrat.className} text-lg font-bold transition-colors duration-500 ${textPrimary}`}>Mi Templo</h3>
                  </div>
                </div>
                
                <div className="mb-5">
                  <div className="flex justify-between items-end mb-1">
                    <p className={`text-sm font-medium transition-colors duration-500 ${textSecondary}`}>Calorías (De tu meta ideal)</p>
                    <button onClick={registrarCaloriasRapido} className="w-6 h-6 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-600 flex items-center justify-center font-bold text-lg transition-colors cursor-pointer" title="Añadir Snack">＋</button>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className={`text-2xl font-black transition-colors duration-500 ${textPrimary}`}>{calorias}</span>
                    <span className={`text-xs font-medium mb-1 transition-colors duration-500 ${textSecondary}`}>/ 2,000 kcal</span>
                  </div>
                  <div className={`w-full h-2 rounded-full mt-2 overflow-hidden transition-colors ${modoOscuro ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="bg-rose-500 h-full rounded-full transition-all duration-300" style={{width: `${(calorias/2000)*100}%`}}></div>
                  </div>
                </div>
              </div>
              
              <div className={`p-4 rounded-2xl flex items-center justify-between transition-colors ${modoOscuro ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                <div>
                  <p className="text-blue-500 text-xs font-bold mb-1">HIDRATACIÓN</p>
                  <p className={`font-bold transition-colors duration-500 ${textPrimary}`}>{agua} <span className="text-xs font-medium">L</span></p>
                </div>
                <button onClick={registrarAguaRapido} className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-md flex items-center justify-center font-bold text-xl transition-transform hover:scale-105 cursor-pointer">
                  +
                </button>
              </div>
            </div>

            {/* TARJETA MI TESORO (CONECTADA A SUPABASE) */}
            <div className={`rounded-3xl p-6 shadow-sm border hover:shadow-md transition-all duration-500 flex flex-col justify-between ${cardBg}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12V7H5a2 2 0 010-4h14v4M3 5v14a2 2 0 002 2h16v-5M18 12a2 2 0 000 4h4v-4h-4z"></path></svg>
                  </div>
                  <h3 className={`${montserrat.className} text-lg font-bold transition-colors duration-500 ${textPrimary}`}>Mi Tesoro</h3>
                </div>
                <Link href="/Reportes" className={`text-xs font-bold hover:underline transition-colors ${modoOscuro ? 'text-emerald-400' : 'text-emerald-600'}`}>Ver detalles</Link>
              </div>

              <div>
                <p className={`text-sm font-medium mb-1 transition-colors duration-500 ${textSecondary}`}>Ingreso Mensual (Real)</p>
                <p className={`text-4xl font-black tracking-tight mb-2 transition-colors duration-500 ${textPrimary}`}>
                  ${perfil?.ingreso_mensual?.toLocaleString() || '0'}<span className={`text-xl transition-colors duration-500 ${textSecondary}`}>.00</span>
                </p>
                <span className={`text-xs font-bold px-2 py-1 rounded-md transition-colors ${modoOscuro ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>Ahorro en progreso</span>
              </div>

              <div className={`mt-6 pt-5 border-t transition-colors duration-500 ${modoOscuro ? 'border-gray-700' : 'border-gray-100'}`}>
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <p className={`text-xs font-bold uppercase transition-colors duration-500 ${textSecondary}`}>Tu Meta de Ahorro</p>
                    {/* MOSTRAMOS LA META DE AHORRO REAL */}
                    <span className={`text-lg font-bold transition-colors duration-500 ${textPrimary}`}>
                      ${perfil?.meta_ahorro?.toLocaleString() || '0'}
                    </span>
                  </div>
                  <span className={`text-xs font-bold transition-colors duration-500 ${textSecondary}`}>50%</span>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden transition-colors ${modoOscuro ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div className="bg-emerald-500 h-full w-[50%]"></div>
                </div>
              </div>
            </div>

            {/* ROADMAP */}
            <div className={`rounded-3xl p-6 shadow-sm border hover:shadow-md transition-all duration-500 flex flex-col ${cardBg}`}>
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-amber-100 p-2.5 rounded-xl text-amber-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                </div>
                <h3 className={`${montserrat.className} text-lg font-bold transition-colors duration-500 ${textPrimary}`}>Acciones de Hoy</h3>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                {tareas.map((tarea) => (
                  <div 
                    key={tarea.id}
                    onClick={() => toggleTarea(tarea.id)}
                    className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                      tarea.completada 
                        ? (modoOscuro ? 'bg-emerald-900/10 border-emerald-900/30' : 'bg-emerald-50 border-emerald-100')
                        : (modoOscuro ? 'bg-gray-700/30 border-transparent hover:bg-gray-700' : 'bg-gray-50 border-transparent hover:bg-gray-100')
                    }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors shrink-0 ${
                      tarea.completada 
                        ? 'bg-emerald-500 border-emerald-500 text-white' 
                        : (modoOscuro ? 'border-gray-500' : 'border-gray-300')
                    }`}>
                      {tarea.completada && <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>}
                    </div>
                    <p className={`text-sm font-medium transition-all ${
                      tarea.completada 
                        ? 'line-through text-gray-400' 
                        : (modoOscuro ? 'text-gray-200' : 'text-gray-700')
                    }`}>
                      {tarea.texto}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* FILA 3: VISION BOARD (CONECTADO A SUPABASE) */}
          <div 
            className="w-full rounded-[2rem] p-8 md:p-12 shadow-xl relative overflow-hidden group min-h-[300px] md:min-h-[350px] flex items-end cursor-pointer"
            style={{
              backgroundImage: "url('/japon.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity group-hover:from-black/95"></div>
            
            <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg text-white border border-white/30">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                  </div>
                  {/* CATEGORÍA REAL */}
                  <span className="text-white font-bold tracking-widest uppercase text-xs">
                    {perfil?.categoria_sueno || 'Tu Gran Destino'}
                  </span>
                </div>
                {/* SUEÑO REAL */}
                <h2 className={`${montserrat.className} text-4xl md:text-5xl font-black text-white drop-shadow-md mb-2`}>
                  {perfil?.gran_sueno || 'Viajar a Japón'}
                </h2>
                <p className="text-gray-200 font-medium text-sm md:text-base max-w-lg">
                  El sistema está monitoreando tus avances diarios para que cumplas tu sueño en tiempo y forma.
                </p>
              </div>

              <Link href="/Destino" className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center min-w-[160px] hover:bg-white/20 transition-colors shadow-2xl">
                <p className="text-white/80 text-xs font-bold uppercase mb-1">Días restantes</p>
                <div className="flex items-baseline justify-center gap-1">
                  {/* CÁLCULO DE DÍAS REALES */}
                  <span className="text-4xl font-black text-white">{diasRestantes}</span>
                </div>
                <div className="w-full bg-white/20 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-white h-full rounded-full w-[40%]"></div>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}