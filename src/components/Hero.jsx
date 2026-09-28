import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { profile } from "../data/portfolio";
import { ease, MagneticButton } from "./ui";

function useTypewriter(words, { typeMs = 70, deleteMs = 38, holdMs = 1800 } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let t;
    if (!deleting && text === word) t = setTimeout(() => setDeleting(true), holdMs);
    else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      t = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? deleteMs : typeMs
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs]);

  return text;
}

function SplitName({ text, delay = 0, className }) {
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className}`} aria-hidden="true">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%", rotate: 8 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{ duration: 0.9, ease, delay: delay + i * 0.035 }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

const upperRoles = profile.roles.map((r) => r.toUpperCase());

export default function Hero() {
  const reduce = useReducedMotion();
  const typed = useTypewriter(upperRoles);
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 90]);
  const textY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -40]);

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24 md:pt-32"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* Left — copy */}
        <motion.div style={{ y: textY }} className="relative z-10 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] py-1.5 pr-4 pl-2 backdrop-blur-md"
          >
            <span className="relative flex size-2.5 items-center justify-center">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10.5px] font-medium tracking-[0.2em] text-emerald-200 sm:text-[11px]">
              AVAILABLE FOR FREELANCE PROJECTS
            </span>
          </motion.div>

          <h1 className="font-display font-semibold tracking-tight">
            <motion.span
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="mb-2 block text-2xl font-normal text-white/60 sm:text-3xl"
            >
              Hi, I'm
            </motion.span>
            <span className="sr-only">{profile.name}</span>
            <SplitName
              text="DIGVIJAY"
              delay={0.4}
              className="text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.92] text-white"
            />
            <SplitName
              text="KUMAR"
              delay={0.65}
              className="text-gradient text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.92]"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease, delay: 1 }}
            className="mt-7 flex min-h-[1.75em] items-center gap-3 font-mono text-sm font-medium tracking-[0.14em] text-emerald-300 sm:text-base"
            aria-label={profile.roles.join(" and ")}
          >
            <span className="h-px w-10 bg-emerald-400/60" aria-hidden="true" />
            <span aria-hidden="true">
              {reduce ? upperRoles.join(" · ") : typed}
              {!reduce && <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulse bg-emerald-300" />}
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease, delay: 1.1 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 1.25 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#projects">View My Work</MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Let's Talk
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-10 flex items-center gap-2 text-sm text-white/45"
          >
            <MapPin size={15} className="text-emerald-400/80" aria-hidden="true" />
            {profile.location}
          </motion.div>
        </motion.div>

        {/* Right — portrait */}
        <motion.div
          style={{ y: imgY }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.35 }}
          className="relative order-1 mx-auto w-[min(64vw,300px)] sm:w-[min(56vw,360px)] lg:order-2 lg:w-full lg:max-w-[420px]"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            className="relative"
          >
            {/* Soft gradient bloom behind the image */}
            <div
              aria-hidden="true"
              className="absolute -inset-[18%] -z-10 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgb(52_211_153/0.35),rgb(20_184_166/0.12)_40%,transparent_70%)] blur-2xl"
            />
            {/* Orbit rings */}
            <div aria-hidden="true" className="absolute -inset-[9%] -z-10 rounded-[48px] border border-white/[0.06]" />
            <div aria-hidden="true" className="absolute -inset-[18%] -z-10 rounded-[64px] border border-dashed border-white/[0.05]" />

            {/* Glowing animated border */}
            <div
              className="gradient-border relative aspect-[5/6] w-full rounded-[32px] sm:rounded-[40px] shadow-[0_30px_80px_-20px_rgb(16_185_129/0.45)]"
              style={{ "--border-opacity": 1 }}
            >
              <div
                className="absolute inset-0 overflow-hidden bg-ink-800"
                style={{ borderRadius: "inherit" }}
              >
                <picture>
                  <source srcSet={profile.photo} type="image/webp" />
                  <img
                    src={profile.photoFallback}
                    alt="Portrait of Digvijay Kumar, Full Stack Web Developer"
                    width="840"
                    height="1008"
                    fetchpriority="high"
                    decoding="async"
                    className="size-full object-cover object-top"
                  />
                </picture>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[11px] font-mono tracking-[0.25em] text-white/40 transition-colors hover:text-white/80 sm:flex"
      >
        <span>SCROLL TO EXPLORE</span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-white/20 pt-1.5">
          <span className="size-1 rounded-full bg-emerald-300 animate-scroll-dot" />
        </span>
        <ArrowDown size={14} className="animate-bounce" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
