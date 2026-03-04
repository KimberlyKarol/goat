import React from 'react';
import Link from 'next/link';
import { Montserrat, Poppins } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function LandingPage() {
  return (
    <div className={`min-h-screen w-full bg-white selection:bg-teal-200 selection:text-teal-900 ${poppins.className} overflow-x-hidden relative`}>
      
      {/* ================================================================== */}
      {/* MARCA DE AGUA (WATERMARK) */}
      {/* ================================================================== */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <img 
          src="/logo.png" 
          alt="GOAT Marca de Agua"
          className="w-[150%] md:w-[80%] lg:w-[42%] opacity-[0.3] grayscale" 
        />
      </div>

      {/* ================================================================== */}
      {/* NAVEGACIÓN SUPERIOR (NAVBAR) */}
      {/* ================================================================== */}
      <nav className="absolute top-0 w-full p-6 md:px-12 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <img 
            src="/logoext.png" 
            alt="Logo GOAT" 
            className="h-20 md:h-24 lg:h-28 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300" 
          />
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/Login" className="text-gray-600 font-bold hover:text-teal-700 transition-colors hidden sm:block bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
            Iniciar Sesión
          </Link>
          <Link href="/Registro" className="bg-teal-900 hover:bg-teal-800 text-white font-bold px-6 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
            Únete Gratis
          </Link>
        </div>
      </nav>

      {/* ================================================================= */}
      {/* HERO SECTION (Sección Principal) */}
      {/* ================================================================== */}
      <section className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
        
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-teal-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="bg-teal-100/80 backdrop-blur-sm text-teal-800 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6 shadow-sm border border-teal-200/50">
          🚀 LA APP DEFINITIVA DE CRECIMIENTO PERSONAL
        </div>
        
        <h1 className={`${montserrat.className} text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[1.1] tracking-tight max-w-5xl mb-6 drop-shadow-sm`}>
          Conviértete en el <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">G.O.A.T.</span> de tu propia vida.
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl mb-10 leading-relaxed drop-shadow-sm">
          Salud, finanzas y metas a largo plazo. Todo en un solo lugar. Toma el control hoy mismo y construye el futuro que mereces.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/Registro" className="bg-teal-700 hover:bg-teal-800 text-white text-lg font-bold px-8 py-4 rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2">
            Comenzar mi viaje
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </Link>
          <Link href="/Login" className="bg-white/80 backdrop-blur-md hover:bg-white text-gray-800 border-2 border-gray-200 text-lg font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center shadow-sm">
            Ya tengo cuenta
          </Link>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECCIÓN DE PILARES (Features) */}
      {/* ================================================================== */}
      {/* El fondo bg-gray-50/80 y backdrop-blur permite ver la marca de agua */}
      <section className="relative z-10 py-20 bg-gray-50/80 backdrop-blur-md px-6 border-y border-gray-200/50">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className={`${montserrat.className} text-3xl md:text-4xl font-black text-gray-900 mb-4`}>
              Tres pilares. Un solo destino.
            </h2>
            <p className="text-gray-600 font-medium md:text-lg">
              El equilibrio perfecto para alcanzar tu máximo potencial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pilar 1: Mi Templo */}
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
              <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </div>
              <h3 className={`${montserrat.className} text-2xl font-bold text-gray-900 mb-3`}>Mi Templo</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                Tu cuerpo es tu refugio. Registra tus calorías, monitorea tu hidratación y mantén un estilo de vida activo y saludable.
              </p>
            </div>

            {/* Pilar 2: Mi Tesoro */}
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12V7H5a2 2 0 010-4h14v4M3 5v14a2 2 0 002 2h16v-5M18 12a2 2 0 000 4h4v-4h-4z"></path></svg>
              </div>
              <h3 className={`${montserrat.className} text-2xl font-bold text-gray-900 mb-3`}>Mi Tesoro</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                Finanzas inteligentes. Controla tus ingresos, reduce gastos innecesarios y visualiza el progreso de tus ahorros con claridad.
              </p>
            </div>

            {/* Pilar 3: Mi Destino */}
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
              </div>
              <h3 className={`${montserrat.className} text-2xl font-bold text-gray-900 mb-3`}>Mi Destino</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                Tus sueños con fecha de entrega. Diseña hojas de ruta paso a paso y mantén la motivación alta con metas medibles.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* CTA FINAL (Call to Action) */}
      {/* ================================================================== */}
      <section className="relative z-10 py-24 px-6 overflow-hidden flex justify-center bg-white/50 backdrop-blur-sm">
        <div className="bg-teal-900 rounded-[3rem] max-w-5xl w-full p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-800 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-800/50 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className={`${montserrat.className} text-3xl md:text-5xl font-black text-white mb-6`}>
              ¿Listo para planear tu vida?
            </h2>
            <p className="text-teal-100 md:text-xl font-medium mb-10 max-w-2xl mx-auto">
              Únete a la nueva generación de jóvenes que están construyendo su futuro financiero, físico y personal.
            </p>
            <Link href="/Registro" className="inline-block bg-white text-teal-900 text-lg font-black px-10 py-4 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105">
              Crear mi cuenta gratis
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FOOTER */}
      {/* ================================================================== */}
      <footer className="relative z-10 border-t border-gray-200/50 bg-white/80 backdrop-blur-md py-10 text-center text-gray-500 font-medium">
        <p>© 2026 Proyecto GOAT. Universidad Tecnológica de Tabasco (UTTAB).</p>
        <p className="text-sm mt-2">Diseñado con ❤️ por Ana Laura.</p>
      </footer>

    </div>
  );
}