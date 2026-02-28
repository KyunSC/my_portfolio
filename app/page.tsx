import dynamic from "next/dynamic";
import { Code2, Globe, Monitor, Server, Wrench, Briefcase, Trophy, Mail } from "lucide-react";
import {
  SiReact, SiNextdotjs, SiAngular, SiTypescript, SiTailwindcss, SiHtml5,
  SiPostgresql, SiNodedotjs, SiPython, SiJavascript, SiSharp, SiDotnet,
  SiGit, SiGithub, SiGitlab, SiDocker,
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import SectionHeading from "@/components/SectionHeading";
import MotionSection from "@/components/MotionSection";
import HeroSection from "@/components/HeroSection";

const ProjectTabs = dynamic(() => import("@/components/ProjectTabs"));
const StatCard = dynamic(() => import("@/components/StatCard"));
const SkillIcon = dynamic(() => import("@/components/SkillIcon"));

const COMPLETED_PROJECTS = [
  {
    title: "CrowdCheck",
    description: "A web application built with Angular to help users check crowd levels and wait times at the McGill University Library and B2 Gym.",
    tags: ["Angular", "TypeScript", "C#", ".NET"],
    link: "https://github.com/KyunSC/crowd-check",
  },
  {
    title: "Ideal Gas Law Simulator",
    description: "Built an Ideal Gas Law simulator in Java/JavaFX to model the relationship between variables in real time.\nImplemented interactive visualizations and user controls to dynamically adjust variables and observe simulation outcomes.\nLed a team of 3 to accomplish the project with tight deadlines.",
    tags: ["Java", "JavaFX", "Scene Builder", "Git"],
    link: "https://github.com/KyunSC/ideal-gas-law-simulator",
  },
  {
    title: "Vanier Robotics Team Website",
    description: "A Plants vs. Zombies themed website built for the Vanier College Robotics Team.\nDesigned and developed an engaging, game-inspired interface to showcase the team and attract new members.\nBuilt with Vue.js for a dynamic and interactive user experience.",
    tags: ["Vue.js", "JavaScript", "CSS", "HTML"],
    link: "http://vanierplantforce.crcrobotics.com/",
  },
  {
    title: "Université de Montreal's Game Jam 2024",
    description: "Collaborated as part of a dynamic team of five to achieve first place in a competitive Game Jam competition.\nDeveloped and implemented innovative game concepts within tight time constraints, resulting in recognition for excellence.\nLed the conceptualization and design of a game project.",
    tags: ["C#", "Unity", "Git"],
    link: "https://itch.io/jam/udem-game-jam-2024/rate/2604780",
  },
  {
    title: "PhysiPlay – 2D Physics Simulator",
    description: "Developed a 2D physics simulation engine in Java and JavaFX, modeling pendulums, springs, collisions, and momentum.\nApplied object-oriented programming (OOP) and design patterns to build modular and scalable simulation modules.\nCollaborated in a team of 4 using Agile methodologies (Scrum, sprint planning, stand-ups) to ensure efficient project delivery.\nUtilized Git/GitHub for version control, implementing branching strategies and code reviews to maintain code quality.",
    tags: ["Java", "JavaFX", "Scene Builder", "Git"],
    link: "https://github.com/adinashby-vanier-college/integrative-project-in-csm-project-gape-horn-123",
  },
];

const IN_PROGRESS_PROJECTS = [
  {
    title: "F1 Race Prediction Model",
    description: "Machine learning model to predict Formula 1 race outcomes based on historical data, driver performance, and track conditions.\nUtilizing Python, Pandas, Scikit-learn, and TensorFlow to preprocess data, engineer features, and train predictive algorithms.\nAiming to provide insights for teams and enthusiasts to enhance race strategies and fan engagement.",
    tags: ["Python", "Pandas", "Scikit-learn", "TensorFlow"],
    link: "https://github.com/KyunSC/F1Predictions",
    inProgress: true,
  },
  {
    title: "Azure Live Market Data App",
    description: "A serverless application that retrieves real-time stock prices using the yfinance API.\nImplements a REST API endpoint supporting GET and POST requests to fetch market data for specified stock tickers.\nBuilt on Azure Functions for scalable, cost-effective cloud deployment.",
    tags: ["Python", "Azure Functions", "yfinance", "REST API, PostgreSQL"],
    link: "https://github.com/KyunSC/azure-market-data",
    inProgress: true,
  },
];

const SKILL_CATEGORIES = [
  {
    label: "Frontend",
    icon: <Monitor size={18} className="text-primary" />,
    animation: "fade-left" as const,
    skills: [
      { icon: <SiReact style={{ color: "#61DAFB" }} />, label: "React" },
      { icon: <SiNextdotjs />, label: "Next.js" },
      { icon: <SiAngular style={{ color: "#DD0031" }} />, label: "Angular" },
      { icon: <SiTypescript style={{ color: "#3178C6" }} />, label: "TypeScript" },
      { icon: <SiTailwindcss style={{ color: "#06B6D4" }} />, label: "Tailwind CSS" },
      { icon: <SiHtml5 style={{ color: "#E34F26" }} />, label: "HTML5 & CSS3" },
    ],
  },
  {
    label: "Backend",
    icon: <Server size={18} className="text-primary" />,
    animation: "fade-up" as const,
    skills: [
      { icon: <SiPostgresql style={{ color: "#4169E1" }} />, label: "PostgreSQL" },
      { icon: <SiNodedotjs style={{ color: "#5FA04E" }} />, label: "Node.js" },
      { icon: <SiPython style={{ color: "#3776AB" }} />, label: "Python" },
      { icon: <DiJava style={{ color: "#ED8B00" }} />, label: "Java" },
      { icon: <SiJavascript style={{ color: "#F7DF1E" }} />, label: "JavaScript" },
      { icon: <SiSharp style={{ color: "#239120" }} />, label: "C#" },
      { icon: <SiDotnet style={{ color: "#512BD4" }} />, label: ".NET" },
    ],
  },
  {
    label: "Tools & Others",
    icon: <Wrench size={18} className="text-primary" />,
    animation: "fade-right" as const,
    skills: [
      { icon: <SiGit style={{ color: "#F05032" }} />, label: "Git" },
      { icon: <SiGithub />, label: "GitHub" },
      { icon: <SiGitlab style={{ color: "#FC6D26" }} />, label: "GitLab" },
      { icon: <SiDocker style={{ color: "#2496ED" }} />, label: "Docker" },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">

        <HeroSection />

        {/* About Section */}
        <section id="about" className="mb-24">
          <MotionSection>
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
          </MotionSection>
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
