import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import { FaLinkedinIn, FaGithub, FaWhatsapp } from "react-icons/fa";
import { navLinks, profile } from "../data/portfolio";

const socials = [
  { label: "LinkedIn", href: profile.linkedin, icon: FaLinkedinIn },
  { label: "GitHub", href: profile.github, icon: FaGithub },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  { label: "WhatsApp", href: profile.whatsapp, icon: FaWhatsapp },
];

export function BackToTop() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 800));

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#home"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ y: -4 }}
          className="glass fixed right-5 bottom-5 z-30 grid size-12 place-items-center rounded-full text-emerald-300 transition-colors hover:border-emerald-400/50 hover:text-white sm:right-8 sm:bottom-8"
        >
          <ArrowUp size={19} aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
              DIGVIJAY <span className="text-gradient">KUMAR</span>
            </p>
            <p className="mt-3 text-mist">Full Stack Web Developer | MERN Stack Developer</p>
          </div>
          <ul className="flex gap-3" aria-label="Social links">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="grid size-12 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-all duration-500 hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:text-emerald-300 hover:shadow-[0_8px_30px_-8px_rgb(52_211_153/0.6)]"
                >
                  <s.icon size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="mt-14">
          <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/50">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="transition-colors hover:text-white">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.07] pt-8 text-sm text-white/40 sm:flex-row sm:justify-between">
          <p>© 2026 Digvijay Kumar. All Rights Reserved.</p>
          <p>Designed & built by Digvijay Kumar · {profile.location}</p>
        </div>
      </div>
    </footer>
  );
}
