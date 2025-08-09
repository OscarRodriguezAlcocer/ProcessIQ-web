import { NextRequest, NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false }).limit(100);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ clients: data });
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const body = await req.json();
  const { org_id, full_name, email, phone, tags } = body;
  if (!org_id || !full_name) return NextResponse.json({ error: 'org_id y full_name requeridos' }, { status: 400 });
  const { data, error } = await supabase.from('clients').insert({ org_id, full_name, email, phone, tags }).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ client: data });
}