# ShowPro Backend

Express + Prisma + PostgreSQL backend for the DII-CAMT ShowPro system.

## Stack

- Node.js + Express
- Prisma ORM
- PostgreSQL
- Passport JWT
- Zod validation

## Quick Start

1. Copy env

```powershell
Copy-Item .env.example .env
```

2. Start PostgreSQL

```powershell
docker compose up -d
```

3. Install dependencies

```powershell
npm install
```

4. Generate Prisma client and push schema

```powershell
npm run prisma:generate
npm run prisma:push
```

5. Seed demo data

```powershell
npm run prisma:seed
```

6. Run the API

```powershell
npm run dev
```

API base URL: `http://localhost:4000/api`

## Demo Accounts

All demo users use the same password: `Password123!`

- `admin@showpro.local`
- `staff@showpro.local`
- `narin@showpro.local`
- `mali@showpro.local`
- `talent@northernsoft.local`
- `careers@creativelabs.local`
- `alice@student.showpro.local`
- `bob@student.showpro.local`
- `chompoo@student.showpro.local`

## Included Modules

- Auth and role-based access control
- Student profiles, skills, portfolio, transcript, stats, PDPA consent
- Courses, enrollments, attendance, grading, grade audit trail
- Quests, XP, coins, badges, timeline updates
- Activities with reward grants and check-in workflow
- Jobs, applications, internship logs, internship documents, talent search
- Budget, personnel, cooperation, workload, subscriptions, payment lifecycle
- Requests, comments, appointments, office hours, internal messages
- Notifications, audit logs, user directory, system usage reports

## Important Note

`prisma db push` and `prisma:seed` need a running PostgreSQL instance on `localhost:5432` or a matching `DATABASE_URL` in `.env`.
