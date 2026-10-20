CREATE OR REPLACE FUNCTION public.blog_publication_time() RETURNS timestamptz LANGUAGE sql VOLATILE SET search_path = public AS $$ SELECT clock_timestamp(); $$;
REVOKE ALL ON FUNCTION public.blog_publication_time() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.blog_publication_time() TO service_role;