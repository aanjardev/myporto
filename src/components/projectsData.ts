// components/projectsData.ts
import { Project } from "@/types/project";

export const projectsData: Project[] = [
  // Freelance Projects
  {
    id: 1,
    slug: "laundry-management-system",
    title: "Laundry Management System",
    category: "Freelance Project",
    client: "LaundryKilat UMKM",
    description:
      "Sistem manajemen laundry online dengan fitur tracking pesanan, invoice otomatis, dan laporan keuangan.",
    image: "/images/projects/laundry-app.jpg",
    tech: ["Next.js", "TailwindCSS", "Supabase"],
    liveUrl: "https://example.com",
    type: "freelance",
    featured: true,
  },
  {
    id: 2,
    slug: "school-landing-page",
    title: "School Landing Page",
    category: "Freelance Project",
    client: "SDIT Bina Bangsa",
    description:
      "Landing page profesional untuk sekolah dengan formulir pendaftaran online dan galeri kegiatan.",
    image: "/images/projects/school-web.jpg",
    tech: ["React", "TailwindCSS", "EmailJS"],
    liveUrl: "https://example.com",
    type: "freelance",
    featured: true,
  },
  {
    id: 3,
    slug: "e-commerce-dashboard",
    title: "E-Commerce Dashboard",
    category: "Freelance Project",
    client: "Toko Maju Jaya",
    description:
      "Dashboard admin untuk manajemen produk, pesanan, dan laporan penjualan real-time.",
    image: "/images/projects/ecommerce-dashboard.jpg",
    tech: ["Next.js", "TailwindCSS", "Prisma", "PostgreSQL"],
    liveUrl: "https://example.com",
    type: "freelance",
    featured: true,
  },
  // Side Projects
  {
    id: 4,
    slug: "english-test-game",
    title: "English Test Game",
    category: "Side Project",
    description:
      "Game interaktif untuk tes bahasa Inggris dengan timer, skor, dan level kesulitan berbeda.",
    image: "/images/projects/english-game.jpg",
    tech: ["Next.js", "TailwindCSS", "Framer Motion"],
    liveUrl: "https://english-game.vercel.app",
    githubUrl: "https://github.com/aanjardev/english-game",
    type: "side",
    featured: true,
  },
  {
    id: 5,
    slug: "typing-speed-test",
    title: "Typing Speed Test",
    category: "Side Project",
    description:
      "Uji kecepatan mengetik dengan kutipan random, statistik WPM, dan riwayat percobaan.",
    image: "/images/projects/typing-test.jpg",
    tech: ["React", "TailwindCSS", "LocalStorage"],
    liveUrl: "https://typing-test.vercel.app",
    githubUrl: "https://github.com/aanjardev/typing-test",
    type: "side",
    featured: true,
  },
  {
    id: 6,
    slug: "daily-quote-generator",
    title: "Daily Quote Generator",
    category: "Side Project",
    description:
      "Generator kutipan inspiratif harian dengan fitur copy & share ke media sosial.",
    image: "/images/projects/quote-generator.jpg",
    tech: ["Next.js", "TailwindCSS", "API"],
    liveUrl: "https://quote-generator.vercel.app",
    githubUrl: "https://github.com/aanjardev/quote-generator",
    type: "side",
    featured: true,
  },
  // Additional projects for demonstration
  {
    id: 7,
    slug: "portfolio-website",
    title: "Personal Portfolio Website",
    category: "Side Project",
    description:
      "Website portofolio pribadi dengan desain modern dan animasi smooth.",
    image: "/images/projects/portfolio.jpg",
    tech: ["Next.js", "TailwindCSS", "Framer Motion"],
    liveUrl: "https://aanjardev.vercel.app",
    githubUrl: "https://github.com/aanjardev/portfolio",
    type: "side",
  },
  {
    id: 8,
    slug: "restaurant-pos-system",
    title: "Restaurant POS System",
    category: "Freelance Project",
    client: "Warung Makan Padang",
    description:
      "Sistem Point of Sale untuk restoran dengan manajemen menu, pesanan, dan pembayaran.",
    image: "/images/projects/pos-system.jpg",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    liveUrl: "https://example.com",
    type: "freelance",
  },
  {
    id: 9,
    slug: "weather-app",
    title: "Weather App",
    category: "Side Project",
    description:
      "Aplikasi cuaca real-time dengan forecast 7 hari dan lokasi berbasis GPS.",
    image: "/images/projects/weather-app.jpg",
    tech: ["React", "OpenWeather API", "TailwindCSS"],
    liveUrl: "https://weather-app.vercel.app",
    githubUrl: "https://github.com/aanjardev/weather-app",
    type: "side",
  },
  {
    id: 10,
    slug: "task-management-app",
    title: "Task Management App",
    category: "Freelance Project",
    client: "PT. Productivity Plus",
    description:
      "Aplikasi manajemen tugas tim dengan fitur collaboration, deadline tracking, dan reporting.",
    image: "/images/projects/task-app.jpg",
    tech: ["Next.js", "TailwindCSS", "Firebase"],
    liveUrl: "https://example.com",
    type: "freelance",
  },
];
