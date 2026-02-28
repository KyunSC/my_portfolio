"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function HeroAnimations({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  const items = Array.isArray(children) ? children : [children];

  if (shouldReduceMotion) {
    return <div className="flex flex-wrap gap-4">{children}</div>;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {items.map((child, i) => (
        <motion.div key={i} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          {child}
        </motion.div>
      ))}
    </div>
  );
}
