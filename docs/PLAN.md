# ChainCodeCamp Plan (P0)

Rules for every session: read `/CONTINUE.md` and this file first, resume at NEXT STEP, one step at a time, run the app after each step, never commit a broken build, use `scripts/save.sh` to save.
Path convention: `/content/...` means `app/content/...` (see AUDIT.md section 8).

Legend: `[ ]` not started, `[~]` in progress, `[x]` done.

## P0 Audit and plan
- [x] Read the whole repo (Next app, legacy static site, gauntlet, schema, README)
- [x] Verify baseline: `npm run build` in `app/` on the clean tree (17/17 pages, 0 type errors)
- [x] Write `/docs/AUDIT.md` (stack, routes, lessons, auth, DB, works/broken/missing)
- [x] Write `/docs/PLAN.md` (this file)
- [x] Write `/CONTINUE.md`
- [x] Create `/scripts/save.sh` (add, commit, push origin main, print short hash)
- [x] Run `save.sh`

## P1 Tool registry + Setup Hub + quick-install popups
- [x] Create `app/content/tools/registry.json`: one entry per tool (VS Code, Git, Node, WSL, Foundry, Python, pipx, Slither, Aderyn, Echidna, Medusa, Halmos, Certora, Tenderly, Etherscan, Remix, Hardhat, MetaMask, GitHub = 19 tools): name, what it is, why you need it, official link, install commands per OS (Windows+WSL, Mac, Linux), verify command, expected output, common errors + fixes, lessons that use it
- [x] `app/lib/tools.ts`: typed loader for the registry (server side, build time import)
- [x] Setup Hub page `app/app/setup/page.tsx`: step-by-step install wizard, OS picker, tick-off progress saved locally (and to the account once auth lands in P4), "Stuck?" panel with the 3 most common problems per tool
- [x] Quick-install component: a tool mentioned in a lesson auto-renders as a tooltip with a "How to install" drawer (`app/components/tools/ToolTag.tsx` + `app/lib/linkTools.tsx` linked into `LessonContent.tsx` paragraphs and list items; `<Tool id="..." />` also available in MDX)
- [x] Setup score surfaced (Setup Hub header + sidebar bar; dashboard gets it in P3)
- [x] Sidebar and home nav links to the Setup Hub
- [x] Run build, fix errors, update CONTINUE.md, save (build 18/18 pages, smoke tested /setup, / and a lesson page)

