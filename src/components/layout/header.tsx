"use client";

import { useNavigation } from "@/context/navigation-context";
import { useTheme } from "@/context/theme-context";
import { Moon, Sun, Home, User, FileText, Briefcase, Mail } from "lucide-react";

export function Header() {
  const { isSidebarOpen, toggleSidebar, activeSection, scrollToSection } = useNavigation();
  const { theme, toggleTheme } = useTheme();
  const isScrolled = activeSection !== "home";

  const navItems = [
    { title: "Home", href: "#home", icon: <Home className="h-4 w-4" /> },
    { title: "About", href: "#about", icon: <User className="h-4 w-4" /> },
    { title: "Resume", href: "#resume", icon: <FileText className="h-4 w-4" /> },
    { title: "Portfolio", href: "#portfolio", icon: <Briefcase className="h-4 w-4" /> },
    { title: "Contact", href: "#contact", icon: <Mail className="h-4 w-4" /> },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm transition-all duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className={`flex items-center justify-between px-4 md:px-6 transition-all duration-300 ${
        isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
      } ${isScrolled ? 'h-12' : 'h-16'}`}>

        {/* Empty div for left side spacing on mobile */}
        <div className="w-8 h-8 lg:hidden"></div>
        {/* Logo or brand name for desktop */}
        <div className="hidden lg:block">
          <h1 className={`font-bold gradient-text transition-all duration-300 ${isScrolled ? 'text-base' : 'text-xl'}`}>Haroon Aawan</h1>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 ${isScrolled ? 'px-3 py-1 text-sm' : 'px-4 py-2'} rounded-md transition-all duration-300 ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-background/90 hover:text-primary"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href.substring(1));
                }}
              >
                <span className={isActive ? "text-primary" : ""}>{item.icon}</span>
                <span className={isScrolled ? "hidden md:inline" : ""}>{item.title}</span>
              </a>
            );
          })}
        </nav>

        {/* Theme toggle - positioned on the right side */}
        <button
          className="p-2 rounded-full bg-primary/10 backdrop-blur-xl border border-primary/30 shadow-sm hover:bg-primary/20 transition-all duration-300 hover:scale-110 fixed top-3 right-3 lg:static"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          ) : (
            <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          )}
        </button>
      </div>
    </header>
  );
}
