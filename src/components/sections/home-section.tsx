"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TypingEffect } from "@/components/animations/typing-effect";
import { SectionTransition } from "@/components/animations/section-transition";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useNavigation } from "@/context/navigation-context";

const quotes = [
  "Craft seamless digital experiences with clear purpose",
  "Turn ideas into elegant, user‑focused designs",
  "Build and scale robust backends using MERN, PHP, MySQL, and MongoDB",
  "Integrate API's flawlessly to bring your vision to life",
];

const skills = [
  "MERN & PHP Full‑Stack Development",
  "Responsive & Adaptive UI/UX Design",
  "Robust Backend Architectures MySQL, MongoDB",
  "API Design, Integration & Database Management",
];

export function HomeSection() {
  const { scrollToSection } = useNavigation();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [showQuote, setShowQuote] = useState(true);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setShowQuote(false);
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
        setShowQuote(true);
      }, 500);
    }, 5000);

    const skillInterval = setInterval(() => {
      setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
    }, 5000);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(skillInterval);
    };
  }, []);

  return (
    <SectionTransition className="flex flex-col items-center justify-center text-center py-8 relative w-[100%]">
      <motion.div
        className="w-[100%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* <motion.h2
          className="text-2xl font-bold mb-6 gradient-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Home
        </motion.h2> */}

        <TypingEffect
          text="Hello, I'm Haroon Aawan"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6"
          delay={300}
          speed={70}
        />

        <motion.div
          className="h-8 sm:h-10 md:h-12 mb-4 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.div
            key={currentQuoteIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showQuote ? 1 : 0, y: showQuote ? 0 : -20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-base sm:text-lg md:text-2xl font-medium text-foreground/80"
          >
            {quotes[currentQuoteIndex]}
          </motion.div>
        </motion.div>

        <motion.div
          className="h-6 sm:h-8 md:h-10 mb-6 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.div
            key={currentSkillIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm md:text-lg text-muted-foreground"
          >
            {skills[currentSkillIndex]}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <Button
            size="default"
            className="text-xs sm:text-sm md:text-base"
            onClick={() => scrollToSection("portfolio")}
          >
            View My Work
          </Button>
          <Button
            size="default"
            variant="outline"
            className="text-xs sm:text-sm md:text-base"
            onClick={() => scrollToSection("contact")}
          >
            Contact Me
          </Button>
        </motion.div>

        <motion.div
          className="scroll-down-indicator mt-10 relative left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="opacity-80 flex flex-col items-center"
          >
            <div className="relative w-6 h-10 border-2 border-primary/60 rounded-full mb-1">
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-primary rounded-full"
              />
            </div>
            <div className="flex flex-col items-center">
              <ChevronDown className="h-4 w-4 text-primary" />
              <span className="text-[10px] sm:text-xs text-primary/80">
                Scroll Down
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </SectionTransition>
  );
}
