import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import PortfolioPreview from "@/components/PortfolioPreview";
import Achievement from "@/components/Achievement";
import WorkExperienceSummary from "@/components/WorkExperienceSummary";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
      <WorkExperienceSummary />
      <section id="portfolio">
        <PortfolioPreview />
      </section>
      <section id="achievements">
        <Achievement />
      </section>
      <section id="tech">
        <TechStack />
      </section>
      <section id="contact-section">
        <Contact />
      </section>
    </main>
  );
}
