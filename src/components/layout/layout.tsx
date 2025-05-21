"use client";

import { useNavigation } from "@/context/navigation-context";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { BackgroundParticles } from "@/components/animations/background-particles";
import { motion, AnimatePresence } from "framer-motion";

export function Layout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, activeSection } = useNavigation();

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background with gradient and particles effect */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-background/80 opacity-80">
        <BackgroundParticles />
      </div>

      <Header />
      <Sidebar />

      <main className={`transition-all duration-200 smooth-scroll ${activeSection === "home" ? "pt-16" : "pt-12"} min-h-screen w-[90%] mx-auto ${isSidebarOpen ? "lg:pl-64" : "lg:pl-0"} overscroll-none`}>
        <AnimatePresence mode="wait">
          <motion.div
            key="main-content"
            initial={{ opacity: 0, y: 10 }} // Reduced from 20
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} // Reduced from -20
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }} // Faster transition
            className="w-[100%] smooth-scroll"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
