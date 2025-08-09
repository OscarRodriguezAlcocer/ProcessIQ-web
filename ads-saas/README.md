## ADS SaaS

Aplicación SaaS para PYMEs (1-25 personas) enfocada en:
- Agendado y control de clientes
- Registro de eventos/métricas de publicidad (multicanal)
- Generación de contenido publicitario con IA

### Stack
- Next.js 14 (App Router) + TailwindCSS
- Supabase (Auth, DB, Storage) con RLS multitenant
- OpenAI (generación de contenido)

### Configuración
1. Copia `.env.example` a `.env` y completa:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (solo en servidor)
   - `OPENAI_API_KEY`
2. Instala dependencias:
   - `npm install`
3. Migra la base de datos en Supabase: copia `supabase/schema.sql` en el SQL Editor y ejecútalo.
4. Ejecuta en local:
   - `npm run dev`

### Directorios
- `app/` páginas y rutas API
- `components/` UI compartida
- `lib/` utilidades (cliente Supabase)
- `supabase/` esquemas SQL y seeds

### Notas de seguridad
- El RLS exige pertenencia a una organización para acceder a filas de esa `org_id`.
- Evita usar `SUPABASE_SERVICE_ROLE_KEY` en el cliente. Solo en rutas server-side.