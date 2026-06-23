"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex max-w-[calc(100vw-1.5rem)] items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 backdrop-blur-md transition-shadow md:px-5 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <a href="#" className="font-mono font-bold text-primary text-sm">
        SC
      </a>
      <Separator orientation="vertical" className="h-4" />

      {/* Desktop links */}
      <div className="hidden items-center gap-1 md:flex">
        {NAV_LINKS.map(({ label, href, id }) => (
          <Button
            key={label}
            variant="ghost"
            size="sm"
            asChild
            className={`relative transition-colors ${
              activeSection === id ? "text-primary font-semibold" : ""
            }`}
          >
            <a href={href} className="font-mono text-xs">
              {label}
              {activeSection === id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-2 right-2 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </a>
          </Button>
        ))}
      </div>

      <Separator orientation="vertical" className="hidden h-4 md:block" />
      <ThemeSwitcher />

      {/* Mobile menu toggle */}
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Toggle navigation menu"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
        className="text-muted-foreground hover:text-primary md:hidden"
      >
        {menuOpen ? <X /> : <Menu />}
      </Button>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 flex w-44 origin-top-right flex-col rounded-2xl border border-border bg-background/95 p-1.5 shadow-lg backdrop-blur-md md:hidden"
          >
            {NAV_LINKS.map(({ label, href, id }) => (
              <a
                key={label}
                href={href}
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 font-mono text-sm transition-colors hover:bg-accent",
                  activeSection === id ? "text-primary font-semibold" : "text-foreground"
                )}
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
