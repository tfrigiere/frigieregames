import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Comment = {
  id: string;
  author_name: string;
  message: string;
  created_at: string;
};

export function CommentsSection({ projectId }: { projectId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    supabase
      .from("project_comments")
      .select("id, author_name, message, created_at")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data }) => {
        if (active && data) setComments(data as Comment[]);
      });
    return () => {
      active = false;
    };
  }, [projectId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const msg = message.trim();
    if (!msg) return;
    setSending(true);
    setError(null);
    const author = name.trim() || "Utilisateur";
    const { data, error: err } = await supabase
      .from("project_comments")
      .insert({ project_id: projectId, author_name: author.slice(0, 40), message: msg.slice(0, 1000) })
      .select("id, author_name, message, created_at")
      .single();
    setSending(false);
    if (err || !data) {
      setError("Impossible d'envoyer le commentaire, réessayez.");
      return;
    }
    setComments((c) => [data as Comment, ...c]);
    setMessage("");
  };

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <section className="mt-6 rounded-xl border border-border bg-background/40 p-4 sm:p-5">
      <h3 className="text-center text-sm font-bold uppercase tracking-[0.18em] text-accent sm:text-base">
        Commentaires / Feedback
      </h3>

      <form onSubmit={submit} className="mt-4 space-y-3">
        <div>
          <label
            htmlFor={`name-${projectId}`}
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-foreground/80"
          >
            Nom{" "}
            <span className="font-normal normal-case tracking-normal text-muted-foreground">
              (laissez vide pour apparaître en tant qu'« Utilisateur »)
            </span>
          </label>
          <input
            id={`name-${projectId}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
            placeholder="Utilisateur"
            className="w-full rounded-lg border border-border bg-card/70 px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
          />
        </div>

        <div>
          <label
            htmlFor={`msg-${projectId}`}
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-foreground/80"
          >
            Message
          </label>
          <textarea
            id={`msg-${projectId}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={1000}
            rows={3}
            placeholder="Votre avis sur ce projet..."
            className="w-full resize-y rounded-lg border border-border bg-card/70 px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
          />
        </div>

        {error && <p className="text-xs text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={sending || !message.trim()}
          className="rounded-lg border border-accent/50 bg-accent/20 px-4 py-2 text-sm font-bold uppercase tracking-wider text-accent transition-colors hover:bg-accent/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? "Envoi..." : "Publier"}
        </button>
      </form>

      <ul className="mt-5 space-y-3">
        {comments.length === 0 && (
          <li className="text-center text-xs text-muted-foreground">
            Aucun commentaire pour l'instant. Soyez le premier !
          </li>
        )}
        {comments.map((c) => (
          <li key={c.id} className="rounded-lg border border-border bg-card/60 px-3 py-2">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-sm font-bold text-accent">{c.author_name}</span>
              <span className="text-[11px] text-muted-foreground">{fmtDate(c.created_at)}</span>
            </div>
            <p className="mt-1 whitespace-pre-wrap break-words text-sm text-muted-foreground">
              {c.message}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
