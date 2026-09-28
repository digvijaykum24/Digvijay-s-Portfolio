import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const ease = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease, delay: i * 0.08 },
  }),
};

/** Reveal children once when they scroll into view. */
export function Reveal({ as = "div", i = 0, className, children, ...rest }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      custom={i}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, align = "left", id }) {
  const centered = align === "center";
  return (
    <div className={`mb-14 md:mb-20 ${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <Reveal className={`mb-5 flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-400/80" aria-hidden="true" />
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal
        as="h2"
        i={1}
        id={id}
        className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
      >
        {title}
      </Reveal>
      {subtitle && (
        <Reveal as="p" i={2} className="mt-6 text-base leading-relaxed text-mist md:text-lg">
          {subtitle}
        </Reveal>
      )}
    </div>
  );
}

/**
 * Button/link with a magnetic pull toward the cursor, shine sweep, click ripple
 * and a nudging arrow. `variant` is "primary" (solid emerald) or "ghost" (glass + animated border).
 */
export function MagneticButton({
  href,
  onClick,
  children,
  variant = "primary",
  arrow = true,
  icon: Icon = ArrowRight,
  className = "",
  strength = 0.35,
  type = "button",
  disabled,
  ...rest
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });
  const [ripples, setRipples] = useState([]);

  const onMove = (e) => {
    if (reduce || e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };
  const onDown = (e) => {
    const r = ref.current.getBoundingClientRect();
    const id = Date.now();
    setRipples((rs) => [...rs, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setTimeout(() => setRipples((rs) => rs.filter((rp) => rp.id !== id)), 700);
  };

  const base =
    "group shine relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-medium tracking-tight transition-[box-shadow,background-color,color] duration-500 select-none disabled:cursor-not-allowed disabled:opacity-70";
  const styles =
    variant === "primary"
      ? "bg-emerald-400 text-ink-950 shadow-[0_0_0_1px_rgb(52_211_153/0.4),0_10px_40px_-10px_rgb(52_211_153/0.7)] hover:bg-emerald-300 hover:shadow-[0_0_0_1px_rgb(110_231_183/0.6),0_14px_50px_-8px_rgb(52_211_153/0.9)]"
      : "gradient-border glass text-white hover:bg-white/[0.07] hover:shadow-[0_10px_40px_-12px_rgb(52_211_153/0.45)]";

  const Comp = href ? motion.a : motion.button;
  const linkProps = href ? { href } : { type, disabled };

  return (
    <Comp
      ref={ref}
      {...linkProps}
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerDown={onDown}
      style={{ x: sx, y: sy }}
      whileHover={reduce ? undefined : { scale: 1.04 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      className={`${base} ${styles} ${className}`}
      {...rest}
    >
      <span className="relative z-[2] inline-flex items-center gap-2.5">
        {children}
        {arrow && Icon && (
          <Icon
            size={17}
            strokeWidth={2.2}
            aria-hidden="true"
            className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
          />
        )}
      </span>
      {ripples.map((rp) => (
        <span
          key={rp.id}
          aria-hidden="true"
          className="pointer-events-none absolute z-[1] block size-2 rounded-full bg-white/50"
          style={{
            left: rp.x - 4,
            top: rp.y - 4,
            animation: "ripple 0.7s ease-out forwards",
          }}
        />
      ))}
    </Comp>
  );
}
