# AGENTS.md

This repository is built with Once UI and includes the Once UI AI Harness.

## Before You Begin

Before making any code changes:

1. Understand the user's request.
2. Inspect the existing implementation before proposing new code.
3. Reuse existing patterns whenever possible.
4. Prefer modifying existing components over creating new ones.

---

## Once UI AI Harness

This project includes the Once UI AI Harness under:

node_modules/@once-ui-system/core/ai/

Use this as the primary source of truth for Once UI.

Important resources include:

- manifest.json
- spec.json
- rules.md
- rules.compact.md
- recipes.md
- gotchas.json
- components/*.json
- examples/
- tasks/

When working with Once UI:

- Never guess component APIs.
- Load the relevant component specification before using a component.
- Follow the documented composition patterns.
- Use the examples as canonical references.

---

## Development Principles

- Preserve existing architecture.
- Keep components focused and reusable.
- Avoid unnecessary abstractions.
- Prefer simple solutions.
- Explain significant architectural changes before implementing them.
- Match the existing coding style of the repository.
- Remove dead code instead of leaving it behind.

---

## UI Changes

Before changing UI:

- Inspect similar components already present.
- Follow PostLeaf's design philosophy from CONTEXT.md.
- Follow Once UI best practices from the AI Harness.
- Prefer Once UI primitives over custom implementations.
- Avoid custom CSS unless truly necessary.

---

## When Unsure

Never invent behavior.

Inspect:

- existing code
- Once UI AI Harness
- project patterns

before making assumptions.

## Context Loading Strategy

Do not load the entire Once UI AI Harness into context.

Instead:

1. Read the general rules and recipes.
2. Identify the components required for the current task.
3. Load only the specifications for those components.
4. Refer to examples only when implementing similar functionality.

Keep context focused and relevant.
