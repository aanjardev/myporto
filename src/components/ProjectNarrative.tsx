"use client";
import { useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import type { Project } from "@/types/project";
function TextSection({
  title,
  text,
  accent = false,
}: {
  title: string;
  text?: string | null;
  accent?: boolean;
}) {
  return text ? (
    <section className={accent ? "portfolio-project-outcome" : undefined}>
      <h2>{title}</h2>
      <p>{text}</p>
    </section>
  ) : null;
}
function ListSection({
  title,
  items,
}: {
  title: string;
  items?: string[] | null;
}) {
  return items?.length ? (
    <section>
      <h2>{title}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  ) : null;
}
export default function ProjectNarrative({ project }: { project: Project }) {
  const id = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const tabs: { key: string; label: string; content: ReactNode }[] = [];
  if (
    project.longDescription ||
    project.description ||
    project.goal ||
    project.outcome
  )
    tabs.push({
      key: "overview",
      label: "Overview",
      content: (
        <>
          <TextSection
            title="Overview"
            text={project.longDescription || project.description}
          />
          <TextSection title="Goal" text={project.goal} />
          <TextSection title="Outcome" text={project.outcome} accent />
        </>
      ),
    });
  if (project.challenge || project.solution || project.responsibilities?.length)
    tabs.push({
      key: "process",
      label: "Process",
      content: (
        <>
          {(project.challenge || project.solution) && (
            <div className="portfolio-process-pair">
              <TextSection title="Challenge" text={project.challenge} />
              <TextSection title="Solution" text={project.solution} />
            </div>
          )}
          <ListSection title="What I Did" items={project.responsibilities} />
        </>
      ),
    });
  if (project.features?.length || project.highlights?.length)
    tabs.push({
      key: "features",
      label: "Features",
      content: (
        <div className="portfolio-feature-groups">
          <ListSection title="Features" items={project.features} />
          <ListSection title="Highlights" items={project.highlights} />
        </div>
      ),
    });
  const [selected, setSelected] = useState("overview");
  const active = tabs.find((tab) => tab.key === selected)?.key || tabs[0]?.key;
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    setSelected(tabs[next].key);
    buttons.current[next]?.focus();
  }
  if (!tabs.length) return null;
  return (
    <div className="portfolio-narrative portfolio-project-narrative">
      <div
        role="tablist"
        aria-label="Project details"
        className="portfolio-project-tabs"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            id={`${id}-tab-${tab.key}`}
            role="tab"
            aria-selected={active === tab.key}
            aria-controls={`${id}-panel-${tab.key}`}
            tabIndex={active === tab.key ? 0 : -1}
            onClick={() => setSelected(tab.key)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.key}
          id={`${id}-panel-${tab.key}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${tab.key}`}
          hidden={active !== tab.key}
          tabIndex={0}
          className="portfolio-project-panel"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
