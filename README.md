# SHAHUL.ONLINE V7

Professional cyber-engineering portfolio + CMS for Shahul Hameed.

## Stack
- Next.js 15.5.27
- React 19.1
- Tailwind CSS 4.3
- Prisma 6.19.3
- SQLite
- TypeScript strict mode
- Lucide React
- CSS-first animation system (no Framer Motion dependency)

## V7 upgrades
- Professional responsive CMS control center
- Structured CMS navigation and aligned module layout
- KPI dashboard cards, search, editor, media library and settings
- V5-style terminal boot sequence with progress + SYSTEM ONLINE
- Server-room portrait hero background
- Cyber grid, scanline, glow and subtle motion effects
- Responsive public site and admin UI
- Preserved existing Prisma model names and CMS APIs

## Windows setup
```powershell
npm install
Copy-Item .env.example .env
npx prisma generate
npm run typecheck
npm run build
npm run dev
```

Open:
- Website: http://localhost:3000
- Admin: http://localhost:3000/admin/login

## Existing database warning
If you already have a populated `prisma/dev.db`, do **not** use `--accept-data-loss`.
Back up the database first and only run `npx prisma db push` if the schema diff is understood.

## Admin credentials
Set these in `.env`:
```env
ADMIN_EMAIL="admin@shahul.online"
ADMIN_PASSWORD="change-this-password"
AUTH_SECRET="replace-with-a-long-random-secret"
```

## Production media
Local media uploads are stored in `public/uploads`. For Vercel production, use object storage such as Vercel Blob or S3-compatible storage.

## V9 additions
- Interactive Infrastructure Lab (`/labs`)
- Engineering Command Center (`/engineering`)
- AI Engineering Assistant foundation (`/assistant`)
- Premium engineering-focused navigation and responsive UI
- No database schema changes required for V9 additions
- Prisma remains pinned to 6.19.3

## V9 additions
- Interactive Infrastructure Lab (`/labs`)
- Engineering Command Center (`/engineering`)
- AI Engineering Assistant foundation (`/assistant`)
- Premium engineering-focused navigation and responsive UI
- No database schema changes required for V9 additions
- Prisma remains pinned to 6.19.3
