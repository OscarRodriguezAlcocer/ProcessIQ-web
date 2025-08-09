'use client';

import { useState } from 'react';

export default function ContentPage() {
  const [topic, setTopic] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setOutput('');
    const res = await fetch('/api/content/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic })
    });
    const data = await res.json();
    setOutput(data.text ?? '');
    setLoading(false);
  }

  return (
    <main className="space-y-4">
      <h1 className="text-xl font-semibold">Contenido IA</h1>
      <div className="space-y-2">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Producto/servicio, público objetivo, objetivo de campaña..."
          className="w-full rounded border px-3 py-2"
        />
        <button onClick={generate} disabled={loading || !topic} className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
          {loading ? 'Generando...' : 'Generar'}
        </button>
      </div>
      <pre className="whitespace-pre-wrap rounded border p-3 text-sm bg-gray-50">{output}</pre>
    </main>
  );
}