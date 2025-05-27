"use client";

import { useNavigation } from "@/context/navigation-context";
import {
  Home,
  User,
  FileText,
  Briefcase,
  Mail,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export function Sidebar() {
  const {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
    activeSection,
    scrollToSection,
  } = useNavigation();
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted before animations
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems = [
    { title: "Home", href: "#home", icon: <Home className="h-5 w-5" /> },
    { title: "About", href: "#about", icon: <User className="h-5 w-5" /> },
    {
      title: "Resume",
      href: "#resume",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Portfolio",
      href: "#portfolio",
      icon: <Briefcase className="h-5 w-5" />,
    },
    { title: "Contact", href: "#contact", icon: <Mail className="h-5 w-5" /> },
  ];

  const handleNavClick = (section: string) => {
    scrollToSection(section);
    closeSidebar();
  };

  // Animation variants for better organization
  const buttonVariants = {
    closed: {
      x: prefersReducedMotion ? 0 : -20,
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.8,
    },
    open: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
  };

  // Spring configuration for smooth animations
  const springConfig = {
    type: "spring" as const,
    stiffness: prefersReducedMotion ? 400 : 300,
    damping: prefersReducedMotion ? 40 : 30,
    mass: 1,
  };

  const fastSpringConfig = {
    type: "spring" as const,
    stiffness: 400,
    damping: 35,
    mass: 0.8,
  };

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  // Enhanced Mobile open button with better animations
  const MobileOpenButton = () => (
    <motion.button
      className="fixed top-3 left-3 z-[60] flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 backdrop-blur-xl border border-primary/30 shadow-md hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/20 lg:hidden"
      onClick={toggleSidebar}
      aria-label="Open sidebar"
      initial={false}
      variants={buttonVariants}
      animate={isSidebarOpen ? "closed" : "open"}
      transition={fastSpringConfig}
      whileHover={{
        scale: 1.1,
        backgroundColor: "rgba(var(--primary), 0.2)",
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
      style={{ pointerEvents: isSidebarOpen ? "none" : "auto" }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isSidebarOpen ? -90 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
      </motion.div>
    </motion.button>
  );

  return (
    <>
      {/* Mobile open button */}
      <MobileOpenButton />

      {/* Mobile sidebar - Fixed to work properly */}
      <AnimatePresence>
        {(isSidebarOpen || true) && (
          <motion.div
            className="fixed inset-y-0 left-0 z-50 w-64 bg-background/80 backdrop-blur-xl border-r border-border/40 lg:hidden overflow-y-auto"
            initial={{
              x: "-100%",
              opacity: 0,
              rotateY: prefersReducedMotion ? 0 : 30,
            }}
            animate={
              isSidebarOpen
                ? { x: 0, opacity: 1, rotateY: 0 }
                : {
                    x: "-100%",
                    opacity: 0,
                    rotateY: prefersReducedMotion ? 0 : 30,
                  }
            }
            transition={springConfig}
            style={{ originX: 0 }}
          >
            {/* Close button inside mobile sidebar */}
            <motion.button
              className="absolute top-3 right-3 z-[60] flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 backdrop-blur-xl border border-primary/30 shadow-md hover:bg-primary/20"
              onClick={closeSidebar}
              aria-label="Close sidebar"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </motion.button>

            <div className="pt-16">
              <SidebarContent
                activeSection={activeSection}
                handleNavClick={handleNavClick}
                navItems={navItems}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar with better animations */}
      <div className="hidden lg:block">
        <motion.aside
          className="fixed left-0 top-0 h-screen flex flex-col border-r border-border/40 bg-background/80 backdrop-blur-xl"
          initial={false}
          animate={{
            width: isSidebarOpen ? 256 : 40,
          }}
          transition={springConfig}
          style={{ originX: 0 }}
        >
          {/* Toggle button */}
          <motion.button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-[60] flex items-center justify-center w-10 h-12"
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            initial={false}
            animate={{
              x: isSidebarOpen ? 0 : 2,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center justify-center w-6 h-12 rounded-r-lg bg-transparent backdrop-blur-xl border-primary/30 shadow-md hover:scale-115 transition-all duration-100 cursor-pointer">
              <motion.span
                className="text-primary"
                initial={false}
                animate={{ rotate: isSidebarOpen ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.span>
            </div>
          </motion.button>

          {/* Sidebar content */}
          <motion.div
            className="pt-16 w-64 overflow-hidden"
            initial={false}
            animate={{
              opacity: isSidebarOpen ? 1 : 0,
              x: isSidebarOpen ? 0 : -20,
            }}
            transition={{
              duration: 0.3,
              delay: isSidebarOpen ? 0.2 : 0,
            }}
          >
            <SidebarContent
              activeSection={activeSection}
              handleNavClick={handleNavClick}
              navItems={navItems}
            />
          </motion.div>
        </motion.aside>
      </div>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarContent({
  activeSection,
  handleNavClick,
  navItems,
}: {
  activeSection: string;
  handleNavClick: (section: string) => void;
  navItems: { title: string; href: string; icon: React.ReactNode }[];
}) {
  return (
    <div className="flex h-full flex-col glass-card overflow-y-auto max-h-screen sidebar-content">
      {/* Profile section */}
      <div className="flex flex-col items-center p-6 border-b border-border/40">
        <div className="h-24 w-24 rounded-full bg-primary/20 mb-4 overflow-hidden shadow-lg">
          <Image
            src="/images/profile.jpg"
            alt="Haroon Aawan"
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-xl font-bold gradient-text">Haroon Aawan</h1>
        <p className="text-muted-foreground mt-1">Web Developer</p>
        <div className="flex gap-3 mt-4">
          <a
            href="#"
            className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
          >
            <TwitterIcon className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-2 px-3">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300 relative overflow-hidden ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium shadow-md"
                      : "hover:bg-background/90"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href.substring(1));
                  }}
                >
                  <span className="text-primary">{item.icon}</span>
                  <span>{item.title}</span>
                  {isActive && (
                    <div className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-md" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-border/40 p-4">
        <p className="text-center text-xs text-muted-foreground">
          © 2024 Haroon Aawan
        </p>
      </div>
    </div>
  );
}
