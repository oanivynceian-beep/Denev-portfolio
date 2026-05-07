import { 
  Code2, 
  Database, 
  Globe, 
  Layers, 
  Layout, 
  Server, 
  Cpu, 
  Terminal,
  Cloud,
  Shield,
  Smartphone,
  AppWindow,
  Award
} from 'lucide-react';

export const USER_INFO = {
  name: "Denev Arrosas",
  role: "BS Information Technology Professional",
  tagline: "Leveraging technology to optimize business operations and data-driven decision making. Focused on building efficient systems and web solutions.",
  email: "Denev.arrosas@hcdc.edu.ph",
  location: "Sto. Tomas, Davao del Norte",
  github: "https://github.com/denev17",
  linkedin: "https://www.linkedin.com/in/denev-arrosas-aa6427323/",
  avatar: "https://i.ibb.co/GQWdTTXF/a0d8ca21-41a8-4af9-9e76-5cc3ab8ba2bc.jpg",
};

export const SKILLS = [
  {
    category: "Design & Creatives",
    icon: Layout,
    skills: ["Visual Design", "Video Editing", "Product Design", "UI/UX Concepts"]
  },
  {
    category: "Business Operations",
    icon: Layers,
    skills: ["Business Processes", "Inventory Management", "Bookkeeping", "Customer Intelligence"]
  },
  {
    category: "Technical Stack",
    icon: Code2,
    skills: ["Web Technologies", "Database Systems", "Systems Analysis", "Social Media Marketing"]
  },
  {
    category: "Product Management",
    icon: AppWindow,
    skills: ["Pricing Strategy", "E-commerce Ops", "Market Integration", "Resource Planning"]
  }
];

export const PROJECTS = [
  {
    id: 1,
    title: "Manlupig Marketing",
    description: "A streamlined Online Ordering System built to modernize inventory and customer transactions. Role: Frontend Developer • Documentation",
    tags: ["E-commerce", "System Design", "Database"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 2,
    title: "VeriHire",
    description: "An AI-based system designed to detect and flag fraudulent job postings using machine learning patterns. Role: Frontend Developer • Documentation",
    tags: ["AI Detection", "React", "UX Research"],
    image: "https://i.ibb.co/FkYsfKgC/Screenshot-2026-05-06-121943.png",
    link: "https://verihire.onrender.com/"
  }
];

export const EXPERIENCE = [
  {
    period: "Ongoing",
    company: "Self-Employed",
    role: "Entrepreneur / Thrift Business Starter",
    description: "Orchestrated end-to-end business operations including inventory management, pricing strategies, and bookkeeping. Leveraged social media platforms for targeted marketing and customer acquisition."
  },
  {
    period: "Current",
    company: "Holy Cross of Davao College",
    role: "BS Information Technology Student",
    description: "Advancing knowledge in systems architecture, database management, and modern web technologies to solve real-world business challenges."
  }
];

export const CERTIFICATES = [
  {
    title: "Getting Started with Full Stack Java Development",
    issuer: "Simplilearn SkillUp",
    date: "March 26, 2026",
    code: "10007048",
    image: "https://i.ibb.co/1JJFXtsS/Screenshot-2026-05-06-121136.png"
  },
  {
    title: "Introduction to Front End Development",
    issuer: "Simplilearn SkillUp",
    date: "April 14, 2026",
    code: "10012214",
    image: "https://i.ibb.co/KcV8RsTq/Screenshot-2026-05-06-121156.png"
  }
];
