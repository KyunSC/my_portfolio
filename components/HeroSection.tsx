"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import TerminalBio from "@/components/TerminalBio";
import { fadeUp, staggerContainer, defaultTransition } from "@/lib/motion";

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative mb-24 pt-8">
      <div className="hero-glow" />

      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: text content */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeUp}
            transition={defaultTransition}
            className="flex items-center gap-2 mb-4"
          >
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-mono text-muted-foreground">available for work</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.1 }}
            className="mb-6 text-5xl font-bold tracking-tight md:text-7xl"
          >
            Sunny Chen
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.2 }}
            className="mb-8 text-xl text-muted-foreground md:text-2xl"
          >
            Software Developer
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.2 }}
            className="mb-12 text-lg leading-relaxed text-muted-foreground"
          >
            I like building.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button asChild>
                <a href="#contact">
                  <Mail size={16} />
                  Get in Touch
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button variant="outline" asChild>
                <a href="#projects">
                  View Projects
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right: terminal — hidden on mobile */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...defaultTransition, delay: 0.4 }}
          className="hidden md:block"
        >
          <TerminalBio />
        </motion.div>
      </div>
    </section>
  );
}
