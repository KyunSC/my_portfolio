"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Project from "@/components/Project";
import MotionSection from "@/components/MotionSection";

interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  inProgress?: boolean;
}

interface ProjectTabsProps {
  completed: ProjectData[];
  inProgress: ProjectData[];
}

export default function ProjectTabs({ completed, inProgress }: ProjectTabsProps) {
  const [activeTab, setActiveTab] = useState("completed");

  const renderProjects = (projects: ProjectData[]) => (
    <AnimatePresence mode="wait">
      <motion.div
        key={projects === completed ? "completed" : "in-progress"}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
      >
        <div className="space-y-6">
          {projects.map((project, i) => (
            <MotionSection key={project.title} delay={i * 80}>
              <Project {...project} />
            </MotionSection>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6">
        <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
        <TabsTrigger value="in-progress">In Progress ({inProgress.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="completed">
        {renderProjects(completed)}
      </TabsContent>
      <TabsContent value="in-progress">
        {renderProjects(inProgress)}
      </TabsContent>
    </Tabs>
  );
}
