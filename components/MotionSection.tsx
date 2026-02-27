"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeUp, fadeIn, fadeLeft, fadeRight, defaultTransition } from "@/lib/motion";

const variantMap: Record<string, Variants> = {
  "fade-up": fadeUp,
  "fade-in": fadeIn,
  "fade-left": fadeLeft,
  "fade-right": fadeRight,
};

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade-up" | "fade-in" | "fade-left" | "fade-right";
}

export default function MotionSection({
  children,
  className = "",
  delay = 0,
  animation = "fade-up",
}: MotionSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variantMap[animation]}
      transition={{ ...defaultTransition, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
