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
import { COMPLETED_PROJECTS, IN_PROGRESS_PROJECTS, SKILL_CATEGORIES } from "@/lib/data";

const ProjectTabs = dynamic(() => import("@/components/ProjectTabs"));

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">

        <HeroSection />

        {/* About Section */}
        <section id="about" className="mb-24">
          <div>
            <SectionHeading prefix="About" highlight="Me" showSeparator />
            <div className="space-y-4 text-muted-foreground mb-8">
              <p className="leading-relaxed">
                I&apos;m a passionate developer with expertise in modern technologies. I love turning ideas
                into reality through code and constantly learning new technologies to stay at the forefront
                of software development.
              </p>
              <p className="leading-relaxed">
                When I&apos;m not coding, you can find me exploring new frameworks and tools.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <MotionSection delay={0}>
              <StatCard value="5+" label="Projects Shipped" icon={<Briefcase size={20} />} />
            </MotionSection>
            <MotionSection delay={100}>
              <StatCard value="1st" label="Game Jam 2024" icon={<Trophy size={20} />} />
            </MotionSection>
            <MotionSection delay={200}>
              <StatCard value="4+" label="Languages" icon={<Code2 size={20} />} />
            </MotionSection>
          </div>
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

        {/* Projects Section */}
        <section id="projects" className="mb-24">
          <MotionSection>
            <SectionHeading prefix="My" highlight="Projects" showSeparator />
          </MotionSection>
          <MotionSection>
            <ProjectTabs completed={COMPLETED_PROJECTS} inProgress={IN_PROGRESS_PROJECTS} />
          </MotionSection>
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
