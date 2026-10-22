<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Shared admin access uses a server-only password and an encrypted HttpOnly session; authorize every mutation server-side because UI controls are not security boundaries.
- Blog content stores validated Tiptap JSON rendered as React elements, not HTML, to preserve rich formatting without unsafe markup.
- Editorial collaborators are display signatures, never authentication roles; their labels must not grant permissions.
- Scheduled visibility is enforced by database RLS on publish_at; privileged admin lists read all articles only after the shared session is verified.
- Immediate publication uses the database clock rather than the browser clock so device time skew cannot hide a newly published article.
- Blog images use private Cloud storage and short-lived signed URLs generated only for visible articles; public buckets are blocked by workspace policy.
- The root route owns the language provider, shared branded header, navigation and admin session state so both content routes remain consistent.
- Electron bundles project icons and a local intro; direct desktop launches show the native intro, while in-launcher launches keep the web intro to avoid playing it twice.
