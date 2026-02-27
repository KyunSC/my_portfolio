"use client";

import { motion } from "framer-motion";

interface SkillIconProps {
  icon: React.ReactNode;
  label: string;
}

export default function SkillIcon({ icon, label }: SkillIconProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 w-14">
      <motion.span
        className="text-4xl"
        initial={{ scale: 1, filter: "drop-shadow(0 0 0px transparent)" }}
        whileHover={{ scale: 1.15, filter: "drop-shadow(0 0 4px currentColor)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {icon}
      </motion.span>
      <span className="text-[11px] text-muted-foreground text-center leading-tight">{label}</span>
    </div>
  );
}
