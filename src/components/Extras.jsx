import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, animate } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ease } from "./ui";

const SEEN_KEY = "dk-intro-seen";

function introSeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

/** Short branded intro shown once per session. Calls onDone when the curtain lifts. */
export function Preloader({ onDone }) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => !reduce && !introSeen());
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!show) {
      onDone();
      return;
    }
    document.body.style.overflow = "hidden";
    const controls = animate(0, 100, {
      duration: 1.3,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {
          /* storage unavailable — intro simply shows again next time */
        }
        setTimeout(() => setShow(false), 250);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
        onDone();
      }}
    >
      {show && (
        <motion.div
          key="preloader"
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 bg-grid mask-radial opacity-50" />
          <div className="relative overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="font-display text-5xl font-bold tracking-tight text-white sm:text-7xl"
            >
              Digvijay<span className="text-emerald-400">.</span>
            </motion.p>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative mt-4 font-mono text-[11px] tracking-[0.3em] text-white/40"
          >
            FULL STACK · MERN DEVELOPER
          </motion.p>
          <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between sm:right-10 sm:bottom-10 sm:left-10">
            <div className="h-px flex-1 overflow-hidden bg-white/10">
              <div className="h-full bg-emerald-400" style={{ width: `${count}%` }} />
            </div>
            <span className="ml-6 font-display text-5xl leading-none font-semibold tabular-nums text-white/90 sm:text-7xl">
              {count}
              <span className="text-emerald-400">%</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Oversized scrolling call-to-action band. */
export function CtaBand() {
  const items = Array.from({ length: 4 });
  return (
    <a
      href="#contact"
      aria-label="Let's work together — go to contact section"
      className="group relative block overflow-hidden border-y border-white/[0.07] py-10 md:py-14"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 origin-bottom scale-y-0 bg-emerald-400 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100"
      />
      <div aria-hidden="true" className="relative flex w-max animate-marquee [animation-duration:28s]">
        {[...items, ...items].map((_, i) => (
          <span
            key={i}
            className="flex items-center gap-8 pr-8 font-display text-6xl font-bold tracking-tight whitespace-nowrap md:text-8xl"
          >
            <span className="text-white transition-colors duration-700 group-hover:text-ink-950">Let's Work Together</span>
            <span className="grid size-14 place-items-center rounded-full border border-emerald-400/60 text-emerald-300 transition-all duration-700 group-hover:rotate-45 group-hover:border-ink-950 group-hover:text-ink-950 md:size-20">
              <ArrowUpRight className="size-7 md:size-10" />
            </span>
            <span className="text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.35)] transition-all duration-700 group-hover:[-webkit-text-stroke:1.5px_rgb(5_6_7/0.6)]">
              Start a Project
            </span>
            <span className="text-emerald-400 transition-colors duration-700 group-hover:text-ink-950">✦</span>
          </span>
        ))}
      </div>
    </a>
  );
}
