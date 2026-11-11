
import type { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  name: "Rituraj Ingale",
  title: "Software Engineer",
  tagline: "Building calm, resilient systems for what comes next.",
  contactLine: "Let's build something calm and resilient together.",
  specs: [
    { label: "Role", value: "Software Engineer" },
    { label: "Experience", value: "6+ years" },
    { label: "Discipline", value: "Full-stack" },
    { label: "Core", value: "Node.js / React / AWS" },
  ],
  about: "Full-stack engineer with 6+ years owning Node.js, React, and AWS solutions. I love being the go-to person for thorny problems, architecting secure, scalable platforms, and mentoring teams toward clean, high-quality delivery.",
  skills: [
    "JavaScript", "TypeScript", "React", "Next.js", "Redux",
    "React Query", "Material UI", "Tailwind CSS", "Storybook",
    "HTML", "CSS", "SASS", "Node.js", "Express.js",
    "GraphQL", "REST APIs", "WebSockets", "WebRTC", "Serverless",
    "PostgreSQL", "MySQL", "DynamoDB", "MongoDB", "Redis",
    "AWS", "Docker", "Kubernetes", "NGINX", "CI/CD", "GitHub Actions"
  ],
  skillCategories: [
    {
      label: "Frontend Engineering",
      description: "Building accessible, performant interfaces with a strong component-driven workflow.",
      items: ["JavaScript", "TypeScript", "React", "Next.js", "Redux", "React Query", "Material UI", "Tailwind CSS", "Storybook", "HTML", "CSS", "SASS"],
    },
    {
      label: "Backend & APIs",
      description: "Designing services and contracts that stay predictable as they scale.",
      items: ["Node.js", "Express.js", "GraphQL", "REST APIs", "WebSockets", "WebRTC", "Serverless"],
    },
    {
      label: "Data & Persistence",
      description: "Modeling and tuning storage layers for consistency, speed, and cost.",
      items: ["PostgreSQL", "MySQL", "DynamoDB", "MongoDB", "Redis"],
    },
    {
      label: "Cloud & DevOps",
      description: "Shipping infrastructure and pipelines that are boring in the best way.",
      items: ["AWS", "Docker", "Kubernetes", "NGINX", "CI/CD", "GitHub Actions"],
    },
  ],
  footer: {
    contact: {
      email: "ritu.raj.ingale@gmail.com",
      linkedin: "riturajingale",
      github: "anti-yREX",
    }
  }
};
