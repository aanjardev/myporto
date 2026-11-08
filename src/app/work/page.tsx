import { BriefcaseBusiness } from "lucide-react";
import WorkExperience from "@/components/WorkExperience";
import { getAllExperiences } from "@/lib/db/experiences";
import styles from "./work.module.css";

export const metadata = {
  title: "Work Experience | Aanjar Portfolio",
  description: "Professional experience including work, internships, freelance, and tutoring.",
};

export default async function WorkPage() {
  const experiences = await getAllExperiences();
  const ongoing = experiences.filter((experience) => /\b(present|current)\b/i.test(experience.period)).length;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.pageLabel}><span>WORK</span><span aria-hidden="true" /></div>
        <div className={styles.layout}>
          <div className={styles.overview}>
            <header className={styles.hero}>
              <h1><span>Work</span>experience<span className={styles.period}>.</span></h1>
              <div className={styles.artwork} aria-hidden="true">
                <div className={styles.orbitOuter} />
                <div className={styles.orbitInner} />
                <div className={styles.emblem}><BriefcaseBusiness size={64} strokeWidth={1} /></div>
                <span className={styles.orbitDot} />
                <span className={styles.artworkCross}>+</span>
              </div>
            </header>
            <dl className={styles.stats}>
              <div><dt>Experiences</dt><dd>{String(experiences.length).padStart(2, "0")}</dd></div>
              <div><dt>Current roles</dt><dd>{String(ongoing).padStart(2, "0")}</dd></div>
            </dl>
          </div>
          <WorkExperience experiences={experiences} />
        </div>
      </div>
    </main>
  );
}
