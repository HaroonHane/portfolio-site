"use client";

import { SectionTransition } from "@/components/animations/section-transition";
import { Card, CardContent } from "@/components/ui/card";
import { Education, Experience, Service } from "@/types/index";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Download,
  Code,
  Smartphone,
  Palette,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ScrollAnimation,
  ScrollAnimationItem,
} from "@/components/animations/scroll-animation";
import { AnimatedText } from "@/components/animations/animated-text";
import { ParallaxSection } from "@/components/animations/parallax-section";
import { useState } from "react";

const education: Education[] = [
  {
    degree: "Bachelor of Computer Science",
    institution: "University Name",
    period: "2020 - 2024",
    description:
      "Graduated with a degree in Computer Science with a focus on web development and software engineering.",
  },
];

const experience: Experience[] = [
  {
    position: "Full Stack Developer",
    company: "TechCreator",
    period: "2024 - Present",
    description:
      "Working as a Full Stack Developer, building complete web applications using modern technologies and best practices.",
  },
  {
    position: "Full Stack Developer",
    company: "Upwork & Fiverr",
    period: "2023 - 2024",
    description:
      "Delivered full stack web solutions for various clients, focusing on modern web technologies and responsive design.",
  },
  {
    position: "Full Stack Development Intern",
    company: "TechCreator",
    period: "2023",
    description:
      "Contributed to full stack development projects, working with both frontend and backend technologies while learning industry best practices.",
  },
];

const services: Service[] = [
  {
    title: "Web Development",
    description:
      "Creating responsive and user-friendly websites using modern technologies.",
    icon: "Code",
  },
  {
    title: "Responsive Design",
    description:
      "Ensuring websites look great on all devices, from desktops to smartphones.",
    icon: "Smartphone",
  },
  {
    title: "UI/UX Design",
    description: "Designing intuitive and visually appealing user interfaces.",
    icon: "Palette",
  },
  {
    title: "Backend Development",
    description: "Building robust server-side applications and APIs.",
    icon: "Server",
  },
];

const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case "Code":
      return <Code className="h-6 w-6 text-primary" />;
    case "Smartphone":
      return <Smartphone className="h-6 w-6 text-primary" />;
    case "Palette":
      return <Palette className="h-6 w-6 text-primary" />;
    case "Server":
      return <Server className="h-6 w-6 text-primary" />;
    default:
      return <Code className="h-6 w-6 text-primary" />;
  }
};

const ResumeItem = ({
  title,
  subtitle,
  period,
  description,
  icon,
  index = 0,
}: {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  index?: number;
}) => {
  return (
    <ScrollAnimationItem direction="left" className="mb-6 relative pl-8">
      <motion.div
        className="absolute left-0 top-0 h-full w-0.5 bg-border"
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
      />

      <motion.div
        className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-primary"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
          delay: 0.4 + index * 0.1,
        }}
      />

      <motion.div
        className="absolute left-[-14px] top-[-6px] h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
          delay: 0.5 + index * 0.1,
        }}
        whileHover={{ scale: 1.2, backgroundColor: "rgba(144, 4, 204, 0.3)" }}
      >
        {icon}
      </motion.div>

      <motion.h3
        className="text-lg font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
      >
        {title}
      </motion.h3>

      <motion.div
        className="flex justify-between items-center mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
      >
        <p className="text-primary">{subtitle}</p>
        <motion.span
          className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full"
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(144, 4, 204, 0.1)",
          }}
        >
          {period}
        </motion.span>
      </motion.div>

      <motion.p
        className="text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
      >
        {description}
      </motion.p>
    </ScrollAnimationItem>
  );
};

export function ResumeSection() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SectionTransition className="py-8">
      <AnimatedText
        text="My Resume"
        className="text-3xl font-bold mb-8 gradient-text"
        type="chars"
        animation="bounce"
        delay={0.2}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-full">
        <ScrollAnimation direction="up" delay={0.3}>
          <Card className="glass-card">
            <CardContent className="card-content">
              <motion.div
                className="flex items-center mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.div
                  className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <GraduationCap className="h-5 w-5 text-primary" />
                </motion.div>
                <AnimatedText
                  text="Education"
                  className="text-lg sm:text-xl font-semibold"
                  type="chars"
                  animation="slide-up"
                  delay={0.5}
                />
              </motion.div>

              <ScrollAnimation
                direction="left"
                timing="stagger"
                staggerChildren={0.1}
                delay={0.5}
              >
                {education.map((item, index) => (
                  <ResumeItem
                    key={index}
                    title={item.degree}
                    subtitle={item.institution}
                    period={item.period}
                    description={item.description}
                    icon={<GraduationCap className="h-3 w-3 text-primary" />}
                    index={index}
                  />
                ))}
              </ScrollAnimation>
            </CardContent>
          </Card>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={0.4}>
          <Card className="glass-card">
            <CardContent className="card-content">
              <motion.div
                className="flex items-center mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.div
                  className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-4"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Briefcase className="h-5 w-5 text-primary" />
                </motion.div>
                <AnimatedText
                  text="Experience"
                  className="text-lg sm:text-xl font-semibold"
                  type="chars"
                  animation="slide-up"
                  delay={0.6}
                />
              </motion.div>

              <ScrollAnimation
                direction="left"
                timing="stagger"
                staggerChildren={0.1}
                delay={0.6}
              >
                {experience.map((item, index) => (
                  <ResumeItem
                    key={index}
                    title={item.position}
                    subtitle={item.company}
                    period={item.period}
                    description={item.description}
                    icon={<Briefcase className="h-3 w-3 text-primary" />}
                    index={index}
                  />
                ))}
              </ScrollAnimation>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>

      <ParallaxSection speed={0.05} direction="vertical" className="mt-8">
        <ScrollAnimation direction="up" delay={0.5}>
          <Card className="glass-card">
            <CardContent className="card-content">
              <AnimatedText
                text="Services I Offer"
                className="text-xl font-semibold mb-6"
                type="words"
                animation="slide-up"
                delay={0.6}
              />

              <ScrollAnimation
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-full"
                direction="scale"
                timing="stagger"
                staggerChildren={0.1}
                delay={0.7}
              >
                {services.map((service, index) => (
                  <ScrollAnimationItem
                    key={index}
                    direction="up"
                    className="flex flex-col items-center text-center"
                  >
                    <motion.div
                      className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center mb-4"
                      whileHover={{
                        scale: 1.1,
                        rotate: index % 2 === 0 ? 5 : -5,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      {getServiceIcon(service.icon)}
                    </motion.div>
                    <motion.h4
                      className="font-semibold mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.05 }}
                    >
                      {service.title}
                    </motion.h4>
                    <motion.p
                      className="text-sm text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.05 }}
                    >
                      {service.description}
                    </motion.p>
                  </ScrollAnimationItem>
                ))}
              </ScrollAnimation>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </ParallaxSection>

      <motion.div
        className="flex justify-center mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <a
            href="https://drive.google.com/file/d/1ujCOLwbDBBZ0_KH0B6NAECARaekVTqu2/view"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              setIsLoading(true);
              // Simulate loading time
              setTimeout(() => {
                window.open(
                  "https://drive.google.com/file/d/1ujCOLwbDBBZ0_KH0B6NAECARaekVTqu2/view",
                  "_blank"
                );
                setIsLoading(false);
              }, 1500);
            }}
          >
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2 h-4 w-4"
                  >
                    ◌
                  </motion.div>
                  Preparing CV...
                </motion.div>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" /> Download CV
                </>
              )}
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </SectionTransition>
  );
}
