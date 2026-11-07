import process from "node:process";
// Load env vars from .env.local natively in Node 20+
process.loadEnvFile(".env.local");

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

const techStack = [
  // Frontend & UI
  { name: "Next.js", icon: "SiNextdotjs", category: "Frontend & UI", experience: ">1 years", projects: "3+ projects", order: 1 },
  { name: "React", icon: "SiReact", category: "Frontend & UI", experience: "1+ years", projects: "3+ projects", order: 2 },
  { name: "TailwindCSS", icon: "SiTailwindcss", category: "Frontend & UI", experience: "2+ years", projects: "4+ projects", order: 3 },
  { name: "TypeScript", icon: "SiTypescript", category: "Frontend & UI", experience: "1+ years", projects: "3+ projects", order: 4 },
  { name: "JavaScript", icon: "SiJavascript", category: "Frontend & UI", experience: "3+ years", projects: "10+ projects", order: 5 },
  { name: "Figma", icon: "SiFigma", category: "Frontend & UI", experience: "2+ years", projects: "5+ projects", order: 6 },
  
  // Backend & DB
  { name: "Laravel", icon: "SiLaravel", category: "Backend & DB", experience: "3+ years", projects: "6+ projects", order: 7 },
  { name: "Node.js", icon: "SiNodedotjs", category: "Backend & DB", experience: "2+ years", projects: "3+ projects", order: 8 },
  { name: "PHP", icon: "SiPhp", category: "Backend & DB", experience: "3+ years", projects: "5+ projects", order: 9 },
  { name: "MySQL", icon: "SiMysql", category: "Backend & DB", experience: "3+ years", projects: "10+ projects", order: 10 },
  { name: "Firebase / Supabase", icon: "SiFirebase", category: "Backend & DB", experience: "2+ years", projects: "7+ projects", order: 11 },
  { name: "Python", icon: "SiPython", category: "Backend & DB", experience: "2+ years", projects: "2+ projects", order: 12 },

  // Tools & Others
  { name: "Git & GitHub", icon: "SiGithub", category: "Tools & Others", experience: "3+ years", projects: "15+ projects", order: 13 },
  { name: "WordPress", icon: "SiWordpress", category: "Tools & Others", experience: "3+ years", projects: "7+ projects", order: 14 },
  { name: "Sheets & Apps Script", icon: "SiGooglesheets", category: "Tools & Others", experience: "2+ years", projects: "9+ projects", order: 15 },
  { name: "ESP32 / IoT", icon: "SiEspressif", category: "Tools & Others", experience: "1+ years", projects: "3+ projects", order: 16 },
  { name: "Java", icon: "SiOpenjdk", category: "Tools & Others", experience: "1+ years", projects: "2+ projects", order: 17 },
  { name: "C++", icon: "SiCplusplus", category: "Tools & Others", experience: "1+ years", projects: "1+ projects", order: 18 },
];

const familiars = [
  { name: "RESTful APIs", order: 1 },
  { name: "JWT Authentication", order: 2 },
  { name: "IoT (ESP32)", order: 3 },
  { name: "Google Apps Script", order: 4 },
  { name: "WordPress Dev", order: 5 },
  { name: "Firebase Integration", order: 6 },
];

async function main() {
  console.log("Menghapus data lama...");
  await prisma.techStackItem.deleteMany();
  await prisma.familiarTech.deleteMany();

  console.log("Menambahkan data Tech Stack...");
  await prisma.techStackItem.createMany({
    data: techStack,
  });

  console.log("Menambahkan data Familiar Tech...");
  await prisma.familiarTech.createMany({
    data: familiars,
  });

  console.log("Seeding berhasil!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
