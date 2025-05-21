"use client";

import { SectionTransition } from "@/components/animations/section-transition";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Code, Lightbulb, Palette, Rocket } from "lucide-react";
import { AnimatedText } from "@/components/animations/animated-text";
import { ScrollAnimation, ScrollAnimationItem } from "@/components/animations/scroll-animation";
import { ParallaxSection } from "@/components/animations/parallax-section";

type Skill = {
  name: string;
  percentage: number;
};

const skills: Skill[] = [
  { name: "HTML & CSS", percentage: 95 },
  { name: "JavaScript", percentage: 90 },
  { name: "ReactJS", percentage: 85 },
  { name: "MERN Stack", percentage: 80 },
  { name: "Node.js & Express", percentage: 75 },
  { name: "MongoDB", percentage: 75 },
  { name: "PHP", percentage: 70 },
];

const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => {
  return (
    <ScrollAnimationItem
      className="mb-3"
      direction="left"
      distance={50}
    >
      <div className="flex flex-wrap justify-between mb-1 gap-1">
        <span className="font-medium text-xs sm:text-sm">{skill.name}</span>
        <span className="text-muted-foreground text-xs sm:text-sm whitespace-nowrap">{skill.percentage}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${skill.percentage}%` }}
          transition={{
            duration: 1,
            delay: 0.3 + (index * 0.1),
            ease: [0.22, 1, 0.36, 1]
          }}
        />
      </div>
    </ScrollAnimationItem>
  );
};

export function AboutSection() {
  return (
    <SectionTransition className="py-8">
      <AnimatedText
        text="About Me"
        className="text-3xl font-bold mb-8 gradient-text"
        type="chars"
        animation="wave"
        delay={0.2}
      />

      {/* Main content section with About Me and Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        {/* About Me content */}
        <ScrollAnimation direction="up" delay={0.3}>
          <Card className="glass-card">
            <CardContent className="card-content">
              <AnimatedText
                text="Hey there! I'm Haroon Aawan, also known as 'Hane', and I'm a Computer Science graduate with a passion for web development."
                className="mb-4 text-foreground/90"
                type="words"
                animation="slide-up"
                delay={0.4}
                duration={0.03}
              />

              <ParallaxSection speed={0.1} direction="vertical">
                <p className="mb-4 text-foreground/90 text-sm leading-relaxed">
                  As a <span className="highlight">passionate front-end developer</span>, I specialize in creating <span className="highlight">visually stunning</span> and <span className="highlight">highly interactive</span> web experiences. With <span className="highlight">1.5+ years of hands-on experience</span>, I've developed a keen eye for detail and the technical skills to transform complex requirements into elegant solutions.
                </p>
              </ParallaxSection>

              <ParallaxSection speed={0.15} direction="vertical" reverse={true}>
                <p className="text-foreground/90 text-sm leading-relaxed">
                  As a <span className="highlight">MERN stack developer</span>, I specialize in building <span className="highlight">full-stack applications</span> using <span className="text-primary/80 font-medium">MongoDB</span>, <span className="text-primary/80 font-medium">Express</span>, <span className="text-primary/80 font-medium">ReactJS</span>, and <span className="text-primary/80 font-medium">Node.js</span>. My expertise extends to <span className="highlight">advanced frameworks</span> like <span className="text-primary/80 font-medium">NextJS</span> and <span className="text-primary/80 font-medium">Angular</span>, creating solutions that are <span className="highlight">performant</span> and <span className="highlight">scalable</span>.
                </p>
              </ParallaxSection>

              <ScrollAnimation direction="up" delay={0.5} className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-semibold text-[10px] sm:text-sm">Name:</span>
                    <span className="text-muted-foreground text-[10px] sm:text-sm">Haroon Aawan</span>
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <span className="font-semibold text-[10px] sm:text-sm">Email:</span>
                    <span className="text-muted-foreground text-[10px] sm:text-sm w-full email-text" title="muhammadharoonawan@gmail.com">
                      muhammadharoonawan@gmail.com
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-semibold text-[10px] sm:text-sm">From:</span>
                    <span className="text-muted-foreground text-[10px] sm:text-sm">Pakistan</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-semibold text-[10px] sm:text-sm">Freelance:</span>
                    <span className="text-green-500 text-[10px] sm:text-sm">Available</span>
                  </div>
                </div>
              </ScrollAnimation>
            </CardContent>
          </Card>
        </ScrollAnimation>

        {/* My Skills content */}
        <ScrollAnimation direction="right" delay={0.4}>
          <Card className="glass-card">
            <CardContent className="card-content">
              <AnimatedText
                text="My Skills"
                className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4"
                type="chars"
                animation="bounce"
                delay={0.5}
              />

              <ScrollAnimation
                direction="left"
                timing="stagger"
                staggerChildren={0.1}
                delay={0.6}
              >
                {skills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </ScrollAnimation>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>

      {/* Services section with four cards */}
      <ScrollAnimation
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        direction="scale"
        timing="stagger"
        staggerChildren={0.1}
        delay={0.6}
      >
        <ScrollAnimationItem direction="scale">
          <Card className="glass-card p-6 py-8 h-full">
            <div className="flex flex-col items-center justify-between text-center h-full">
              <div>
                <motion.div
                  className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Code className="h-7 w-7 text-primary" />
                </motion.div>
                <h3 className="font-semibold mb-3">Clean Code</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                I write clean, maintainable, and efficient code following best practices.
              </p>
            </div>
          </Card>
        </ScrollAnimationItem>

        <ScrollAnimationItem direction="scale">
          <Card className="glass-card p-6 py-8 h-full">
            <div className="flex flex-col items-center justify-between text-center h-full">
              <div>
                <motion.div
                  className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Palette className="h-7 w-7 text-primary" />
                </motion.div>
                <h3 className="font-semibold mb-3">Creative Design</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                I create visually appealing designs that enhance user experience.
              </p>
            </div>
          </Card>
        </ScrollAnimationItem>

        <ScrollAnimationItem direction="scale">
          <Card className="glass-card p-6 py-8 h-full">
            <div className="flex flex-col items-center justify-between text-center h-full">
              <div>
                <motion.div
                  className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Lightbulb className="h-7 w-7 text-primary" />
                </motion.div>
                <h3 className="font-semibold mb-3">Problem Solving</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                I approach challenges with creative and efficient solutions.
              </p>
            </div>
          </Card>
        </ScrollAnimationItem>

        <ScrollAnimationItem direction="scale">
          <Card className="glass-card p-6 py-8 h-full">
            <div className="flex flex-col items-center justify-between text-center h-full">
              <div>
                <motion.div
                  className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Rocket className="h-7 w-7 text-primary" />
                </motion.div>
                <h3 className="font-semibold mb-3">Fast Delivery</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                I deliver high-quality projects on time and within budget.
              </p>
            </div>
          </Card>
        </ScrollAnimationItem>
      </ScrollAnimation>
    </SectionTransition>
  );
}
