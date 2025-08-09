import { createClient } from '@/lib/supabase/server';

export default async function EventsPage() {
  const supabase = createClient();
  const { data: events } = await supabase.from('events').select('*').order('occurred_at', { ascending: false }).limit(50);

  return (
    <main className="space-y-4">
      <h1 className="text-xl font-semibold">Eventos</h1>
      <p className="text-sm text-gray-600">Registra eventos de campañas y orígenes (Meta, Google, orgánico, referidos, etc.).</p>
      <section>
        <h2 className="font-medium mb-2">Eventos recientes</h2>
        <ul className="divide-y rounded border">
          {(events ?? []).map((e) => (
            <li key={e.id} className="p-3 text-sm">
              <div className="font-medium">{e.event_type} · {e.channel}</div>
              <div className="text-gray-600">{new Date(e.occurred_at).toLocaleString()} · {e.amount ?? '-'} · {e.campaign_id ?? '-'}</div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}