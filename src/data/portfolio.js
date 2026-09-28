import { FaJava } from "react-icons/fa";
import {
  SiJavascript,
  SiHtml5,
  SiCss,
  SiBootstrap,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiGithub,
} from "react-icons/si";
import { TbApi, TbSql } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

export const profile = {
  name: "Digvijay Kumar",
  firstName: "Digvijay",
  lastName: "Kumar",
  roles: ["Full Stack Web Developer", "MERN Stack Developer"],
  location: "Patna, Bihar, India",
  phone: "+91-9973746867",
  phoneHref: "tel:+919973746867",
  email: "monu24641@gmail.com",
  linkedin: "https://www.linkedin.com/in/digvijay-kumar24",
  linkedinLabel: "linkedin.com/in/digvijay-kumar24",
  github: "https://github.com/digvijaykum24",
  whatsapp: "https://wa.me/919973746867",
  photo: "/images/digvijay-kumar.webp",
  photoFallback: "/images/digvijay-kumar.jpg",
  intro:
    "MCA graduate and aspiring Full Stack Web Developer with hands-on experience building user-focused websites using HTML, CSS, JavaScript, React, Node.js, Express and MongoDB.",
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const stats = [
  { value: "3+", label: "Featured Projects", note: "Live client websites" },
  { value: "MERN", label: "Stack Development", note: "MongoDB · Express · React · Node" },
  { value: "2022–2024", label: "MCA", note: "Galgotias University" },
  { value: "Freelance", label: "Web Developer", note: "Available for new projects" },
];

// `level` drives the progress-style indicator on each card (0–100).
export const skillGroups = [
  {
    title: "Languages",
    items: [
      { name: "JavaScript", icon: SiJavascript, level: 85, color: "#f7df1e" },
      { name: "Java", icon: FaJava, level: 70, color: "#f89820" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "HTML5", icon: SiHtml5, level: 92, color: "#e34f26" },
      { name: "CSS3", icon: SiCss, level: 88, color: "#2965f1" },
      { name: "Bootstrap", icon: SiBootstrap, level: 82, color: "#7952b3" },
      { name: "React.js", icon: SiReact, level: 80, color: "#61dafb" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs, level: 75, color: "#5fa04e" },
      { name: "Express.js", icon: SiExpress, level: 74, color: "#ffffff" },
      { name: "RESTful APIs", icon: TbApi, level: 76, color: "#34d399" },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "MongoDB", icon: SiMongodb, level: 76, color: "#47a248" },
      { name: "Mongoose", icon: SiMongoose, level: 70, color: "#c8484b" },
      { name: "SQL", icon: TbSql, level: 68, color: "#4ea1d3" },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "GitHub", icon: SiGithub, level: 80, color: "#ffffff" },
      { name: "VS Code", icon: VscVscode, level: 90, color: "#23a9f2" },
    ],
  },
];

export const projects = [
  {
    number: "01",
    title: "Revolution Classes",
    category: "Educational / Coaching Website",
    url: "https://www.revolutionclasses.com",
    domain: "revolutionclasses.com",
    description:
      "Modern website for an educational and coaching platform with structured sections including Home, About, Courses, Faculty, Library, Gallery and Contact.",
    tags: ["Education", "Responsive UI", "Multi-section"],
    theme: { from: "#10b981", to: "#0ea5e9", accent: "#6ee7b7" },
    preview: "education",
  },
  {
    number: "02",
    title: "Frontend Web Studio",
    category: "Web Development Business Website",
    url: "https://www.frontendwebstudio.com",
    domain: "frontendwebstudio.com",
    description:
      "Professional portfolio and business website showcasing web development services and projects with clean design, fast performance and clear calls-to-action.",
    tags: ["Business", "Performance", "Conversion-focused"],
    theme: { from: "#8b5cf6", to: "#10b981", accent: "#c4b5fd" },
    preview: "studio",
  },
  {
    number: "03",
    title: "Chatkara Family Restaurant",
    category: "Restaurant & Online Delivery Website",
    url: "https://www.chatkararesturant.com",
    domain: "chatkararesturant.com",
    description:
      "Responsive restaurant website with modern UI, menu browsing, food ordering flow and restaurant information.",
    tags: ["Restaurant", "Menu & Ordering", "Mobile-first"],
    theme: { from: "#f59e0b", to: "#ef4444", accent: "#fcd34d" },
    preview: "restaurant",
  },
];

export const experience = [
  {
    role: "Freelance Full Stack Web Developer",
    company: "Freelance Projects",
    period: "Present",
    summary:
      "Designing and building websites and web applications for real clients — from first conversation to launch.",
    points: [
      "Developing websites and web applications based on client requirements",
      "Working across frontend and backend technologies",
      "Creating practical full-stack solutions",
      "Improving website usability",
      "Improving website performance",
      "Improving visual presentation",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "HTML/CSS", "JavaScript"],
  },
];

export const education = [
  {
    degree: "MCA",
    full: "Master of Computer Applications",
    school: "Galgotias University, Greater Noida",
    period: "2022–2024",
  },
  {
    degree: "BCA",
    full: "Bachelor of Computer Applications",
    school: "Cimage Professional College",
    period: "2018–2021",
  },
  {
    degree: "Intermediate (Science)",
    full: "Higher Secondary",
    school: "High School Dhariyara",
    period: "2018",
  },
  {
    degree: "Matriculation",
    full: "Secondary",
    school: "Keshav Saraswati Vidya Mandir",
    period: "2016",
  },
];

export const certification = {
  title: "The Complete Full-Stack Web Development Bootcamp",
  issuer: "Udemy",
};

export const projectTypes = [
  "Business Website",
  "Portfolio Website",
  "E-commerce / Online Ordering",
  "Web Application (MERN)",
  "Landing Page",
  "Website Redesign",
  "Other",
];

export const services = [
  {
    title: "Business Websites",
    text: "Fast, modern websites that present your brand clearly and turn visitors into enquiries.",
    points: ["Custom design", "Clear calls-to-action", "Contact & lead forms"],
    icon: "Monitor",
  },
  {
    title: "Full-Stack Web Apps",
    text: "MERN applications with React frontends, Express REST APIs and MongoDB databases.",
    points: ["React + Node.js", "REST APIs", "MongoDB / Mongoose"],
    icon: "ServerCog",
  },
  {
    title: "Responsive UI",
    text: "Pixel-careful interfaces that look and work great on every phone, tablet and desktop.",
    points: ["Mobile-first", "Accessible markup", "Smooth interactions"],
    icon: "MonitorSmartphone",
  },
  {
    title: "Speed & Redesign",
    text: "Refresh outdated sites and improve usability, performance and visual presentation.",
    points: ["Performance tuning", "SEO basics", "Modern visual refresh"],
    icon: "Gauge",
  },
];

export const process = [
  { step: "01", title: "Discover", text: "Understand your goals, audience and requirements.", icon: "MessagesSquare" },
  { step: "02", title: "Design", text: "Plan the structure and shape a clean, modern look.", icon: "PenTool" },
  { step: "03", title: "Develop", text: "Build it responsive, fast and ready to scale.", icon: "CodeXml" },
  { step: "04", title: "Launch", text: "Test, deploy and keep improving after go-live.", icon: "Rocket" },
];
