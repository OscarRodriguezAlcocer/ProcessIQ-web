"use client";

import { useState } from 'react';

export function ClientForm({ orgId, onCreated }: { orgId: string; onCreated?: () => void }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    const res = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ org_id: orgId, full_name: fullName, email, phone })
    });
    setLoading(false);
    if (res.ok) {
      setFullName(''); setEmail(''); setPhone('');
      onCreated?.();
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nombre completo" className="rounded border px-3 py-2" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded border px-3 py-2" />
      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Teléfono" className="rounded border px-3 py-2" />
      <button onClick={submit} disabled={loading || !fullName} className="self-start rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </div>
  );
}