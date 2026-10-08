# Windows setup

Open PowerShell in the extracted project folder.

```powershell
Copy-Item .env.example .env
npm install
npx prisma generate
npm run db:push
npm run db:seed
npm run dev
```

Then open:

- http://localhost:3000
- http://localhost:3000/admin/login

If Tailwind ever appears unstyled, make sure `postcss.config.mjs` exists in the project root and restart `npm run dev` after deleting `.next`:

```powershell
Remove-Item -Recurse -Force .next
npm run dev
```

Do not run `npm audit fix --force` during initial setup.
