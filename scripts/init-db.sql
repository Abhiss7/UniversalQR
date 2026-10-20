-- UniversalQR — PostgreSQL initialization script
-- This runs once when the Docker container is first created.
-- Prisma migrations handle the actual schema; this just ensures extensions exist.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
