"use client";

import { useInView } from "@/hooks/useInView";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade-up" | "fade-in" | "fade-left" | "fade-right";
}

export default function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  animation = "fade-up",
}: AnimateOnScrollProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`scroll-animate scroll-animate--${animation} ${
        inView ? "scroll-animate--visible" : ""
      } ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
