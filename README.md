
# lets-draw-together

A full-featured collaborative drawing web app, built with a modern Turborepo monorepo architecture. This project lets multiple users collaborate on real-time drawing canvases across rooms, offering seamless experiences through a Next.js frontend, robust Node.js and WebSocket-based backend, and a PostgreSQL database managed via Prisma.

---

## Description

**lets-draw-together** provides real-time, multi-user collaborative drawing using a scalable and maintainable monorepo setup. It features secure user authentication, persistent chat and drawing history, responsive UI, and shared utilities/components, making it both a perfect foundation for further development and a solid demonstration of best practices in modern full-stack Typescript apps.

---

## Requirements

- **Node.js** (v18 or above)  
- **pnpm** (v7 or above)  
- **PostgreSQL** for backend data persistence  
- **Prisma CLI** for ORM migrations and schema sync  
- (Optional) **Vercel** account for deployment  
- (Optional) **Docker** for local database setup

---

## Repository Structure
<pre> <code>
Directory structure:
/apps
├── web # Next.js frontend app
├── https-server # Express backend with APIs and websockets
└── ws-server # WebSocket backend

/packages
├── common # Shared types, game logic, Zod schemas, utilities
├── db # Prisma schema, migrations, client
├── ui # Shared React UI components
├── tailwind-config # Shared Tailwind styles/config
├── eslint-config # Shared linting config
└── typescript-config# Shared tsconfig files
 </code> </pre>
---

## Features

- 🔒 Authorization & secure JWT authentication  
- 🎨 Real-time multi-room drawing canvas  
- 💬 Room-based persistent chat  
- 🏗️ Type-safe backend with Prisma ORM and PostgreSQL  
- ⚡ Fast local and CI builds with Turborepo caching  
- 🧩 Extensible project structure for teams

---

## Getting Started

### Installation

git clone <https://github.com/amanlad97/lets-draw-together.git>
cd lets-draw-together
pnpm install

### Local Development

pnpm exec turbo dev

Or run a specific app:
pnpm exec turbo dev --filter=web

### Build for Production

pnpm exec turbo build

---

## Database Setup

1. Create a `.env` file and fill out your `DATABASE_URL` (PostgreSQL).
2. Run Prisma migrations:
pnpm prisma generate
pnpm prisma migrate deploy

---

## Deployment

- Set **Root Directory** to `apps/web` on Vercel (for the frontend)
- **Build command:** `pnpm run build`
- **Output directory:** `.next`

---

## Contributing

Feel free to fork, branch, and open a pull request for new features or fixes!

---

## License

MIT License
