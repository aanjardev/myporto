import { ArrowUpRight, Clock3, Mail, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import CopyEmailButton from "@/components/CopyEmailButton";
import styles from "./contact.module.css";

export const metadata = {
  title: "Contact Me | Aanjar Portfolio",
  description: "Get in touch with Aanjar for freelance web development, project collaborations, and professional opportunities.",
};

const email = "aanjardev@gmail.com";
const socials = [
  { name: "GitHub", href: "https://github.com/aanjardev", icon: FaGithub },
  { name: "LinkedIn", href: "https://linkedin.com/in/aan-anjar", icon: FaLinkedin },
];

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.pageLabel}><span>CONTACT</span><span aria-hidden="true" /></div>
        <div className={styles.bento}>
          <header className={styles.hero}>
            <ArrowUpRight className={styles.heroArrow} size={40} strokeWidth={1.25} aria-hidden="true" />
            <h1>Let&apos;s<br />talk<span>.</span></h1>
            <div className={styles.artwork} aria-hidden="true">
              <div className={styles.orbitOuter} />
              <div className={styles.orbitInner} />
              <div className={styles.mailEmblem}><Mail size={72} strokeWidth={1} /></div>
              <span className={styles.orbitDot} />
              <span className={styles.artworkCross}>+</span>
            </div>
          </header>

          <section className={styles.emailCard} aria-labelledby="contact-email-heading">
            <div className={styles.cardTopline}><span className={styles.iconBox}><Mail size={21} aria-hidden="true" /></span><h2 id="contact-email-heading">Email me</h2><ArrowUpRight className={styles.cardArrow} size={19} aria-hidden="true" /></div>
            <a href={`mailto:${email}`} className={styles.emailAddress}>{email}</a>
            <div className={styles.actions}>
              <a href={`mailto:${email}`} className="btn-primary">Send an email <Send size={15} aria-hidden="true" /></a>
              <CopyEmailButton email={email} />
            </div>
            <div className={styles.responseNote}><Clock3 size={14} aria-hidden="true" /><span>Usually responds within 24 hours</span></div>
          </section>

          <nav className={styles.socialLinks} aria-label="Social profiles">
            {socials.map(({ name, href, icon: Icon }) => (
              <a key={name} className={styles.socialLink} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name} (opens in a new tab)`}>
                <Icon size={34} className={styles.socialIcon} aria-hidden="true" />
                <span className={styles.socialBottom}><strong>{name}</strong><ArrowUpRight size={23} className={styles.socialArrow} aria-hidden="true" /></span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </main>
  );
}
