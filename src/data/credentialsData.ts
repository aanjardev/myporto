// components/credentialsData.ts
import { Credential } from "@/types/credential";

export const credentialsData: Credential[] = [
  // Certifications
  {
    id: 1,
    slug: "aws-certified-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    type: "certification",
    description:
      "Fundamental knowledge of AWS Cloud concepts, services, and terminology. Validated ability to define AWS Cloud, its global infrastructure, and basic architectural principles.",
    image: "/images/credentials/aws-certified-cloud-practitioner.jpg",
    date: "2024-03-15",
    expiryDate: "2027-03-15",
    credentialId: "AWS-CP-123456789",
    credentialUrl: "https://aws.amazon.com/verification",
    skills: ["AWS", "Cloud Computing", "Cloud Architecture"],
    featured: true,
  },
  {
    id: 2,
    slug: "google-data-analytics-certificate",
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    type: "certification",
    description:
      "Comprehensive program covering data analysis fundamentals, SQL, Tableau, and R programming. Completed capstone project analyzing real-world datasets.",
    image: "/images/credentials/google-data-analytics.jpg",
    date: "2024-01-20",
    credentialId: "GDA-987654321",
    credentialUrl: "https://coursera.org/verify/professional-cert/GDA123",
    skills: ["Data Analysis", "SQL", "Tableau", "R", "Statistics"],
    featured: true,
  },
  {
    id: 3,
    slug: "react-developer-certification",
    title: "React Developer Certification",
    issuer: "Meta (Facebook)",
    type: "certification",
    description:
      "Advanced React development skills including hooks, context API, performance optimization, and modern React patterns.",
    image: "/images/credentials/react-certification.jpg",
    date: "2023-11-10",
    expiryDate: "2026-11-10",
    credentialId: "META-REACT-456789",
    credentialUrl: "https://developers.facebook.com/certification",
    skills: ["React", "JavaScript", "Hooks", "Context API", "Performance"],
    featured: true,
  },

  // Awards & Achievements
  {
    id: 4,
    slug: "hackathon-winner-2024",
    title: "National Hackathon Winner 2024",
    issuer: "Ministry of Education Indonesia",
    type: "award",
    description:
      "First place winner in National Student Hackathon 2024. Developed an AI-powered educational platform for remote learning during pandemic.",
    image: "/images/credentials/hackathon-winner.jpg",
    date: "2024-05-15",
    skills: ["React", "Node.js", "AI/ML", "Team Leadership"],
    featured: true,
  },
  {
    id: 5,
    slug: "best-student-award",
    title: "Best Student Award 2023",
    issuer: "University of Indonesia",
    type: "achievement",
    description:
      "Recognized for outstanding academic performance and contributions to university projects. Maintained GPA above 3.8 throughout the program.",
    image: "/images/credentials/best-student.jpg",
    date: "2023-12-20",
    skills: ["Academic Excellence", "Leadership", "Project Management"],
  },
  {
    id: 6,
    slug: "open-source-contributor",
    title: "Top Open Source Contributor",
    issuer: "GitHub",
    type: "achievement",
    description:
      "Recognized as top contributor to open source projects in Indonesia. Contributed to 50+ repositories with significant impact on the developer community.",
    image: "/images/credentials/open-source.jpg",
    date: "2024-02-28",
    skills: ["Open Source", "Git", "Community Building", "JavaScript"],
  },

  // Competitions
  {
    id: 7,
    slug: "indonesia-ai-challenge",
    title: "Indonesia AI Challenge 2024",
    issuer: "Ministry of Communication and Information",
    type: "competition",
    description:
      "Finalist in national AI competition. Developed machine learning model for predicting traffic congestion using computer vision and IoT data.",
    image: "/images/credentials/ai-challenge.jpg",
    date: "2024-04-10",
    skills: ["Machine Learning", "Computer Vision", "Python", "IoT"],
  },
  {
    id: 8,
    slug: "web-development-competition",
    title: "Inter-University Web Development Competition",
    issuer: "Bandung Institute of Technology",
    type: "competition",
    description:
      "Second place in inter-university web development competition. Built a comprehensive e-commerce platform with modern UI/UX and secure payment integration.",
    image: "/images/credentials/web-competition.jpg",
    date: "2023-09-25",
    skills: [
      "Full-Stack Development",
      "UI/UX",
      "Payment Integration",
      "Security",
    ],
  },

  // Courses & Licenses
  {
    id: 9,
    slug: "cs50-computer-science",
    title: "CS50: Introduction to Computer Science",
    issuer: "Harvard University",
    type: "course",
    description:
      "Comprehensive introduction to computer science and programming. Covered algorithms, data structures, software engineering, and web development.",
    image: "/images/credentials/cs50.jpg",
    date: "2023-08-15",
    credentialId: "CS50-789456123",
    credentialUrl: "https://cs50.harvard.edu/college/2023/spring/",
    skills: ["Algorithms", "Data Structures", "C", "Python", "Web Development"],
  },
  {
    id: 10,
    slug: "microsoft-certified-azure-fundamentals",
    title: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    type: "certification",
    description:
      "Fundamental knowledge of cloud services and Microsoft Azure platform. Understanding of cloud concepts, Azure services, and Azure management tools.",
    image: "/images/credentials/azure-fundamentals.jpg",
    date: "2024-06-01",
    expiryDate: "2027-06-01",
    credentialId: "AZ-900-321654987",
    credentialUrl:
      "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
    skills: ["Azure", "Cloud Computing", "Microsoft Technologies"],
  },
  {
    id: 11,
    slug: "responsive-web-design",
    title: "Responsive Web Design Certification",
    issuer: "freeCodeCamp",
    type: "certification",
    description:
      "Comprehensive certification covering HTML, CSS, and responsive design principles. Built multiple projects including tribute pages and product landing pages.",
    image: "/images/credentials/freecodecamp-responsive.jpg",
    date: "2023-06-30",
    credentialId: "FCC-RWD-654321987",
    credentialUrl:
      "https://freecodecamp.org/certification/aanjardev/responsive-web-design",
    skills: ["HTML", "CSS", "Responsive Design", "Flexbox", "Grid"],
  },
  {
    id: 12,
    slug: "javascript-algorithms-data-structures",
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    type: "certification",
    description:
      "Advanced JavaScript certification covering algorithms, data structures, and object-oriented programming. Completed 300+ coding challenges and 5 major projects.",
    image: "/images/credentials/freecodecamp-js.jpg",
    date: "2023-10-15",
    credentialId: "FCC-JS-987123456",
    credentialUrl:
      "https://freecodecamp.org/certification/aanjardev/javascript-algorithms-and-data-structures",
    skills: [
      "JavaScript",
      "Algorithms",
      "Data Structures",
      "OOP",
      "Functional Programming",
    ],
  },
];
