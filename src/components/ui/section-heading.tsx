"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  // Animation variants for the heading
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Animation variants for the underline
  const underlineVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  // Animation variants for the subtitle
  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  return (
    <div className={`mb-8 ${className}`}>
      <motion.h2
        className="text-3xl font-bold"
        initial="hidden"
        animate="visible"
        variants={headingVariants}
      >
        {title}
      </motion.h2>
      
      <motion.div
        className="h-1 w-full bg-primary/30 mt-2 rounded-full overflow-hidden"
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="h-full bg-primary rounded-full"
          variants={underlineVariants}
        />
      </motion.div>
      
      {subtitle && (
        <motion.p
          className="text-muted-foreground mt-3"
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
