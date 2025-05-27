"use client";


import { HomeSection } from "@/components/sections/home-section";
import { AboutSection } from "@/components/sections/about-section";
import { ResumeSection } from "@/components/sections/resume-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ContactSection } from "@/components/sections/contact-section";
import { motion } from "framer-motion";

export default function Home() {
  // Animation variants for page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-[calc(100vh-4rem)] w-full"
    >
      {/* Main scroll container with smooth scrolling */}
      <div className="scroll-container w-full">
        <section id="home" className="section w-full">
          <HomeSection />
        </section>

        <section id="about" className="section w-full">
          <AboutSection />
        </section>

        <section id="resume" className="section w-full">
          <ResumeSection />
        </section>

        <section id="portfolio" className="section w-full">
          <PortfolioSection />
        </section>

        <section id="contact" className="section w-full">
          <ContactSection />
        </section>
      </div>
    </motion.div>
  );
}
