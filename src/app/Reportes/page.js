"use client";

import React, { useState, useContext } from 'react';
import { Montserrat, Poppins } from 'next/font/google';
import Sidebar from '@/componentes/layout/Sidebar';
import { ThemeContext } from '@/context/ThemeContext';
import Header from '@/componentes/layout/Header';
import { supabase } from '@/lib/supabase'; 
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTransacciones } from '@/lib/useTransacciones';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

// --- SUB-COMPONENTES DE UI ---

const StatCard = ({ label, value, color, cardBg }) => (
  <div className={`rounded-[2rem] p-8 border shadow-sm ${cardBg}`}>
    <p className="text-slate-400 font-semibold mb-2">{label}</p>
    <p className={`text-4xl font-black ${color}`}>${value.toLocaleString()}</p>
  </div>
);

const TransactionTable = ({ transactions, cardBg }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="text-slate-400 border-b border-slate-100">
          <th className="pb-4 font-semibold">Concepto</th>
          <th className="pb-4 font-semibold">Tipo</th>
          <th className="pb-4 font-semibold">Monto</th>
          <th className="pb-4 font-semibold">Fecha</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {transactions.map((mov) => (
          <tr key={mov.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="py-4 font-medium">{mov.titulo}</td>
            <td className="py-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                mov.tipo === 'ingreso' ? 'bg-emerald-100 text-emerald-600' : 
                mov.tipo === 'gasto' ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'
              }`}>
                {mov.tipo}
              </span>
            </td>
            <td className={`py-4 font-black ${mov.tipo === 'gasto' ? 'text-rose-500' : 'text-emerald-500'}`}>
              {mov.tipo === 'gasto' ? '-' : '+'}${mov.monto.toLocaleString()}
            </td>
            <td className="py-4 text-slate-400 text-sm">
              {new Date(mov.fecha).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- COMPONENTE PRINCIPAL ---

export default function Reportes() {
  const { modoOscuro } = useContext(ThemeContext);
  const { datosPerfil, listaTransacciones, userId, totales, datosGrafica, refrescar } = useTransacciones();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalTransaccionOpen, setIsModalTransaccionOpen] = useState(false);
  const [isModalHistorialOpen, setIsModalHistorialOpen] = useState(false);
  const [estadoGuardar, setEstadoGuardar] = useState('Guardar Transacción');
  const [formTransaccion, setFormTransaccion] = useState({ monto: '', titulo: '', tipo: 'Ingreso' });

  const handleGuardarTransaccion = async (e) => {
    e.preventDefault();
    setEstadoGuardar('Procesando...');
    const { error } = await supabase.from('transacciones_goat').insert([{ 
      usuario_id: userId,
      monto: parseFloat(formTransaccion.monto), 
      titulo: formTransaccion.titulo, 
      tipo: formTransaccion.tipo.toLowerCase() 
    }]);

    if (!error) {
      setEstadoGuardar('¡Éxito! ✨');
      await refrescar();
      setTimeout(() => {
        setIsModalTransaccionOpen(false);
        setEstadoGuardar('Guardar Transacción');
        setFormTransaccion({ monto: '', titulo: '', tipo: 'Ingreso' });
      }, 1000);
    }
  };

  const cardBg = modoOscuro ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-pink-100 text-slate-700';

  return (
    <div className={`flex h-screen w-full overflow-hidden ${modoOscuro ? 'bg-gray-900' : 'bg-[#FDFCFE]'} ${poppins.className}`}>
      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      
      <main className="flex-1 flex flex-col h-screen overflow-y-auto pb-10">
        <Header perfil={datosPerfil} modoOscuro={modoOscuro} fechaHoy="Reporte Financiero" />
        
        <div className="p-6 md:p-10 space-y-8">
          {/* Botones de Acción */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-white font-bold">
            <button onClick={() => { setFormTransaccion({...formTransaccion, tipo: 'Ingreso'}); setIsModalTransaccionOpen(true); }} className="bg-emerald-400 py-5 rounded-3xl shadow-lg active:scale-95 transition-all">💰 Nuevo Ingreso</button>
            <button onClick={() => { setFormTransaccion({...formTransaccion, tipo: 'Gasto'}); setIsModalTransaccionOpen(true); }} className="bg-rose-400 py-5 rounded-3xl shadow-lg active:scale-95 transition-all">📉 Nuevo Gasto</button>
            <button onClick={() => { setFormTransaccion({...formTransaccion, tipo: 'Ahorro'}); setIsModalTransaccionOpen(true); }} className="bg-indigo-400 py-5 rounded-3xl shadow-lg active:scale-95 transition-all">🏦 Ahorro</button>
          </div>

          {/* Totales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard label="Ingresos" value={totales.ingresos} color="text-emerald-500" cardBg={cardBg} />
            <StatCard label="Gastos" value={totales.gastos} color="text-rose-500" cardBg={cardBg} />
            <StatCard label="Ahorros" value={totales.ahorro} color="text-indigo-500" cardBg={cardBg} />
          </div>

          {/* Gráfica */}
          <div className={`rounded-[2.5rem] p-8 border shadow-sm ${cardBg}`}>
            <h3 className="text-xl font-black mb-6">Flujo de Movimientos</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={datosGrafica}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="fecha" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{ borderRadius: '15px', border: 'none' }} />
                  <Area type="monotone" dataKey="ingreso" stroke="#34d399" fill="#34d399" fillOpacity={0.1} name="Ingresos" />
                  <Area type="monotone" dataKey="gasto" stroke="#fb7185" fill="#fb7185" fillOpacity={0.1} name="Gastos" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tabla Recientes */}
          <div className={`rounded-[2.5rem] p-8 border shadow-sm ${cardBg}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black">Movimientos Recientes</h3>
              <button onClick={() => setIsModalHistorialOpen(true)} className="text-sm font-bold text-indigo-500 underline underline-offset-4">Ver historial completo</button>
            </div>
            <TransactionTable transactions={listaTransacciones.slice(0, 5)} cardBg={cardBg} />
          </div>
        </div>
      </main>

      {/* MODAL REGISTRO */}
      {isModalTransaccionOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 backdrop-blur-sm bg-black/40 text-slate-700">
          <div className={`w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl ${cardBg}`}>
            <h3 className={`${montserrat.className} text-2xl font-black mb-8 text-center uppercase`}>Registrar {formTransaccion.tipo}</h3>
            <form onSubmit={handleGuardarTransaccion} className="space-y-6">
              <input type="number" step="0.01" value={formTransaccion.monto} onChange={(e) => setFormTransaccion({...formTransaccion, monto: e.target.value})} placeholder="Monto $" required className="w-full rounded-2xl px-5 py-4 border-2 outline-none font-bold focus:border-indigo-300" />
              <input type="text" value={formTransaccion.titulo} onChange={(e) => setFormTransaccion({...formTransaccion, titulo: e.target.value})} placeholder="Concepto" required className="w-full rounded-2xl px-5 py-4 border-2 outline-none focus:border-indigo-300" />
              <button type="submit" className={`w-full font-black py-5 rounded-2xl text-white shadow-xl transition-all active:scale-95 ${formTransaccion.tipo === 'Ingreso' ? 'bg-emerald-400' : formTransaccion.tipo === 'Gasto' ? 'bg-rose-400' : 'bg-indigo-400'}`}>
                {estadoGuardar}
              </button>
              <button type="button" onClick={() => setIsModalTransaccionOpen(false)} className="w-full font-bold py-2 text-slate-400">Cancelar</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL HISTORIAL */}
      {isModalHistorialOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 backdrop-blur-md bg-black/50 text-slate-700">
          <div className={`w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col rounded-[2.5rem] p-8 shadow-2xl ${cardBg}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`${montserrat.className} text-2xl font-black uppercase`}>Historial Completo</h3>
              <button onClick={() => setIsModalHistorialOpen(false)} className="bg-slate-100 p-2 rounded-full text-slate-400 hover:text-rose-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <TransactionTable transactions={listaTransacciones} cardBg={cardBg} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}