"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Montserrat, Poppins } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function Validacion() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const [timeLeft, setTimeLeft] = useState(34);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResend = () => {
    setTimeLeft(34);
    setCanResend(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `0${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value !== '' && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-pink-50 to-green-200 p-6 relative overflow-hidden ${poppins.className}`}>
      {/* ELEMENTOS DE FONDO SUTILES */}
      <svg className="absolute -top-24 -left-24 w-[30rem] h-[30rem] text-teal-900 opacity-5 rotate-12 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      <svg className="absolute -bottom-32 -right-32 w-[34rem] h-[34rem] text-yellow-700 opacity-5 -rotate-12 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.95V5h-2.35v1.73c-1.6.35-2.68 1.49-2.68 2.87 0 1.7 1.36 2.55 3.43 3.05 1.8.42 2.27 1.03 2.27 1.77 0 .94-.87 1.61-2.21 1.61-1.54 0-2.24-.8-2.31-1.84h-1.76c.09 1.58 1.05 2.72 2.68 3.13V20h2.35v-1.76c1.74-.39 2.86-1.54 2.86-3.14 0-1.72-1.3-2.58-3.44-3.09z"/>
      </svg>
      {/* CONTENIDO PRINCIPAL */}
      <Link href="/Registro" className="absolute top-8 left-8 md:top-10 md:left-12 flex items-center gap-3 text-gray-800 hover:text-teal-800 transition-all font-bold text-xl md:text-2xl bg-white/40 hover:bg-white/80 px-5 py-2.5 rounded-full backdrop-blur-md z-10 shadow-sm hover:shadow-md">
        <span className="text-2xl md:text-3xl leading-none">&larr;</span> Atrás
      </Link>

      <img 
        src="/logoext.png" 
        alt="Logo GOAT" 
        className="absolute top-8 right-8 md:top-10 md:right-12 h-16 md:h-28 w-auto object-contain z-10 drop-shadow-sm" 
      />

      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 w-full max-w-xl shadow-2xl text-center z-10 mt-20 md:mt-0">
        
        <div className="flex justify-center mb-4">
          <div className="bg-teal-700 p-4 rounded-full shadow-md text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>

        <h2 className={`${montserrat.className} text-3xl md:text-4xl font-black text-black mb-3`}>
          Revisa tu correo
        </h2>
        <p className="text-gray-600 text-lg font-medium mb-1">
          Hemos enviado un código de 4 dígitos a
        </p>
        <p className="text-gray-900 font-bold text-lg mb-12">
          AnaLau27@gmail.com
        </p>

        <form className="flex flex-col items-center">
          
          <div className="flex justify-center gap-3 md:gap-6 mb-8 w-full max-w-sm">
            {otp.map((digit, index) => (
              <input 
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text" 
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-16 h-16 md:w-20 md:h-20 text-center text-3xl md:text-4xl font-black text-teal-800 bg-[#F4EBE0] rounded-2xl border-2 border-transparent focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/20 focus:scale-105 outline-none transition-all duration-300 shadow-inner"
              />
            ))}
          </div>
          {/* ESTADO DEL TEMPORIZADOR */}
          <div className="h-8 mb-8 flex items-center justify-center">
            {!canResend ? (
              <p className="text-gray-500 font-medium text-base">
                Reenviar el código en <span className="text-teal-700 font-bold">{formatTime(timeLeft)}</span>
              </p>
            ) : (
              <button 
                type="button" 
                onClick={handleResend}
                className="text-teal-700 font-bold hover:text-teal-800 hover:underline transition-colors cursor-pointer"
              >
                Reenviar código nuevamente
              </button>
            )}
          </div>
          <Link href="/MiTemplo" className="w-full text-center bg-teal-700 hover:bg-teal-800 text-white font-bold text-xl py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1">
            Validar y Continuar
          </Link>
        </form>
      </div>
    </div>
  );
}