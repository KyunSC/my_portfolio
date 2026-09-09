import dynamic from "next/dynamic";
import { Code2, Globe, Briefcase, Trophy, Mail, ArrowUpRight, ArrowDown, Activity } from "lucide-react";
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
          <div className="finance-masthead"><span><Activity size={14} /> SC TERMINAL <b>/</b> PERSONAL PORTFOLIO</span><span>MONTRÉAL, CA <b>·</b> SOFTWARE & SYSTEMS</span></div>
          <div className="finance-ticker">
            <span><b>EXPERIENCE</b> 5+ YRS <i>↗ Building</i></span><span><b>PROJECTS</b> 10+ <i>↗ Shipped</i></span><span><b>GAME JAM</b> 1ST <i>2024</i></span><span><b>FOCUS</b> FULL STACK <i>● Active</i></span>
          </div>
          <div className="finance-hero-grid">
            <div className="finance-intro"><p className="finance-eyebrow"><span className="finance-dot" /> OPEN TO OPPORTUNITIES</p><h1>Sunny Chen<span>Building for<br />the long term.</span></h1><p className="finance-intro-copy">Software developer. Market enthusiast.<br />Turning curiosity into systems that deliver.</p><div className="finance-actions"><a className="finance-button" href="#projects">Explore my portfolio <ArrowUpRight size={17} /></a><a className="finance-text-link" href="#contact">Let’s connect <ArrowUpRight size={16} /></a></div><div className="finance-profile-foot"><span>BASED IN MONTRÉAL</span><span>CODE × CAPITAL × CURIOSITY</span></div></div>
            <div className="finance-market-panel">
              <div className="finance-panel-top"><span className="finance-eyebrow">FEATURED / MARKET INFRASTRUCTURE</span><Activity size={16} /></div>
              <div className="finance-market-title"><div><span className="finance-symbol">AZURE / MKT</span><h2>From ticker to insight.</h2></div><span className="finance-outline-label">SERVERLESS</span></div>
              <p>A cloud-native API built to put stock market data to work.</p>
              <div className="finance-chart" role="img" aria-label="Decorative market-style line chart. Illustrative data, not live prices.">
                <div className="finance-chart-label"><span>MARKET DATA PIPELINE</span><span>ILLUSTRATIVE</span></div>
                <svg viewBox="0 0 540 210" fill="none" aria-hidden="true"><defs><linearGradient id="finance-chart-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="currentColor" stopOpacity=".22"/><stop offset="1" stopColor="currentColor" stopOpacity="0"/></linearGradient></defs>{[40, 85, 130, 175].map(y => <path key={y} d={`M0 ${y}H540`} className="finance-gridline"/>)}<path d="M0 175 L20 167 L35 178 L58 146 L76 154 L100 125 L117 137 L140 119 L158 128 L180 95 L199 111 L220 91 L240 106 L259 71 L278 83 L300 62 L323 88 L344 70 L365 77 L390 43 L410 53 L431 30 L450 48 L470 23 L490 32 L513 12 L540 20 V210 H0Z" fill="url(#finance-chart-fill)"/><path d="M0 175 L20 167 L35 178 L58 146 L76 154 L100 125 L117 137 L140 119 L158 128 L180 95 L199 111 L220 91 L240 106 L259 71 L278 83 L300 62 L323 88 L344 70 L365 77 L390 43 L410 53 L431 30 L450 48 L470 23 L490 32 L513 12 L540 20" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/></svg>
                <div className="finance-chart-label"><span>INGEST</span><span>PROCESS</span><span>SERVE</span></div>
              </div>
              <div className="finance-market-metrics"><div><span>COMPUTE</span><b>Azure Functions</b></div><div><span>LANGUAGE</span><b>Python</b></div><div><span>INTERFACE</span><b>REST API</b></div></div>
              <a className="finance-feature-link" href={COMPLETED_PROJECTS[0].link} target="_blank" rel="noopener noreferrer">Explore the market data app <ArrowUpRight size={18} /></a>
            </div>
          </div>
          <a className="finance-scroll" href="#about"><ArrowDown size={14} /> THE FUNDAMENTALS <span>01 — 05</span></a>
        </section>

        {/* About Section */}
        <section id="about" className="mb-24">
          <div>
            <div className="finance-only finance-section-kicker">01 / INVESTMENT THESIS</div>
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
          <div className="finance-only finance-section-kicker">03 / PROJECT HOLDINGS</div>
          <div className="finance-only finance-section-title"><h2>A diversified portfolio.</h2><p>Ideas researched. Systems built. Products shipped.</p></div>
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
          <div className="finance-only finance-section-kicker">04 / CORE ASSETS</div>
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
          <div className="finance-only finance-section-kicker">05 / THE NEXT OPPORTUNITY</div>
          <div className="finance-only finance-contact-heading">Let’s build<br /><span>something valuable.</span></div>
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
