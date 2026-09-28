import { motion, useReducedMotion } from "framer-motion";
import { skillGroups } from "../data/portfolio";
import { ease, Reveal, SectionHeading } from "./ui";

function SkillCard({ skill, index }) {
  const reduce = useReducedMotion();
  const Icon = skill.icon;
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease, delay: (index % 4) * 0.07 }}
      whileHover={reduce ? undefined : { y: -8 }}
      className="glass group relative overflow-hidden rounded-2xl p-5 transition-[border-color,box-shadow] duration-500 hover:border-white/15"
      style={{ "--skill": skill.color }}
    >
      {/* Brand-tinted glow on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -left-10 size-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
        style={{ background: skill.color }}
      />
      <div className="relative flex items-center gap-4">
        <motion.span
          className="grid size-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]"
          whileHover={reduce ? undefined : { rotate: 12, scale: 1.12 }}
          transition={{ type: "spring", stiffness: 300, damping: 14 }}
        >
          <Icon
            aria-hidden="true"
            className="size-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[10deg]"
            style={{ color: skill.color }}
          />
        </motion.span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <h4 className="truncate font-medium text-white">{skill.name}</h4>
            <span className="font-mono text-[11px] text-white/35">{skill.level}%</span>
          </div>
          <div
            className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]"
            role="progressbar"
            aria-label={`${skill.name} proficiency`}
            aria-valuenow={skill.level}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_12px_rgb(52_211_153/0.6)]"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease, delay: 0.2 + (index % 4) * 0.07 }}
            />
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="skills-title"
          eyebrow="What I work with"
          title={<>Technical <span className="text-gradient">Skills</span></>}
          subtitle="A focused toolkit across the full MERN stack — from semantic, responsive frontends to REST APIs and databases."
        />

        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <div key={group.title}>
              <Reveal className="mb-5 flex items-center gap-3" i={gi % 3}>
                <span className="font-mono text-xs text-emerald-400/80">0{gi + 1}</span>
                <h3 className="font-display text-xl font-semibold tracking-tight text-white">{group.title}</h3>
                <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" aria-hidden="true" />
              </Reveal>
              <ul className="grid gap-3">
                {group.items.map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} index={i} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
