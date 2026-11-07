-- 1. Tambahkan 'experience' & 'projects' jika belum ada (abaikan jika sudah ada)
ALTER TABLE "public"."TechStackItem"
ADD COLUMN IF NOT EXISTS "experience" TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS "projects" TEXT NOT NULL DEFAULT '';

-- 2. Buat tabel FamiliarTech jika belum ada
CREATE TABLE IF NOT EXISTS "public"."FamiliarTech" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "FamiliarTech_pkey" PRIMARY KEY ("id")
);
