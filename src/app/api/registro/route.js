// app/api/registro/route.js
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email, password } = await request.json();

  // PUNTO 2: ENCRIPTAR
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Guardar en la base de datos
  const { data, error } = await supabase
    .from('perfiles_goat') 
    .insert([{ email, password: hashedPassword }]);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  
  return NextResponse.json({ mensaje: "Usuario creado con hash" });
}