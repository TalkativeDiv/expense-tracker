# NextJS Expense Tracker
> A Expense Tracker built with NextJS, Neon Postgres, Clerk Auth, ShadcnUI, and Prisma.

## Features

- ⚡ Speedy CRUD operations using Neon Postgres, Prisma, and NextJS server actions
- 🎨 Simple and Beautiful UI using ShadcnUI.
- 🔒 Secure and simple authentication with Clerk.
- 💾 Serverlessly Hosted on Vercel.

## Deployment

0. Create A Database and Clerk App and get their credentials

1. Clone the repo.

```bash
git clone https://github.com/TalkativeDiv/expense-tracker
```
2. Install dependencies

```bash
bun install
```

3. Database setup

```bash
bunx prisma db push
```

4. Create a `.env` file in the root of the project and add the following environment variables

```env
DATABASE_URL="postgresql://johndoe:foobarbaz@example.com:1234"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_foo2bar2baz2qux2"
CLERK_SECRET_KEY="sk_foo2bar2baz2qux2"
```

5. Deploy to your favorite NextJS hosting platform.