"use client";

import { useState, useRef } from "react";
import { SectionTransition } from "@/components/animations/section-transition";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PortfolioItem } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";
import { ScrollAnimation } from "@/components/animations/scroll-animation";
import { AnimatedText } from "@/components/animations/animated-text";
import { ParallaxSection } from "@/components/animations/parallax-section";
import Image from "next/image";

const portfolioItems: PortfolioItem[] = [
	{
		id: "1",
		title: "Car Magazine",
		category: "web",
		image:
			"https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		link: "https://www.carmagazine.co.uk/",
		technologies: ["HTML5", "CSS3", "JavaScript"],
		description:
			"A comprehensive online magazine featuring the latest car reviews, news, and automotive trends. This project showcases responsive design and dynamic content management.",
	},
	{
		id: "2",
		title: "Health Couch",
		category: "web",
		image:
			"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		link: "https://technext.github.io/healthcouch/index.html",
		technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
		description:
			"A wellness platform designed to help users track their fitness goals, nutrition, and overall health. Features include personalized workout plans and diet recommendations.",
	},
	{
		id: "3",
		title: "Photo Snap",
		category: "design",
		image:
			"https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		link: "https://photosnapofficials.netlify.app/",
		technologies: ["HTML5", "CSS3", "JavaScript", "Gallery API"],
		description:
			"A photography portfolio platform with advanced image filtering and gallery features. Designed for photographers to showcase their work with beautiful layouts and transitions.",
	},
	{
		id: "4",
		title: "College CMS",
		category: "web",
		image:
			"https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=2074&auto=format&fit=crop",
		link: "#",
		technologies: ["React", "Tailwind CSS", "Bootstrap", "PHP", "MySQL"],
		description:
			"A comprehensive College Management System featuring student enrollment, course management, attendance tracking, and grade management. Built with React frontend and PHP/MySQL backend for robust data handling.",
	},
	{
		id: "5",
		title: "Quiz App Management",
		category: "app",
		image:
			"https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop",
		link: "#",
		technologies: [
			"React",
			"Tailwind CSS",
			"Framer Motion",
			"Node.js",
			"MongoDB",
		],
		description:
			"An interactive quiz management system allowing teachers to create, manage, and grade quizzes while students can participate in real-time assessments. Features animations and responsive design.",
	},
	{
		id: "6",
		title: "Countries Info",
		category: "app",
		image:
			"https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop",
		link: "https://infoworld-countriesinfo.netlify.app/",
		technologies: ["React", "CSS3", "REST API"],
		description:
			"An interactive web application that provides detailed information about countries around the world. Features include search functionality, filtering, and interactive maps.",
	},
	{
		id: "7",
		title: "Notes Taking App",
		category: "app",
		image:
			"https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		link: "https://mynotespad.netlify.app/",
		technologies: ["React", "CSS3", "LocalStorage"],
		description:
			"A sleek and intuitive note-taking application with features like categorization, search, and markdown support. Data is stored locally for privacy and quick access.",
	},
	{
		id: "8",
		title: "Music Beats Maker",
		category: "web",
		image:
			"https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		link: "https://beatsmakerapp.netlify.app/",
		technologies: ["JavaScript", "HTML5", "CSS3", "Web Audio API"],
		description:
			"An interactive web application that allows users to create and mix their own beats. Features include multiple instrument sounds, recording capabilities, and sharing options.",
	},
];

const categories = ["all", "web", "app", "design"];

