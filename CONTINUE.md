# CONTINUE.md

Read this first every session, then `/docs/PLAN.md`. Resume at NEXT STEP. Never redo finished work.

## Current phase
**P0 and P1 done. P2 (Unified lesson renderer: Excalidraw, Do-it panel, quiz) is next.**

## Last finished step
- P1 complete and saved:
  - `app/content/tools/registry.json` (19 tools, JSON validated with node)
  - `app/lib/tools.ts` (types, loader, OS detection, tool-name aliases)
  - `app/lib/setup.ts` (tick-off storage `ccc_setup`, setup score)
  - `app/app/setup/page.tsx` (Setup Hub wizard: score, OS picker, per-tool steps, verify + expected output, Stuck? panels)
  - `app/components/tools/ToolTag.tsx` (tooltip + install drawer) and `app/lib/linkTools.tsx` (server-safe auto-linking used by `LessonContent` paragraphs and list items; `<Tool id="..." />` also registered in the MDX map)
  - Sidebar: Setup Hub link + live setup score bar. Home: Setup Hub CTA.
- Verified: `cd app && npm run build` passes (18/18 pages, 0 type errors), then `npm start` smoke test: `/setup` 200, `/` 200, `/curriculum/static-analysis-tooling` 200 with tool tooltips rendered, 0 of 9 `<pre>` code blocks touched by auto-linking. Server stopped after the test.

## NEXT STEP (exact file and task)
P2, first item: extend the MDX lesson renderer in `app/components/lesson/LessonContent.tsx`.
1. Add these MDX components (new files in `app/components/lesson/`): `GoalLine`, `Diagram` (Excalidraw embed, lazy), `DoIt` (numbered steps, per-OS command tabs, expected output), `BreakIt` (vulnerable code + real terminal output), `SpotIt` (grep / what to read first), `FixIt` (patch + re-run proof), `Quiz` (3-5 questions, graded client side), `Challenge`, `UpdraftVideo`, and extend `HackCallout` for the real-world case.
2. Extend the frontmatter schema in `app/types/curriculum.ts` (goal, diagram, tools, videoUrl, repo, quiz) as optional fields so all 10 existing lessons keep rendering.
3. Apply the new blocks to existing lessons one file at a time, starting with `app/content/curriculum/vulnerability-classes.mdx`, without deleting content.
4. Then syntax highlighting in `app/components/lesson/CodeBlock.tsx` (lazy, small).
5. Build, smoke test, update this file, run save.sh.

## Decisions made
- **Path convention:** `/content/...` in the spec = `app/content/...` (the Next app content root). `/docs`, `/scripts`, `/CONTINUE.md` are repo root. See AUDIT.md section 8.
- **Reuse, do not replace:** Next.js 14 app in `app/` is the product. The legacy root `index.html` static site stays untouched for now (deploy conflict is a P12 decision).
- **Design:** keep the existing light "field guide" system (paper/ink/safety orange, hard shadows, Outfit + IBM Plex Serif + JetBrains Mono) because the rule is to extend the existing design. Dark code blocks stay dark. No new UI kit, only Tailwind + lucide-react, both already in use.
- **Progress storage:** keep `localStorage` (`ccc_progress`) as the always-works base; Supabase only layers on when env vars + login exist (login arrives in P3/P4).
- **Content source of truth:** section metadata stays in `app/lib/curriculum.ts` (existing pattern); MDX frontmatter mirrors it. New lesson-format fields are additive and optional so old lessons keep rendering.
- **Tool install docs:** written by us, original wording, per OS, with real verify commands and expected output.

- **Tool install docs:** written by us, original wording, per OS, real verify commands and expected output. Official docs for Aderyn, Foundry, Certora, Halmos, Medusa and Echidna were checked during P1.
- **Next.js gotcha learned in P1:** never call a named export of a `"use client"` module from a server component (it is undefined at runtime and fails prerender with `(0, o.x) is not a function`). Helpers used during server render live in non-client modules (`lib/linkTools.tsx`); client modules only export components.

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
11. Home First Load JS grew from 170 kB to 182 kB when the tool registry entered the client bundle (sidebar setup score). Revisit in P12 performance: compute the score without shipping the full registry to every page.
