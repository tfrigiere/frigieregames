CREATE TABLE public.custom_projects (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), title text NOT NULL, link text NOT NULL DEFAULT '', images jsonb NOT NULL DEFAULT '[]', description jsonb NOT NULL DEFAULT '{}', platforms text[] NOT NULL DEFAULT '{}', langs text[] NOT NULL DEFAULT '{}', button text NOT NULL DEFAULT 'play', exe boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.custom_projects TO anon, authenticated;
GRANT ALL ON public.custom_projects TO service_role;
ALTER TABLE public.custom_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Projects are public" ON public.custom_projects FOR SELECT TO anon, authenticated USING (true);