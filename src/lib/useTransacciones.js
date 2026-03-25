import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';

export const useTransacciones = () => {
  const [datosPerfil, setDatosPerfil] = useState({ nombres: '', avatar_url: '' });
  const [listaTransacciones, setListaTransacciones] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const cargarDatos = async (uid) => {
    const { data } = await supabase
      .from('transacciones_goat')
      .select('id, monto, tipo, titulo, fecha')
      .eq('usuario_id', uid)
      .order('fecha', { ascending: false });

    if (data) setListaTransacciones(data);
  };

  useEffect(() => {
    const inicializar = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data: perfil } = await supabase
          .from('perfiles_goat')
          .select('nombres, avatar_url')
          .eq('id', user.id)
          .single();
        
        if (perfil) setDatosPerfil(perfil);
        await cargarDatos(user.id);
      }
      setLoading(false);
    };
    inicializar();
  }, []);

  const totales = useMemo(() => {
    return listaTransacciones.reduce((acc, curr) => {
      const monto = parseFloat(curr.monto) || 0;
      const t = curr.tipo?.toLowerCase().trim();
      if (t === 'ingreso') acc.ingresos += monto;
      else if (t === 'gasto') acc.gastos += monto;
      else if (t === 'ahorro') acc.ahorro += monto;
      return acc;
    }, { ingresos: 0, gastos: 0, ahorro: 0 });
  }, [listaTransacciones]);

  const datosGrafica = useMemo(() => {
    const copia = [...listaTransacciones].reverse();
    const grupos = copia.reduce((acc, item) => {
      const fecha = new Date(item.fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
      if (!acc[fecha]) acc[fecha] = { fecha, ingreso: 0, gasto: 0 };
      if (item.tipo.toLowerCase() === 'ingreso') acc[fecha].ingreso += item.monto;
      if (item.tipo.toLowerCase() === 'gasto') acc[fecha].gasto += item.monto;
      return acc;
    }, {});
    return Object.values(grupos);
  }, [listaTransacciones]);

  return { datosPerfil, listaTransacciones, userId, totales, datosGrafica, refrescar: () => cargarDatos(userId) };
};