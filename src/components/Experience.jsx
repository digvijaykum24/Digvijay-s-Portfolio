import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, Check, ArrowRight } from "lucide-react";
import { experience } from "../data/portfolio";
import { ease, Reveal, SectionHeading } from "./ui";

function Node({ icon: Icon, active }) {
  return (
    <span className="absolute top-1 -left-10 grid size-10 -translate-x-1/2 place-items-center rounded-full border border-emerald-400/40 bg-ink-950 md:left-1/2">
      {active && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20" aria-hidden="true" />}
      <Icon size={17} className="relative text-emerald-300" aria-hidden="true" />
    </span>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="experience-title"
          eyebrow="Career"
          title={<span className="text-gradient">Experience</span>}
          subtitle="Hands-on, client-facing work — shipping complete websites from requirements to launch."
        />

        <div ref={ref} className="relative pl-10 md:pl-0">
          {/* Track + animated fill */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-white/10 md:left-1/2" aria-hidden="true" />
          <motion.div
            style={{ scaleY }}
            className="absolute top-0 bottom-0 left-0 w-px origin-top bg-gradient-to-b from-emerald-300 via-emerald-400 to-emerald-600 shadow-[0_0_14px_rgb(52_211_153/0.8)] md:left-1/2"
            aria-hidden="true"
          />

          <ol className="space-y-16">
            {experience.map((job) => (
              <li key={job.role} className="relative md:grid md:grid-cols-2 md:gap-16">
                <Node icon={Briefcase} active />
                <Reveal className="mb-6 md:mb-0 md:pt-1 md:pr-10 md:text-right">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] px-3 py-1 font-mono text-[11px] tracking-widest text-emerald-200">
                    <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" /> {job.period.toUpperCase()}
                  </span>
                  <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">{job.role}</h3>
                  <p className="mt-2 text-lg text-emerald-300/90">{job.company}</p>
                  <p className="mt-4 leading-relaxed text-mist md:ml-auto md:max-w-md">{job.summary}</p>
                </Reveal>

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 0.9, ease, delay: 0.15 }}
                  className="glass rounded-3xl p-6 sm:p-8"
                >
                  <h4 className="eyebrow mb-5">Responsibilities</h4>
                  <ul className="space-y-3.5">
                    {job.points.map((pt, i) => (
                      <motion.li
                        key={pt}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.07 }}
                        className="flex gap-3 text-[15px] leading-relaxed text-white/80"
                      >
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                          <Check size={12} strokeWidth={3} aria-hidden="true" />
                        </span>
                        {pt}
                      </motion.li>
                    ))}
                  </ul>
                  <ul className="mt-7 flex flex-wrap gap-2 border-t border-white/[0.07] pt-6" aria-label="Technologies used">
                    {job.stack.map((s) => (
                      <li key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-white/65">
                        {s}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </li>
            ))}

            <li className="relative md:grid md:grid-cols-2 md:gap-16">
              <Node icon={ArrowRight} />
              <Reveal className="md:col-start-2">
                <p className="font-mono text-[11px] tracking-widest text-white/40">NEXT</p>
                <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-white">Your project?</p>
                <a href="#contact" className="group mt-3 inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200">
                  Let's build it together
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </Reveal>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
