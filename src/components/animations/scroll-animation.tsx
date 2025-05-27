"use client";

import { ReactNode, useRef } from "react";
import {
  motion,
  useInView,
  Variants,
} from "framer-motion";

type AnimationDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "rotate"
  | "fade";
type AnimationTiming = "stagger" | "spring" | "tween";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  direction?: AnimationDirection;
  duration?: number;
  delay?: number;
  timing?: AnimationTiming;
  threshold?: number;
  once?: boolean;
  staggerChildren?: number;
  distance?: number;
  scale?: number;
  rotate?: number;
}

export function ScrollAnimation({
  children,
  className = "",
  direction = "up",
  duration = 0.4, // Reduced from 0.6
  delay = 0,
  timing = "spring",
  threshold = 0.05, // Reduced from 0.2
  once = true, // Changed to true for better performance
  staggerChildren = 0.05, // Reduced from 0.1
  distance = 30, // Reduced from 50
  scale = 0.95, // Changed from 0.9
  rotate = 5, // Reduced from 10
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  // Define animation variants based on direction
  const getVariants = (): Variants => {
    const baseTransition =
      timing === "spring"
        ? { type: "spring", stiffness: 500, damping: 25, delay: delay * 0.5 } // Faster spring
        : timing === "stagger"
        ? { staggerChildren, delayChildren: delay * 0.5 } // Reduced delay
        : { duration, ease: [0.25, 0.1, 0.25, 1], delay: delay * 0.5 }; // Faster easing

    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: distance },
          visible: {
            opacity: 1,
            y: 0,
            transition: baseTransition,
          },
        };
      case "down":
        return {
          hidden: { opacity: 0, y: -distance },
          visible: {
            opacity: 1,
            y: 0,
            transition: baseTransition,
          },
        };
      case "left":
        return {
          hidden: { opacity: 0, x: distance },
          visible: {
            opacity: 1,
            x: 0,
            transition: baseTransition,
          },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: -distance },
          visible: {
            opacity: 1,
            x: 0,
            transition: baseTransition,
          },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale },
          visible: {
            opacity: 1,
            scale: 1,
            transition: baseTransition,
          },
        };
      case "rotate":
        return {
          hidden: { opacity: 0, rotate, scale: scale },
          visible: {
            opacity: 1,
            rotate: 0,
            scale: 1,
            transition: baseTransition,
          },
        };
      case "fade":
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: baseTransition,
          },
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

// For staggered children animations
export function ScrollAnimationItem({
  children,
  className = "",
  direction = "up",
  distance = 15, // Reduced from 20
  scale = 0.97, // Changed from 0.95
  rotate = 3, // Reduced from 5
}: Omit<
  ScrollAnimationProps,
  "once" | "threshold" | "delay" | "duration" | "timing" | "staggerChildren"
>) {
  // Define animation variants based on direction
  const getVariants = (): Variants => {
    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: distance },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
          },
        };
      case "down":
        return {
          hidden: { opacity: 0, y: -distance },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
          },
        };
      case "left":
        return {
          hidden: { opacity: 0, x: distance },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
          },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: -distance },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
          },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
          },
        };
      case "rotate":
        return {
          hidden: { opacity: 0, rotate, scale: scale },
          visible: {
            opacity: 1,
            rotate: 0,
            scale: 1,
            transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
          },
        };
      case "fade":
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
          },
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
