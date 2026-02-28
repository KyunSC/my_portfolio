import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroAnimations from "@/components/HeroAnimations";
import LazyTerminalBio from "@/components/LazyTerminalBio";

export default function HeroSection() {
  return (
    <section className="relative mb-24 pt-8">
      <div className="hero-glow" />

      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: server-rendered text with CSS entrance animations */}
        <div>
          <div className="hero-fade-up hero-fade-up-1 flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-mono text-muted-foreground">available for work</span>
          </div>

          <h1 className="hero-fade-up hero-fade-up-2 mb-6 text-5xl font-bold tracking-tight md:text-7xl">
            Sunny Chen
          </h1>

          <p className="hero-fade-up hero-fade-up-3 mb-8 text-xl text-muted-foreground md:text-2xl">
            Software Developer
          </p>

          <p className="hero-fade-up hero-fade-up-3 mb-12 text-lg leading-relaxed text-muted-foreground">
            I like building.
          </p>

          <div className="hero-fade-up hero-fade-up-4">
            <HeroAnimations>
              <Button asChild>
                <a href="#contact">
                  <Mail size={16} />
                  Get in Touch
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#projects">
                  View Projects
                </a>
              </Button>
            </HeroAnimations>
          </div>
        </div>

        {/* Right: lazy terminal — hidden on mobile */}
        <div className="hidden md:block hero-fade-in hero-fade-in-delay">
          <LazyTerminalBio />
        </div>
      </div>
    </section>
  );
}
