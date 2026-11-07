export { PortfolioImage } from "./PortfolioImage";
import type { ReactNode } from "react";
export function PortfolioBadge({ children }: { children: ReactNode }) {
  return <span className="portfolio-badge">{children}</span>;
}
export const projectTypeLabel = (type: string) =>
  ({
    freelance: "Client Project",
    side: "Side Project",
    social: "Social Impact",
  })[type] || "Project";
export const credentialTypeLabel = (type: string) =>
  type.charAt(0).toUpperCase() + type.slice(1);
export function PortfolioTags({
  tags,
  limit = tags.length,
}: {
  tags: string[];
  limit?: number;
}) {
  return (
    <div className="portfolio-tags">
      {tags.slice(0, limit).map((tag) => (
        <PortfolioBadge key={tag}>{tag}</PortfolioBadge>
      ))}
      {tags.length > limit && (
        <PortfolioBadge>+{tags.length - limit}</PortfolioBadge>
      )}
    </div>
  );
}
