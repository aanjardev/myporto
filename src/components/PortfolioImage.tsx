"use client";
import Image from "next/image";
import { useState } from "react";
export function PortfolioImage({
  src,
  alt,
  contain = false,
  eager = false,
}: {
  src: string;
  alt: string;
  contain?: boolean;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return failed || !src ? (
    <div className="portfolio-image-fallback">Preview unavailable</div>
  ) : (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
      loading={eager ? "eager" : "lazy"}
      className={contain ? "portfolio-image-contain" : "portfolio-image-cover"}
      onError={() => setFailed(true)}
    />
  );
}
