import { Braces, BrainCircuit, Database, Monitor, Server, Wrench } from "lucide-react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiHtml5, SiCss3,
  SiPostgresql, SiNodedotjs, SiPython, SiJavascript, SiDotnet,
  SiSpringboot, SiGit, SiGithub, SiGitlab, SiDocker, SiMysql, SiC,
  SiPytorch, SiScikitlearn, SiLinux, SiGnubash, SiJunit5, SiApachemaven, SiGradle,
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { VscAzure } from "react-icons/vsc";
import { FaDatabase } from "react-icons/fa";
import { CSharpIcon, AngularIcon } from "@/components/BrandIcons";

export const EXPERIENCES = [
  {
    role: "Full Stack Developer Intern",
    company: "Galerie L’Original",
    period: "Jun 2026 – Oct 2026",
    location: "Montreal, QC",
    description: "Shipped features on two production Next.js/TypeScript sites (React, MySQL) in a 20+ developer agile team, contributing through code reviews and sprint planning.\nReplaced manual image quality review with a RAG verifier (Gemini, pgvector), shipped only once it matched human reviewer decisions.\nScoped and built View in Room AR from spec to release, generating true-to-scale 3D models (three.js, GLB/USDZ) for 421 artworks in 16 minutes.\nDeveloped a SAM 2.1 auto-crop pipeline for 3,600+ listings; fine-tuned it in PyTorch, raising boundary IoU from 0.943 to 0.968.",
    tags: ["TypeScript", "Next.js", "React", "MySQL", "PostgreSQL", "Prisma", "Gemini", "RAG", "three.js", "PyTorch", "SAM 2.1"],
    links: ["https://loriginal.org", "https://artur.art"],
  },
  {
    role: "Software QA Analyst",
    company: "GBT Solutions",
    period: "Jun 2025 – Oct 2025",
    location: "Montreal, QC",
    description: "Identified 15+ edge-case defects before production by testing restaurant POS software against Revenu Québec fiscal standards.\nAccelerated fixes by debugging failures down to precise reproduction steps and root-cause analysis for each defect.\nCreated compliance documentation with step-by-step workflows and visual evidence for external auditors.",
    tags: ["QA", "POS", "Root-Cause Analysis", "Compliance", "Revenu Québec"],
  },
];

export const EDUCATION = [
  {
    school: "McGill University",
    degree: "B.Eng. Software Engineering Co-op",
    period: "Aug 2025 – May 2029",
  },
  {
    school: "Vanier College",
    degree: "DEC Computer Science & Mathematics",
    period: "Aug 2023 – Jun 2025",
  },
];

export const COMPLETED_PROJECTS = [
  {
    title: "CrowdCheck",
    description: "Built a full-stack, real-time crowdedness tracker so McGill students can check gym zones and library floors before going.\nDesigned a RESTful .NET API with rate-limited voting and time-decayed aggregation for accurate crowd estimates.\nUsed Dapper and DbUp for raw SQL data access and versioned PostgreSQL migrations; deployed through a CI/CD pipeline.",
    tags: ["C#", ".NET", "Angular", "TypeScript", "PostgreSQL", "Dapper"],
    link: "https://github.com/KyunSC/crowd-check",
    github: "https://github.com/KyunSC/crowd-check",
  },
  {
    title: "Ideal Gas Law Simulator",
    description: "Built an Ideal Gas Law simulator in Java/JavaFX to model the relationship between variables in real time.\nImplemented interactive visualizations and user controls to dynamically adjust variables and observe simulation outcomes.\nLed a team of 3 to accomplish the project with tight deadlines.",
    tags: ["Java", "JavaFX", "Scene Builder", "Git"],
    link: "https://github.com/KyunSC/ideal-gas-law-simulator",
    github: "https://github.com/KyunSC/ideal-gas-law-simulator",
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
    github: "https://github.com/adinashby-vanier-college/integrative-project-in-csm-project-gape-horn-123",
  },
  {
    title: "Gmail Internship Scanner",
    description: "LLM-powered tool that scans a Gmail inbox to surface internship-related emails and extract structured details like company, role, and status.\nIntegrates with the Gmail API to fetch messages and runs a local Qwen model via Ollama for private, offline classification and extraction.\nDesigned to keep all email content on-device while automating the tedious work of tracking internship applications.",
    tags: ["Python", "Gmail API", "Ollama", "Qwen", "LLM"],
    link: "https://github.com/KyunSC/gmail-internship-scanner",
    github: "https://github.com/KyunSC/gmail-internship-scanner",
  },
];

