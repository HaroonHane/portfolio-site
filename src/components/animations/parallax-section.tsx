"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  overflow?: boolean;
}

export function ParallaxSection({
  children,
  className = "",
  speed = 0.2,
  direction = "vertical",
  reverse = false,
  overflow = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Calculate transform based on direction and speed
  const yRange = direction === "vertical" ? [0, reverse ? -100 * speed : 100 * speed] : [0, 0];
  const xRange = direction === "horizontal" ? [0, reverse ? -100 * speed : 100 * speed] : [0, 0];
  
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const x = useTransform(scrollYProgress, [0, 1], xRange);
  
  return (
    <div 
      ref={ref} 
      className={`${className} ${overflow ? "" : "overflow-hidden"}`}
    >
      <motion.div
        style={{ y, x }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

// For creating a parallax background effect
export function ParallaxBackground({
  children,
  className = "",
  speed = 0.1,
  bgImage,
  overlay = true,
}: ParallaxSectionProps & { bgImage: string; overlay?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Slower movement for background
  const y = useTransform(scrollYProgress, [0, 1], [0, 30 * speed]);
  
  return (
    <div 
      ref={ref} 
      className={`${className} relative overflow-hidden`}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ 
          y,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {overlay && (
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// For creating a reveal effect as you scroll
export function RevealSection({
  children,
  className = "",
  direction = "up",
  threshold = 0.2,
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Calculate transform based on direction
  let x = 0;
  let y = 0;
  
  if (direction === "up") {
    y = useTransform(scrollYProgress, [0, threshold, 1], [100, 0, 0]);
  } else if (direction === "down") {
    y = useTransform(scrollYProgress, [0, threshold, 1], [-100, 0, 0]);
  } else if (direction === "left") {
    x = useTransform(scrollYProgress, [0, threshold, 1], [100, 0, 0]);
  } else if (direction === "right") {
    x = useTransform(scrollYProgress, [0, threshold, 1], [-100, 0, 0]);
  }
  
  const opacity = useTransform(scrollYProgress, [0, threshold, 1], [0, 1, 1]);
  
  return (
    <div 
      ref={ref} 
      className={className}
    >
      <motion.div
        style={{ x, y, opacity }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
