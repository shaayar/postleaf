# PostLeaf — Project Analysis & Defect Report

**Date:** 9th August 2026
**Branch:** main (`0ec0b26`)
**Scope:** Full-stack audit (backend, frontend, auth, quality, config, docs)
**Method:** Parallel agent analysis + manual verification of all Critical/High claims.

---

## 1. What the Project Does

**PostLeaf** is a Next.js (App Router) + Supabase application for "writing meaningful digital letters" — letters you compose and, conceptually, schedule/preserve so they "arrive when they matter most." Per `CONTEXT.md` / `docs/PRD.md`, it is deliberately *not* an email client, chat app, or productivity tool. The design philosophy favors calm, editorial, minimal UI; the engineering philosophy favors composition, reuse, and deletion over addition.

**Current implemented surface:**
- **Marketing/landing site** — editorial landing page (`(marketing)/page.tsx`), privacy-policy + terms-of-use content (`src/content/legal/*.mdx`).
- **Auth** — SignUp / LogIn / ForgotPassword / update-password against Supabase Auth (PKCE, `@supabase/ssr`).
- **App shell** — client-driven dashboard Layout, Sidebar + Header navigation.
- **Dashboard** with letter statistics.
- **Write editor** — compose letters (`write/page.tsx`, `write/[id]/page.tsx`, `write/LetterEditor.tsx`), save drafts, update status.
- **Library** — list of owned letters (client filter UI).
- **Archive** — archived letters.
- **Discover** → **Public** feed — new, in-progress feature that publishes letter snapshots to a `public_letters` table (*currently uncommitted work-in-progress*).
- **Profile** — view/edit profile (`/profile`, `/profile/edit`), avatar upload API.
- **Settings** — largely inert placeholders.

**Stack:** Next.js (`latest` → 16.3.0), React 19, TypeScript 5.8, Once UI (`@once-ui-system/core`), Supabase (auth + Postgres), MDX, GSAP for animation.

**Data model (3 tables):** `profiles`, `letters`, `public_letters` (+ upcoming `collections` documented but not implemented).

**Notable:** There is a **large volume of uncommitted work** (`discover/`, `publicLetters.ts`, `005-007_*.sql`, and modifications across `write/`, `lib/actions`, `lib/queries`, `src/types`, `lib/navigation.ts`). Any audit/publish should be aware these files are mid-flight.

---

## 2. Defects & Fixes (Prioritized)

### 🔴 CRITICAL

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| C1 | **Auth middleware is dead — placed at the repo root.** The app's `proxy.ts` sits at the project root, but Next.js 16 discovers the proxy file by scanning `src/` (parent of `appDir`), so the root file is **never compiled into the middleware bundle** → session refresh and auth redirects never run. (Note: v16 renamed the convention `middleware.ts` → `proxy.ts`; the fix must be a `proxy.ts` **inside `src/`**.) | `proxy.ts`, `src/lib/sb/middleware.ts:43-55` | Create `src/proxy.ts` (keep `src/lib/sb/middleware.ts` as the `updateSession` helper), delete the root `proxy.ts`. |
| C2 | **`publishLetter` can publish private/draft letters to the public Discover feed.** It fetches only `id, user_id, title, content` (ownership check), never verifies `status`/`visibility`, then inserts a snapshot into `public_letters`, which has a `USING (true)` SELECT policy → content becomes globally public. UI exposes "Publish" on any letter regardless of status. | `lib/actions/letters.ts:231-244`; `write/LetterEditor.tsx:96-124`; `supabase/007_public_letters_rls.sql` | Gate on `status === 'published'` and `visibility !== 'private'` (or enforce/override). Add RLS policy targeting the owner for INSERT. |
| C3 | **Broken `lint` script → effectively no working linter/CI gate.** `"lint": "next lint"`. Next 16 removed/repurposed `next lint`; CLI errors: `Invalid project directory ... no such directory: .../lint`. `eslint-config-next` is not installed and only a legacy `.eslintrc.json` exists (ignored by ESLint 9 flat-config default). | `package.json:10`, `.eslintrc.json` | Replace with flat config: install `eslint-config-next`, add `eslint.config.mjs`, script `"lint": "eslint ."`. Optionally add a `"typecheck": "tsc --noEmit"` script (currently only exists on CLI, passes). |

### 🟠 HIGH

