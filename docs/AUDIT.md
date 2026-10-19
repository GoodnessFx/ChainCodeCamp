# ChainCodeCamp Audit (P0)

Date: 2026-10-19
Scope: full repo read before writing any new product code.
Nothing in this file was guessed from the README. Every claim below was checked in the code.

---

## 1. Stack

The repo contains **three separate things**. This matters more than anything else in this file.

| Part | Location | What it is | Status |
|---|---|---|---|
| Legacy static site | `/index.html` (525 KB single file) + root `package.json` (`serve .`) | One giant HTML page with the full 10-section curriculum, its own sidebar, its own progress in `localStorage` key `completedStages` | Works as a static page, but duplicates the Next app and has its own separate progress system |
| Next.js app | `/app` | Next.js 14.2.5 App Router, TypeScript, Tailwind 3.4, `next-mdx-remote` (RSC), `gray-matter`, `remark-gfm`, `@supabase/supabase-js` + `@supabase/ssr`, `lucide-react`, `html2canvas` | This is the real product. Build verified in P0 (section 7) |
| Foundry gauntlet | `/gauntlet` | Foundry project: 9 vulnerable contracts in `src/`, learner stubs in `src/attacks/` that `revert("Not implemented")`, failing-by-design tests, reference exploits in `solutions/` | Code complete. Not runnable here: `forge` is not installed. Not linked from any page in the Next app |

Stack details of the Next app:

- Routes live in `app/app/**`; shared shell is `app/components/ShellLayout.tsx` (fixed sidebar + fixed header + footer).
- Content is MDX in `app/content/curriculum/*.mdx`, loaded server-side by `app/lib/mdx.ts` (gray-matter frontmatter + MDXRemote RSC) and rendered by `app/components/lesson/LessonContent.tsx` with a custom component map (tables, blockquotes, headings, code blocks).
- Section metadata (title, stage, track, difficulty, objectives, historical hack) is **duplicated** as a hardcoded array in `app/lib/curriculum.ts`, not derived from MDX frontmatter.
- Design system: `app/tailwind.config.ts` + `app/styles/globals.css`. Light "field guide" look: paper `#f8f7f4`, ink `#1a1a1a`, safety orange `#ff4d00`, blueprint blue `#2a4ad0`, hard offset shadows, Outfit headings / IBM Plex Serif body / JetBrains Mono code. Code blocks render dark (`#0d1117`).
- Progress: `app/lib/progress.ts` writes `localStorage` key `ccc_progress` and optionally syncs to a Supabase `progress` table; `app/lib/useProgress.ts` is the React hook.
- Database: `app/supabase/schema.sql` = `profiles`, `progress`, `certificates`, `leaderboard` view, all with RLS. No migration tooling, no seed.
- Env: `app/.env.local.example` = `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`. No `.env.local` present, so Supabase is inert on this machine.

## 2. Routes (Next app)

| Route | File | Renders |
|---|---|---|
| `/` | `app/app/page.tsx` | Hero, stats bar, track cards, why section, CTA banner |
| `/curriculum` | `app/app/curriculum/page.tsx` | Two track lists, progress bar, Cyfrin-style progress dots |
| `/curriculum/[slug]` | `app/app/curriculum/[slug]/page.tsx` | Lesson page: header, MDX body, prev/next nav. 10 static params |
| `/certificate` | `app/app/certificate/page.tsx` | Two track certificates from localStorage progress, PNG download (html2canvas), share text |
| `/community` | `app/app/community/page.tsx` | Real bounty platform links, hardcoded placeholder leaderboard, community links |
| `app/app/security/` | **empty directory, no page.tsx** | Dead folder, no route |
| `app/content/security/` | **empty directory** | Dead folder, no content |

There is no dashboard, no auth page, no search page (the sidebar only filters section titles locally), no glossary, no tool hub, no notes, no profile page, no `/verify/[id]` route.

## 3. Existing courses and lessons

Track 1 "Foundations" (4): `evm-fundamentals` (01), `solidity-mastery` (02), `assembly-and-yul` (03), `foundry-mastery` (04).

Track 2 "Security & Auditing" (6): `vulnerability-classes` (05), `defi-attack-vectors` (06), `static-analysis-tooling` (07), `fuzzing-formal-verification` (08), `writing-audit-reports` (09), `bug-bounty-competitive-audits` (10).

All 10 MDX files exist in `app/content/curriculum/` (5.5 KB to 8.5 KB each). Frontmatter: title, stage, track, description, estimatedTime, difficulty, objectives, tags, optional `historicalHack`.

Content quality: each MDX is one dense reference article for a multi-week topic, with real code and real hack callouts. It has **none** of the required product lesson format: no one-line goal, no Excalidraw diagram, no numbered "Do it" commands with expected output, no "See it break" terminal output, no "Spot it" grep guidance, no quiz, no mini challenge, no "Watch the video version" link to Cyfrin Updraft, no practice-repo clone command.

## 4. Auth

