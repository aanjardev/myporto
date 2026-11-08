import { Building2, CalendarDays } from "lucide-react";
import type { Experience } from "@/data/workExperienceData";
import styles from "@/app/work/work.module.css";

export default function WorkExperience({ experiences }: { experiences: Experience[] }) {
  if (!experiences.length) return <p className={styles.empty}>No experience listed yet.</p>;

  return (
    <ol className={styles.experiences} aria-label="Work experience">
      {experiences.map((experience, index) => {
        const current = /\b(present|current)\b/i.test(experience.period);
        return (
          <li key={`${experience.title}-${experience.company}-${experience.period}`}>
            <article className={`${styles.card}${current ? ` ${styles.current}` : ""}`}>
              <div className={styles.topline}>
                <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <p className={styles.date}><CalendarDays size={13} aria-hidden="true" />{experience.period}</p>
                {current && <span className={styles.badge}>Current</span>}
              </div>
              <h2>{experience.title}</h2>
              <p className={styles.company}><Building2 size={14} aria-hidden="true" />{experience.company}</p>
              <p className={styles.description}>{experience.description}</p>
              {!!experience.tech?.length && (
                <div className={styles.skills} aria-label="Skills and tools">
                  {experience.tech.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              )}
            </article>
          </li>
        );
      })}
    </ol>
  );
}
