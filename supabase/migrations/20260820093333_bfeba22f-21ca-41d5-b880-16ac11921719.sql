CREATE TABLE public.project_stats (
  project_id text PRIMARY KEY,
  clicks bigint NOT NULL DEFAULT 0,
  players bigint NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.project_stats TO anon, authenticated;
GRANT ALL ON public.project_stats TO service_role;

ALTER TABLE public.project_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view project stats"
ON public.project_stats FOR SELECT
TO anon, authenticated
USING (true);

CREATE TABLE public.project_devices (
  project_id text NOT NULL,
  device_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (project_id, device_id)
);

GRANT ALL ON public.project_devices TO service_role;

ALTER TABLE public.project_devices ENABLE ROW LEVEL SECURITY;

INSERT INTO public.project_stats (project_id) VALUES ('monde'), ('sourichat'), ('airports');

CREATE OR REPLACE FUNCTION public.record_play(_project_id text, _device_id text)
RETURNS TABLE (clicks bigint, players bigint)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _new_device boolean := false;
BEGIN
  IF _project_id NOT IN ('monde', 'sourichat', 'airports') THEN
    RAISE EXCEPTION 'unknown project';
  END IF;

  IF _device_id IS NULL OR length(_device_id) < 8 OR length(_device_id) > 64 THEN
    RAISE EXCEPTION 'invalid device id';
  END IF;

  INSERT INTO public.project_devices (project_id, device_id)
  VALUES (_project_id, _device_id)
  ON CONFLICT DO NOTHING;

  _new_device := FOUND;

  INSERT INTO public.project_stats (project_id, clicks, players)
  VALUES (_project_id, 1, CASE WHEN _new_device THEN 1 ELSE 0 END)
  ON CONFLICT (project_id) DO UPDATE
    SET clicks = public.project_stats.clicks + 1,
        players = public.project_stats.players + CASE WHEN _new_device THEN 1 ELSE 0 END,
        updated_at = now();

  RETURN QUERY
    SELECT s.clicks, s.players FROM public.project_stats s WHERE s.project_id = _project_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.record_play(text, text) TO anon, authenticated;