import { NextRequest, NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('occurred_at', { ascending: false })
    .limit(200);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ events: data });
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const body = await req.json();
  const { org_id, client_id, campaign_id, channel, event_type, amount, metadata, occurred_at } = body;
  if (!org_id || !channel || !event_type) return NextResponse.json({ error: 'org_id, channel y event_type requeridos' }, { status: 400 });
  const { data, error } = await supabase
    .from('events')
    .insert({ org_id, client_id, campaign_id, channel, event_type, amount, metadata, occurred_at })
    .select('*')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ event: data });
}