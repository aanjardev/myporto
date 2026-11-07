const fs = require('fs');
const path = require('path');

const portfolioPath = path.join(__dirname, '..', 'data', 'portfolio.json');
const data = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'));

// Urutan prestisius berdasarkan tingkat kompetisi & dampak (Internasional -> Nasional/HAKI -> Juara 1 Hackathon -> Prestasi Akademik/Funding -> Sertifikasi Industri -> Workshop & Kursus):
const priorityOrderIds = [
  // Tier 1: International Awards & Inventions
  27, // Gold Award — International Innovation & Invention Competition 2026 (IIICe2026, UTHM Malaysia)
  
  // Tier 2: Hak Cipta / Kekayaan Intelektual Resmi Negara (Kemenkumham RI - Dampak nyata UMKM)
  1,  // Hak Cipta - Database Management System for Dinoyo Camera
  2,  // Hak Cipta - Web-Based Integrated Information System
  
  // Tier 3: International Academic Conferences (Presenter IEEE / Internasional)
  3,  // Presenter - 15th International Conference on ICTS 2025
  4,  // Presenter - 9th International Conference on ICEEIE 2025
  
  // Tier 4: Major Hackathons & National Competitions (Juara & Finalis)
  26, // 1st Place — APTIKOMFEST 2026 Hackathon, East Java (LaporPak Conversational AI)
  5,  // Finalist - GEMASTIK 2025 (Smart City Category - Puspresnas / Kemendikbudristek)
  12, // 1st Place - FESMARO 2025 Essay Competition
  16, // Winner - Entrepreneurship Funding Competition (GERAIKITA - Pendanaan Bisnis)
  9,  // 1st Honorable Mention - LKTIEN 2025 (Karya Tulis Ilmiah Nasional)
  10, // 2nd Honorable Mention - IGSC 2025
  17, // Finalist - Techpioneers Innovation Challenge 2024
  13, // 2nd Place - Web Technologies Competition (Kabupaten Malang / LKS)
  18, // Participant - Web Technologies Competition (East Java Province / LKS)

  // Tier 5: Industry & Professional Certifications
  28, // IT Essentials (Cisco Networking Academy - Nilai 95.97%)
  6,  // Certified Data Analyst - Microsoft Excel
  7,  // English Proficiency Test (UKBIng) 2025
  8,  // English Proficiency Test (UKBIng) 2024

  // Tier 6: High Academic & Leadership Achievements
  14, // Top 3 Graduate - Class of 2023
  15, // Teaching Assistant - Web Programming (Universitas Negeri Malang)
  20, // Samsung Solve for Tomorrow 2025 - Design Thinking Workshop
  11, // Master of Ceremony - Guest Lecture on Reinforcement Learning

  // Tier 7: Courses & Foundation Programs
  19, // Perempuan Inovasi 2025 - Basic Course Graduate
  21, // Web Development Pemula - Special Challenge (Gold)
  22, // JavaScript Dasar (Gold)
  23, // CSS Dasar (Gold)
  24, // HTML Dasar (Gold)
  25  // Python with AI - Completion
];

// Update order di tables.credential
data.tables.credential.forEach(c => {
  const newOrder = priorityOrderIds.indexOf(c.id);
  if (newOrder !== -1) {
    c.order = newOrder;
  } else {
    c.order = 999;
  }
});

// Urutkan array credential berdasarkan order
data.tables.credential.sort((a, b) => a.order - b.order);

fs.writeFileSync(portfolioPath, JSON.stringify(data, null, 2), 'utf8');
console.log('portfolio.json reordered successfully!');

