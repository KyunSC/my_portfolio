import Project from "@/components/Project";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        {/* Hero Section */}
        <section className="mb-24">
          <div className="mb-4">
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Hello, I&apos;m
            </span>
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
            Sunny Chen
          </h1>
          <p className="mb-8 max-w-2xl text-xl text-zinc-600 dark:text-zinc-400 md:text-2xl">
            Software Developer & Creative Problem Solver
          </p>
          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            I build exceptional digital experiences that combine clean code with thoughtful design.
            Passionate about creating scalable applications and solving complex problems.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-lg bg-[#22c55e] px-6 py-3 font-medium text-white transition-all hover:bg-[#00ff00] hover:shadow-lg hover:shadow-[#22c55e]/50"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              className="rounded-lg border-2 border-[#22c55e] px-6 py-3 font-medium transition-all hover:bg-[#22c55e] hover:text-white hover:shadow-lg hover:shadow-[#22c55e]/30"
            >
              View Projects
            </a>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-24">
          <h2 className="mb-8 text-3xl font-bold">
            About <span className="text-[#22c55e]">Me</span>
          </h2>
          <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
            <p className="leading-relaxed">
              I&apos;m a passionate developer with expertise in modern technologies. I love turning ideas
              into reality through code and constantly learning new technologies to stay at the forefront
              of software development.
            </p>
            <p className="leading-relaxed">
              When I&apos;m not coding, you can find me contributing to open-source projects, writing technical
              articles, or exploring new frameworks and tools.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-24">
          <h2 className="mb-8 text-3xl font-bold">
            Skills & <span className="text-[#22c55e]">Technologies</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
              <h3 className="mb-3 text-lg font-semibold">Frontend</h3>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>React / Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>HTML5 & CSS3</li>
              </ul>
            </div>
            <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
              <h3 className="mb-3 text-lg font-semibold">Backend</h3>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>Node.js</li>
                <li>Python</li>
                <li>Java</li>
                <li>Javascript</li>
              </ul>
            </div>
            <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
              <h3 className="mb-3 text-lg font-semibold">Tools & Others</h3>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>Git & GitHub</li>
                <li>VS Code</li>
                
                <li>CI/CD</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-24">
          <h2 className="mb-8 text-3xl font-bold">
            Featured <span className="text-[#22c55e]">Projects</span>
          </h2>
          <div className="space-y-6">
            <Project
              title="Ideal Gas Law Simulator"
              description="
              Built an Ideal Gas Law simulator in Java/JavaFX to model the relationship between variables in real time
              Implemented interactive visualizations and user controls to dynamically adjust variables and observe simulation outcomes.
              Led a team of 3 to accomplish the project with tight deadlines
              "
              tags={["Java", "JavaFX", "Scene Builder", "Git"]}
              link="https://github.com/KyunSC/ideal-gas-law-simulator"
            />
            <Project
              title="Vanier Robotics Team Website"
              description="A Plants vs. Zombies themed website built for the Vanier College Robotics Team.
Designed and developed an engaging, game-inspired interface to showcase the team and attract new members.
Built with Vue.js for a dynamic and interactive user experience."
              tags={["Vue.js", "JavaScript", "CSS", "HTML"]}
              link="https://github.com/Vanier-Robotics/Website2025"
            />
            <Project
              title="Université de Montreal's Game Jam 2024"
              description="Collaborated as part of a dynamic team of five to achieve first place in a competitive Game Jam competition
                           Developed and implemented innovative game concepts within tight time constraints, resulting in recognition for excellence
                           Led the conceptualization and design of a game project"
              tags={["C#", "Unity", "Git"]}
              link="https://itch.io/jam/udem-game-jam-2024/rate/2604780"
            />
            <Project
              title="PhysiPlay – 2D Physics Simulator"
              description="Developed a 2D physics simulation engine in Java and JavaFX, modeling pendulums, springs, collisions, and momentum
Applied object-oriented programming (OOP) and design patterns to build modular and scalable simulation modules
Collaborated in a team of 4 using Agile methodologies (Scrum, sprint planning, stand-ups) to ensure efficient project delivery
Utilized Git/GitHub for version control, implementing branching strategies and code reviews to maintain code quality
Delivered project updates through technical presentations and documentation, strengthening communication skills"
              tags={["Java", "JavaFX", "Scene Builder", "Git"]}
              link="https://github.com/adinashby-vanier-college/integrative-project-in-csm-project-gape-horn-123"
            />
          </div>
        </section>

        {/* Work in Progress Section */}
        <section className="mb-24">
          <h2 className="mb-8 text-3xl font-bold">
            Work in <span className="text-[#22c55e]">Progress</span>
          </h2>
          <div className="space-y-6">
            <Project
              title="F1 Race Prediction Model"
              description="Machine learning model to predict Formula 1 race outcomes based on historical data, driver performance, and track conditions.
Utilizing Python, Pandas, Scikit-learn, and TensorFlow to preprocess data, engineer features, and train predictive algorithms.
Aiming to provide insights for teams and enthusiasts to enhance race strategies and fan engagement."
              tags={["Python", "Pandas", "Scikit-learn", "TensorFlow"]}
              link="https://github.com/KyunSC/F1Predictions"
            />
            <Project
              title="Azure Live Market Data App"
              description="A serverless application that retrieves real-time stock prices using the yfinance API.
Implements a REST API endpoint supporting GET and POST requests to fetch market data for specified stock tickers.
Built on Azure Functions for scalable, cost-effective cloud deployment."
              tags={["Python", "Azure Functions", "yfinance", "REST API"]}
              link="https://github.com/KyunSC/azure-market-data"
            />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-24">
          <h2 className="mb-8 text-3xl font-bold">
            Let&apos;s <span className="text-[#22c55e]">Connect</span>
          </h2>
          <p className="mb-6 text-lg text-zinc-600 dark:text-zinc-400">
            I&apos;m always open to discussing new projects, opportunities, or just having a chat about technology.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:exsunnychen2006@gmail.com"
              className="flex items-center gap-2 rounded-lg border-2 border-[#22c55e] px-6 py-3 font-medium transition-all hover:bg-[#22c55e] hover:text-white hover:shadow-lg hover:shadow-[#22c55e]/30"
            >
              Email
            </a>
            <a
              href="https://github.com/KyunSC"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border-2 border-[#22c55e] px-6 py-3 font-medium transition-all hover:bg-[#22c55e] hover:text-white hover:shadow-lg hover:shadow-[#22c55e]/30"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sunny-chen-software/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border-2 border-[#22c55e] px-6 py-3 font-medium transition-all hover:bg-[#22c55e] hover:text-white hover:shadow-lg hover:shadow-[#22c55e]/30"
            >
              LinkedIn
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-200 pt-8 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          <p>&copy; 2026 Sunny Chen. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
