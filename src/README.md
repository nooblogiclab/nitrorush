# ECC Classroom — Maharashtra Board Class 10 (English Medium)

Classroom practice app: Learn chapters, MCQ practice with instant feedback,
board-pattern mock tests with timer, flashcards, formula lab, papers guide.
Progress saved in localStorage (`ssc-classroom-v1`).

## Files
- `main.pjs` — $meta only (all logic lives in index.html + src/)
- `index.html` — layout + styles (body content only)
- `src/data-sci.js` — Science & Tech Part 1 + Part 2 chapters, notes, MCQs, short Qs
- `src/data-maths.js` — Algebra + Geometry
- `src/data-ssteng.js` — History/PolSci + Geography + English
- `src/data-keys.js` — KEYWORD patch: mark-fetching keywords + PYQ-frequency tags
  merged onto bank items by question-text match
- `src/data-mastery.js` — chapter-mastery banks built from the Balbharati
  Std X Science & Tech Part-2 textbook exercises: full 40-mark blueprint pools
  for ALL 10 chapters (`window.SSC_MASTERY["sci2:<chapter>"]`, 22 items each,
  220 total, every item with model answer + examiner keywords).
- `src/data-mastery-p1.js` — same treatment from the Part-1 textbook for all
  10 Science-I chapters (`window.SSC_MASTERY["sci1:<chapter>"]`, 220 items).
- `src/data-english.js` — English exact-blueprint bank (`window.SSC_ENG`):
  grammar 1m/2m/transforms, 10 textual passages, 12 poems, 8 non-textual
  passages, letters, transfers, speeches/views, theme/report/story banks.
- `src/app.js` — all UI logic (no dependencies)

## Blueprint (MSBSHSE Science & Tech, 40 marks — verified on official 2024-25 papers via Shaalaa)
Q1.A 5×1 MCQ (only first attempt counts) · Q1.B 5×1 one-markers (true/false, odd-one, match, co-relation) ·
Q2.A reasons any 2/3 (4m) · Q2.B any 3/5 (6m, some with a/b sub-options) ·
Q3 any 5/8 (15m) · Q4 any 1/2 (5m) = 40.
Q4 pairs options from DIFFERENT streams: Part 1 = Physics vs Chemistry
(2025: rainbow proof vs C1–C10 carbon table); Part 2 = Biology vs Environment
(2025: animal adaptation vs my-role-in-environment flowchart).

## Blueprint — Mathematics 1 (Algebra), 40 marks · 2 hrs (verified on the official March 2026 paper via Shaalaa)
Q1.A 4×1 MCQ (only first attempt counts — write the alphabet) · Q1.B 4×1 one-mark solves ·
Q2.A activities any 2/3 (4m — fill every □ box stepwise) · Q2.B any 4/5 (8m) ·
Q3.A activity any 1/2 (3m) · Q3.B any 2/4 (6m, one sub-part may split 1½+1½) ·
Q4 any 2/3 (8m) · Q5 any 1/2 (3m: pie diagram with value of a, or simultaneous-equation word problem) = 40.
All Algebra mock + printable papers in this app follow this pattern (not the Science one).
Board activity bank: `window.SSC_ALG_ACT` in src/data-maths.js (2-mark ×12 + 3-mark ×6,
each chapter carries 2 two-mark + 1 three-mark activities; March-2026 items tagged Board · 2026).
Chapter papers guarantee disjoint Q sets (Q2.A-top-up excluded from Q2.B, Q3.A-top-up excluded from Q3.B/Q4/Q5).
Subject-paper default time for Maths is 120 min (board = 2 hrs).

## Blueprint — English, 80 marks · 3 hrs (verified on the official March 2026 paper via Shaalaa)
SECTION I Language Study Q1: A1 do-as-directed any 4/6 (4m) · A2 any 2/3 (4m) · B any 1/2 (2m) = 10 ·
SECTION II Textual Passages Q2: two passages × (5 activities × 2m: web/complete, Q, vocabulary, grammar, personal response) = 20 ·
SECTION III Poetry Q3: (A) extract A1 + A2 + rhyme MCQ (5m), (B) appreciation paragraph (5m) = 10 ·
SECTION IV Non-textual Passage + Summary Q4: (A) A1–A5 × 2m (10m), (B) summary with title (5m) = 15 ·
SECTION V Writing Skills: Q5 letter formal/informal any 1 (5m) · Q6 (A) verbal→non-verbal or bio-sketch any 1 (5m), (B) speech or views any 1 (5m) = 15 ·
SECTION VI Creative Writing Q7: (A) theme expansion or news report any 1 (5m), (B) story development or narrated experience any 1 (5m) = 10. Total = 80.
English subject + Model Sets 1–5 use this exact pattern (bank: `window.SSC_ENG` in src/data-english.js);
English chapter papers stay 40m generic practice constructs. Default English full-paper time is 180 min.

