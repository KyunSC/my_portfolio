"use client";

import { useState } from "react";
import { ArrowUpRight, Search, Github } from "lucide-react";

interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
}

export default function FinanceProjects({ completed, inProgress }: { completed: ProjectData[]; inProgress: ProjectData[] }) {
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");
  const projects = [...completed.map(p => ({ ...p, status: "Shipped" })), ...inProgress.map(p => ({ ...p, status: "In development" }))];
  const filtered = projects.filter(p => (status === "all" || p.status === status) && `${p.title} ${p.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="finance-projects">
      <div className="finance-table-toolbar">
        <div className="finance-filters" aria-label="Filter projects">
          {[["all", "All assets"], ["Shipped", "Shipped"], ["In development", "In development"]].map(([value, label]) => <button key={value} type="button" aria-pressed={status === value} onClick={() => setStatus(value)}>{label}<span>{value === "all" ? projects.length : projects.filter(p => p.status === value).length}</span></button>)}
        </div>
        <label className="finance-search"><Search size={14} /><input aria-label="Search projects or technologies" placeholder="Search assets…" value={query} onChange={e => setQuery(e.target.value)} /></label>
      </div>
      <div className="finance-table-scroll">
        <table>
          <thead><tr><th scope="col">Asset / project</th><th scope="col">Technology</th><th scope="col">Status</th><th scope="col">Research</th></tr></thead>
          <tbody>{filtered.map((project, i) => <tr key={project.title}>
            <td><div className="finance-asset-name"><span className="finance-asset-number">{String(i + 1).padStart(2, "0")}</span><details><summary>{project.title}</summary><p>{project.description}</p></details></div></td>
            <td><div className="finance-tags">{project.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div></td>
            <td><span className={`finance-status ${project.status === "Shipped" ? "is-shipped" : ""}`}><i />{project.status}</span></td>
            <td><div className="finance-project-links">{project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`Source code for ${project.title}`}><Github size={16} /></a>}{project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`}><ArrowUpRight size={18} /></a>}</div></td>
          </tr>)}</tbody>
        </table>
      </div>
      <div className="finance-table-footer" role="status">{filtered.length ? `${filtered.length} assets listed · Select an asset name to read the research` : "No matching projects. Try another search or filter."}<span>SC / PROJECT INDEX</span></div>
    </div>
  );
}
