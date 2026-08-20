CREATE TABLE public.project_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id text NOT NULL,
  author_name text NOT NULL DEFAULT 'Utilisateur',
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.project_comments TO anon;
GRANT SELECT, INSERT ON public.project_comments TO authenticated;
GRANT ALL ON public.project_comments TO service_role;

ALTER TABLE public.project_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view comments"
ON public.project_comments FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Anyone can post comments"
ON public.project_comments FOR INSERT
TO anon, authenticated
WITH CHECK (
  project_id IN ('monde','sourichat','airports')
  AND length(message) BETWEEN 1 AND 1000
  AND length(author_name) BETWEEN 1 AND 40
);