| # | Severity | Issue | Fix |
|---|----------|-------|-----|
| H1 | Password-reset flow broken end-to-end. `callback/route.ts:9-12` decides landing page from a `?type=` query param, but the PKCE flow encodes the *recovery* marker in the persisted **code-verifier cookie**, not the URL. Recovery→landing on `/profile` instead of the password screen. `update-password/page.tsx` has no session/recovery guard. | `callback/route.ts`, `update-password/page.tsx` | Rely on the recovery `redirectType` / listen for `PASSWORD_RECOVERY` event in `UserProvider`; guard `/auth/update-password` to an authenticated (recovery) session and bounce otherwise. |
| H2 | **Version race + missing uniqueness on public snapshots.** `version = count + 1` via non-atomic count-then-insert; two concurrent publishes create duplicate versions. `public_letters.version` has no `UNIQUE(original_letter_id, version)`. | `lib/actions/letters.ts:246-255`, `supabase/005_public_letters.sql:12` | Add `UNIQUE(original_letter_id, version)`; derive version atomically (trigger / `SELECT … FOR UPDATE` / `ON CONFLICT` retry). |
| H3 | **Defect: publishing is fragmented & inconsistent (compounds C2).** `updateLetterStatus`→`published` never creates a snapshot (letter "published" but absent from Discover); `publishLetter` creates a snapshot but never sets source `status`/`visibility`. `visibility` on `letters` is never consulted by Discover. | `lib/actions/letters.ts:226` vs `:200-210`, `lib/utils/letters.ts:50-62` | Centralize "publish" into one atomic path: require/`set status=published`, `visibility=public`, and create the snapshot together. |
| H4 | **Avatar upload trusts client-supplied MIME; no magic-byte validation; storage bucket never created in migrations.** `file.type` used as upload `contentType`; no image sniffing → stored-content risk if bucket misconfigured public. No migration creates the `profiles` bucket / Storage RLS. `docs/to-fix.md` records a live `"url" parameter is not allowed` avatar failure (bucket misconfig today). | `lib/actions/profiles.ts:126-137`, `resources/validation/profile.ts:13-19` | Add a migration creating the bucket + Storage RLS (public read / owner write); add magic-byte sniffing; set detected real content-type. |
| H5 | **Search interpolates raw user input into a PostgREST `.or()` filter** — `,`/`(`/`)`/`%` break grammar; leading `%` full scans; potential query-injection/DoS. (Latent: `searchLetters` is exported but unused.) | `lib/queries/letters.ts:136-150` | Escape `% , ( )` in the term, or use `pg_trgm` GIN index + `ILIKE` params / a Postgres RPC `.` |
| H6 | **No loading states.** No `loading.tsx` anywhere in `src/app`; all awaited server pages ghost until RSC resolves. | `src/app` | Add `src/app/(app)/loading.tsx` + per-route `Suspense`. |
| H7 | **`(app)/layout.tsx` is a full `"use client"` shell** → whole section loses RSC streaming benefits. | `(app)/layout.tsx:1` | Split interactive state into a small client island; keep layout server. |
| H8 | **Header title misresolves**: `/archive` not in `appNav`/`accountNav`; `/write/{id}` never matches `/write` exactly → header shows "Dashboard" for both. | `components/Header.tsx:19-21` | Prefix-match `pathname.startsWith(item.href)` against a single canonical nav that includes `archiveNav`. |
| H9 | **Four divergent/duplicated nav definitions** + inconsistent data: `/library` twice, "Scheduled"→`/profile` mislabel, `accountNav` never shown in sidebar, `archive` duplicated, `archiveNav` unused. | `lib/navigation.ts`, `(app)/components/Header.tsx`, `(marketing)/components/Header.tsx`, `Footer.tsx` | Single canonical nav source; derive header title, sidebar, and marketing nav from it. |
| H10 | **README instructs running `supabase/schema.sql` — file doesn't exist** (migrations are `00X_*.sql`); a fresh user can't bootstrap the DB. Docs/schema drift (see §3). | `README.md:108` | Fix README to reference `supabase/002_…007_*.sql`; update table/roadmap naming. |

### 🟡 MEDIUM

| # | Severity | File | Issue → Fix |
|---|----------|------|-------------|
| M1 | root `error.tsx:20` renders `{error.message}` → leaks internal DB/driver strings. Log server-side; show generic message. | `src/app/error.tsx` |
| M2 | `UserProvider` double-fetches on every `onAuthStateChange`/refresh; `error` swallowed/never shown → app appears hung on 401. | `src/components/UserProvider.tsx:23-56` | De-dupe/abort fetches; surface `error`. |
| M3 | Editor double-submit / stale-state on save (no re-entry guard; local title/content not reconciled after `router.refresh()`). | `write/LetterEditor.tsx` | Guard re-entry; reconcile server state. |
| M4 | `DELETE` on `letters` just hard-deletes → quickly destroys `public_letters` snapshot (CASCADE), contradicting documented soft-delete lifecycle (`docs/database.md` lists `deleted_at` etc., none exist in schema). | `lib/actions/letters.ts:206-224`, `supabase/005_public_letters.sql:8-10` | Align delete lifecycle: add soft-delete columns + filters, or `ON DELETE SET NULL` snapshots. |
| M5 | Missing composite index for hot reads; `ILIKE '%term%'` has no trigram index → full scans. | `supabase/004_letters-index.sql` | Add `(user_id, updated_at DESC)`, `(user_id, status)`; `CREATE EXTENSION pg_trgm` + GIN for search. |
| M6 | Profile UPDATE policy lacks explicit `WITH CHECK` (currently safe via reused `USING`, but implicit/fragile). | `001_initial_schema.sql:26-30` | Add `WITH CHECK (auth.uid() = id)`. |
| M7 | Settings page is fully inert (dead "Save"/upload/sign-out handlers), while `profile/edit` + avatar API hold the real logic — capability unreachable from UI. | `(app)/settings/page.tsx` | Wire to existing API/actions or cut dead controls. |
| M8 | `/api/profile` PATCH maps all errors to "Unexpected server error", hiding auth failure as 500 instead of 401. | `src/app/api/profile/route.ts:56-62` | Distinguish auth vs validation. |
| M9 | Redundant/unused animation deps: `motion` + `framer-motion` (both unused; only `gsap` used). | `package.json:19,22` | Remove both; pin `next` + `@next/mdx` aligned; scrutinize `@once-ui-system/core: latest`. |

