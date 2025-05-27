"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  threshold?: number;
  delay?: number;
  duration?: number;
  type?: "words" | "chars" | "lines";
  animation?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "bounce" | "wave";
}

export function AnimatedText({
  text,
  className = "",
  once = false,
  threshold = 0.2,
  delay = 0,
  duration = 0.05,
  type = "words",
  animation = "fade",
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  
  // Split text based on type
  const splitText = () => {
    if (type === "chars") {
      return text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={getVariants(animation)}
          custom={index}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ));
    } else if (type === "words") {
      return text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          variants={getVariants(animation)}
          custom={index}
        >
          {word}
        </motion.span>
      ));
    } else {
      // lines
      return text.split("\n").map((line, index) => (
        <motion.div
          key={index}
          className="block"
          variants={getVariants(animation)}
          custom={index}
        >
          {line}
        </motion.div>
      ));
    }
  };
  
  // Define animation variants
  const getVariants = (animationType: string): Variants => {
    switch (animationType) {
      case "slide-up":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
              delay: delay + i * duration,
              duration: 0.5,
              ease: [0.2, 0.65, 0.3, 0.9],
            },
          }),
        };
      case "slide-down":
        return {
          hidden: { y: -20, opacity: 0 },
          visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
              delay: delay + i * duration,
              duration: 0.5,
              ease: [0.2, 0.65, 0.3, 0.9],
            },
          }),
        };
      case "slide-left":
        return {
          hidden: { x: 20, opacity: 0 },
          visible: (i) => ({
            x: 0,
            opacity: 1,
            transition: {
              delay: delay + i * duration,
              duration: 0.5,
              ease: [0.2, 0.65, 0.3, 0.9],
            },
          }),
        };
      case "slide-right":
        return {
          hidden: { x: -20, opacity: 0 },
          visible: (i) => ({
            x: 0,
            opacity: 1,
            transition: {
              delay: delay + i * duration,
              duration: 0.5,
              ease: [0.2, 0.65, 0.3, 0.9],
            },
          }),
        };
      case "bounce":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
              delay: delay + i * duration,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 10,
            },
          }),
        };
      case "wave":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
              delay: delay + i * duration,
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 20,
            },
          }),
        };
      case "fade":
      default:
        return {
          hidden: { opacity: 0 },
          visible: (i) => ({
            opacity: 1,
            transition: {
              delay: delay + i * duration,
              duration: 0.5,
            },
          }),
        };
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: duration,
      },
    },
  };
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {splitText()}
    </motion.div>
  );
}
