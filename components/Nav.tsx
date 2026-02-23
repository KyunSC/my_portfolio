"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
        {[
          { label: "About", href: "#about" },
          { label: "Skills", href: "#skills" },
          { label: "Projects", href: "#projects" },
          { label: "Contact", href: "#contact" },
        ].map(({ label, href }) => (
          <Button key={label} variant="ghost" size="sm" asChild>
            <a href={href} className="font-mono text-xs">
              {label}
            </a>
          </Button>
        ))}
      </div>
    </nav>
  );
}
