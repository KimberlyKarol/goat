"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });

export default function HistorialNutricion({ historial, modoOscuro, perfil }) {
  // Estilos dinámicos heredados
  const cardBg = modoOscuro ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const textPrimary = modoOscuro ? 'text-white' : 'text-gray-900';
  const textSecondary = modoOscuro ? 'text-gray-400' : 'text-gray-500';

  return (
    <section>
      <h2 className={`${montserrat.className} text-2xl font-bold mb-6 ${textPrimary}`}>
        Historial de la Semana
      </h2>
      <div className={`rounded-3xl border ${cardBg} overflow-hidden shadow-sm`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`${modoOscuro ? 'bg-gray-900/50' : 'bg-gray-50'} border-b ${modoOscuro ? 'border-gray-700' : 'border-gray-100'}`}>
                <th className={`p-4 font-bold text-xs uppercase tracking-wider ${textSecondary}`}>Fecha</th>
                <th className={`p-4 font-bold text-xs uppercase tracking-wider ${textSecondary}`}>Calorías Consumidas</th>
                <th className={`p-4 font-bold text-xs uppercase tracking-wider ${textSecondary}`}>Agua (ml)</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((dia, index) => (
                <tr key={dia.id} className={`${index !== historial.length - 1 ? 'border-b' : ''} ${modoOscuro ? 'border-gray-700/50' : 'border-gray-50'}`}>
                  <td className={`p-4 text-sm font-medium ${textPrimary}`}>
                    {new Date(dia.fecha).toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </td>
                  <td className={`p-4 text-sm font-bold ${dia.calorias_consumidas > perfil.meta_calorias ? 'text-rose-500' : 'text-orange-500'}`}>
                    {dia.calorias_consumidas} kcal
                  </td>
                  <td className="p-4 text-sm font-bold text-blue-500">{dia.agua_ml} ml</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}