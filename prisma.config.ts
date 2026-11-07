import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Load .env.local (Next.js convention)
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Gunakan transaction pooler (6543) karena port 5432 sering diblok ISP lokal
    url: process.env.DATABASE_URL!,
  },
});
