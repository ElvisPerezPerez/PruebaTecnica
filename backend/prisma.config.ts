import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';
import dotenv from 'dotenv';

dotenv.config({
  path: 'env.production',
});

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
