"use client";

import React, { useState, useRef, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Montserrat, Poppins } from 'next/font/google';

import { ThemeContext } from '@/context/ThemeContext';
import { supabase } from '@/lib/supabase';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function Perfil() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  
  const [perfil, setPerfil] = useState({
    nombres: '',
    email: '',
    telefono: '',
    fecha_nacimiento: '',
    avatar_url: null
  });

  const [notificaciones, setNotificaciones] = useState(true);
  const { modoOscuro, toggleModoOscuro } = useContext(ThemeContext);
  
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const fileInputRef = useRef(null);
  
  const [estadoBotonGuardar, setEstadoBotonGuardar] = useState('Guardar Cambios');
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  // --- VARIABLES DINÁMICAS PARA EL MODO OSCURO ---
  const themeBg = modoOscuro ? 'bg-gray-900' : 'bg-[#F3F4F6]';
  const cardBg = modoOscuro ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const textPrimary = modoOscuro ? 'text-white' : 'text-gray-900';
  const textSecondary = modoOscuro ? 'text-gray-400' : 'text-gray-500';
  const inputBg = modoOscuro ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-800';
  const headerBg = modoOscuro ? 'bg-gray-900/80 border-gray-800' : 'bg-white/50 border-gray-200/50';
  const divider = modoOscuro ? 'border-gray-700' : 'border-gray-100';

  useEffect(() => {
    const cargarPerfil = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUserId(user.id);
        
        const nombreRegistro = user.user_metadata?.nombres || '';
        const apellidoRegistro = user.user_metadata?.apellidos || '';
        const nombreCompletoRegistro = `${nombreRegistro} ${apellidoRegistro}`.trim();

        const { data } = await supabase
          .from('perfiles_goat')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        setPerfil({
          nombres: data?.nombres || nombreCompletoRegistro || '',
          email: user.email || '',
          telefono: data?.telefono || '',
          fecha_nacimiento: data?.fecha_nacimiento || '',
          avatar_url: data?.avatar_url || null
        });
        
        setFotoPerfil(data?.avatar_url || null);
      }
      setLoading(false);
    };

    cargarPerfil();
  }, []);

  const handleClickCamara = () => fileInputRef.current.click();

  const handleCambiarFoto = async (e) => {
    const file = e.target.files[0];
    if (!file || !userId) return;

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/avatar-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setFotoPerfil(publicUrl);
      
      await supabase
        .from('perfiles_goat')
        .upsert({ id: userId, avatar_url: publicUrl }, { onConflict: 'id' });

    } catch (error) {
      console.error("Error al subir foto:", error);
      alert("Error al guardar la imagen.");
    }
  };

  const handleEliminarFoto = async () => {
    if (!userId) return;
    try {
      await supabase
        .from('perfiles_goat')
        .upsert({ id: userId, avatar_url: null }, { onConflict: 'id' });

      setFotoPerfil(null);
    } catch (error) {
      console.error("Error al eliminar foto:", error);
    }
  };

  const handleGuardarCambios = async () => {
    if (!userId) {
      alert("No se detectó la sesión.");
      return;
    }

    setEstadoBotonGuardar('Guardando...');
    try {
      const fechaParaEnviar = perfil.fecha_nacimiento || null;

      const { error } = await supabase
        .from('perfiles_goat')
        .upsert({
          id: userId,
          nombres: perfil.nombres,
          telefono: perfil.telefono,
          fecha_nacimiento: fechaParaEnviar,
          avatar_url: fotoPerfil
        }, { onConflict: 'id' });

      if (error) throw error;

      setEstadoBotonGuardar('¡Cambios guardados!');
      setTimeout(() => setEstadoBotonGuardar('Guardar Cambios'), 2000);
    } catch (error) {
      console.error("Error detallado:", error);
      alert("Error al guardar: " + error.message);
      setEstadoBotonGuardar('Guardar Cambios');
    }
  };

  const handleConfirmarEliminacion = () => router.push('/Login');

  if (loading) return (
    <div className={`h-screen w-full flex items-center justify-center ${themeBg} ${textPrimary}`}>
      <p className="animate-pulse font-bold text-xl">Cargando tu perfil GOAT...</p>
    </div>
  );

  return (
    <div className={`flex h-screen w-full overflow-hidden transition-colors duration-500 ${themeBg} ${poppins.className}`}>
      
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      <aside className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-30 flex flex-col w-72 bg-teal-900 text-white shadow-2xl`}>
        <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden absolute top-6 right-6 text-teal-300 hover:text-white transition-colors">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="p-8 flex justify-center border-b border-teal-800">
          <img src="/logo-ext.png" alt="Logo GOAT" className="h-28 w-auto object-contain filter brightness-0 invert" />
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <Link href="/Dashboard" className="flex items-center gap-4 px-6 py-4 text-teal-100 hover:bg-teal-800/50 hover:text-white rounded-2xl font-medium transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Vista General
          </Link>
          <Link href="/Templo" className="flex items-center gap-4 px-6 py-4 text-teal-100 hover:bg-teal-800/50 hover:text-white rounded-2xl font-medium transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            Mi Templo
          </Link>
          <Link href="/Reportes" className="flex items-center gap-4 px-6 py-4 text-teal-100 hover:bg-teal-800/50 hover:text-white rounded-2xl font-medium transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12V7H5a2 2 0 010-4h14v4M3 5v14a2 2 0 002 2h16v-5M18 12a2 2 0 000 4h4v-4h-4z"></path></svg>
            Mi Tesoro
          </Link>
          <Link href="/Destino" className="flex items-center gap-4 px-6 py-4 text-teal-100 hover:bg-teal-800/50 hover:text-white rounded-2xl font-medium transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
            Mi Destino
          </Link>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        <header className={`flex justify-between items-center p-6 md:p-10 border-b backdrop-blur-md sticky top-0 z-10 transition-colors duration-500 ${headerBg}`}>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className={`md:hidden p-2 rounded-xl border ${cardBg} ${textPrimary}`}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <div>
              <h1 className={`${montserrat.className} text-2xl md:text-3xl font-black transition-colors ${textPrimary}`}>Mi Perfil</h1>
              <p className={`font-medium text-sm md:text-base transition-colors ${textSecondary}`}>Gestiona tus datos personales</p>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-5xl mx-auto w-full space-y-8">
          
          <div className={`rounded-3xl p-8 shadow-sm border flex flex-col md:flex-row items-center gap-8 transition-colors ${cardBg}`}>
            <div className="flex flex-col items-center gap-4 md:pl-6">
              <div className="relative">
                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleCambiarFoto} />
                
                {fotoPerfil ? (
                  <img src={fotoPerfil} alt="Perfil" className={`w-32 h-32 rounded-full object-cover shadow-inner border-4 ${modoOscuro ? 'border-gray-800' : 'border-white'}`} />
                ) : (
                  <div className={`w-32 h-32 rounded-full flex items-center justify-center font-black text-4xl shadow-inner border-4 transition-all duration-500
                    ${modoOscuro 
                      ? 'bg-gradient-to-br from-teal-900 to-emerald-900 border-gray-800 text-teal-200' 
                      : 'bg-gradient-to-br from-teal-100 to-emerald-100 border-white text-teal-700'}`}>
                    <span className={montserrat.className}>
                        {perfil.nombres?.substring(0, 2).toUpperCase() || 'GT'}
                    </span>
                  </div>
                )}

                <button 
                  onClick={handleClickCamara}
                  className={`absolute bottom-0 right-0 p-3 rounded-full shadow-lg border-2 ${modoOscuro ? 'bg-teal-600 hover:bg-teal-500 border-gray-800' : 'bg-teal-700 hover:bg-teal-800 border-white'} text-white transition-all cursor-pointer active:scale-90`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                  </svg>
                </button>
              </div>

              {fotoPerfil && (
                <button 
                  onClick={handleEliminarFoto}
                  className="text-xs font-bold text-rose-500 hover:text-rose-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Quitar foto
                </button>
              )}
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h2 className={`${montserrat.className} text-3xl font-black transition-colors ${textPrimary}`}>
                {perfil.nombres || 'Nuevo Usuario'}
              </h2>
              <p className={`font-medium text-lg transition-colors ${textSecondary}`}>{perfil.email}</p>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                <span className={`font-bold px-4 py-1.5 rounded-full text-sm ${modoOscuro ? 'bg-emerald-900 text-emerald-200' : 'bg-emerald-100 text-emerald-700'}`}>Miembro GOAT</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            <div className={`rounded-3xl p-8 shadow-sm border transition-colors ${cardBg}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-xl ${modoOscuro ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-600'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 className={`${montserrat.className} text-xl font-bold ${textPrimary}`}>Datos Personales</h3>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className={`block font-bold mb-2 ml-1 text-sm ${textPrimary}`}>Nombre completo</label>
                  <input 
                    type="text" 
                    value={perfil.nombres} 
                    onChange={(e) => setPerfil({...perfil, nombres: e.target.value})}
                    placeholder="Tu nombre"
                    className={`w-full rounded-xl px-4 py-3 border focus:border-teal-600 outline-none font-medium transition-all ${inputBg}`} 
                  />
                </div>
                <div>
                  <label className={`block font-bold mb-2 ml-1 text-sm ${textPrimary}`}>Correo (Lectura)</label>
                  <input 
                    type="email" 
                    value={perfil.email} 
                    readOnly 
                    className={`w-full rounded-xl px-4 py-3 border-none shadow-none font-bold opacity-70 cursor-not-allowed ${modoOscuro ? 'bg-gray-900/40 text-gray-400' : 'bg-gray-100 text-gray-500'}`} 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-full">
                    <label className={`block font-bold mb-2 ml-1 text-sm ${textPrimary}`}>Teléfono</label>
                    <input 
                      type="tel" 
                      value={perfil.telefono} 
                      onChange={(e) => setPerfil({...perfil, telefono: e.target.value})}
                      placeholder="1234567890" 
                      className={`w-full rounded-xl px-4 py-3 border focus:border-teal-600 outline-none font-medium transition-all ${inputBg}`} 
                    />
                  </div>
                  <div className="w-full">
                    <label className={`block font-bold mb-2 ml-1 text-sm ${textPrimary}`}>Nacimiento</label>
                    <input 
                      type="date" 
                      value={perfil.fecha_nacimiento || ''} 
                      onChange={(e) => setPerfil({...perfil, fecha_nacimiento: e.target.value})}
                      className={`w-full rounded-xl px-4 py-3 border focus:border-teal-600 outline-none font-medium transition-all ${inputBg}`} 
                    />
                  </div>
                </div>
                
                <button 
                  type="button" 
                  onClick={handleGuardarCambios}
                  disabled={estadoBotonGuardar === 'Guardando...'}
                  className={`w-full font-bold py-3 rounded-xl transition-all mt-2 cursor-pointer flex items-center justify-center gap-2 shadow-md active:scale-95
                    ${estadoBotonGuardar === 'Guardar Cambios' 
                        ? (modoOscuro ? 'bg-teal-900 text-teal-200 hover:bg-teal-800' : 'bg-teal-600 text-white hover:bg-teal-700 shadow-teal-200') 
                        : 'bg-green-600 text-white'}`}
                >
                  {estadoBotonGuardar}
                  {estadoBotonGuardar === '¡Cambios guardados!' && (
                    <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                  )}
                </button>
              </form>
            </div>
            
            <div className="space-y-8">
              <div className={`rounded-3xl p-8 shadow-sm border transition-colors ${cardBg}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2.5 rounded-xl ${modoOscuro ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-50 text-purple-600'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    </svg>
                  </div>
                  <h3 className={`${montserrat.className} text-xl font-bold ${textPrimary}`}>Preferencias</h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-bold ${textPrimary}`}>Notificaciones Push</p>
                      <p className={`text-sm font-medium ${textSecondary}`}>Alertas de metas y salud</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={notificaciones} onChange={() => setNotificaciones(!notificaciones)} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-400 border border-gray-500 rounded-full peer peer-checked:bg-teal-600 peer-checked:border-teal-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>
                  <hr className={`${divider}`} />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-bold ${textPrimary}`}>Modo Oscuro</p>
                      <p className={`text-sm font-medium ${textSecondary}`}>Cambia el tema visual</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={modoOscuro} onChange={toggleModoOscuro} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-400 border border-gray-500 rounded-full peer peer-checked:bg-teal-600 peer-checked:border-teal-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className={`rounded-3xl p-8 border transition-colors ${modoOscuro ? 'bg-gray-800 border-rose-900/30' : 'bg-white border-rose-100'}`}>
                 <h3 className={`${montserrat.className} text-lg font-bold mb-4 ${modoOscuro ? 'text-rose-400/80' : 'text-rose-500'}`}>Gestión de Cuenta</h3>
                <button 
                  onClick={() => setMostrarModalEliminar(true)}
                  className={`group flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border text-sm font-bold transition-all cursor-pointer 
                    ${modoOscuro 
                      ? 'border-rose-900/50 text-rose-400 hover:bg-rose-600 hover:text-white' 
                      : 'border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  Eliminar mi cuenta
                </button>
              </div>
            </div>

          </div>
        </div>

        {mostrarModalEliminar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className={`rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl ${cardBg}`}>
              <div className={`mx-auto flex items-center justify-center h-20 w-20 rounded-full mb-6 border-4 ${modoOscuro ? 'bg-rose-900 border-rose-950 text-rose-200' : 'bg-rose-100 border-rose-50 text-rose-600'}`}>
                <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77-1.333.192 3 1.732 3z"></path></svg>
              </div>
              <h3 className={`${montserrat.className} text-2xl font-black mb-2 ${textPrimary}`}>¿Estás seguro?</h3>
              <p className={`font-medium mb-8 text-sm ${textSecondary}`}>Esta acción borrará todo tu progreso en GOAT permanentemente.</p>
              <div className="flex flex-col gap-3">
                <button onClick={handleConfirmarEliminacion} className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl cursor-pointer">Sí, eliminar</button>
                <button onClick={() => setMostrarModalEliminar(false)} className={`w-full font-bold py-3 rounded-xl cursor-pointer ${modoOscuro ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}