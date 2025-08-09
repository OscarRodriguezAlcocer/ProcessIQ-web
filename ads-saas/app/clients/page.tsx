import { createClient } from '@/lib/supabase/server';
import { ClientForm } from './ClientForm';

export default async function ClientsPage() {
  const supabase = createClient();

  // For demo: pick first org of the user
  const { data: orgs } = await supabase.from('my_orgs').select('*').limit(1);
  const org = orgs?.[0];

  const { data: clients } = await supabase.from('clients').select('*').order('created_at', { ascending: false }).limit(50);

  return (
    <main className="space-y-4">
      <h1 className="text-xl font-semibold">Clientes</h1>
      {!org ? (
        <p className="text-sm text-gray-600">No tienes organización asignada. Crea una en la base de datos y añádete en `memberships`.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section>
            <h2 className="font-medium mb-2">Nuevo cliente</h2>
            <ClientForm orgId={org.id} />
          </section>
          <section>
            <h2 className="font-medium mb-2">Clientes recientes</h2>
            <ul className="divide-y rounded border">
              {(clients ?? []).map((c) => (
                <li key={c.id} className="p-3 text-sm">
                  <div className="font-medium">{c.full_name}</div>
                  <div className="text-gray-600">{c.email ?? '-'} · {c.phone ?? '-'}</div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </main>
  );
}