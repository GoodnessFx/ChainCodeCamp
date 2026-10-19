# CONTINUE.md

Read this first every session, then `/docs/PLAN.md`. Resume at NEXT STEP. Never redo finished work.

## Current phase
**P5 done. P6 is next.**

## Last finished step
- P5 complete:
  - `app/content/security/repos.json`: 7 clone targets. Master index GPL-3.0 verified; puppy-raffle, tswap, vault-guardians verified to exist (real scope/commit/solc read from their READMEs); passwordstore, thunder-loan, boss-bridge, sc-exploits marked `verifiedExists:false`/`licenseVerified:false`, flags instruct verify-on-clone.
  - Three original lessons in `app/content/security/`, all in the full block format with clone commands, grep guidance, real hacks with post-mortem links, Updraft links, quizzes, Challenges, PushSteps: `sec-01-value` (EVM/ERC20/storage/Foundry), `sec-02-audit` (scope/recon/findings/reporting), `sec-03-access` (caller gates, private-is-public with cast).
  - Loader + registry: `app/lib/mdx.ts` reads both content trees (curriculum first); `HackCallout` registered as an MDX component; S1/S2/S3 added to `CURRICULUM_SECTIONS` so sidebar/curriculum/dashboard/progress/nav pick them up automatically.
  - Two real fixes this phase: unclosed `<DoIt>` in sec-03 broke MDX parse for sec-02/sec-03; unregistered `<HackCallout>` broke sec-02 prerender. Diagnostic rule recorded: a missing close tag in one file can surface on another file's route, check all new MDX.
  - Smoke-trap lesson: always `Stop-Process node` before re-testing, a stale `next start` on :3000 serves old pages.
  - Verified: build 23/23 pages, zero prerender errors; sec-01/02/03 all 200 with goal/Do-it/quiz/video/challenge/push content; dashboard tracks the new sections. Server stopped.

## NEXT STEP (exact file and task)
P6: Security — raffle-style bugs (reentrancy, randomness, overflow, DoS, MEV, gas).
1. New lesson files in `app/content/security/`: `sec-04-reentrancy` (classic, cross-function, read-only), `sec-05-randomness` (Puppy Raffle clone target), `sec-06-overflow-dos` (integer edges, DoS, gas). All original content; every lesson in the full block format with clone command, quiz, challenge, real hack + post-mortem link, Updraft video link where one exists.
2. Add S4/S5/S6 to `CURRICULUM_SECTIONS` in `app/lib/curriculum.ts`.
3. Build + smoke after each lesson file (stop node first), update CONTINUE.md, run save.sh.

## Decisions made
- **Path convention:** `/content/...` in the spec = `app/content/...` (the Next app content root). `/docs`, `/scripts`, `/CONTINUE.md` are repo root. See AUDIT.md section 8.
- **Reuse, do not replace:** Next.js 14 app in `app/` is the product. The legacy root `index.html` static site stays untouched for now (deploy conflict is a P12 decision).
- **Design:** keep the existing light "field guide" system (paper/ink/safety orange, hard shadows, Outfit + IBM Plex Serif + JetBrains Mono) because the rule is to extend the existing design. Dark code blocks stay dark. No new UI kit, only Tailwind + lucide-react, both already in use.
- **Progress storage:** keep `localStorage` (`ccc_progress`) as the always-works base; Supabase only layers on when env vars + login exist (login arrives in P3/P4).
- **Content source of truth:** section metadata stays in `app/lib/curriculum.ts` (existing pattern); MDX frontmatter mirrors it. New lesson-format fields are additive and optional so old lessons keep rendering.
- **Tool install docs:** written by us, original wording, per OS, with real verify commands and expected output. Official docs for Aderyn, Foundry, Certora, Halmos, Medusa and Echidna were checked during P1.
- **Next.js gotcha learned in P1:** never call a named export of a "use client" module from a server component (it is undefined at runtime and fails prerender with `(0, o.x) is not a function`). Helpers used during server render live in non-client modules (`lib/linkTools.tsx`); client modules only export components.

## Env vars needed
- None for P0/P2 (no new env).
- Existing optional (see `app/.env.local.example`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`. Absent on this machine, app degrades to localStorage.
- Machine: Node at `C:\Program Files\nodejs`, git 2.51, WSL present, `forge` NOT installed, `bash` not in PATH (Git bash lives at `C:\Program Files\Git\bin\bash.exe`).

## How to run / save
- Dev: `cd app; npm run dev` (Next on :3000). Build check: `cd app; npm run build` (takes longer than 30s, run it in the background).
- Save: from repo root, `& "C:\Program Files\Git\bin\bash.exe" scripts/save.sh "message"`. It git add -A, commits, pushes `origin main`, prints the short hash. Only save when the build passes.

## Known bugs (do not rediscover; fix in the phase noted)
1. FIXED in P3: mobile sidebar now opens as a drawer via `mobileOpen` state (scrim + tap-to-close, header menu opens it under 768px).
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
