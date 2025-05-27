// Portfolio item type
export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  technologies: string[];
  description: string;
}

// Skill type
export interface Skill {
  name: string;
  percentage: number;
}

// Education type
export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

// Experience type
export interface Experience {
  position: string;
  company: string;
  period: string;
  description: string;
}

// Service type
export interface Service {
  title: string;
  description: string;
  icon: string;
}

// Contact info type
export interface ContactInfo {
  title: string;
  value: string;
  icon: string;
  link?: string;
}
