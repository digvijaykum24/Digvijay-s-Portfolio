import { motion } from "framer-motion";
import { Layers, Globe, Sparkles } from "lucide-react";
import { stats } from "../data/portfolio";
import { ease, Reveal, SectionHeading } from "./ui";

const principles = [
  { icon: Layers, title: "Full-stack thinking", text: "From MongoDB schemas to pixel-level UI — I build the whole product." },
  { icon: Globe, title: "Real client work", text: "Live websites for education, business and restaurant clients." },
  { icon: Sparkles, title: "Detail-driven", text: "Usability, performance and visual polish on every page I ship." },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-28 md:py-40">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-60 [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="about-title" eyebrow="About me" title={<>Building Digital Experiences <span className="text-gradient">That Matter.</span></>} />

        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div>
            <Reveal as="p" className="text-xl leading-relaxed text-white/85 md:text-2xl md:leading-relaxed">
              I'm <strong className="font-semibold text-white">Digvijay Kumar</strong>, a Full Stack Web Developer from
              Patna, Bihar, who turns ideas into fast, modern and user-focused websites.
            </Reveal>
            <Reveal as="p" i={1} className="mt-6 text-base leading-relaxed text-mist md:text-lg">
              After completing my MCA at Galgotias University, I've been working as a freelance developer — designing and
              building complete websites for real businesses using the MERN stack: MongoDB, Express, React and Node.js.
              I care about clean code, clear structure and interfaces that feel effortless to use.
            </Reveal>

            <ul className="mt-10 space-y-5">
              {principles.map((p, i) => (
                <Reveal as="li" i={i + 2} key={p.title} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300">
                    <p.icon size={19} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-medium text-white">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-mist">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.8, ease, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className={`glass group relative overflow-hidden rounded-3xl p-7 md:p-8 ${i % 2 === 1 ? "sm:mt-10 sm:-mb-10" : ""}`}
              >
                <div
                  aria-hidden="true"
                  className="absolute -top-16 -right-16 size-40 rounded-full bg-emerald-400/10 blur-3xl transition-opacity duration-700 group-hover:bg-emerald-400/25"
                />
                <span className="font-mono text-[11px] text-white/30">0{i + 1}</span>
                <p className="mt-8 font-display text-4xl font-semibold tracking-tight text-white md:text-[2.6rem]">
                  {s.value}
                </p>
                <p className="mt-2 font-medium text-emerald-300">{s.label}</p>
                <p className="mt-1 text-sm text-mist">{s.note}</p>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-emerald-400/50 via-white/10 to-transparent transition-all duration-700 group-hover:from-emerald-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