## Print = screen size (WYSIWYG, Oct 2026 — user caught print shrinking)
Reference: user's printed PDF `scratch/message-attachments/SSC-2.pdf` (which is itself an
older printout of this app) measured 6× A4 with body text ≈ 9.6pt, while the screen
reads 14.5px (≈ 10.9pt). Root cause: `@media print` in index.html deliberately shrank
type (`.bq` 14.5→12.8px, `.bqh` 15→13.2px, `.bopt` 13.5→12px, `.keysheet` 14.5→12.5px…)
to save pages. Fix: print CSS no longer overrides ANY board-sheet/key font size —
questions, headers and keys print exactly as read on screen (only vertical spacing is
tightened slightly). Measured in print emulation: `.bq` 14.5px/1.62 and key 14.5px on
all three sheet types (Algebra / EM exact / generic), ≈ 6 pages total at true print
width (703px). Optional "Compact print (smaller)" checkbox above the Print button
restores the old dense sizes (`.compact-print` overrides in print CSS). The EM exact
sheet flows like every other chapter (fixed 3-page splits spilled a near-empty page
once type grew — fixed Oct 2026). The watermark is inlined as a data URL in app.js,
so it prints even before first Save. Print-dialog
advice for the user: Scale = 100% (not Fit-to-page), Background graphics ON (watermark).

## KaTeX maths notation (Oct 2026 — user asked for professional maths code + Science-1 review)
- All maths content stays plain Unicode in data files (`x²`, `√`, `Δ`, `→`, `½`, `□`, `Σ`, `₂n₁` …).
  At render time `MX()` in src/app.js auto-detects maths runs and typesets them with
  **KaTeX 0.16.11** (CDN CSS + async JS in index.html; graceful Unicode fallback with
  in-place upgrade if KaTeX loads late or is blocked).
- Converter highlights: Unicode super/subscripts → `^{}`/`_{}` (incl. `tₙ`, `S₁₂`, `⁻¹¹`),
  `√(...)` with balanced radicands, `·`/`×`/`÷`/`≠`/`→`/`∴`/`∝`/`∞`/`Δ`/`π`/`θ` symbols,
  short `a/b` fractions → `\frac`, chemistry letter-runs → upright `\text{}`
  (`Ca(OH)₂`, `CuSO₄`, element symbols `Fe`/`Na`), trig/log → `\sin\cos\tan\log`,
  `□` activity boxes → `\square`, clutter-proofing (prose words peel off maths edges,
  `Chandrayaan-1`/`and/or`/`2005/2015` stay text).
- Keywords inside maths get `\boldsymbol{…}` so examiner ticks stay bold; keyword
  matching is whitespace-insensitive (`a = b` ticks `a=b`). Search `MX(` in src/app.js
  for all render sites (Learn, Practice, Mock run + result table, Flashcards,
  Formula lab, all three printable sheets + keys). Papers Guide + EM exact sheet
  (hardcoded prose) intentionally untouched.
- Verified: 0 KaTeX fallbacks across all 9,992 bank strings; live Algebra paper
  renders 176 KaTeX spans with bold keywords; print stays WYSIWYG 14.5px
  (KaTeX set to 1.05em via `body .katex` so the CDN stylesheet doesn't win).
- Science-1 review (same pass): read all 10 mastery banks + base banks + purity
  top-ups. Fixed: periodic-table MCQ answer (2,8,3 → **Group 13, Period 3**, was
  wrongly Group 3 — the bank uses 1–18 numbering); le2 elimination model rewritten
  (showed a confusing `?` mid-step); 7 alg-activity key/model verbatim mismatches
  fixed so every examiner tick appears word-for-word in its model answer.

## Weightage stars (every chapter has w: high/mid/low + wx evidence line)
Science ratings counted from official 2022–25 papers (see scratch/weightage.txt):
Sci-I high = gravitation, periodic table, chemical reactions, electricity,
heat, refraction, carbon compounds; mid = lenses, metallurgy, space.
Sci-II high = heredity, life processes I+II, green energy; rest mid.
Other subjects follow the typical board blueprint (marked "Typical" in wx).
UI: Learn chapters + mock chapter chips show ★★★/★★/★; chapter papers show a
🎯 focus meter (always 100% own-lesson Qs since every chapter is fully banked);
Papers Guide opens with the
🧭 Smart plan (why equal time on all 10 lessons is wasteful + 3 plans).

## SSC-alignment audit (Oct 2026 — user caught CBSE intrusions)
- Science 10+10 chapters verified against the Balbharati PDFs (in-textbook terms only).
- History rebuilt to the official 9 History + 5 PolSci chapters; the old
  "Freedom Movement" chapter (CBSE Nationalism material) and Mendel-cross style
  extras were removed. Geography is the full 9 chapters incl. India–Brazil
  comparisons in every chapter. Geometry gained the missing Ch 6 Trigonometry.
Written answers score by KEYWORD ticks: award = round_half(nominal × ticked/total),
capped at section max. Every Science-II chapter has a full textbook-based bank;
other subjects fall back to the general bank (labelled in UI).

## Data shape (global `window.SSC_SUBJECTS`)
subject = { id, name, short, icon, color, desc, pattern,
  chapters: [{id, name, notes[], traps[], formulas[]}],
  mcq: [{ch, q, opts[4], ans, exp}],
  shortQs: [{ch, q, marks, model}] }

Mocks are generated at runtime in app.js from subject banks
(board pattern: Q1 MCQs, Q2 short 2-mark, Q3 3-mark with model answers).