### 🟢 LOW / Cleanup

- Empty `src/app/(app)/components/Letters/{LetterCard,LetterEditor,LetterPreview}.tsx` (all 0 lines, unused) — misleading duplicates of the real `write/LetterEditor`. **Delete**, or extract the 3 inline list-item renderers into one shared component.
- Dead exports: `searchLetters` (`lib/queries/letters.ts`), `getProfileByUsername` (`queries/profiles.ts`), `archiveNav` (`lib/navigation.ts`).
- Empty stale route dirs under `src/app/(main)/` → `library`/`community`/`vault`.
- `tsconfig.json`: `typeRoots ./types` (missing) and `include (main)/profile` (missing).
- `docs/database.md` wrong profile fields (`display_name`/`website`/`location` vs `full_name`), `letters` docs list non-existent columns; two-table claim vs 3 tables.
- `project_context.txt` (committed, 0600) references `roles`/`user_global_roles` tables that no longer exist.
- `.env.example` header claims "no env vars needed" but lists them; omits `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. `.env` has a commented-out `DB_Password` value → treat `.env` as sensitive; **rotate `SUPABASE_SERVICE_ROLE_KEY`** (safe now — not committed — but if the file is copied around).
- No rate limiting/brute-force protection on `/api/profile` GET/PATCH and avatar POST.
- Sign-out not awaited/not try/catch-guarded in `Sidebar.tsx` / marketing `Header.tsx`.
- Auth forms: placeholder-only inputs without `<label>`/`aria-label` (screen-reader unfriendly).
- Editor fields/to/Title/Content lack `label`/`htmlFor` association; decorative "+ Add Tag" and "Custom…" receiver widgets are no-ops.
- `errorMessage` duplicated on both password fields in `update-password/page.tsx`.

---

## 3. Uncommitted Work Notice

`git status` shows a **feature in progress** that the audit reviewed and which interacts with several findings:

- **Untracked:** `src/app/(app)/discover/page.tsx`, `src/lib/queries/publicLetters.ts`, `supabase/005_public_letters.sql`, `006_public_letters_index.sql`, `007_public_letters_rls.sql`.
- **Modified:** `write/LetterEditor.tsx`, `write/actions.ts`, `lib/actions/{index,letters}.ts`, `lib/navigation.ts`, `lib/queries/index.ts`, `src/types/{index,letter}.ts`.

The new "Discover" feature is well-contained and generally consistent, but it is precisely the source of the `publishLetter` privacy/race findings (C2, H2, H4) and the new `public_letters` table that isn't yet represented in `docs/database.md` / README. Recommend finishing + linting this feature before committing, and add the unique constraint + publish gate (C2/H2/H3) as part of that work.

---

## 4. Verification Notes

- `npm run lint` → **fails** (`next lint` broken) — *verified*.
- `npx tsc --noEmit` → **passes** (exit 0) — *verified*.
- `npx @biomejs/biome check src` → exit 0 (only import-sort/formatting diagnostics).
- `proxy.ts` located at repo root while Next.js 16 scans `src/` → root file not compiled into the middleware bundle, empty `middleware` manifest → **C1 dead middleware** *verified*.
- Empty `(app)/components/Letters/*` files (0 lines, unused) — *verified*.
- Empty `src/app/(main)/{library,community,vault}` dirs — *verified*.

---

## 5. Recommended Execution Order

1. **Fix broken lint & CI** (C3) — restore a real gate before further changes.
2. **Rename `proxy.ts` → `middleware.ts`** so auth actually runs (C1).
3. **Gate `publishLetter` on status/visibility** and add unique/atomic version (C2, H2, H3, M4) as part of the Discover feature.
4. **Harden avatar upload** with a bucket migration + magic-byte validation (H4).
5. **Add loading states** and consolidate navigation/header (H6, H8, H9).
6. **Docs alignment** — README `schema.sql` reference, `database.md`, `project_context.txt`.
7. **Housekeeping** — drop empty `Letters/*`, `(main)/*`, dead exports, unused animation deps, rotate the service-role key reference; settle `next` pin.