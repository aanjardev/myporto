import { getHeroContent } from "@/lib/db/hero";
import Hero from "./Hero";

// Fallback data jika DB belum terisi
const FALLBACK_HERO = {
  name: "Aan Anjar Setyowati",
  nickname: "Aanjar",
  tagline: "Full Stack Web Developer & Tutor",
  bio: "I build websites for clients and create fun interactive tools that anyone can use for free.",
  availability: "Available for freelance",
  cvUrl: null,
  photos: [
    { src: "/images/profil1.jpg", label: "Casual" },
    { src: "/images/profil2.jpg", label: "Professional" },
    { src: "/images/profil3.jpg", label: "Creative" },
  ],
  stats: [
    { label: "Projects", value: "8+", icon: "Briefcase" },
    { label: "Clients", value: "5+", icon: "Users" },
    { label: "Tech Stack", value: "10+", icon: "Code" },
    { label: "Teaching", value: "Active", icon: "BookOpen" },
  ],
  socials: [
    { label: "GitHub", url: "https://github.com/aanjardev", icon: "SiGithub" },
    { label: "LinkedIn", url: "https://linkedin.com/in/aanjardev", icon: "SiLinkedin" },
  ],
};

export default async function HeroServer() {
  const hero = await getHeroContent();
  return <Hero hero={hero ?? FALLBACK_HERO} />;
}
