"use client";

import React, { useState, useContext, useEffect } from 'react';
import { Montserrat, Poppins } from 'next/font/google';
import { ThemeContext } from '@/context/ThemeContext';
import Header from '@/componentes/layout/Header';
import Sidebar from '@/componentes/layout/Sidebar';
import { supabase } from '@/lib/supabase';
// IMPORTAMOS EL NUEVO COMPONENTE
import HistorialNutricion from '@/lib/HistorialNutricion';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function Templo() {
  const { modoOscuro } = useContext(ThemeContext);
  const [perfil, setPerfil] = useState({ nombres: '', alergias: [], meta_calorias: 2000 });
  const [planes, setPlanes] = useState([]);
  const [consumoHoy, setConsumoHoy] = useState({ id: null, calorias_consumidas: 0, agua_ml: 0 });
  const [historial, setHistorial] = useState([]); 
  const [inputAgua, setInputAgua] = useState("");
  const [loading, setLoading] = useState(true);

  const themeBg = modoOscuro ? 'bg-gray-900' : 'bg-[#F3F4F6]';
  const cardBg = modoOscuro ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const textPrimary = modoOscuro ? 'text-white' : 'text-gray-900';
  const textSecondary = modoOscuro ? 'text-gray-400' : 'text-gray-500';

  const cargarDatos = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: userProfile } = await supabase.from('perfiles_goat').select('*').eq('id', user.id).single();
    if (userProfile) setPerfil(userProfile);

    const hoy = new Date().toLocaleDateString('en-CA'); 
    let { data: consumo } = await supabase.from('consumo_diario').select('*').eq('usuario_id', user.id).eq('fecha', hoy).maybeSingle();

    if (!consumo) {
      const { data: nuevo } = await supabase.from('consumo_diario').insert([{ usuario_id: user.id, fecha: hoy, calorias_consumidas: 0, agua_ml: 0 }]).select().single();
      consumo = nuevo;
    }
    if (consumo) setConsumoHoy(consumo);

    const { data: dataHistorial } = await supabase
      .from('consumo_diario')
      .select('*')
      .eq('usuario_id', user.id)
      .order('fecha', { ascending: false })
      .limit(7);
    setHistorial(dataHistorial || []);

    const { data: allPlanes } = await supabase.from('planes_alimentacion').select('*');
    if (allPlanes && userProfile) {
      const filtrados = allPlanes.filter(plan => {
        if (!userProfile.alergias || userProfile.alergias.length === 0) return true;
        const misAlergias = userProfile.alergias.map(a => a.toLowerCase().trim());
        return !plan.alergenos.some(al => misAlergias.includes(al.toLowerCase().trim()));
      });
      setPlanes(filtrados);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const registrarAlimento = async (cals) => {
    if (!consumoHoy.id) return;
    const nuevaSuma = (consumoHoy.calorias_consumidas || 0) + cals;
    const { error } = await supabase.from('consumo_diario').update({ calorias_consumidas: nuevaSuma }).eq('id', consumoHoy.id);
    if (!error) {
      setConsumoHoy(prev => ({ ...prev, calorias_consumidas: nuevaSuma }));
      cargarDatos(); 
    }
  };

  const registrarAgua = async () => {
    if (!consumoHoy.id) return;
    const cantidad = parseFloat(inputAgua);
    if (isNaN(cantidad) || cantidad <= 0) return;
    const nuevaSuma = (consumoHoy.agua_ml || 0) + cantidad;
    const { error } = await supabase.from('consumo_diario').update({ agua_ml: nuevaSuma }).eq('id', consumoHoy.id);
    if (!error) {
      setConsumoHoy(prev => ({ ...prev, agua_ml: nuevaSuma }));
      setInputAgua("");
      cargarDatos(); 
    }
  };

  if (loading) return <div className={`h-screen flex items-center justify-center ${themeBg} text-teal-500 font-bold animate-pulse`}>Sincronizando Templo...</div>;

  return (
    <div className={`flex h-screen w-full overflow-hidden ${themeBg} ${poppins.className}`}>
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Header perfil={perfil} modoOscuro={modoOscuro} fechaHoy="Mi Templo" />

        <div className="p-6 md:p-10 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-3xl border ${cardBg} shadow-sm`}>
              <h3 className={`${montserrat.className} text-xl font-bold ${textPrimary}`}>Calorías Hoy</h3>
              <div className="text-4xl font-black text-orange-500 mt-2">{consumoHoy.calorias_consumidas} <span className="text-sm text-gray-400">/ {perfil.meta_calorias} kcal</span></div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full mt-4 overflow-hidden">
                <div className="bg-orange-500 h-full transition-all duration-500" style={{ width: `${Math.min((consumoHoy.calorias_consumidas / perfil.meta_calorias) * 100, 100)}%` }}></div>
              </div>
            </div>

            <div className={`p-6 rounded-3xl border ${cardBg} shadow-sm`}>
              <h3 className={`${montserrat.className} text-xl font-bold ${textPrimary}`}>Agua Hoy</h3>
              <div className="text-4xl font-black text-blue-500 mt-2">{consumoHoy.agua_ml} <span className="text-sm text-gray-400">ml</span></div>
              <div className="flex gap-2 mt-4">
                <input type="number" placeholder="ml" className={`flex-1 p-2 rounded-xl border bg-transparent ${textPrimary} outline-none`} value={inputAgua} onChange={(e) => setInputAgua(e.target.value)} />
                <button onClick={registrarAgua} className="bg-blue-600 text-white px-6 rounded-xl font-bold shadow-md">Sumar</button>
              </div>
            </div>
          </div>

          {/* LLAMADA AL COMPONENTE EXTERNO */}
          <HistorialNutricion 
            historial={historial} 
            modoOscuro={modoOscuro} 
            perfil={perfil} 
          />

          <section>
            <h2 className={`${montserrat.className} text-2xl font-bold mb-6 ${textPrimary}`}>Planes Recomendados</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {planes.map((plan) => (
                <div key={plan.id} className={`p-6 rounded-3xl border ${cardBg} flex flex-col justify-between shadow-sm`}>
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className={`text-xl font-bold ${textPrimary}`}>{plan.titulo}</h4>
                      <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-bold">{plan.calorias} kcal</span>
                    </div>
                    <p className={`mt-2 text-sm ${textSecondary}`}>{plan.descripcion}</p>
                  </div>
                  <button onClick={() => registrarAlimento(plan.calorias)} className="mt-6 w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-bold transition-all">Registrar Consumo</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}