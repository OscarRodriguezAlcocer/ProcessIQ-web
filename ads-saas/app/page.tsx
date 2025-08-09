import Link from 'next/link';
import type { Route } from 'next';

export default function HomePage() {
  return (
    <main className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">ADS SaaS</h1>
        <nav className="flex gap-4 text-sm">
          <Link href="/clients" className="text-blue-600 hover:underline">Clientes</Link>
          <Link href="/events" className="text-blue-600 hover:underline">Eventos</Link>
          <Link href="/content" className="text-blue-600 hover:underline">Contenido IA</Link>
        </nav>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Clientes" href="/clients" description="Agendado y control de registros de clientes." />
        <Card title="Eventos" href="/events" description="Captura y análisis de eventos de publicidad multicanal." />
        <Card title="Contenido IA" href="/content" description="Genera copys y creatividades asistidas por IA." />
      </section>
    </main>
  );
}

function Card({ title, description, href }: { title: string; description: string; href: Route }) {
  return (
    <Link href={href} className="block rounded-lg border p-4 hover:shadow-sm">
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </Link>
  );
}