export function PortfolioSection() {
	const [activeCategory, setActiveCategory] = useState("all");
	const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
	const modalRef = useRef<HTMLDivElement>(null);

	const filteredItems =
		activeCategory === "all"
			? portfolioItems
			: portfolioItems.filter((item) => item.category === activeCategory);

	const handleCardClick = (item: PortfolioItem, event: React.MouseEvent) => {
		event.preventDefault();
		setSelectedItem(item);
	};

	return (
		<SectionTransition className="pt-6 pb-4 sm:py-8">
			<AnimatedText
				text="My Portfolio"
				className="text-3xl font-bold mb-4 sm:mb-6 gradient-text"
				type="chars"
				animation="slide-up"
				delay={0.2}
			/>

			<ScrollAnimation
				direction="up"
				delay={0.3}
				className="flex flex-wrap justify-center gap-1 sm:gap-1.5 mb-4 sm:mb-6"
			>
				{categories.map((category, index) => (
					<motion.div
						key={category}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							delay: 0.3 + index * 0.1,
							duration: 0.5,
							type: "spring",
							stiffness: 200,
							damping: 20,
						}}
					>
						<Button
							size="sm"
							variant={activeCategory === category ? "default" : "outline"}
							onClick={() => setActiveCategory(category)}
							className="capitalize text-xs h-7 px-2 sm:text-sm sm:h-8 sm:px-3"
						>
							{category}
						</Button>
					</motion.div>
				))}
			</ScrollAnimation>

			<ParallaxSection speed={0.05} direction="vertical">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
					<AnimatePresence mode="popLayout">
						{filteredItems.map((item, index) => (
							<motion.div
								key={item.id}
								layout
								initial={{ opacity: 0, scale: 0.8, y: 50 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.8, y: -50 }}
								transition={{
									duration: 0.5,
									delay: 0.1 * index,
									type: "spring",
									stiffness: 100,
									damping: 15,
								}}
							>
								<Card className="overflow-hidden glass-card h-full flex flex-col project-card">
									<motion.div
										className="relative overflow-hidden group aspect-video"
										whileHover={{ scale: 1.02 }}
										transition={{ duration: 0.3 }}
									>
										<Image
											src={item.image}
											alt={item.title}
											width={400}
											height={300}
											className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
										/>
										<div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
											<div className="flex gap-2">
												<Button
													size="icon"
													variant="outline"
													className="h-9 w-9 rounded-full border-white/20 bg-black/50 text-white hover:bg-primary"
													onClick={(e) => handleCardClick(item, e)}
												>
													<ExternalLink className="h-4 w-4" />
												</Button>
												<Button
													size="icon"
													variant="outline"
													className="h-9 w-9 rounded-full border-white/20 bg-black/50 text-white hover:bg-primary"
													onClick={() =>
														window.open(item.github || "#", "_blank")
													}
												>
													<Code className="h-4 w-4" />
												</Button>
											</div>
										</div>
									</motion.div>
									<CardContent className="card-content p-2 sm:p-3 pb-2 flex-grow">
										<motion.h3
											className="font-semibold text-sm sm:text-base mb-0.5 sm:mb-1 truncate"
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
											title={item.title}
										>
											{item.title}
										</motion.h3>
										<motion.p
											className="text-xs text-muted-foreground mb-1 sm:mb-2 capitalize"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
										>
											{item.category}
										</motion.p>
										<div className="flex flex-wrap gap-0.5 sm:gap-1 overflow-hidden mt-auto">
											{item.technologies.map(
												(tech: string, techIndex: number) => (
													<motion.span
														key={tech}
														className="text-[8px] sm:text-[10px] bg-primary/10 text-primary px-1 sm:px-1.5 py-0.5 rounded-full whitespace-nowrap"
														initial={{ opacity: 0, scale: 0.8 }}
														animate={{ opacity: 1, scale: 1 }}
														transition={{
															delay: 0.4 + index * 0.05 + techIndex * 0.05,
															duration: 0.3,
															type: "spring",
														}}
														whileHover={{ scale: 1.1 }}
														title={tech}
													>
														{tech}
													</motion.span>
												)
											)}
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			</ParallaxSection>

			{/* Project Details Modal */}
			<AnimatePresence>
				{selectedItem && (
					<motion.div
						key="modal-backdrop"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 backdrop-blur-sm"
						onClick={() => setSelectedItem(null)}
					>
						<motion.div
							ref={modalRef}
							key="modal-content"
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{
								scale: 1,
								opacity: 1,
								transition: {
									type: "spring",
									damping: 25,
									stiffness: 300,
								},
							}}
							exit={{ scale: 0.8, opacity: 0 }}
							className="relative w-[90%] max-w-xl m-4 glass-card rounded-lg overflow-hidden"
							style={{
								maxHeight: "calc(100vh - 2rem)",
								overflowY: "auto",
							}}
							onClick={(e) => e.stopPropagation()}
						>
							<motion.div
								className="aspect-video bg-muted overflow-hidden"
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
							>
								<Image
									src={selectedItem.image}
									alt={selectedItem.title}
									width={600}
									height={400}
									className="w-full h-full object-cover"
								/>
							</motion.div>
							<motion.div
								className="p-4"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.3 }}
							>
								<motion.h2
									className="text-2xl font-bold mb-2"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4, duration: 0.5 }}
								>
									{selectedItem.title}
								</motion.h2>
								<motion.p
									className="text-muted-foreground mb-4 text-sm leading-relaxed"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.5, duration: 0.5 }}
								>
									{selectedItem.description}
								</motion.p>
								<motion.div
									className="flex flex-wrap gap-1.5 mb-4 overflow-hidden"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.6 }}
								>
									{selectedItem.technologies.map(
										(tech: string, index: number) => (
											<motion.span
												key={tech}
												className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs whitespace-nowrap"
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{
													delay: 0.7 + index * 0.05,
													type: "spring",
													stiffness: 300,
												}}
												whileHover={{ scale: 1.1 }}
												title={tech}
											>
												{tech}
											</motion.span>
										)
									)}
								</motion.div>
								<motion.div
									className="flex justify-end gap-2"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.8, duration: 0.5 }}
								>
									<Button
										variant="outline"
										onClick={() => setSelectedItem(null)}
									>
										Close
									</Button>
									<Button asChild>
										<a
											href={selectedItem.link}
											target="_blank"
											rel="noopener noreferrer"
										>
											<ExternalLink className="mr-2 h-4 w-4" /> Visit Project
										</a>
									</Button>
								</motion.div>
							</motion.div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</SectionTransition>
	);
}
