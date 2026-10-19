# CONTINUE.md

Read this first every session, then `/docs/PLAN.md`. Resume at NEXT STEP. Never redo finished work.

## Current phase
**P0 done. P1 (Tool registry + Setup Hub + quick-install popups) is next.**

## Last finished step
- P0 complete: `/docs/AUDIT.md`, `/docs/PLAN.md`, this file, `/scripts/save.sh` created.
- Baseline verified: `cd app && npm run build` passes on the clean tree (17/17 pages, 0 TypeScript errors, First Load JS shared 87.2 kB).

## NEXT STEP (exact file and task)
1. Create `app/content/tools/registry.json` with all 18 tools from the P1 checklist in `docs/PLAN.md` (name, what it is, why you need it, official link, install commands for Windows+WSL / Mac / Linux, verify command, expected output, common errors + fixes, lessons that use it).
2. Then `app/lib/tools.ts` (typed loader), then `app/app/setup/page.tsx` (Setup Hub wizard + Stuck panel + setup score), then the quick-install tooltip/drawer MDX component wired into `app/components/lesson/LessonContent.tsx`, then sidebar/home links, then build, then save.

## Decisions made
- **Path convention:** `/content/...` in the spec = `app/content/...` (the Next app content root). `/docs`, `/scripts`, `/CONTINUE.md` are repo root. See AUDIT.md section 8.
- **Reuse, do not replace:** Next.js 14 app in `app/` is the product. The legacy root `index.html` static site stays untouched for now (deploy conflict is a P12 decision).
- **Design:** keep the existing light "field guide" system (paper/ink/safety orange, hard shadows, Outfit + IBM Plex Serif + JetBrains Mono) because the rule is to extend the existing design. Dark code blocks stay dark. No new UI kit, only Tailwind + lucide-react, both already in use.
- **Progress storage:** keep `localStorage` (`ccc_progress`) as the always-works base; Supabase only layers on when env vars + login exist (login arrives in P3/P4).
- **Content source of truth:** section metadata stays in `app/lib/curriculum.ts` (existing pattern); MDX frontmatter mirrors it. New lesson-format fields are additive and optional so old lessons keep rendering.
- **Tool install docs:** written by us, original wording, per OS, with real verify commands and expected output.

## Env vars needed
- None for P0/P1 (no new env).
- Existing optional (see `app/.env.local.example`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`. Absent on this machine, app degrades to localStorage.
- Machine: Node at `C:\Program Files\nodejs`, git 2.51, WSL present, **`forge` NOT installed**, **`bash` not in PATH** (Git bash lives at `C:\Program Files\Git\bin\bash.exe`).

## How to run / save
- Dev: `cd app; npm run dev` (Next on :3000). Build check: `cd app; npm run build` (takes longer than 30s, run it in the background).
- Save: from repo root, `& "C:\Program Files\Git\bin\bash.exe" scripts/save.sh "message"` (PowerShell). It git add -A, commits, pushes `origin main`, prints the short hash. Only save when the build passes.

## Known bugs (do not rediscover; fix in the phase noted)
1. Mobile sidebar can never open: `data-open` hardcoded `"false"` in `app/components/Sidebar.tsx`, header hamburger toggles desktop collapse. Fix in P3.
2. `/verify/[id]` share link on the certificate page has no route; verification ID is a client hash that changes daily. Fix in P4/P12.
3. Community leaderboard rows are hardcoded placeholders (`app/app/community/page.tsx`). Fix in P12.
4. Supabase sync is dead code with no login UI. Fix in P3/P4.
5. `app/lib/mdx.ts` returns a silent "Coming Soon" stub for missing MDX. Keep until P2, then make it warn in dev.
6. Empty dead folders `app/app/security/` and `app/content/security/` (use `app/content/security/` for P5 content, delete the empty `app/app/security/` when the security routes land).
7. Root `vercel.json` rewrites all traffic to legacy `index.html`; conflicting deploy targets. Decide in P12.
8. Duplicate progress system in legacy `index.html` (`completedStages`). Leave until P12.
9. No LICENSE file although README badges link to one. P12.
10. `gauntlet/` never executed (`forge` missing) and not linked from the app. Link it in P5/P6.
