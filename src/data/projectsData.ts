import { Project } from "@/types/project";

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Laundry Management System",
    slug: "laundry-management-system",
    category: "Freelance Project",
    client: "LaundryKilat UMKM",
    type: "freelance",
    period: "2024",
    description:
      "Sistem manajemen laundry online dengan fitur tracking pesanan, invoice otomatis, dan laporan keuangan.",
    longDescription:
      "A comprehensive laundry management system designed for small to medium laundry businesses. The system allows customers to track their laundry orders in real-time, receive automatic invoices, and view detailed reports. Administrators can manage orders, track payments, and generate business insights.",
    image: "/images/projects/laundry-app.jpg",
    tech: ["Next.js", "TailwindCSS", "Supabase", "TypeScript"],
    liveUrl: "https://example.com",
    features: [
      "Real-time order tracking",
      "Automatic invoice generation",
      "Payment management system",
      "Admin dashboard with analytics",
      "Customer history and loyalty points",
    ],
    screenshots: [
      "/images/projects/laundry-app.jpg",
      "/images/projects/laundry-app-2.jpg",
    ],
  },
  {
    id: 2,
    title: "School Landing Page",
    slug: "school-landing-page",
    category: "Freelance Project",
    client: "SDIT Bina Bangsa",
    type: "freelance",
    period: "2024",
    description:
      "Landing page profesional untuk sekolah dengan formulir pendaftaran online dan galeri kegiatan.",
    longDescription:
      "A professional landing page for an elementary school. Features include online registration forms, photo gallery, school profile, and contact information. The design is colorful and engaging to attract parents and students.",
    image: "/images/projects/school-web.jpg",
    tech: ["React", "TailwindCSS", "EmailJS"],
    liveUrl: "https://example.com",
    features: [
      "Online registration form",
      "Photo gallery",
      "School profile and vision-mission",
      "Contact form with email integration",
      "Mobile responsive design",
    ],
  },
  {
    id: 3,
    title: "E-Commerce Dashboard",
    slug: "ecommerce-dashboard",
    category: "Freelance Project",
    client: "Toko Maju Jaya",
    type: "freelance",
    period: "2024",
    description:
      "Dashboard admin untuk manajemen produk, pesanan, dan laporan penjualan real-time.",
    longDescription:
      "An admin dashboard for managing an e-commerce store. Includes product management, order tracking, sales analytics, and user management. Built with modern technologies for optimal performance.",
    image: "/images/projects/ecommerce-dashboard.jpg",
    tech: ["Next.js", "TailwindCSS", "Prisma", "PostgreSQL"],
    liveUrl: "https://example.com",
  },
  {
    id: 4,
    title: "English Test Game",
    slug: "english-test-game",
    category: "Side Project",
    type: "side",
    period: "2024",
    description:
      "Game interaktif untuk tes bahasa Inggris dengan timer, skor, dan level kesulitan berbeda.",
    longDescription:
      "An interactive English test game that helps users practice their English skills. Features include multiple difficulty levels, timed questions, score tracking, and detailed results. Perfect for students looking to improve their vocabulary and grammar.",
    image: "/images/projects/english-game.jpg",
    tech: ["Next.js", "TailwindCSS", "Framer Motion"],
    liveUrl: "https://english-game.vercel.app",
    githubUrl: "https://github.com/aanjardev/english-game",
    features: [
      "3 difficulty levels",
      "Timed questions (15 seconds each)",
      "Score tracking and history",
      "Detailed answer review",
      "Responsive design",
    ],
  },
  {
    id: 5,
    title: "Typing Speed Test",
    slug: "typing-speed-test",
    category: "Side Project",
    type: "side",
    period: "2024",
    description:
      "Uji kecepatan mengetik dengan kutipan random, statistik WPM, dan riwayat percobaan.",
    longDescription:
      "A typing speed test application that measures how fast and accurately you can type. Users get random quotes to type, and the app calculates WPM (words per minute) and accuracy percentage. Past results are saved for progress tracking.",
    image: "/images/projects/typing-test.jpg",
    tech: ["React", "TailwindCSS", "LocalStorage"],
    liveUrl: "https://typing-test.vercel.app",
    githubUrl: "https://github.com/aanjardev/typing-test",
  },
  {
    id: 6,
    title: "Daily Quote Generator",
    slug: "daily-quote-generator",
    category: "Side Project",
    type: "side",
    period: "2024",
    description:
      "Generator kutipan inspiratif harian dengan fitur copy & share ke media sosial.",
    longDescription:
      "A simple but elegant quote generator that displays inspirational quotes. Users can generate random quotes, copy them to clipboard, and share on social media. Perfect for daily motivation.",
    image: "/images/projects/quote-generator.jpg",
    tech: ["Next.js", "TailwindCSS", "API"],
    liveUrl: "https://quote-generator.vercel.app",
    githubUrl: "https://github.com/aanjardev/quote-generator",
  },
];
