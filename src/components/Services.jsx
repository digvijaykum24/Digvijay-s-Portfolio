import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Check, Monitor, ServerCog, MonitorSmartphone, Gauge, MessagesSquare, PenTool, CodeXml, Rocket } from "lucide-react";
import { services, process } from "../data/portfolio";
import { ease, Reveal, SectionHeading } from "./ui";

const icons = { Monitor, ServerCog, MonitorSmartphone, Gauge, MessagesSquare, PenTool, CodeXml, Rocket };

function ServiceCard({ service, index }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${mx}px ${my}px, rgb(52 211 153 / 0.14), transparent 65%)`;
  const Icon = icons[service.icon];

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease, delay: index * 0.1 }}
      whileHover={reduce ? undefined : { y: -8 }}
      onPointerMove={onMove}
      className="glass group relative flex flex-col overflow-hidden rounded-3xl p-7 transition-colors duration-500 hover:border-white/15 md:p-8"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <div className="relative flex items-start justify-between">
        <span className="grid size-14 place-items-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-emerald-400 group-hover:text-ink-950 group-hover:shadow-[0_10px_30px_-6px_rgb(52_211_153/0.7)]">
          <Icon size={24} aria-hidden="true" />
        </span>
        <span className="font-display text-5xl font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.1)] transition-all duration-500 group-hover:[-webkit-text-stroke:1px_rgb(52_211_153/0.5)]">
          0{index + 1}
        </span>
      </div>
      <h3 className="relative mt-8 font-display text-2xl font-semibold tracking-tight text-white">{service.title}</h3>
      <p className="relative mt-3 leading-relaxed text-mist">{service.text}</p>
      <ul className="relative mt-6 space-y-2 border-t border-white/[0.07] pt-5">
        {service.points.map((p) => (
          <li key={p} className="flex items-center gap-2.5 text-sm text-white/75">
            <Check size={14} strokeWidth={3} className="text-emerald-400" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>
    </motion.li>
  );
}

function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <div ref={ref} className="relative mt-24 md:mt-32">
      <Reveal className="mb-12 flex items-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-400/80" aria-hidden="true" />
        <h3 className="eyebrow">How I work</h3>
      </Reveal>

      <div className="relative">
        {/* Connecting line (desktop) */}
        <div className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-white/10 lg:block" aria-hidden="true" />
        <motion.div
          style={{ scaleX }}
          className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px origin-left bg-gradient-to-r from-emerald-300 to-emerald-500 shadow-[0_0_12px_rgb(52_211_153/0.8)] lg:block"
          aria-hidden="true"
        />
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {process.map((p, i) => {
            const Icon = icons[p.icon];
            return (
              <motion.li
                key={p.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.8, ease, delay: i * 0.15 }}
                className="group relative flex flex-col items-start lg:items-center lg:text-center"
              >
                <span className="relative z-10 grid size-14 place-items-center rounded-full border border-emerald-400/30 bg-ink-900 text-emerald-300 transition-all duration-500 group-hover:scale-110 group-hover:border-emerald-300 group-hover:shadow-[0_0_30px_rgb(52_211_153/0.45)]">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <span className="mt-5 font-mono text-xs tracking-widest text-emerald-400/80">STEP {p.step}</span>
                <h4 className="mt-1 font-display text-xl font-semibold text-white">{p.title}</h4>
                <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-mist">{p.text}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="services-title"
          eyebrow="What I do"
          title={<>Services I <span className="text-gradient">Offer</span></>}
          subtitle="From a polished business website to a complete MERN application — built with care, delivered with clarity."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </ul>
        <Process />
      </div>
    </section>
  );
}
