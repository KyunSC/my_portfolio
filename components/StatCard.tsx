"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export default function StatCard({ value, label, icon }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(shouldReduceMotion ? value : "0");

  useEffect(() => {
    if (shouldReduceMotion || !isInView) {
      if (shouldReduceMotion) setDisplayValue(value);
      return;
    }

    const numeric = parseInt(value);
    if (isNaN(numeric)) {
      setDisplayValue(value);
      return;
    }

    const suffix = value.replace(/\d+/, "");
    let current = 0;
    const steps = 30;
    const increment = numeric / steps;
    const interval = 1500 / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numeric) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current) + suffix);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isInView, value, shouldReduceMotion]);

  return (
    <Card ref={ref} className="text-center p-6 transition-all hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5">
      <CardContent className="p-0">
        {icon && (
          <div className="flex justify-center mb-2 text-primary">
            {icon}
          </div>
        )}
        <p className="text-4xl font-bold text-primary">{displayValue}</p>
        <p className="mt-1 text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
