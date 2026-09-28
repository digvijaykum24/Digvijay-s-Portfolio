import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, useMotionTemplate } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/portfolio";
import ProjectPreview from "./ProjectPreview";
import { ease, SectionHeading } from "./ui";

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 150, damping: 20 });
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(520px circle at ${gx} ${gy}, ${project.theme.from}22, transparent 55%)`;

  const onMove = (e) => {
    if (e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const flipped = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1, ease }}
      className="[perspective:1400px]"
      aria-labelledby={`project-${project.number}`}
    >
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={reduce ? undefined : { y: -10 }}
        transition={{ duration: 0.5, ease }}
        className="gradient-border glass group relative rounded-[28px] p-4 shadow-[0_40px_100px_-40px_rgb(0_0_0/0.8)] transition-shadow duration-700 [--border-opacity:0] hover:shadow-[0_50px_120px_-40px_rgb(16_185_129/0.35)] hover:[--border-opacity:1] sm:p-5 md:rounded-[36px]"
      >
        {/* Cursor-following glow */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glow }}
        />

        <div className={`relative grid items-stretch gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10 ${flipped ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            className="block aspect-[16/11] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[400px]"
            aria-hidden="true"
          >
            <ProjectPreview project={project} />
          </a>

          <div className="flex flex-col justify-between p-2 sm:p-4 lg:py-8 lg:pr-6">
            <div>
              <div className="flex items-center justify-between">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease, delay: 0.25 }}
                  className="font-display text-7xl leading-none font-bold tracking-tighter text-transparent transition-all duration-700 [-webkit-text-stroke:1px_rgb(255_255_255/0.18)] group-hover:[-webkit-text-stroke:1px_rgb(52_211_153/0.7)] md:text-8xl"
                  aria-hidden="true"
                >
                  {project.number}
                </motion.span>
                <span className="eyebrow">Project {project.number}</span>
              </div>

              <p className="mt-8 text-sm font-medium text-emerald-300">{project.category}</p>
              <h3
                id={`project-${project.number}`}
                className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              >
                {project.title}
              </h3>
              <p className="mt-5 leading-relaxed text-mist">{project.description}</p>

              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Highlights">
                {project.tags.map((t) => (
                  <li key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-6">
              <span className="font-mono text-xs text-white/40">{project.domain}</span>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 py-2.5 pr-3 pl-5 text-sm font-medium text-white transition-colors duration-500 hover:border-emerald-400/60 hover:text-ink-950"
                aria-label={`View ${project.title} live website (opens in a new tab)`}
              >
                <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-emerald-400 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:scale-x-100" />
                <span className="relative">View Project</span>
                <span className="relative grid size-7 place-items-center rounded-full bg-white/10 transition-all duration-500 group-hover/btn:rotate-45 group-hover/btn:bg-ink-950/15">
                  <ArrowUpRight size={15} aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="projects-title"
          eyebrow="Selected work"
          title={<>Featured <span className="text-gradient">Projects</span></>}
          subtitle="Real websites built for real clients — live, responsive and designed to help each business grow online."
        />
        <div className="space-y-10 md:space-y-16">
          {projects.map((p, i) => (
            <ProjectCard key={p.number} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