- Supabase client is created in `app/lib/supabase.ts` from env vars and returns `null` when unset.
- `progress.ts` / `useProgress.ts` call `sb.auth.getUser()` and `onAuthStateChange` and would upsert to the `progress` table.
- **There is no sign-in UI anywhere**: no `signInWithOAuth`, no email login, no auth callback route.
- Consequence: every learner is anonymous, progress lives only in that browser, and the `profiles` / `certificates` / `leaderboard` DB objects can never be populated by real users today.

## 5. Database

`app/supabase/schema.sql` (manual paste into the Supabase SQL editor):

- `profiles` (id -> auth.users, username, created_at), auto-created by a signup trigger.
- `progress` (user_id, slug, unique pair), RLS select/insert/delete for own rows.
- `certificates` (user_id, track, verification_id `CCC-XXXXXXXX`), publicly readable.
- `leaderboard` view: top 100 by sections completed.

Never applied from this repo (no CLI config, no migrations). Untested against a live project.

## 6. What works / broken or fake / missing

### Works
- Next build compiles (verified in P0, section 7); 15 routes generated.
- MDX lesson rendering with design-system components; copy button on code blocks.
- localStorage progress: mark complete, sidebar checkmarks, header counter, progress bar, progress dots, certificate unlocking.
- Sidebar title filter, collapse persistence, overall shell layout.
- Community page links to real bounty platforms.
- Gauntlet contracts, attack stubs, tests and solutions are coherent and documented.

### Broken or fake
1. **`vercel.json` at repo root rewrites every path to `/index.html`**, and root `package.json` serves the static file. A root-level Vercel deploy serves the legacy page and shadows the Next app. The two deployments conflict; deploy target must be decided in P12.
2. **Certificate verification is fake.** Share text points at `/verify/CCC-...` but no such route exists, and the ID is a client-side hash of "completed slugs + today's date", so it changes daily and verifies nothing.
3. **Community leaderboard is fake rows** (`{ rank: 1, handle: "You could be here" }`) hardcoded in `app/app/community/page.tsx`.
4. **Supabase auth sync is dead code**: no env vars on this machine and no login UI anywhere (section 4).
5. **Mobile navigation is broken.** The sidebar is off-canvas on `max-md` and needs `data-open="true"`, but `data-open` is hardcoded `"false"` and never updated. The header hamburger toggles the desktop `collapsed` state instead. On a phone the sidebar can never open.
6. **`app/lib/mdx.ts` silently returns a "Coming Soon" stub** for a missing slug instead of failing the build, hiding content gaps.
7. **Empty dead folders**: `app/app/security/`, `app/content/security/`.
8. **Duplicate progress systems**: legacy `index.html` uses `completedStages`, the Next app uses `ccc_progress`. A learner who used the live static site starts from zero.
9. **README claims not backed by code**: no LICENSE file (README badges link to `/LICENSE`); certificate verification claim is false (see 2).
10. **`gauntlet/` is orphaned**: mentioned in README and MDX text, but no page links to it, no in-app clone/setup steps, and `forge` is not installed here so it was never run end to end.
11. **No `app/public/` files at all**: no favicon, no OG image, no sitemap, no robots.
12. **Code blocks have no syntax highlighting** (raw monospace on dark); the legacy `index.html` used highlight.js.

### Missing (required by the product spec)
- The whole smart contract security track depth: sections P5-P10 in the required lesson format, with original content, diagrams, quizzes, real-world case links, Updraft video links.
- Tool Hub: `app/content/tools/registry.json`, Setup Hub wizard, quick-install tooltips/drawers, "Stuck?" panels, setup score.
- Lab: in-browser code viewer with buggy lines highlighted, "Hunt the bug" mode, fuzz/PoC walkthroughs.
- GitHub flow: OAuth, "create my practice repo", push check, report push, optional Vercel deploy.
- Dashboard, per-lesson notes, streaks, badges, public profiles, learn paths (Beginner/Auditor/Pro), skill map.
- Search across lessons/tools/glossary, glossary, weekly bug-of-the-week page.
- `app/content/security/repos.json` and per-lesson clone commands.
- Mobile and low-data work (lazy diagrams, offline lesson cache), SEO, launch polish.

## 7. Baseline verification (P0)

- `npm run build` inside `app/` run on the clean tree before any edits. Result recorded in CONTINUE.md.
- `forge` is not installed on this machine, so `gauntlet/` was read but not executed. Installing Foundry is part of P1 tooling.
- Git: branch `main`, remote `origin` = `https://github.com/GoodnessFx/ChainCodeCamp.git`, last commit `182661f` before this phase.

## 8. Path convention decision

The spec writes `/content/tools/registry.json` and `/content/security/repos.json`. The Next app content root is `app/content/` (`app/lib/mdx.ts` reads `process.cwd()/content`, and `cwd` = `app/` at build time). Repo-root `/docs`, `/scripts`, `/CONTINUE.md` are literal repo-root paths.

**Decision: all `/content/...` paths in the spec mean `app/content/...`.** A second content tree at repo root would split content in two and would need extra plumbing for the app to read it at build time.


