"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useInView } from "framer-motion";

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function SectionTransition({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true, // Animation only happens once
    amount: 0.05, // Reduced from 0.15 - trigger with just 5% visibility
    margin: "0px 0px -100px 0px" // Reduced margin for more reliable triggering
  });

  // Define animation variants based on direction
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 25 : direction === "down" ? -25 : 0,
      x: direction === "left" ? 25 : direction === "right" ? -25 : 0,
      scale: 0.98, // Slight scale for smoother appearance
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4, // Reduced from 0.6
        delay: delay * 0.5, // Cut delay in half
        ease: [0.25, 0.1, 0.25, 1], // Faster easing curve
        staggerChildren: 0.05, // Reduced from 0.08
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`w-[100%] min-h-[calc(100vh-6rem)] smooth-scroll ${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      <div className="w-[100%] mx-auto">
        {children}
      </div>
    </motion.div>
  );
}
