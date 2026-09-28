import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks, profile } from "../data/portfolio";
import useActiveSection from "../hooks/useActiveSection";
import { ease, MagneticButton } from "./ui";

const ids = navLinks.map((l) => l.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-all duration-500 ${
            scrolled || open
              ? "border-b border-white/[0.07] bg-ink-950/75 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <nav
            aria-label="Primary"
            className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8 ${
              scrolled ? "h-16" : "h-20"
            }`}
          >
            <a href="#home" className="group relative flex items-center gap-2.5" aria-label={`${profile.name} — home`}>
              <span className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] font-display text-[15px] font-bold tracking-tight transition-colors duration-500 group-hover:border-emerald-400/50">
                D<span className="text-emerald-400">K</span>
              </span>
              <span className="hidden font-display text-[15px] font-semibold tracking-tight text-white/90 sm:block">
                Digvijay<span className="text-emerald-400">.</span>
              </span>
            </a>

            <ul className="hidden items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.03] p-1 backdrop-blur-md lg:flex">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={active === link.id ? "true" : undefined}
                    className={`relative block rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-300 ${
                      active === link.id ? "text-white" : "text-white/55 hover:text-white"
                    }`}
                  >
                    {active === link.id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-emerald-400/25 bg-emerald-400/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <MagneticButton href="#contact" className="hidden !px-5 !py-2.5 !text-sm sm:inline-flex" icon={ArrowUpRight}>
                Let's Talk
              </MagneticButton>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="relative grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] lg:hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={open ? "x" : "menu"}
                    initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.25 }}
                  >
                    {open ? <X size={20} /> : <Menu size={20} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="h-px origin-left bg-gradient-to-r from-emerald-500 via-emerald-300 to-teal-300"
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-0 z-40 flex flex-col bg-ink-950/95 px-6 pt-28 pb-10 backdrop-blur-2xl lg:hidden"
          >
            <div className="absolute inset-0 -z-10 bg-grid mask-radial opacity-60" aria-hidden="true" />
            <motion.ul
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } }, hidden: {} }}
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  variants={{
                    hidden: { y: 40, opacity: 0 },
                    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease } },
                  }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-baseline gap-4 border-b border-white/[0.06] py-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl ${
                      active === link.id ? "text-emerald-300" : "text-white/85"
                    }`}
                  >
                    <span className="font-mono text-xs text-white/30">0{i + 1}</span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.5 } }}
              exit={{ opacity: 0 }}
              className="mt-auto flex flex-col gap-2 text-sm text-mist"
            >
              <a href={`mailto:${profile.email}`} className="hover:text-white">{profile.email}</a>
              <a href={profile.phoneHref} className="hover:text-white">{profile.phone}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
