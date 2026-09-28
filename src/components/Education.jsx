import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, Award, Calendar } from "lucide-react";
import { education, certification } from "../data/portfolio";
import { ease, SectionHeading } from "./ui";

export default function Education() {
  const reduce = useReducedMotion();
  return (
    <section id="education" aria-labelledby="education-title" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="education-title"
          eyebrow="Academic journey"
          title={<>Education & <span className="text-gradient">Certification</span></>}
        />

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {education.map((ed, i) => (
            <motion.li
              key={ed.degree}
              initial={{ opacity: 0, y: 50, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease, delay: i * 0.1 }}
              whileHover={reduce ? undefined : { y: -8 }}
              className={`glass group relative flex flex-col overflow-hidden rounded-3xl p-7 ${i === 0 ? "gradient-border [--border-opacity:0.8]" : ""}`}
            >
              <div
                aria-hidden="true"
                className="absolute -right-10 -bottom-10 size-36 rounded-full bg-emerald-400/0 blur-3xl transition-colors duration-700 group-hover:bg-emerald-400/20"
              />
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-emerald-300 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <GraduationCap size={20} aria-hidden="true" />
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-white/45">
                  <Calendar size={12} aria-hidden="true" />
                  {ed.period}
                </span>
              </div>
              <h3 className="mt-10 font-display text-2xl font-semibold tracking-tight text-white">{ed.degree}</h3>
              <p className="mt-1 text-sm text-emerald-300/80">{ed.full}</p>
              <p className="mt-auto pt-6 text-[15px] leading-snug text-mist">{ed.school}</p>
            </motion.li>
          ))}
        </ol>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="glass relative mt-5 flex flex-col gap-6 overflow-hidden rounded-3xl p-7 sm:flex-row sm:items-center sm:p-9"
        >
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(ellipse_at_left,rgb(52_211_153/0.14),transparent_70%)]"
          />
          <span className="relative grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-300 to-emerald-600 text-ink-950 shadow-[0_10px_40px_-8px_rgb(52_211_153/0.7)]">
            <Award size={28} aria-hidden="true" />
          </span>
          <div className="relative">
            <p className="eyebrow">Certification</p>
            <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {certification.title}
            </h3>
            <p className="mt-1 text-mist">{certification.issuer}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
