import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
  const { topic } = await req.json();
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'OPENAI_API_KEY missing' }, { status: 500 });
  }
  if (!topic || typeof topic !== 'string') {
    return NextResponse.json({ error: 'Parámetro topic requerido' }, { status: 400 });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `Genera 3 variantes de copy corto (máx 120 caracteres) y 3 ideas de contenido para una campaña. Contexto: ${topic}. Devuelve en formato claro.`;

  const chat = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Eres un estratega de marketing.' },
      { role: 'user', content: prompt }
    ]
  });

  const text = chat.choices[0]?.message?.content ?? '';
  return NextResponse.json({ text });
}