# CONTINUE.md

Read this first every session, then `/docs/PLAN.md` (legacy roadmap, kept for history).
The active roadmap is the 8-prompt spec (Prompts 0-7): Phase 0 = context, Phases 1-7 below.
Work one phase at a time. Show a plan before coding, report after, run build + lint before "done", commit at the end of each phase.

## Current phase
**Phase 1 (app shell, splash, login scaffold) done and committed. Phase 2 (one-click environment) is next.**

## Repo layout (important, changed in Phase 1)
- Root: the NEW Next.js app (this spec): `src/app` routes, `src/lib`, `src/components`, `.env.example`, `ATTRIBUTION.md`.
- `courses/security-course/`: the PREVIOUS CCC app (Next.js, security track S1-S6, setup hub, dashboard). Fully intact, runnable via `cd courses/security-course && npm i && npm run dev`. Do not delete; it is "another course" and may be ported later.
- `index.html` at root: legacy static site, viewable with `npm run serve:legacy`.
- `course/cyfrin-s23/`: Cyfrin s23 course as a read-only git submodule. NEVER modify. See ATTRIBUTION.md.
- `gauntlet/`: Foundry exploit practice repo (from legacy app). Untouched.
- `docs/`: legacy audit/plan docs (history).

## Phase status
- Phase 1 DONE: splash (`/`, once/session, skippable) -> `/landing` (Start from zero -> /basics, I know the basics -> /core) -> `/login`, `/signup` (validated, mock auth) -> `(shell)` group: /dashboard, /basics, /core, /notes, /tools, /community with auth guard, dark default + light toggle, a11y pass (focus ring, reduced motion, landmarks, skip link).
- Phase 2 NEXT: devcontainer + Dockerfile (Foundry, solc, Node, Git, Slither, Python, course repo), docker-compose, scripts/verify-env.sh, Open Lab button (Codespaces URL from env + local Docker instructions), Environment Checker page with per-OS guides + copy buttons, "Fix it" panel.
- Phases 3-7: per the spec prompts (lesson player, visualizations, AI helper, extensions, security/tests/CI/launch).

## Key decisions
- Next 14.2.5 + Tailwind 3.4 at root; `src/app` for routes (no clash with legacy folders); tsconfig/eslint/tailwind scoped to `src` so `courses/` is never typechecked.
- Auth behind `src/lib/auth/AuthProvider.ts` interface; `MockAuthProvider` (localStorage) selected by `NEXT_PUBLIC_AUTH_PROVIDER` (default mock). Swapping in Supabase/NextAuth = new class + factory case, zero UI changes.
- Theme: dark default via `class` on <html>, persisted `ccc_theme`, toggle in top bar; global focus-visible ring + reduced-motion CSS in `src/app/globals.css`.
- Splash: sessionStorage `ccc_splash_seen`, 2.4s auto-advance, Skip button.
- Course repo = git submodule at `course/cyfrin-s23` (spec allows submodule or copy). Devcontainer (Phase 2) must init submodules.
- Mock auth is NOT security: password obfuscated (btoa) in localStorage, clearly commented. Real auth arrives behind the interface.

## Env vars (see .env.example)
- NEXT_PUBLIC_AUTH_PROVIDER=mock
- NEXT_PUBLIC_CODESPEACES_REPO / NEXT_PUBLIC_CODESPEACES_BRANCH (Phase 2 Open Lab)
- AI_API_KEY (Phase 5, server-only, never NEXT_PUBLIC_)

## How to run / save
- `npm run dev` (Next on :3000), `npm run build`, `npm run lint`, `npm run typecheck`, `npm run serve:legacy` (old static site).
- Save: `& "C:\Program Files\Git\bin\bash.exe" scripts/save.sh "message"` (add -A, commit, push origin main, print short hash). Only when build passes.

## Known issues / watch-outs
1. `next build` logs `npm audit` findings (transitive). Document or fix in Phase 7.
2. Legacy `vercel.json` at root rewrites all paths to `index.html` — conflicts with deploying the new app. Phase 7 decision required.
3. `courses/security-course` still has its own node_modules on disk (gitignored) — heavy folder, fine.
4. If `/` shows a blank page after redirect, check sessionStorage was cleared (new tab per session).
5. Windows shell quirks: `&&` not valid in this PowerShell wrapper; long builds time out at 30s — run `npm run build` in background via Start-Process and poll build.log.
