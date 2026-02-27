import { Mail, Code2, Globe, Monitor, Server, Wrench, Briefcase, Trophy } from "lucide-react";
import {
  SiReact, SiNextdotjs, SiAngular, SiTypescript, SiTailwindcss, SiHtml5,
  SiPostgresql, SiNodedotjs, SiPython, SiJavascript, SiSharp, SiDotnet,
  SiGit, SiGithub, SiGitlab, SiDocker, SiFirebase, SiOpenjdk,
} from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Project from "@/components/Project";
import TerminalBio from "@/components/TerminalBio";
import StatCard from "@/components/StatCard";
import SectionHeading from "@/components/SectionHeading";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">

        {/* Hero Section — two-column on md+ */}
        <section className="relative mb-24 pt-8 overflow-hidden">
          <div className="hero-glow" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            {/* Left: text content */}
            <div>
              <div className="hero-animate flex items-center gap-2 mb-4">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-mono text-muted-foreground">available for work</span>
              </div>
              <h1 className="hero-animate hero-animate-delay-1 mb-6 text-5xl font-bold tracking-tight md:text-7xl">
                Sunny Chen
              </h1>
              <p className="hero-animate hero-animate-delay-2 mb-8 text-xl text-muted-foreground md:text-2xl">
                Software Developer
              </p>
              <p className="hero-animate hero-animate-delay-2 mb-12 text-lg leading-relaxed text-muted-foreground">
                I build exceptional digital experiences that combine clean code with thoughtful design.
                Passionate about creating scalable applications and solving complex problems.
              </p>
              <div className="hero-animate hero-animate-delay-3 flex flex-wrap gap-4">
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
              </div>
            </div>

            {/* Right: terminal — hidden on mobile */}
            <div className="hero-animate hero-animate-delay-2 hidden md:block">
              <TerminalBio />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-24">
          <AnimateOnScroll>
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
          </AnimateOnScroll>
          <div className="grid grid-cols-3 gap-4">
            <AnimateOnScroll delay={0}>
              <StatCard value="5+" label="Projects Shipped" icon={<Briefcase size={20} />} />
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <StatCard value="1st" label="Game Jam 2024" icon={<Trophy size={20} />} />
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <StatCard value="4+" label="Languages" icon={<Code2 size={20} />} />
            </AnimateOnScroll>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-24">
          <AnimateOnScroll>
            <SectionHeading prefix="Skills &amp;" highlight="Technologies" showSeparator />
          </AnimateOnScroll>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimateOnScroll delay={0}>
              <Card className="border-l-4 border-l-primary transition-all hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Monitor size={18} className="text-primary" />
                    Frontend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-x-4 gap-y-3">
                    {[
                      { icon: <SiReact style={{ color: "#61DAFB" }} />, label: "React" },
                      { icon: <SiNextdotjs />, label: "Next.js" },
                      { icon: <SiAngular style={{ color: "#DD0031" }} />, label: "Angular" },
                      { icon: <SiTypescript style={{ color: "#3178C6" }} />, label: "TypeScript" },
                      { icon: <SiTailwindcss style={{ color: "#06B6D4" }} />, label: "Tailwind CSS" },
                      { icon: <SiHtml5 style={{ color: "#E34F26" }} />, label: "HTML5 & CSS3" },
                    ].map(({ icon, label }) => (
                      <div key={label} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <span className="text-base">{icon}</span>
                        {label}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <Card className="border-l-4 border-l-primary transition-all hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Server size={18} className="text-primary" />
                    Backend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-x-4 gap-y-3">
                    {[
                      { icon: <SiPostgresql style={{ color: "#4169E1" }} />, label: "PostgreSQL" },
                      { icon: <SiNodedotjs style={{ color: "#5FA04E" }} />, label: "Node.js" },
                      { icon: <SiPython style={{ color: "#3776AB" }} />, label: "Python" },
                      { icon: <SiOpenjdk style={{ color: "#ED8B00" }} />, label: "Java" },
                      { icon: <SiJavascript style={{ color: "#F7DF1E" }} />, label: "JavaScript" },
                      { icon: <SiSharp style={{ color: "#239120" }} />, label: "C#" },
                      { icon: <SiDotnet style={{ color: "#512BD4" }} />, label: ".NET" },
                    ].map(({ icon, label }) => (
                      <div key={label} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <span className="text-base">{icon}</span>
                        {label}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <Card className="border-l-4 border-l-primary transition-all hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Wrench size={18} className="text-primary" />
                    Tools &amp; Others
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-x-4 gap-y-3">
                    {[
                      { icon: <SiGit style={{ color: "#F05032" }} />, label: "Git" },
                      { icon: <SiGithub />, label: "GitHub" },
                      { icon: <SiGitlab style={{ color: "#FC6D26" }} />, label: "GitLab" },
                      { icon: <SiDocker style={{ color: "#2496ED" }} />, label: "Docker" },
                      { icon: <SiFirebase style={{ color: "#DD2C00" }} />, label: "Firebase" },
                    ].map(({ icon, label }) => (
                      <div key={label} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <span className="text-base">{icon}</span>
                        {label}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Projects Section — Tabs for Completed / In Progress */}
        <section id="projects" className="mb-24">
          <AnimateOnScroll>
            <SectionHeading prefix="My" highlight="Projects" showSeparator />
          </AnimateOnScroll>
          <AnimateOnScroll>
            <Tabs defaultValue="completed">
              <TabsList className="mb-6">
                <TabsTrigger value="completed">Completed (5)</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress (2)</TabsTrigger>
              </TabsList>

              <TabsContent value="completed">
                <div className="space-y-6">
                  <AnimateOnScroll delay={0}>
                    <Project
                      title="CrowdCheck"
                      description="A web application built with Angular to help users check crowd levels and wait times at the McGill University Library and B2 Gym."
                      tags={["Angular", "TypeScript", "C#", ".NET"]}
                      link="https://github.com/KyunSC/crowd-check"
                    />
                  </AnimateOnScroll>
                  <AnimateOnScroll delay={100}>
                    <Project
                      title="Ideal Gas Law Simulator"
                      description="Built an Ideal Gas Law simulator in Java/JavaFX to model the relationship between variables in real time.
Implemented interactive visualizations and user controls to dynamically adjust variables and observe simulation outcomes.
Led a team of 3 to accomplish the project with tight deadlines."
                      tags={["Java", "JavaFX", "Scene Builder", "Git"]}
                      link="https://github.com/KyunSC/ideal-gas-law-simulator"
                    />
                  </AnimateOnScroll>
                  <AnimateOnScroll delay={200}>
                    <Project
                      title="Vanier Robotics Team Website"
                      description="A Plants vs. Zombies themed website built for the Vanier College Robotics Team.
Designed and developed an engaging, game-inspired interface to showcase the team and attract new members.
Built with Vue.js for a dynamic and interactive user experience."
                      tags={["Vue.js", "JavaScript", "CSS", "HTML"]}
                      link="http://vanierplantforce.crcrobotics.com/"
                    />
                  </AnimateOnScroll>
                  <AnimateOnScroll delay={300}>
                    <Project
                      title="Université de Montreal's Game Jam 2024"
                      description="Collaborated as part of a dynamic team of five to achieve first place in a competitive Game Jam competition.
Developed and implemented innovative game concepts within tight time constraints, resulting in recognition for excellence.
Led the conceptualization and design of a game project."
                      tags={["C#", "Unity", "Git"]}
                      link="https://itch.io/jam/udem-game-jam-2024/rate/2604780"
                    />
                  </AnimateOnScroll>
                  <AnimateOnScroll delay={400}>
                    <Project
                      title="PhysiPlay – 2D Physics Simulator"
                      description="Developed a 2D physics simulation engine in Java and JavaFX, modeling pendulums, springs, collisions, and momentum.
Applied object-oriented programming (OOP) and design patterns to build modular and scalable simulation modules.
Collaborated in a team of 4 using Agile methodologies (Scrum, sprint planning, stand-ups) to ensure efficient project delivery.
Utilized Git/GitHub for version control, implementing branching strategies and code reviews to maintain code quality."
                      tags={["Java", "JavaFX", "Scene Builder", "Git"]}
                      link="https://github.com/adinashby-vanier-college/integrative-project-in-csm-project-gape-horn-123"
                    />
                  </AnimateOnScroll>
                </div>
              </TabsContent>

              <TabsContent value="in-progress">
                <div className="space-y-6">
                  <AnimateOnScroll delay={0}>
                    <Project
                      title="F1 Race Prediction Model"
                      description="Machine learning model to predict Formula 1 race outcomes based on historical data, driver performance, and track conditions.
Utilizing Python, Pandas, Scikit-learn, and TensorFlow to preprocess data, engineer features, and train predictive algorithms.
Aiming to provide insights for teams and enthusiasts to enhance race strategies and fan engagement."
                      tags={["Python", "Pandas", "Scikit-learn", "TensorFlow"]}
                      link="https://github.com/KyunSC/F1Predictions"
                      inProgress
                    />
                  </AnimateOnScroll>
                  <AnimateOnScroll delay={100}>
                    <Project
                      title="Azure Live Market Data App"
                      description="A serverless application that retrieves real-time stock prices using the yfinance API.
Implements a REST API endpoint supporting GET and POST requests to fetch market data for specified stock tickers.
Built on Azure Functions for scalable, cost-effective cloud deployment."
                      tags={["Python", "Azure Functions", "yfinance", "REST API, PostgreSQL"]}
                      link="https://github.com/KyunSC/azure-market-data"
                      inProgress
                    />
                  </AnimateOnScroll>
                </div>
              </TabsContent>
            </Tabs>
          </AnimateOnScroll>
        </section>

        {/* Contact Section — CTA Card */}
        <section id="contact" className="mb-24">
          <AnimateOnScroll>
            <SectionHeading prefix="Let&apos;s" highlight="Connect" showSeparator />
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
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
          </AnimateOnScroll>
        </section>

        {/* Footer */}
        <AnimateOnScroll animation="fade-in">
          <footer className="pt-8">
            <Separator className="mb-8" />
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>&copy; 2026 Sunny Chen. All rights reserved.</p>
              <p className="font-mono text-xs">Built with Next.js + shadcn/ui</p>
            </div>
          </footer>
        </AnimateOnScroll>

      </main>
    </div>
  );
}
