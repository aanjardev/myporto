import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Credential } from "@/types/credential";
import {
  PortfolioBadge,
  PortfolioImage,
  credentialTypeLabel,
} from "./PortfolioUI";
export default function CredentialCard({
  credential,
}: {
  credential: Credential;
}) {
  const expired = credential.expiryDate
    ? new Date(credential.expiryDate) < new Date()
    : false;
  return (
    <article className="portfolio-card portfolio-card-compact">
      <Link
        href={`/credentials/${credential.slug}`}
        className="portfolio-card-image portfolio-certificate"
        aria-label={`View ${credential.title}`}
      >
        <PortfolioImage src={credential.image} alt={credential.title} />
        <span className="portfolio-card-overlay">
          <PortfolioBadge>
            {credentialTypeLabel(credential.type)}
          </PortfolioBadge>
        </span>
        {credential.expiryDate && (
          <span className="portfolio-card-overlay portfolio-card-status">
            <PortfolioBadge>{expired ? "Expired" : "Active"}</PortfolioBadge>
          </span>
        )}
      </Link>
      <div className="portfolio-card-body">
        <div className="portfolio-credential-meta">
          <p className="portfolio-card-meta" title={credential.issuer}>
            {credential.issuer}
          </p>
        </div>
        <h3>
          <Link href={`/credentials/${credential.slug}`}>
            {credential.title}
          </Link>
        </h3>
        <footer className="portfolio-card-footer">
          <Link href={`/credentials/${credential.slug}`}>
            View details{" "}
            <span className="interaction-arrow" aria-hidden="true">
              &rarr;
            </span>
          </Link>
          <div className="portfolio-credential-footer-meta">
            <time dateTime={credential.date}>
              {new Date(credential.date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
                timeZone: "UTC",
              })}
            </time>
            {credential.credentialUrl && (
              <a
                className="interaction-icon"
                href={credential.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify credential: ${credential.title}`}
                title="Verify credential"
              >
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            )}
          </div>
        </footer>
      </div>
    </article>
  );
}
