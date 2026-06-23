import dynamic from "next/dynamic";
import { Code2, Globe, Briefcase, Trophy, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import SectionHeading from "@/components/SectionHeading";
import MotionSection from "@/components/MotionSection";
import HeroSection from "@/components/HeroSection";
import StatCard from "@/components/StatCard";
import SkillIcon from "@/components/SkillIcon";
import ExperienceTerminal from "@/components/ExperienceTerminal";
import F1Car from "@/components/F1Car";
import { COMPLETED_PROJECTS, IN_PROGRESS_PROJECTS, SKILL_CATEGORIES, EXPERIENCES } from "@/lib/data";

const ProjectTabs = dynamic(() => import("@/components/ProjectTabs"));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://chensunny.com/#person",
      name: "Sunny Chen",
      url: "https://chensunny.com",
      image: "https://chensunny.com/opengraph-image",
      email: "mailto:exsunnychen2006@gmail.com",
      jobTitle: "Software Developer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Montreal",
        addressCountry: "CA",
      },
      sameAs: [
        "https://github.com/KyunSC",
        "https://www.linkedin.com/in/sunny-chen-software/",
      ],
      knowsAbout: ["React", "Next.js", "TypeScript", "Angular", "Python", "Java", "C#", ".NET", "Docker"],
    },
    {
      "@type": "WebSite",
      "@id": "https://chensunny.com/#website",
      url: "https://chensunny.com",
      name: "Sunny Chen — Software Developer in Montreal",
      publisher: { "@id": "https://chensunny.com/#person" },
      inLanguage: "en-US",
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24">

        <HeroSection />

        {/* About Section */}
        <section id="about" className="mb-24">
          <div>
            <SectionHeading prefix="About" highlight="Me" showSeparator />
            <div className="space-y-4 text-foreground mb-8">
              <p className="leading-relaxed">
                I&apos;m a software developer in Montreal with 5+ years of building, from web apps in
                React, Next.js, and TypeScript to backend services in Python, Java, and C#/.NET. I care about
                shipping things that hold up under real use, not just things that work.
              </p>
              <p className="leading-relaxed">
                Most of what I build comes out of whatever I&apos;m into. Finance got me to ship the Azure Live
                Market Data App, a serverless API for real-time stock data; F1 has me deep in a race prediction
                model with machine learning; and at my Loriginal internship I worked full-stack, shipping a RAG-powered
                feature and an AR experience. Half my projects start as &ldquo;I wonder if I could build that.&rdquo;
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <MotionSection delay={0}>
              <StatCard value="10+" label="Projects Shipped" icon={<Briefcase size={20} />} />
            </MotionSection>
            <MotionSection delay={100}>
              <StatCard value="1st" label="Game Jam 2024" icon={<Trophy size={20} />} />
            </MotionSection>
            <MotionSection delay={200}>
              <StatCard value="4+" label="Languages" icon={<Code2 size={20} />} />
            </MotionSection>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-24">
          <MotionSection>
            <SectionHeading prefix="Work" highlight="Experience" showSeparator />
          </MotionSection>
          <div className="f1-swap">
            <div className="f1-terminal">
              <ExperienceTerminal experiences={EXPERIENCES} />
            </div>
            <F1Car className="f1-car-view" />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-24">
          <MotionSection>
            <SectionHeading prefix="My" highlight="Projects" showSeparator />
          </MotionSection>
          <MotionSection>
            <ProjectTabs completed={COMPLETED_PROJECTS} inProgress={IN_PROGRESS_PROJECTS} />
          </MotionSection>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-24">
          <MotionSection>
            <SectionHeading prefix="Skills &amp;" highlight="Technologies" showSeparator />
          </MotionSection>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SKILL_CATEGORIES.map(({ label, icon, animation, skills }, i) => (
              <MotionSection key={label} delay={i * 100} animation={animation}>
                <Card className="border-l-4 border-l-primary transition-all hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {icon}{label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-x-5 gap-y-4">
                      {skills.map(({ icon: skillIcon, label: skillLabel }) => (
                        <SkillIcon key={skillLabel} icon={skillIcon} label={skillLabel} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </MotionSection>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-24">
          <MotionSection>
            <SectionHeading prefix="Let&apos;s" highlight="Connect" showSeparator />
          </MotionSection>
          <MotionSection delay={100}>
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 p-6 md:p-10">
              <CardContent className="p-0">
                <p className="mb-6 text-lg text-muted-foreground">
                  I&apos;m always open to discussing new projects, opportunities, or just having a chat about technology.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" asChild>
                        <a href="mailto:exsunnychen2006@gmail.com">
                          <Mail size={16} />
                          Email
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>exsunnychen2006@gmail.com</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" asChild>
                        <a href="https://github.com/KyunSC" target="_blank" rel="noopener noreferrer">
                          <Code2 size={16} />
                          GitHub
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>@KyunSC</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" asChild>
                        <a href="https://www.linkedin.com/in/sunny-chen-software/" target="_blank" rel="noopener noreferrer">
                          <Globe size={16} />
                          LinkedIn
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>@sunny-chen-software</TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </MotionSection>
        </section>

        {/* Footer */}
        <MotionSection animation="fade-in">
          <footer className="pt-8">
            <Separator className="mb-8" />
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>&copy; 2026 Sunny Chen. All rights reserved.</p>
              <p className="font-mono text-xs">Built with Next.js + shadcn/ui</p>
            </div>
          </footer>
        </MotionSection>

      </main>
    </div>
  );
}
