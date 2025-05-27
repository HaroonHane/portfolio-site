export interface PortfolioItem {
  id: string;
  title: string;
  category: "web" | "app" | "design";
  image: string;
  link: string;
  github?: string;
  technologies: string[];
  description: string;
}