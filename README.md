# 🌿 PostLeaf

> Letters that arrive when they matter most.

PostLeaf is a modern digital letter platform that lets you write, schedule, and preserve meaningful messages. Whether it's a birthday, an anniversary, a future reminder, or a letter to your future self, PostLeaf ensures your words arrive at exactly the right moment.

Unlike instant messaging, PostLeaf embraces intentional communication, giving every letter a sense of anticipation and permanence.

---

## ✨ Features

- ✍️ Rich letter editor
- 📅 Schedule future delivery
- 🔒 Private and secure letters
- 📬 Receive letters at the perfect time
- 📚 Organize letters into collections
- 👤 Beautiful user profiles
- ☁️ Cloud synced across devices

---

## 🚧 Roadmap

### Phase 1

- Authentication
- Letter composer
- Scheduled delivery
- Inbox
- Sent letters

### Phase 2

- Collections
- Drafts
- Attachments
- Search & filtering

### Phase 3

- Collaborative letters
- Public collections
- Themes
- Mobile app

---

## 🛠 Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Once UI

### Backend

- Supabase
  - Authentication
  - PostgreSQL
  - Storage

### Animation

- GSAP

---

## 📁 Project Structure

```text
app/
components/
lib/
public/
supabase/
```

---

## 🚀 Getting Started

### 1. Clone

```bash
git clone ...
```

### 2. Install

```bash
npm install
```

### 3. Configure Environment

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### 4. Create Database

Run:

```text
supabase/schema.sql
```

inside the Supabase SQL Editor.

### 5. Start

```bash
npm run dev
```

---

## 🗄 Database

Current tables:

- profiles
- letters *(planned)*
- collections *(planned)*
- collection_letters *(planned)*

---

## 🎨 Design Principles

- Calm interface
- Minimal distractions
- Writing-first experience
- Accessibility
- Motion with purpose

---

## 🤝 Contributing

Contributions, ideas, and feedback are welcome.

If you'd like to contribute, feel free to open an issue or submit a pull request.

---

## 📄 License

MIT
