import { Monitor, Server, Wrench } from "lucide-react";
import {
  SiReact, SiNextdotjs, SiAngular, SiTypescript, SiTailwindcss, SiHtml5,
  SiPostgresql, SiNodedotjs, SiPython, SiJavascript, SiSharp, SiDotnet,
  SiSpringboot, SiGit, SiGithub, SiGitlab, SiDocker,
} from "react-icons/si";
import { DiJava } from "react-icons/di";

export const COMPLETED_PROJECTS = [
  {
    title: "Azure Live Market Data App",
    description: "A serverless application that retrieves real-time stock prices using the yfinance API.\nImplements a REST API endpoint supporting GET and POST requests to fetch market data for specified stock tickers.\nBuilt on Azure Functions for scalable, cost-effective cloud deployment.",
    tags: ["Python", "Azure Functions", "yfinance", "REST API, PostgreSQL", "Java Spring Boot"],
    link: "https://azure-market-data-nbr5.vercel.app/",
    github: "https://github.com/KyunSC/azure-market-data",
  },
  {
    title: "CrowdCheck",
    description: "A web application built with Angular to help users check crowd levels and wait times at the McGill University Library and B2 Gym.",
    tags: ["Angular", "TypeScript", "C#", ".NET"],
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
];

export const IN_PROGRESS_PROJECTS = [
  {
    title: "F1 Race Prediction Model",
    description: "Machine learning model to predict Formula 1 race outcomes based on historical data, driver performance, and track conditions.\nUtilizing Python, Pandas, Scikit-learn, and TensorFlow to preprocess data, engineer features, and train predictive algorithms.\nAiming to provide insights for teams and enthusiasts to enhance race strategies and fan engagement.",
    tags: ["Python", "Pandas", "Scikit-learn", "TensorFlow"],
    link: "https://github.com/KyunSC/F1Predictions",
    github: "https://github.com/KyunSC/F1Predictions",
    inProgress: true,
  },
];

export const SKILL_CATEGORIES = [
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
      { icon: <SiSpringboot style={{ color: "#6DB33F" }} />, label: "Spring Boot" },
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
