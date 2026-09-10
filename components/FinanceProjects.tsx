"use client";

import { useState } from "react";
import { ArrowUpRight, Search, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const filters = [
    { value: "all", label: "All projects", count: projects.length },
    { value: "Shipped", label: "Shipped", count: completed.length },
    { value: "In development", label: "In progress", count: inProgress.length },
  ];
  const filtered = projects.filter(p => (status === "all" || p.status === status) && `${p.title} ${p.tags.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="finance-index space-y-6">
      <Tabs value={status} onValueChange={setStatus} className="gap-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <TabsList variant="line" aria-label="Filter projects" className="w-full md:w-auto">
            {filters.map(filter => <TabsTrigger key={filter.value} value={filter.value} className="gap-2 text-xs sm:px-4 sm:text-sm">{filter.label}<span className="text-xs tabular-nums text-muted-foreground">{filter.count}</span></TabsTrigger>)}
          </TabsList>
          <label className="flex h-10 items-center gap-2 rounded-md border border-input bg-card px-3 text-muted-foreground focus-within:ring-2 focus-within:ring-ring md:w-64">
            <Search className="size-4 shrink-0" aria-hidden="true" />
            <input type="search" aria-label="Search projects or technologies" placeholder="Search projects or technology…" value={query} onChange={e => setQuery(e.target.value)} className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />
          </label>
        </div>
        {filters.map(filter => (
          <TabsContent key={filter.value} value={filter.value}>
            <div className="finance-index-entries">
              {filtered.map(project => (
                <Card key={project.title} className="finance-index-entry group min-w-0">
                  <CardHeader className="finance-entry-heading">
                    <div className="finance-entry-meta">
                      <span className="font-mono text-xs text-muted-foreground">SC / {String(projects.findIndex(p => p.title === project.title) + 1).padStart(2, "0")}</span>
                      <Badge variant="outline" className={project.status === "Shipped" ? "border-primary/20 bg-primary/10 text-primary" : "text-muted-foreground"}><span className="size-1.5 rounded-full bg-current" />{project.status}</Badge>
                    </div>
                    <CardTitle><h3 className="finance-entry-title">{project.title}</h3></CardTitle>
                    <CardDescription className="finance-entry-description whitespace-pre-line">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="finance-entry-tags">{project.tags.map(tag => <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>)}</CardContent>
                  <CardFooter className="finance-entry-links">
                    {project.github && <Button asChild variant="ghost" size="sm"><a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`Source code for ${project.title}`}><Github />Source</a></Button>}
                    {project.link && <Button asChild variant="link" size="sm"><a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${project.title}`}>Explore project<ArrowUpRight /></a></Button>}
                    {!project.github && !project.link && <span className="text-xs text-muted-foreground">Project details coming soon</span>}
                  </CardFooter>
                </Card>
              ))}
            </div>
            {!filtered.length && <Card className="items-center py-12 text-center"><Search className="size-6 text-muted-foreground" /><CardHeader><CardTitle>No matching projects</CardTitle><CardDescription>Try a different technology or reset your filters.</CardDescription></CardHeader><Button variant="outline" onClick={() => { setQuery(""); setStatus("all"); }}>Reset filters</Button></Card>}
          </TabsContent>
        ))}
      </Tabs>
      <p role="status" className="font-mono text-xs text-muted-foreground">Showing {filtered.length} of {projects.length} projects</p>
    </div>
  );
}
