"use client";

import { useEffect, useRef } from "react";

export default function ProjectCardDescription({ children }: { children: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const updateLines = () => {
      const lineHeight = Number.parseFloat(getComputedStyle(element).lineHeight);
      const lines = Math.max(1, Math.floor((element.clientHeight + 0.5) / lineHeight));
      element.style.setProperty("--description-lines", String(lines));
    };
    const observer = new ResizeObserver(updateLines);
    observer.observe(element);
    updateLines();
    return () => observer.disconnect();
  }, []);

  return <p ref={ref} className="portfolio-card-description">{children}</p>;
}
