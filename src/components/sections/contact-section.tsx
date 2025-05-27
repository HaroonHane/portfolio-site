"use client";

import { useState } from "react";
import { SectionTransition } from "@/components/animations/section-transition";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContactInfo } from "@/types/index";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Code,
  Share2,
  MessageCircle,
  Image,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  ScrollAnimation,
  ScrollAnimationItem,
} from "@/components/animations/scroll-animation";
import { AnimatedText } from "@/components/animations/animated-text";
import { ParallaxSection } from "@/components/animations/parallax-section";

const contactInfo: ContactInfo[] = [
  {
    title: "Email",
    value: "muhammadharoonawan@gmail.com",
    icon: "Mail",
    link: "mailto:muhammadharoonawan@gmail.com",
  },
  {
    title: "Phone",
    value: "+92 347 9761433",
    icon: "Phone",
    link: "tel:+923479761433",
  },
  {
    title: "Location",
    value: "Pakistan",
    icon: "MapPin",
  },
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "MapPin":
      return <MapPin className="h-5 w-5" />;
    case "Phone":
      return <Phone className="h-5 w-5" />;
    case "Mail":
      return <Mail className="h-5 w-5" />;
    default:
      return <Mail className="h-5 w-5" />;
  }
};

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Send data to our API route
      const response = await axios.post("/api/send-email", formData);

      if (response.data.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        throw new Error(response.data.error || "Failed to send email");
      }
    } catch (err) {
      console.error("Error sending email:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send email. Please try again later."
      );

      // Clear error after 5 seconds
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionTransition className="py-8">
      <AnimatedText
        text="Contact Me"
        className="text-3xl font-bold mb-8 gradient-text"
        type="chars"
        animation="slide-up"
        delay={0.2}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-full">
        <div className="lg:col-span-1">
          <ScrollAnimation direction="left" delay={0.3} className="lg:h-full">
            <Card className="glass-card contact-card h-full">
              <CardContent className="card-content h-full flex flex-col">
                <AnimatedText
                  text="Contact Information"
                  className="text-xl font-semibold mb-6 contact-form-title"
                  type="words"
                  animation="slide-up"
                  delay={0.4}
                />

                <ScrollAnimation
                  className="space-y-6 flex-1"
                  direction="left"
                  timing="stagger"
                  staggerChildren={0.1}
                  delay={0.5}
                >
                  {contactInfo.map((info, index) => (
                    <ScrollAnimationItem
                      key={index}
                      direction="left"
                      className="flex items-start"
                    >
                      <motion.div
                        className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-4"
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
                        {getIcon(info.icon)}
                      </motion.div>
                      <div className="flex-1 min-w-0 max-w-full">
                        <motion.h4
                          className="font-medium"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.5 }}
                        >
                          {info.title}
                        </motion.h4>
                        {info.link ? (
                          <motion.a
                            href={info.link}
                            className="text-muted-foreground hover:text-primary transition-colors text-xs md:text-sm block w-full email-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            whileHover={{ x: 2 }}
                            title={info.value}
                          >
                            {info.value}
                          </motion.a>
                        ) : (
                          <motion.p
                            className="text-muted-foreground text-xs md:text-sm email-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                          >
                            {info.value}
                          </motion.p>
                        )}
                      </div>
                    </ScrollAnimationItem>
                  ))}
                </ScrollAnimation>

                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <AnimatedText
                    text="Connect With Me"
                    className="font-medium mb-4"
                    type="words"
                    animation="slide-up"
                    delay={0.9}
                  />
                  <motion.div
                    className="flex flex-wrap gap-3 justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    {[
                      { icon: <Code className="h-4 w-4" />, delay: 0 },
                      { icon: <Share2 className="h-4 w-4" />, delay: 0.1 },
                      {
                        icon: <MessageCircle className="h-4 w-4" />,
                        delay: 0.2,
                      },
                      { icon: <Image className="h-4 w-4" />, delay: 0.3 },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 1 + item.delay,
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        }}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full"
                        >
                          {item.icon}
                        </Button>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>

        <div className="lg:col-span-2">
          <ScrollAnimation direction="right" delay={0.4}>
            <Card className="glass-card contact-card h-full">
              <CardContent className="card-content h-full flex flex-col">
                <AnimatedText
                  text="Send Me a Message"
                  className="text-xl font-semibold mb-6 contact-form-title"
                  type="words"
                  animation="slide-up"
                  delay={0.5}
                />

                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      key="success-message"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                      className="bg-green-500/20 text-green-500 p-4 rounded-md mb-6 flex items-center"
                    >
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span>
                        Thank you for your message! I'll get back to you soon.
                      </span>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      key="error-message"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                      className="bg-red-500/20 text-red-500 p-4 rounded-md mb-6 flex items-center"
                    >
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-4 flex-1 flex flex-col"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-1 contact-label"
                      >
                        Your Name
                      </label>
                      <motion.input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 contact-input"
                        whileFocus={{
                          scale: 1.01,
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    >
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1 contact-label"
                      >
                        Your Email
                      </label>
                      <motion.input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 contact-input"
                        whileFocus={{
                          scale: 1.01,
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-1 contact-label"
                    >
                      Subject
                    </label>
                    <motion.input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 contact-input"
                      whileFocus={{
                        scale: 1.01,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                  <motion.div
                    className="flex-1 flex flex-col"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                  >
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-1 contact-label"
                    >
                      Message
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none flex-1 min-h-[120px] contact-input"
                      whileFocus={{
                        scale: 1.01,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-4 w-4" /> Send Message
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </div>
    </SectionTransition>
  );
}
