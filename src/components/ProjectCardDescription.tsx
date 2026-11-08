"use client";

import { useEffect, useRef } from "react";

export default function ProjectCardDescription({ children }: { children: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = ref.current;
    const text = textRef.current;
    if (!element || !text) return;
    const updateLines = () => {
      const lineHeight = Number.parseFloat(getComputedStyle(text).lineHeight);
      const lines = Math.max(1, Math.floor(element.clientHeight / lineHeight));
      element.style.setProperty("--description-lines", String(lines));
    };
    const observer = new ResizeObserver(updateLines);
    observer.observe(element);
    updateLines();
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="portfolio-card-description-slot">
      <p ref={textRef} className="portfolio-card-description">{children}</p>
    </div>
  );
}
