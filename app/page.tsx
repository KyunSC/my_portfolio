import dynamic from "next/dynamic";
import { Code2, Globe, Briefcase, Trophy, Mail, ArrowUpRight, ArrowDown } from "lucide-react";
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
import { COMPLETED_PROJECTS, IN_PROGRESS_PROJECTS, SKILL_CATEGORIES, EXPERIENCES } from "@/lib/data";

const FinanceProjects = dynamic(() => import("@/components/FinanceProjects"));

const CareerCircuit = dynamic(() => import("@/components/CareerCircuit"));

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
      <main className="portfolio-main mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24">

        <div className="standard-view"><HeroSection /></div>
        <section className="finance-only finance-hero" aria-label="Finance portfolio overview">
          <div className="finance-masthead"><span>THE PERSONAL PORTFOLIO OF A SOFTWARE DEVELOPER</span><span>MONTRÉAL, QUÉBEC · EST. 2006</span></div>
          <div className="finance-nameplate"><h1>Sunny Chen<span>& Co.</span></h1><div>Independent thinking.<br />Compounding curiosity.</div></div>
          <div className="finance-edition"><span>SOFTWARE, SYSTEMS & THE OCCASIONAL MARKET OBSESSION</span><span>PERSONAL EDITION / NO. 01</span></div>
          <div className="finance-hero-grid">
            <div className="finance-intro">
              <p className="finance-eyebrow">A NOTE FROM THE DEVELOPER</p>
              <h2>Good things<br />take <em>building.</em></h2>
              <p className="finance-intro-copy">I’m Sunny, a developer in Montréal. I follow my curiosity into software, markets, and the systems that connect them.</p>
              <p className="finance-intro-copy">This is a collection of what I’ve built, what I’m learning, and where I’m headed next.</p>
              <div className="finance-actions"><Button asChild variant="link" className="px-0"><a href="#projects">Read the project index <ArrowUpRight size={17} /></a></Button></div>
              <div className="finance-signature" aria-hidden="true">Sunny.</div>
            </div>
            <figure className="finance-cover">
              <div className="finance-cover-label"><span>FIELD NOTES</span><span>001 / MARKET DATA</span></div>
              <div className="finance-engraving" aria-hidden="true">
                <svg viewBox="0 0 520 360" fill="none">
                  <defs><pattern id="finance-hatch" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0 5L5 0" stroke="currentColor" strokeWidth=".6" /></pattern></defs>
                  {[0,1,2,3,4,5].map(i => <g key={i} transform={`translate(${50+i*65} ${258-i*29})`}><path d="M0 0L28 -16L56 0L28 16Z" fill="var(--background)" stroke="currentColor"/><path d={`M0 0V${60+i*13}L28 ${76+i*13}V16Z`} fill="url(#finance-hatch)" stroke="currentColor"/><path d={`M28 16L56 0V${60+i*13}L28 ${76+i*13}Z`} fill="var(--background)" stroke="currentColor"/></g>)}
                  <path d="M38 213L446 31M434 31H446V43" stroke="currentColor" strokeWidth="1.3"/>
                  <circle cx="446" cy="31" r="20" stroke="currentColor" strokeDasharray="2 4"/>
                </svg>
              </div>
              <figcaption><span className="finance-eyebrow">ON TURNING CURIOSITY INTO CODE</span><h2>A closer look<br />at the markets.</h2><p>A serverless experiment in making stock data useful. Built with Python and Azure Functions.</p><Button asChild variant="link" className="px-0"><a href={COMPLETED_PROJECTS[0].link} target="_blank" rel="noopener noreferrer">Inside the project <ArrowUpRight size={16} /></a></Button></figcaption>
            </figure>
            <aside className="finance-margin-notes"><span className="finance-eyebrow">AT A GLANCE</span><div><b>01</b><p>Software developer<br />Based in Montréal</p></div><div><b>02</b><p>Full-stack systems<br />From API to interface</p></div><div><b>03</b><p>Always curious<br />Currently building</p></div><a href="#contact">Let’s talk <ArrowUpRight size={14} /></a></aside>
          </div>
          <a className="finance-scroll" href="#about"><ArrowDown size={14} /> SCROLL TO THE FUNDAMENTALS <span>CODE / CURIOSITY / CRAFT</span></a>
        </section>

        {/* About Section */}
        <section id="about" className="mb-24">
          <div>
            <div className="finance-only finance-section-kicker">01 / A LITTLE CONTEXT</div>
            <SectionHeading prefix="About" highlight="Me" showSeparator />
            <div className="space-y-4 text-foreground mb-8">
              <p className="leading-relaxed">
                I&apos;m a software developer in Montreal with 5+ years of building, from web apps in
                React, Next.js, and TypeScript to backend services in Python, Java, and C#/.NET. I care about
                shipping things that hold up under real use, not just things that work.
              </p>
              <p className="leading-relaxed">
                Most of what I build comes out of whatever I&apos;m into &mdash; finance led to the Azure Live
                Market Data App (a serverless API for real-time stock data), F1 has me deep in an ML race-prediction
                model, and my Loriginal internship had me full-stack on a RAG-powered feature and an AR experience.
                Half my projects start as &ldquo;I wonder if I could build that.&rdquo;
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
          <div className="finance-only finance-section-kicker">02 / TRACK RECORD</div>
          <MotionSection>
            <SectionHeading prefix="Work" highlight="Experience" showSeparator />
          </MotionSection>
          <div className="finance-only finance-ledger">{EXPERIENCES.map((experience, i) => <article key={experience.company}><div className="finance-ledger-date"><span>POSITION / 0{i + 1}</span><b>{experience.period}</b><span>{experience.location}</span></div><div><h3>{experience.role} <span>@ {experience.company}</span></h3><p>{experience.description}</p><div className="finance-tags">{experience.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><ArrowUpRight size={22} className="text-primary" /></article>)}</div>
          <div className="experience-terminal-view"><ExperienceTerminal experiences={EXPERIENCES} /></div>
          <CareerCircuit experiences={EXPERIENCES} />
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-24">
          <div className="finance-only finance-section-kicker">03 / SELECTED WORK</div>
          <div className="finance-only finance-section-title"><h2>The project index.</h2><p>A running record of experiments, useful tools, and things made out of curiosity.</p></div>
          <div className="finance-only"><FinanceProjects completed={COMPLETED_PROJECTS} inProgress={IN_PROGRESS_PROJECTS} /></div>
          <MotionSection>
            <SectionHeading prefix="My" highlight="Projects" showSeparator />
          </MotionSection>
          <MotionSection>
            <ProjectTabs completed={COMPLETED_PROJECTS} inProgress={IN_PROGRESS_PROJECTS} />
          </MotionSection>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-24">
          <div className="finance-only finance-section-kicker">04 / TOOLS OF THE TRADE</div>
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
          <div className="finance-only finance-section-kicker">05 / CORRESPONDENCE</div>
          <div className="finance-only finance-contact-heading">Have something<br /><span>in mind?</span></div>
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
