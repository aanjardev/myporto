import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { projectsData } from "../src/data/projectsData";
import { experiences } from "../src/data/workExperienceData";
import { credentialsData } from "../src/data/credentialsData";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });


async function main() {
  console.log("🌱 Starting seed...");

  // ─── Clean up existing data ───────────────────────────────────
  await prisma.heroStat.deleteMany();
  await prisma.heroPhoto.deleteMany();
  await prisma.socialLink.deleteMany();
  await prisma.heroContent.deleteMany();

  await prisma.projectHighlight.deleteMany();
  await prisma.projectResponsibility.deleteMany();
  await prisma.projectFeature.deleteMany();
  await prisma.projectTech.deleteMany();
  await prisma.projectScreenshot.deleteMany();
  await prisma.project.deleteMany();

  await prisma.workExperienceTech.deleteMany();
  await prisma.workExperience.deleteMany();

  await prisma.credentialSkill.deleteMany();
  await prisma.credential.deleteMany();

  await prisma.techStackItem.deleteMany();

  // ─── Seed Hero ────────────────────────────────────────────────
  console.log("📸 Seeding Hero...");
  await prisma.heroContent.create({
    data: {
      name: "Aan Anjar Setyowati",
      nickname: "Aanjar",
      tagline: "Full Stack Web Developer & Tutor",
      bio: "I craft digital experiences that blend clean code with thoughtful design. Specializing in modern web technologies, I build solutions that are fast, scalable, and user-friendly.",
      availability: "Available for freelance",
      cvUrl: null,
      photos: {
        create: [
          { src: "/images/profil1.jpg", label: "Casual", order: 0 },
          { src: "/images/profil2.jpg", label: "Professional", order: 1 },
          { src: "/images/profil3.jpg", label: "Creative", order: 2 },
        ],
      },
      stats: {
        create: [
          { label: "Projects", value: "8+", icon: "Briefcase", order: 0 },
          { label: "Clients", value: "5+", icon: "Users", order: 1 },
          { label: "Tech Stack", value: "10+", icon: "Code", order: 2 },
          { label: "Teaching", value: "Active", icon: "BookOpen", order: 3 },
        ],
      },
      socials: {
        create: [
          {
            label: "GitHub",
            url: "https://github.com/aanjardev",
            icon: "SiGithub",
            order: 0,
          },
          {
            label: "LinkedIn",
            url: "https://linkedin.com/in/aanjardev",
            icon: "SiLinkedin",
            order: 1,
          },
        ],
      },
    },
  });

  // ─── Seed Projects ────────────────────────────────────────────
  console.log("🚀 Seeding Projects...");
  for (let i = 0; i < projectsData.length; i++) {
    const p = projectsData[i];
    await prisma.project.create({
      data: {
        title: p.title,
        slug: p.slug,
        type: p.type,
        category: p.category ?? null,
        client: p.client ?? null,
        period: p.period ?? null,
        description: p.description,
        longDescription: p.longDescription ?? null,
        challenge: p.challenge ?? null,
        solution: p.solution ?? null,
        image: p.image,
        liveUrl: p.liveUrl ?? null,
        githubUrl: p.githubUrl ?? null,
        myRole: p.myRole ?? null,
        teamSize: p.teamSize ?? null,
        goal: p.goal ?? null,
        outcome: p.outcome ?? null,
        order: i,
        screenshots: p.screenshots
          ? {
              create: p.screenshots.map((src, idx) => ({ src, order: idx })),
            }
          : undefined,
        tech: {
          create: p.tech.map((name, idx) => ({ name, order: idx })),
        },
        features: p.features
          ? {
              create: p.features.map((text, idx) => ({ text, order: idx })),
            }
          : undefined,
        responsibilities: p.responsibilities
          ? {
              create: p.responsibilities.map((text, idx) => ({
                text,
                order: idx,
              })),
            }
          : undefined,
        highlights: p.highlights
          ? {
              create: p.highlights.map((text, idx) => ({ text, order: idx })),
            }
          : undefined,
      },
    });
    console.log(`  ✓ Project: ${p.title}`);
  }

  // ─── Seed Work Experience ─────────────────────────────────────
  console.log("💼 Seeding Work Experiences...");
  for (let i = 0; i < experiences.length; i++) {
    const exp = experiences[i];
    await prisma.workExperience.create({
      data: {
        title: exp.title,
        company: exp.company,
        period: exp.period,
        description: exp.description,
        order: i,
        tech: exp.tech
          ? {
              create: exp.tech.map((name, idx) => ({ name, order: idx })),
            }
          : undefined,
      },
    });
    console.log(`  ✓ Experience: ${exp.title} @ ${exp.company}`);
  }

  // ─── Seed Credentials ─────────────────────────────────────────
  console.log("🏆 Seeding Credentials...");
  for (let i = 0; i < credentialsData.length; i++) {
    const c = credentialsData[i];
    await prisma.credential.create({
      data: {
        title: c.title,
        slug: c.slug,
        type: c.type,
        issuer: c.issuer,
        date: c.date,
        expiryDate: c.expiryDate ?? null,
        credentialId: c.credentialId ?? null,
        credentialUrl: c.credentialUrl ?? null,
        description: c.description,
        image: c.image,
        order: i,
        skills: {
          create: c.skills.map((name, idx) => ({ name, order: idx })),
        },
      },
    });
    console.log(`  ✓ Credential: ${c.title}`);
  }

  // ─── Seed Tech Stack ──────────────────────────────────────────
  console.log("⚙️  Seeding Tech Stack...");
  const techStack = [
    // Frontend
    { name: "Next.js", icon: "SiNextdotjs", category: "Frontend", level: 90, order: 0 },
    { name: "React", icon: "SiReact", category: "Frontend", level: 88, order: 1 },
    { name: "TypeScript", icon: "SiTypescript", category: "Frontend", level: 80, order: 2 },
    { name: "Tailwind CSS", icon: "SiTailwindcss", category: "Frontend", level: 92, order: 3 },
    { name: "JavaScript", icon: "SiJavascript", category: "Frontend", level: 88, order: 4 },
    // Backend
    { name: "Laravel", icon: "SiLaravel", category: "Backend", level: 85, order: 5 },
    { name: "Node.js", icon: "SiNodedotjs", category: "Backend", level: 75, order: 6 },
    { name: "PHP", icon: "SiPhp", category: "Backend", level: 82, order: 7 },
    // Database
    { name: "MySQL", icon: "SiMysql", category: "Database", level: 80, order: 8 },
    { name: "PostgreSQL", icon: "SiPostgresql", category: "Database", level: 70, order: 9 },
    { name: "Supabase", icon: "SiSupabase", category: "Database", level: 72, order: 10 },
    // Tools
    { name: "Git", icon: "SiGit", category: "Tools", level: 85, order: 11 },
    { name: "Vercel", icon: "SiVercel", category: "Tools", level: 88, order: 12 },
    { name: "Figma", icon: "SiFigma", category: "Tools", level: 75, order: 13 },
  ];

  await prisma.techStackItem.createMany({ data: techStack.map(({ name, icon, category, order }) => ({ name, icon, category, order, experience: "", projects: "" })) });
  console.log(`  ✓ ${techStack.length} tech stack items created`);

  console.log("\n✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
