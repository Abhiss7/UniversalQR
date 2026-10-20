cd C:\Users\ASUS\UniversalQR

# 1. Install all workspace dependencies
npm install

# 2. Copy env files
copy .env.example .env
copy apps\backend\.env.example apps\backend\.env

# 3. Start PostgreSQL via Docker
npm run db:up

# 4. Wait ~5 seconds, then push the Prisma schema
npm run db:migrate
# If prompted for a migration name, enter: init

# 5. Start both frontend and backend
npm run dev





npm run type-check          # Should pass 0 errors across all workspaces

npm run lint                # Should pass 0 errors

cd apps/backend && npm test # Should pass 3 unit tests (AppController + HealthController)
npm run db:studio           # Opens Prisma Studio at http://localhost:5555