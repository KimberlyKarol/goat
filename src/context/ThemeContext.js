"use client";

import React, { createContext, useState, useEffect } from 'react';

// 1. Creamos el contexto
export const ThemeContext = createContext();

// 2. Creamos el proveedor que envolverá a toda la app
export const ThemeProvider = ({ children }) => {
  const [modoOscuro, setModoOscuro] = useState(false);

  // Efecto para recordar la elección del usuario (LocalStorage)
  useEffect(() => {
    const temaGuardado = localStorage.getItem('goat_tema_oscuro');
    if (temaGuardado === 'true') {
      setModoOscuro(true);
    }
  }, []);

  // Función para alternar el modo
  const toggleModoOscuro = () => {
    const nuevoEstado = !modoOscuro;
    setModoOscuro(nuevoEstado);
    localStorage.setItem('goat_tema_oscuro', nuevoEstado); // Lo guardamos en el navegador
  };

  return (
    <ThemeContext.Provider value={{ modoOscuro, toggleModoOscuro }}>
      {children}
    </ThemeContext.Provider>
  );
};