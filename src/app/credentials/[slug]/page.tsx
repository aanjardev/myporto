import { notFound } from "next/navigation";
import Link from "next/link";
import { credentialsData } from "@/data/credentialsData";
import {
  PortfolioBadge,
  PortfolioImage,
  PortfolioTags,
  credentialTypeLabel,
} from "@/components/PortfolioUI";
// Generate static params for all credentials
export async function generateStaticParams() {
  return credentialsData.map((credential) => ({
    slug: credential.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const credential = credentialsData.find((c) => c.slug === slug);

  if (!credential) {
    return {
      title: "Credential Not Found",
    };
  }

  return {
    title: `${credential.title} | Aanjar Portfolio`,
    description: credential.description,
  };
}

export default async function CredentialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const credential = credentialsData.find((c) => c.slug === slug);
  if (!credential) notFound();
  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  const expired = credential.expiryDate
    ? new Date(credential.expiryDate) < new Date()
    : false;
  return (
    <main className="portfolio-detail">
      <header className="portfolio-detail-header">
        <div className="portfolio-container">
          <div className="portfolio-detail-topline">
          <Link className="portfolio-back interaction-link" href="/credentials">
            &larr; Back to Credentials
          </Link>
          <PortfolioBadge>
            {credentialTypeLabel(credential.type)}
          </PortfolioBadge>
          </div>
          <h1>{credential.title}</h1>
          <p>{credential.issuer}</p>
        </div>
      </header>
      <div className="portfolio-container portfolio-detail-body">
        <div className="portfolio-detail-grid portfolio-credential-grid">
          <div>
            <a
              className="portfolio-certificate-preview"
              href={credential.image}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View certificate: ${credential.title}`}
            >
              <PortfolioImage
                src={credential.image}
                alt={credential.title}
                contain
                eager
              />
            </a>

          </div>
          <aside className="portfolio-info">
            <h2>Credential information</h2>
            <dl>
              <div>
                <dt>Issuer</dt>
                <dd>{credential.issuer}</dd>
              </div>
              <div>
                <dt>Issued date</dt>
                <dd>{formatDate(credential.date)}</dd>
              </div>
              {credential.expiryDate && (
                <>
                  <div>
                    <dt>Status</dt>
                    <dd>
                      <PortfolioBadge>
                        {expired ? "Expired" : "Active"}
                      </PortfolioBadge>
                    </dd>
                  </div>
                  <div>
                    <dt>Expiry date</dt>
                    <dd>{formatDate(credential.expiryDate)}</dd>
                  </div>
                </>
              )}
              {credential.credentialId && (
                <div>
                  <dt>Credential ID</dt>
                  <dd className="portfolio-mono">{credential.credentialId}</dd>
                </div>
              )}
            </dl>
            <div className="portfolio-actions">
              <a className="portfolio-button" href={credential.image} target="_blank" rel="noopener noreferrer">
                View certificate &#8599;
              </a>
              {credential.credentialUrl && (
                <a className="portfolio-button portfolio-button-secondary" href={credential.credentialUrl} target="_blank" rel="noopener noreferrer">
                  Verify Credential &#8599;
                </a>
              )}
            </div>
          </aside>
        </div>
        <div className="portfolio-narrative portfolio-credential-description">
          <section>
            <h2>About this credential</h2>
            <p>{credential.description}</p>
          </section>
          {credential.skills.length > 0 && (
            <section>
              <h2>Skills & Competencies</h2>
              <PortfolioTags tags={credential.skills} />
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