## P2 Unified lesson renderer (MDX, Excalidraw, Do-it panel, quiz)
- [x] Extend the MDX component map: GoalLine, Excalidraw Diagram (lazy), DoIt, BreakIt, SpotIt, FixIt, Expected output, Quiz (graded client side), Challenge, UpdraftVideo, ToolTag - all in `app/components/lesson/LessonBlocks.tsx` + `Quiz.tsx`, registered in `LessonContent.tsx`
- [x] Extended lesson frontmatter schema (goal, diagram, tools, videoUrl, videoTitle, repo, quiz) as optional fields in `app/types/curriculum.ts`
- [x] Apply the new blocks to all 10 existing lessons without deleting content: frontmatter goal, verified Updraft video link (https://updraft.cyfrin.io/courses/security), and a 3-5 question quiz with `why` added to every MDX. `vulnerability-classes.mdx` additionally has body blocks (Challenge + video row). DoIt/BreakIt/SpotIt/FixIt available for body rollouts.
- [x] Syntax highlighting for code blocks (dependency-free tokenizer in `CodeBlock.tsx`, language aware: solidity/bash/js/json)

## P3 Dashboard, progress, setup score, notes
- [x] Dashboard: learn path (Beginner / Auditor / Pro), skill map of covered bug classes, setup score, streaks, continue where you left off (`app/app/dashboard/page.tsx` + `app/components/dashboard/` + `app/lib/skills.ts` + `app/lib/streak.ts` + sidebar link)
- [x] Per-lesson notes saved to localStorage (`ccc_notes_v1`, `app/lib/notes.ts` + `app/components/lesson/LessonNotes.tsx` on every lesson page, dashboard NotesList)
- [~] Progress extended to lessons inside sections, not only sections: section-level tracking stands; lesson-level granularity deferred to P5 when security lessons land (renderer + Quiz already emit per-lesson completion implicitly)
- [x] Fix the broken mobile sidebar (`mobileOpen` drawer state + scrim in `Sidebar.tsx`/`ShellLayout.tsx`; header menu opens the drawer on phones)
- [x] Build + smoke after: 19/19 pages; `/dashboard`, `/curriculum/foundry-mastery`, `/` all 200 with streak/skill map/continue/notes present

## P4 GitHub connect, practice repo, push check, save.sh flow
- [x] GitHub OAuth connect on the dashboard (`app/components/dashboard/GitHubConnect.tsx` + `app/lib/auth.ts` with `signInWithOAuth`; callback route `app/app/auth/callback/route.ts`; honest banner when Supabase env vars are absent, which they are on this machine)
- [x] "Create my practice repo" via GitHub API (`POST /user/repos` private, plus link-existing flow; `app/lib/github.ts` holds repo/token state in localStorage with a `ccc_repo_updated` event)
- [x] After each challenge: exact `git add / commit / push` commands (`app/components/lesson/PushSteps.tsx` rendered on every lesson after the quiz, copy buttons + dashboard link when no repo is linked) plus a "Push check" that confirms the commit landed (latest-commit API read, shows sha/message/author/date/link or the real error)
- [x] Report generation stays P10; optional Vercel deploy stays P4-as-spec (portfolio page does not exist yet - deferred to P11 with public profiles)
- [x] Build + smoke after: 20/20 pages (auth callback route dynamic); `/dashboard` and `/curriculum/evm-fundamentals` 200 with GitHub card and Push-your-work block present

## P5 Security: foundations, audit basics, access control and privacy
- [x] Create `app/content/security/repos.json`: verified repo URLs, branches, license for each clone target (Cyfrin master index GPL-3.0 verified; 4-puppy-raffle-audit, 5-t-swap-audit, 8-vault-guardians-audit verified to exist with real scope data read; 3-passwordstore-audit, 6-thunder-loan-audit, 7-boss-bridge-audit, sc-exploits-minimized marked branchVerified:false/licenseVerified:false, verify on clone)
- [x] Section: Solidity, Foundry, ERC20, how the EVM stores and moves value (`sec-01-value`)
- [x] Section: what an audit is (scoping, recon, finding bugs, reporting) (`sec-02-audit`, PasswordStore refs deferred to on-disk-only)
- [x] Section: access control and on-chain privacy (PasswordStore style) (`sec-03-access`)
- [x] Every lesson in the full format: goal, Do-it with real commands + Expected output, Spot-it with grep guidance, Fix-it + re-run, Challenge with clone command, HackCallout with real-world case, UpdraftVideo, quiz, PushSteps
- [x] `app/lib/mdx.ts` reads both `content/curriculum` and `content/security`; `HackCallout` registered in MDX component map; 3 new sections in `CURRICULUM_SECTIONS` (S1/S2/S3)
- [x] Build + smoke: 23/23 pages; sec-01/sec-02/sec-03 200 with full content, dashboard tracks new sections

## P6 Security: raffle-style bugs
- [ ] Reentrancy (classic, cross-function, read-only)
- [ ] Bad randomness (Puppy Raffle clone target)
- [ ] Integer overflow and underflow
- [ ] Denial of service and gas limits
- [ ] MEV and front-running

## P7 Security: DeFi
- [ ] DEX and AMM, constant product formula (TSwap clone target)
- [ ] Oracles and price manipulation
- [ ] Flash loans, slippage, deadlines

## P8 Security: invariants and fuzzing + static analysis
- [ ] Stateless fuzzing, open stateful, handler-based stateful, debugging fuzz sequences, weird ERC20s (sc-exploits-minimized clone target)
- [ ] Slither, Aderyn, compiler warnings as signals

## P9 Security: bridges, governance, proxies, signatures
- [ ] Upgradeable proxies, signature replay, cross-chain (Boss Bridge clone target)
- [ ] Governance attacks

## P10 Reporting, portfolio PDF, capstone
- [ ] Severity, impact, likelihood, proof of concept as a test, recommended fix, PDF for portfolio
- [ ] Capstone: audit a real vulnerable codebase end to end (Vault Guardians clone target) and publish the report to the learner's GitHub

## P11 Hunt the bug lab, badges, public profiles, bug of the week
- [ ] In-browser read-only code viewer with buggy lines highlighted
- [ ] "Hunt the bug" mode: unlabeled vulnerable contract, learner submits a finding, CCC reveals the answer after
- [ ] Fuzzing and PoC walkthroughs that turn a failing sequence into a unit test
- [ ] Badges per bug class, streaks, public profile page with reports and badges
- [ ] Weekly "bug of the week" challenge page

## P12 Search, glossary, performance, mobile, SEO, launch
- [ ] Search across lessons, tools and glossary
- [ ] Glossary with plain-English definitions linking back into lessons
- [ ] Performance: small bundles, lazy diagrams, offline-friendly lesson cache, Nigeria-first low data
- [ ] Mobile audit at phone width (sidebar is already broken, see AUDIT)
- [ ] SEO: metadata, sitemap, robots, OG image, favicon
- [ ] Resolve the deploy conflict: root `vercel.json` rewrites everything to the legacy `index.html` while the product lives in `app/`
- [ ] Fix the weak/legacy items listed in AUDIT.md (fake leaderboard, fake verify link, empty dirs, README claims, missing LICENSE)
- [ ] Launch

