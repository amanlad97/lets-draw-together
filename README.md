
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

Directory structure:
└── amanlad97-lets-draw-together/
    ├── README.md
    ├── package.json
    ├── pnpm-workspace.yaml
    ├── turbo.json
    ├── .npmrc
    ├── apps/
    │   ├── https-server/
    │   │   ├── package.json
    │   │   ├── tsconfig.json
    │   │   ├── tsconfig.tsbuildinfo
    │   │   └── src/
    │   │       ├── index.ts
    │   │       ├── api/
    │   │       │   ├── middleware.ts
    │   │       │   ├── room.ts
    │   │       │   └── security.ts
    │   │       └── types/
    │   │           └── index.d.ts
    │   ├── web/
    │   │   ├── README.md
    │   │   ├── eslint.config.js
    │   │   ├── next.config.js
    │   │   ├── package.json
    │   │   ├── postcss.config.js
    │   │   ├── tsconfig.json
    │   │   └── app/
    │   │       ├── globals.css
    │   │       ├── layout.tsx
    │   │       ├── not-found.tsx
    │   │       ├── page.module.css
    │   │       ├── provider.tsx
    │   │       ├── (auth)/
    │   │       │   ├── layout.tsx
    │   │       │   ├── signin/
    │   │       │   │   └── page.tsx
    │   │       │   └── signup/
    │   │       │       └── page.tsx
    │   │       ├── hooks/
    │   │       │   ├── useResize.ts
    │   │       │   └── UseWebsocket.ts
    │   │       └── room/
    │   │           ├── page.tsx
    │   │           └── [roomId]/
    │   │               ├── https.ts
    │   │               └── page.tsx
    │   └── ws-server/
    │       ├── package.json
    │       ├── tsconfig.json
    │       ├── tsconfig.tsbuildinfo
    │       └── src/
    │           └── index.ts
    └── packages/
        ├── backend-common/
        │   ├── package.json
        │   ├── tsconfig.json
        │   └── src/
        │       └── index.ts
        ├── common/
        │   ├── package.json
        │   ├── tsconfig.json
        │   ├── tsconfig.tsbuildinfo
        │   └── src/
        │       ├── game.ts
        │       ├── shapeTypes.ts
        │       ├── utils.ts
        │       └── zodTypes.ts
        ├── db/
        │   ├── package.json
        │   ├── tsconfig.json
        │   ├── prisma/
        │   │   ├── schema.prisma
        │   │   └── migrations/
        │   │       ├── migration_lock.toml
        │   │       ├── 20250821091932_init/
        │   │       │   └── migration.sql
        │   │       ├── 20250821120224_rename_email/
        │   │       │   └── migration.sql
        │   │       └── 20250823171711_minor_changes/
        │   │           └── migration.sql
        │   └── src/
        │       └── index.ts
        ├── eslint-config/
        │   ├── README.md
        │   ├── base.js
        │   ├── next.js
        │   ├── package.json
        │   └── react-internal.js
        ├── tailwind-config/
        │   ├── package.json
        │   ├── postcss.config.js
        │   └── shared-styles.css
        ├── typescript-config/
        │   ├── base.json
        │   ├── nextjs.json
        │   ├── package.json
        │   └── react-library.json
        └── ui/
            ├── eslint.config.mjs
            ├── package.json
            ├── postcss.config.js
            ├── tsconfig.json
            ├── turbo.json
            └── src/
                ├── CredentialButton.tsx
                ├── CredentialText.tsx
                ├── LoadingSpinner.tsx
                ├── Navbar.tsx
                ├── styles.css
                └── ToolButton.tsx

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

git clone https://github.com/amanlad97/lets-draw-together.git
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