import { MotionConfig } from "framer-motion";
import { SiReact, SiNodedotjs, SiMongodb, SiExpress, SiJavascript, SiHtml5, SiCss, SiBootstrap, SiGithub } from "react-icons/si";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer, { BackToTop } from "./components/Footer";

const marquee = [
  [SiReact, "React.js"], [SiNodedotjs, "Node.js"], [SiExpress, "Express.js"], [SiMongodb, "MongoDB"],
  [SiJavascript, "JavaScript"], [SiHtml5, "HTML5"], [SiCss, "CSS3"], [SiBootstrap, "Bootstrap"], [SiGithub, "GitHub"],
];

function TechMarquee() {
  const row = [...marquee, ...marquee];
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-6 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row.map(([Icon, label], i) => (
          <span key={i} className="flex items-center gap-3 pr-11 font-display text-lg font-medium whitespace-nowrap text-white/35">
            <Icon className="size-5" />
            {label}
            <span className="ml-11 text-emerald-400/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-emerald-400 focus:px-4 focus:py-2 focus:text-ink-950"
      >
        Skip to content
      </a>
      <Background />
      <Navbar />
      <main id="main">
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
