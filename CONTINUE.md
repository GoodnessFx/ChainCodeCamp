# CONTINUE.md

Read this first every session, then `/docs/PLAN.md`. Resume at NEXT STEP. Never redo finished work.

## Current phase
**P2 in progress (renderer done, rollout to lessons remains). After that: P3.**

## Last finished step
- P2 renderer built and verified:
  - `app/components/lesson/LessonBlocks.tsx`: GoalLine, DoIt, BreakIt, SpotIt, FixIt, Challenge, Expected (dark green output block), Diagram (lazy iframe/image, Excalidraw-ready), UpdraftVideo. All server components, registered in `LessonContent.tsx`.
  - `app/components/lesson/Quiz.tsx`: client-side graded quiz (answers revealed only after "Check answers", per-question `why`, score, retry).
  - `app/types/curriculum.ts`: optional frontmatter fields goal, diagram, tools, videoUrl, videoTitle, repo, quiz (LessonQuestion). `LessonContent` renders goal + video above the body, quiz after it.
  - `app/components/lesson/CodeBlock.tsx`: dependency-free syntax tokenizer (solidity/bash/js/json keyword sets, strings, comments, numbers, calls).
  - Template rollout: `vulnerability-classes.mdx` now has frontmatter goal, Updraft link (https://updraft.cyfrin.io/courses/security), a 4-question quiz, and a Challenge block. Existing content untouched.
  - Verified: build 18/18, `npm start` smoke: template lesson shows goal, video, quiz, challenge, highlighted keywords; `evm-fundamentals` still renders with highlighting. Server stopped.
- Fixed during the step: orphaned JSX lines in LessonBlocks.tsx (a botched insert) - lesson from P1: verify the file compiles after every multi-part edit.

## NEXT STEP (exact file and task)
1. Roll the lesson format out to the 9 remaining files in `app/content/curriculum/` (evm-fundamentals, solidity-mastery, assembly-and-yul, foundry-mastery, defi-attack-vectors, static-analysis-tooling, fuzzing-formal-verification, writing-audit-reports, bug-bounty-competitive-audits). Per lesson, copy the `vulnerability-classes.mdx` pattern: frontmatter `goal` (one line), `videoUrl` + `videoTitle` (verify each Updraft URL before using it, do not guess deep links), `quiz` (3-5 questions with answer index and why), and body blocks (DoIt/BreakIt/FixIt/Challenge) inserted without deleting any existing content. Keep blank lines around JSX blocks in MDX or markdown inside them becomes a code block.
2. Build + smoke test after every 3 lessons, update this file, run save.sh.
3. Then P3: dashboard (learn path, skill map, setup score, streaks), per-lesson notes, lesson-level progress, mobile sidebar fix.

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
