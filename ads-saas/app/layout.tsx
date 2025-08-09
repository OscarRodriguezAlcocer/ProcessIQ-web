import './globals.css';
import { ReactNode } from 'react';
import { createClient } from '@/lib/supabase/server';

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Touch supabase server client early to ensure env presence
  void createClient();
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-gray-900">
        <div className="mx-auto max-w-6xl p-4">
          {children}
        </div>
      </body>
    </html>
  );
}