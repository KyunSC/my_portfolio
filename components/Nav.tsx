"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const NAV_LINKS = [
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-border bg-background/80 px-5 py-2 backdrop-blur-md transition-shadow ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <span className="font-mono font-bold text-primary text-sm">SC</span>
      <Separator orientation="vertical" className="h-4" />
      <div className="flex items-center gap-1">
        {NAV_LINKS.map(({ label, href, id }) => (
          <Button
            key={label}
            variant="ghost"
            size="sm"
            asChild
            className={
              activeSection === id
                ? "text-primary font-semibold"
                : ""
            }
          >
            <a href={href} className="font-mono text-xs">
              {label}
            </a>
          </Button>
        ))}
      </div>
    </nav>
  );
}
