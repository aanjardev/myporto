import HeroServer from "@/components/HeroServer";
import TechStackServer from "@/components/TechStackServer";
import PortfolioPreviewServer from "@/components/PortfolioPreviewServer";
import AchievementServer from "@/components/AchievementServer";
import WorkExperienceSummary from "@/components/WorkExperienceSummary";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-white">
      <HeroServer />
      <WorkExperienceSummary />
      <section id="portfolio">
        <PortfolioPreviewServer />
      </section>
      <section id="achievements">
        <AchievementServer />
      </section>
      <section id="tech">
        <TechStackServer />
      </section>
      <section id="contact-section">
        <Contact />
      </section>
    </main>
  );
}
