"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface NavigationContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  scrollToSection: (sectionId: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Function to scroll to a section
  const scrollToSection = (sectionId: string) => {
    // Prevent scroll detection while programmatically scrolling
    setIsScrolling(true);

    // Update active section immediately
    setActiveSection(sectionId);

    // Get the element
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate position - adjust header offset based on which section
      const headerOffset = activeSection === "home" ? 80 : 60;

      // Get the element's position relative to the viewport
      const elementPosition = element.getBoundingClientRect().top;
      // Add current scroll position to get absolute position
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      // Scroll to the element with smooth behavior
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Reset scrolling flag after animation completes
      // Use a longer timeout to ensure animation is complete
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    } else {
      // If element not found, reset scrolling flag
      setIsScrolling(false);
    }
  };

  // Simple scroll detection - only update when not programmatically scrolling
  // Handle horizontal swipe gestures
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX === null) return;

      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX;

      // Minimum swipe distance (in pixels)
      const minSwipeDistance = 50;

      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          // Swiped right - open sidebar
          setIsSidebarOpen(true);
        } else {
          // Swiped left - close sidebar
          setIsSidebarOpen(false);
        }
      }

      setTouchStartX(null);
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [touchStartX]);

  useEffect(() => {
    // Debounce function to prevent rapid firing
    const debounce = (callback: Function, wait: number) => {
      let timeoutId: NodeJS.Timeout | null = null;
      return (...args: any[]) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback(...args), wait);
      };
    };

    const handleScroll = debounce(() => {
      // Skip if we're programmatically scrolling
      if (isScrolling) return;

      const sections = ["home", "about", "resume", "portfolio", "contact"];

      // Get viewport height and adjust for header
      const viewportHeight = window.innerHeight;
      const headerHeight = 64; // 4rem = 64px
      const adjustedViewportTop = headerHeight;

      // Find which section is most in view
      let currentSection = "";
      let maxVisiblePercentage = 0;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();

          // Calculate the visible height of the section
          const sectionHeight = rect.height;
          const visibleTop = Math.max(rect.top, adjustedViewportTop);
          const visibleBottom = Math.min(rect.bottom, viewportHeight);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          // Calculate what percentage of the section is visible
          const visiblePercentage = visibleHeight / sectionHeight;

          // Special case for the top section - if it's at the top of the page
          if (
            section === "home" &&
            rect.top <= adjustedViewportTop &&
            rect.bottom > adjustedViewportTop
          ) {
            currentSection = "home";
            break;
          }

          // For other sections, use the one with the highest visible percentage
          // But add a threshold to prevent tiny visibility from triggering
          if (
            visiblePercentage > maxVisiblePercentage &&
            visiblePercentage > 0.2
          ) {
            maxVisiblePercentage = visiblePercentage;
            currentSection = section;
          }

          // If we're very close to the top of a section, prioritize it
          if (rect.top > 0 && rect.top < 100 && visiblePercentage > 0.4) {
            currentSection = section;
            break;
          }
        }
      }

      // Only update if we found a section and it's different from current
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    }, 50); // Faster debounce for more responsive updates

    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check when component mounts
    setTimeout(() => handleScroll(), 500);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, isScrolling]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <NavigationContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        activeSection,
        setActiveSection,
        scrollToSection,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
