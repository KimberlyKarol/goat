"use client";

import React, { useState, useContext, useEffect, useRef } from 'react';
import { Montserrat, Poppins } from 'next/font/google';
import { ThemeContext } from '@/context/ThemeContext';
import { supabase } from '@/lib/supabase'; 
import { destinoService } from '@/lib/destinoService';
import VisionBoard from '@/componentes/Destino/VisionBoard';
import confetti from 'canvas-confetti';
import Header from '@/componentes/layout/Header';
import Sidebar from '@/componentes/layout/Sidebar';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function Destino() {
  const { modoOscuro } = useContext(ThemeContext);
  const fileInputRef = useRef(null);
  
  const [hitos, setHitos] = useState([]);
  const [datosPerfil, setDatosPerfil] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isChangingImage, setIsChangingImage] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [nuevoHitoTexto, setNuevoHitoTexto] = useState('');
  const [nuevoHitoFecha, setNuevoHitoFecha] = useState(''); 

  const themeBg = modoOscuro ? 'bg-gray-900' : 'bg-[#F3F4F6]';
  const cardBg = modoOscuro ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const textPrimary = modoOscuro ? 'text-white' : 'text-gray-900';
  const inputBg = modoOscuro ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800';

  useEffect(() => { fetchYValidarMeta(); }, []);

  const fetchYValidarMeta = async () => {
    try {
      setLoading(true);
      const { perfil, hitos: dataHitos } = await destinoService.getDatosCompletos();
      
      if (perfil) {
        setDatosPerfil(perfil);
        perfil.url_fondo ? setBackgroundImage(perfil.url_fondo) : actualizarImagenIA(perfil.gran_sueno);
        
        const metaActual = perfil.gran_sueno?.toLowerCase() || "";
        const necesitaCambio = dataHitos.length === 0 || !dataHitos.some(h => metaActual.includes(h.texto.toLowerCase().split(' ').pop()));

        if (necesitaCambio) await generarRutaIA(perfil.gran_sueno, perfil.fecha_ideal);
        else setHitos(dataHitos);
      }
    } catch (error) { console.error(error); } 
    finally { setLoading(false); }
  };

  const eliminarHito = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este hito?")) return;
    try {
      await destinoService.borrarHito(id);
      setHitos(hitos.filter(h => h.id !== id));
    } catch (error) {
      alert("No se pudo eliminar el hito");
    }
  };

  const editarHito = async (hito) => {
    const nuevoTexto = window.prompt("Editar nombre del hito:", hito.texto);
    if (!nuevoTexto) return;
    
    const nuevaFecha = window.prompt("Editar fecha (AAAA-MM-DD):", hito.fecha);
    if (!nuevaFecha) return;

    try {
      const { data } = await destinoService.actualizarHito(hito.id, { 
        texto: nuevoTexto, 
        fecha: nuevaFecha 
      });
      if (data) {
        setHitos(hitos.map(h => h.id === hito.id ? data[0] : h).sort((a,b) => new Date(a.fecha) - new Date(b.fecha)));
      }
    } catch (error) {
      alert("Error al editar");
    }
  };

  const eliminarImagenFondo = async () => {
    if (!window.confirm("¿Quieres eliminar tu foto y volver a la imagen de la IA?")) return;
    try {
      setIsChangingImage(true);
      await destinoService.actualizarPerfil(datosPerfil.id, { url_fondo: null });
      setDatosPerfil({ ...datosPerfil, url_fondo: null });
      actualizarImagenIA(datosPerfil.gran_sueno);
    } catch (error) { alert("Error"); } 
    finally { setIsChangingImage(false); }
  };

  const actualizarImagenIA = (meta) => {
    setIsChangingImage(true);
    const keyword = meta ? meta.split(' ').pop() : "success"; 
    setBackgroundImage(`https://loremflickr.com/1600/900/${encodeURIComponent(keyword)}`);
    setTimeout(() => setIsChangingImage(false), 600);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setIsUploading(true); setIsChangingImage(true);
      const fileName = `${datosPerfil.id}-${Math.random()}.${file.name.split('.').pop()}`;
      await supabase.storage.from('imagenes_metas').upload(`fondos_metas/${fileName}`, file);
      const { data: { publicUrl } } = supabase.storage.from('imagenes_metas').getPublicUrl(`fondos_metas/${fileName}`);
      await destinoService.actualizarPerfil(datosPerfil.id, { url_fondo: publicUrl });
      setDatosPerfil({ ...datosPerfil, url_fondo: publicUrl });
      setBackgroundImage(publicUrl);
      confetti({ particleCount: 100 });
    } catch (error) { alert("Error al subir"); } 
    finally { setIsUploading(false); setIsChangingImage(false); }
  };

  const toggleHito = async (id, estadoActual) => {
    const nuevoEstado = !estadoActual;
    if (nuevoEstado) confetti({ particleCount: 150 });
    await destinoService.actualizarHito(id, { completado: nuevoEstado });
    setHitos(hitos.map(h => h.id === id ? { ...h, completado: nuevoEstado } : h));
  };

  const agregarHitoManual = async () => {
    if (!nuevoHitoTexto || !nuevoHitoFecha) return alert("Rellena los campos");
    const { data } = await destinoService.insertarHitos([{ texto: `📌 ${nuevoHitoTexto}`, fecha: nuevoHitoFecha, completado: false }]);
    if (data) {
      setHitos([...hitos, data[0]].sort((a,b) => new Date(a.fecha) - new Date(b.fecha)));
      setNuevoHitoTexto(''); setNuevoHitoFecha('');
    }
  };

  const generarRutaIA = async (metaTexto) => {
    await destinoService.limpiarHitos();
    const nuevosPasos = ["Plan de acción", "Primeros pasos", "Avance", "Meta lograda"].map((f, i) => ({
      texto: `${f} ${metaTexto}`,
      fecha: new Date(Date.now() + (i + 1) * 604800000).toISOString().split('T')[0],
      completado: false
    }));
    const { data } = await destinoService.insertarHitos(nuevosPasos);
    if (data) setHitos(data);
  };

  const diasFaltantes = Math.max(0, Math.ceil((new Date(datosPerfil?.fecha_ideal) - new Date()) / 86400000)) || 0;
  const porcentaje = hitos.length === 0 ? 0 : Math.round((hitos.filter(h => h.completado).length / hitos.length) * 100);
  const getProgressBarColor = () => porcentaje < 35 ? 'bg-red-500' : porcentaje < 75 ? 'bg-yellow-500' : 'bg-emerald-500';

  if (loading) return <div className="h-screen flex items-center justify-center text-teal-500 font-bold">Cargando...</div>;

  return (
    <div className={`flex h-screen w-full overflow-hidden ${themeBg} ${poppins.className}`}>
      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Header perfil={datosPerfil} modoOscuro={modoOscuro} fechaHoy={new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())} />
        
        <section className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
          <div className="max-w-7xl mx-auto w-full space-y-8">
            
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            
            <VisionBoard 
              datos={datosPerfil} 
              porcentaje={porcentaje} 
              dias={diasFaltantes} 
              background={backgroundImage} 
              onUpload={() => fileInputRef.current.click()}
              onDelete={eliminarImagenFondo}
              isUploading={isUploading}
              isChanging={isChangingImage}
              getBarColor={getProgressBarColor}
            />

            <div className={`rounded-[2rem] p-6 md:p-10 border shadow-sm ${cardBg}`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                  <div>
                    <h3 className={`${montserrat.className} text-2xl md:text-3xl font-black ${textPrimary}`}>Hoja de Ruta</h3>
                  </div>
                  <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    <input type="text" placeholder="Nuevo paso..." value={nuevoHitoTexto} onChange={(e) => setNuevoHitoTexto(e.target.value)} className={`flex-1 md:w-80 p-3 px-5 rounded-2xl border ${inputBg}`} />
                    <input type="date" value={nuevoHitoFecha} onChange={(e) => setNuevoHitoFecha(e.target.value)} className={`p-3 rounded-2xl border ${inputBg}`} />
                    <button onClick={agregarHitoManual} className="bg-teal-600 text-white p-3 px-8 rounded-2xl font-black hover:bg-teal-700 transition-all">AGREGAR</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {hitos.map((h) => (
                    <div key={h.id} className={`group p-6 rounded-3xl border flex items-center justify-between transition-all ${h.completado ? 'opacity-50' : 'bg-white/5 hover:border-indigo-400'}`}>
                      <div className="flex items-center gap-6 cursor-pointer flex-1" onClick={() => toggleHito(h.id, h.completado)}>
                        <div className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center ${h.completado ? 'bg-indigo-600 border-indigo-600' : 'border-gray-400'}`}>
                          {h.completado && <span className="text-white">✓</span>}
                        </div>
                        <div>
                          <p className={`font-bold text-xl ${h.completado ? 'line-through text-gray-500' : textPrimary}`}>{h.texto}</p>
                          <p className="text-xs font-black text-indigo-500 uppercase">{new Date(h.fecha).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => editarHito(h)} 
                          className="p-2 text-gray-400 hover:text-indigo-500 hover:bg-indigo-500/10 rounded-xl transition-all"
                          title="Editar hito"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <button 
                          onClick={() => eliminarHito(h.id)} 
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                          title="Eliminar hito"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}