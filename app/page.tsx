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
            Full Stack Developer & Creative Problem Solver
          </p>
          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            I build exceptional digital experiences that combine clean code with thoughtful design.
            Passionate about creating scalable applications and solving complex problems.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-lg bg-foreground px-6 py-3 font-medium text-background transition-all hover:opacity-90"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              className="rounded-lg border border-zinc-300 px-6 py-3 font-medium transition-all hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              View Projects
            </a>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-24">
          <h2 className="mb-8 text-3xl font-bold">About Me</h2>
          <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
            <p className="leading-relaxed">
              I&apos;m a passionate developer with expertise in modern web technologies. I love turning ideas
              into reality through code and constantly learning new technologies to stay at the forefront
              of web development.
            </p>
            <p className="leading-relaxed">
              When I&apos;m not coding, you can find me contributing to open-source projects, writing technical
              articles, or exploring new frameworks and tools.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-24">
          <h2 className="mb-8 text-3xl font-bold">Skills & Technologies</h2>
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
                <li>REST APIs</li>
                <li>Databases</li>
              </ul>
            </div>
            <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
              <h3 className="mb-3 text-lg font-semibold">Tools & Others</h3>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>Git & GitHub</li>
                <li>VS Code</li>
                <li>Docker</li>
                <li>CI/CD</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-24">
          <h2 className="mb-8 text-3xl font-bold">Featured Projects</h2>
          <div className="space-y-6">
            <div className="rounded-lg border border-zinc-200 p-6 transition-all hover:shadow-lg dark:border-zinc-800">
              <h3 className="mb-2 text-xl font-semibold">Project Name</h3>
              <p className="mb-4 text-zinc-600 dark:text-zinc-400">
                A brief description of your amazing project and what technologies you used to build it.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-900">
                  React
                </span>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-900">
                  TypeScript
                </span>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-900">
                  Next.js
                </span>
              </div>
            </div>
            <div className="rounded-lg border border-zinc-200 p-6 transition-all hover:shadow-lg dark:border-zinc-800">
              <h3 className="mb-2 text-xl font-semibold">Another Project</h3>
              <p className="mb-4 text-zinc-600 dark:text-zinc-400">
                Description of another impressive project showcasing your skills and creativity.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-900">
                  Node.js
                </span>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-900">
                  MongoDB
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-24">
          <h2 className="mb-8 text-3xl font-bold">Let&apos;s Connect</h2>
          <p className="mb-6 text-lg text-zinc-600 dark:text-zinc-400">
            I&apos;m always open to discussing new projects, opportunities, or just having a chat about technology.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="exsunnychen2006@gmail.com"
              className="flex items-center gap-2 rounded-lg border border-zinc-300 px-6 py-3 font-medium transition-all hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              Email
            </a>
            <a
              href="https://github.com/KyunSC"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-zinc-300 px-6 py-3 font-medium transition-all hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sunny-chen-software/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-zinc-300 px-6 py-3 font-medium transition-all hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
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
