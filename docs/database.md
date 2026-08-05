# PostLeaf Database Architecture

> Status: Draft (V1)
>
> This document defines the canonical database architecture for PostLeaf.
> It describes the domain model, entity relationships, storage decisions,
> and the reasoning behind them.
>
> The goal is to keep the schema intentionally small while allowing the
> product to evolve without painful migrations.

---

## Design Principles

The database should model the product, not the UI.

PostLeaf is a writing platform.

The primary domain object is the **Letter**.

Everything else exists to support writing, organization, and discovery.

### Principles

- Store only what is necessary.
- Derive what can be computed.
- Prefer simple schemas over abstract ones.
- Delay complexity until the product requires it.
- Optimize for maintainability before flexibility.

---

## Domain Model

```text
User
 │
 ├── Profile
 │
 └── Letters
```

V1 intentionally contains only two application tables.

- profiles
- letters

Collections remain a simple string field until they justify becoming a
first-class entity.

---

## Profiles

### Purpose

Represents the public identity of an authenticated user.

Authentication is managed by Supabase Auth.

The profile extends authentication with user-facing information.

### Fields

| Field | Type | Notes |
|--------|------|------|
| id | uuid | References auth.users |
| username | text | Public unique handle |
| display_name | text | User's preferred name |
| avatar_url | text | Storage URL |
| bio | text | Optional |
| website | text | Optional |
| location | text | Optional |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last modification |

---

## Letters

### Purpose

A Letter is the primary object in PostLeaf.

Everything revolves around letters.

Letters may be drafts, published, archived, or private.

### Fields

| Field | Type | Notes |
|--------|------|------|
| id | uuid | Primary key |
| user_id | uuid | Owner |
| title | text | Required |
| content | text | Required |
| recipient_label | text | Optional |
| collection | text | Optional grouping |
| status | enum | draft / published / archived |
| visibility | enum | private / public / unlisted |
| slug | text | Nullable until published |
| word_count | integer | Stored |
| character_count | integer | Stored |
| created_at | timestamptz | Created |
| updated_at | timestamptz | Modified |
| last_saved_at | timestamptz | Editor autosave |
| published_at | timestamptz | Nullable |
| archived_at | timestamptz | Nullable |
| deleted_at | timestamptz | Soft delete |

---

## Stored vs Derived Data

### Stored

- title
- content
- recipient_label
- collection
- status
- visibility
- timestamps
- word_count
- character_count

### Derived

#### Excerpt

Generated from the first paragraph of `content`.

Never stored.

---

#### Read Time

Calculated from `word_count`.

Formula:

```text
ceil(word_count / 200)
```

Never stored.

---

#### Relative Dates

Examples:

- Today
- Yesterday
- Last Week

Generated from `updated_at`.

Never stored.

---

## Letter Lifecycle

```text
Draft

↓

Published

↓

Archived

↓

Deleted (soft delete)
```

Deletion should initially mark `deleted_at`.

Permanent deletion can be handled later through background cleanup.

---

## Collections

Collections intentionally remain a simple text field.

Current product requirements:

- Inbox
- Family
- Journal
- Ideas

Collections currently have:

- no metadata
- no icons
- no colors
- no sharing
- no nesting

Creating a separate table today would introduce unnecessary complexity.

If collections later require metadata, migrate to:

```text
collections

↓

letters.collection_id
```

---

## Recipient

Recipients are stored as text.

Examples:

- Mom
- Dad
- Future Me
- Anonymous Stranger

No recipient table exists in V1.

---

## Relationships

```text
User

│

├── Profile

│

└── Letters
```

One user owns many letters.

One letter belongs to exactly one user.

---

## Indexes

Recommended:

- user_id
- updated_at DESC
- status
- visibility
- slug (unique when published)

---

## Row Level Security

Profiles

- Users may read profiles.
- Users may update only their own profile.

Letters

- Users may CRUD only their own letters.
- Public letters may later receive public read access.

---

## Storage

Supabase Storage

Bucket:

profiles/

Stores avatar images.

Letter content remains inside PostgreSQL.

---

## Future Expansion

Potential future additions:

- collections table
- tags
- revisions
- attachments
- scheduled delivery
- collaboration
- comments
- reactions
- analytics

None are required for V1.

---

## Non Goals

The following are intentionally excluded from V1:

- tag tables
- recipient tables
- version history
- scheduled delivery
- notifications
- followers
- likes
- comments
- attachment system

These features should be introduced only when supported by the product.

---

## Summary

PostLeaf V1 intentionally keeps the database small.

profiles

↓

letters

The schema models the writing experience directly instead of anticipating
future features.

Complexity should emerge from real product needs rather than speculation.
