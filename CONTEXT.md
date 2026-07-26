# CONTEXT.md

## Project

PostLeaf is a platform for writing meaningful digital letters.

It is not an email client, chat application, or productivity tool.

The experience should feel timeless, personal, calm, and emotionally warm.

Every design and engineering decision should reinforce that feeling.

---

## Product Philosophy

Prioritize:

- simplicity
- clarity
- permanence
- emotional connection
- thoughtful interactions

Avoid:

- unnecessary complexity
- feature bloat
- gimmicks
- dashboard aesthetics
- noisy interfaces

---

## Design Philosophy

The UI should feel:

- editorial
- spacious
- premium
- minimal
- readable

Inspirations include:

- Apple
- Linear
- Notion
- Raycast
- Once UI

Whitespace is intentional.

Visual restraint is a feature.

---

## Technical Stack

Framework:

- Next.js (App Router)

Language:

- TypeScript

UI:

- Once UI

Backend:

- Supabase

Animation:

- Once UI primitives first
- GSAP only when Once UI cannot achieve the desired interaction cleanly

---

## Engineering Philosophy

Prefer:

- composition
- readability
- maintainability
- consistency

Before introducing new code:

- inspect existing implementations
- reuse existing components
- avoid duplicate patterns

Favor deletion over addition whenever possible.

---

## Component Philosophy

Keep components:

- focused
- reusable
- composable

Do not create components that solve only one isolated use case if an existing abstraction already exists.

---

## Goal

Build software that feels crafted rather than assembled.

Every interaction should feel intentional.