export const IN_PROGRESS_PROJECTS = [
  {
    title: "Options Market Analytics Engine",
    description: "Built a live analytics engine on Azure that recomputes options-implied support and resistance levels every 5 minutes.\nBacktested a hedging strategy on 4.7 years of 5-min market data, cutting P&L variance 92% and tail losses 76%.\nValidated that the engine’s signal improves volatility forecasts (p = 0.005) using walk-forward and permutation tests.",
    tags: ["Python", "PyTorch", "Spring Boot", "Microsoft Azure", "PostgreSQL"],
    link: "https://azure-market-data-nbr5.vercel.app/",
    github: "https://github.com/KyunSC/azure-market-data",
    inProgress: true,
  },
  {
    title: "F1 Race Prediction Model",
    description: "Machine learning model to predict Formula 1 race outcomes based on historical data, driver performance, and track conditions.\nUtilizing Python, Pandas, Scikit-learn, and TensorFlow to preprocess data, engineer features, and train predictive algorithms.\nAiming to provide insights for teams and enthusiasts to enhance race strategies and fan engagement.",
    tags: ["Python", "Pandas", "Scikit-learn", "TensorFlow"],
    link: "https://github.com/KyunSC/F1Predictions",
    github: "https://github.com/KyunSC/F1Predictions",
    inProgress: true,
  },
  {
    title: "Git Scribe – Commit Documentation Generator",
    description: "CLI tool that reads a repository's Git history and generates human-readable documentation and changelogs from commit messages and diffs.\nUses a local Qwen model via Ollama to summarize changes, group related commits, and produce release-ready notes without sending code off-machine.\nBuilt in Python to streamline documentation for solo projects and small teams.",
    tags: ["Python", "Git CLI", "Ollama", "Qwen", "LLM"],
    link: "https://github.com/KyunSC/git-scribe",
    github: "https://github.com/KyunSC/git-scribe",
    inProgress: true,
  },
];

export const SKILL_CATEGORIES = [
  {
    label: "Languages",
    icon: <Braces size={18} className="text-primary" />,
    skills: [
      { icon: <DiJava style={{ color: "#ED8B00" }} />, label: "Java" },
      { icon: <SiPython style={{ color: "#3776AB" }} />, label: "Python" },
      { icon: <SiTypescript style={{ color: "#3178C6" }} />, label: "TypeScript" },
      { icon: <SiJavascript style={{ color: "#F7DF1E" }} />, label: "JavaScript" },
      { icon: <CSharpIcon />, label: "C#" },
      { icon: <SiC style={{ color: "#A8B9CC" }} />, label: "C" },
      { icon: <FaDatabase />, label: "SQL" },
      { icon: <SiGnubash style={{ color: "#4EAA25" }} />, label: "Bash" },
    ],
  },
  {
    label: "Frontend",
    icon: <Monitor size={18} className="text-primary" />,
    skills: [
      { icon: <SiReact style={{ color: "#61DAFB" }} />, label: "React" },
      { icon: <SiNextdotjs />, label: "Next.js" },
      { icon: <AngularIcon />, label: "Angular" },
      { icon: <SiTailwindcss style={{ color: "#06B6D4" }} />, label: "Tailwind CSS" },
      { icon: <SiHtml5 style={{ color: "#E34F26" }} />, label: "HTML5" },
      { icon: <SiCss3 style={{ color: "#1572B6" }} />, label: "CSS3" },
    ],
  },
  {
    label: "DevOps & Tools",
    icon: <Wrench size={18} className="text-primary" />,
    skills: [
      { icon: <SiGit style={{ color: "#F05032" }} />, label: "Git" },
      { icon: <SiGithub />, label: "GitHub" },
      { icon: <SiGitlab style={{ color: "#FC6D26" }} />, label: "GitLab" },
      { icon: <SiDocker style={{ color: "#2496ED" }} />, label: "Docker" },
      { icon: <VscAzure style={{ color: "#0078D4" }} />, label: "Azure" },
      { icon: <SiLinux />, label: "Linux" },
      { icon: <SiJunit5 style={{ color: "#25A162" }} />, label: "JUnit" },
      { icon: <SiApachemaven style={{ color: "#C71A36" }} />, label: "Maven" },
      { icon: <SiGradle />, label: "Gradle" },
    ],
  },
  {
    label: "Backend",
    icon: <Server size={18} className="text-primary" />,
    skills: [
      { icon: <SiSpringboot style={{ color: "#6DB33F" }} />, label: "Spring Boot" },
      { icon: <SiDotnet style={{ color: "#512BD4" }} />, label: ".NET" },
      { icon: <SiNodedotjs style={{ color: "#5FA04E" }} />, label: "Node.js" },
    ],
  },
  {
    label: "Databases",
    icon: <Database size={18} className="text-primary" />,
    skills: [
      { icon: <SiPostgresql style={{ color: "#4169E1" }} />, label: "PostgreSQL" },
      { icon: <SiMysql style={{ color: "#4479A1" }} />, label: "MySQL" },
    ],
  },
  {
    label: "Machine Learning",
    icon: <BrainCircuit size={18} className="text-primary" />,
    skills: [
      { icon: <SiPytorch style={{ color: "#EE4C2C" }} />, label: "PyTorch" },
      { icon: <SiScikitlearn style={{ color: "#F7931E" }} />, label: "scikit-learn" },
    ],
  },
];
