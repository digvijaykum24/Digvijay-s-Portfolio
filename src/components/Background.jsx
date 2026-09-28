import { useEffect, useMemo } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, useReducedMotion } from "framer-motion";

/** Fixed, site-wide ambient layer: gradient blobs, fine grid, particles, noise and a cursor glow. */
export default function Background() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const x = useSpring(mx, { stiffness: 90, damping: 20, mass: 0.6 });
  const y = useSpring(my, { stiffness: 90, damping: 20, mass: 0.6 });
  const glow = useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgb(52 211 153 / 0.07), transparent 60%)`;

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  // Deterministic particle layout so it doesn't shift between renders.
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const r = (n) => ((Math.sin(i * 9301 + n * 49297) + 1) / 2) % 1;
        return {
          left: `${(r(1) * 100).toFixed(2)}%`,
          top: `${(r(2) * 100).toFixed(2)}%`,
          size: 1 + Math.round(r(3) * 2),
          duration: 14 + r(4) * 16,
          delay: -r(5) * 20,
          opacity: 0.15 + r(6) * 0.35,
        };
      }),
    []
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      {/* Gradient blobs */}
      <div className="absolute -top-[20vh] -left-[10vw] size-[55vw] max-w-[820px] max-h-[820px] rounded-full bg-emerald-500/[0.13] blur-[120px] animate-blob" />
      <div
        className="absolute top-[35vh] -right-[15vw] size-[50vw] max-w-[760px] max-h-[760px] rounded-full bg-teal-400/[0.08] blur-[130px] animate-blob"
        style={{ animationDelay: "-8s", animationDuration: "28s" }}
      />
      <div
        className="absolute -bottom-[25vh] left-[20vw] size-[45vw] max-w-[700px] max-h-[700px] rounded-full bg-emerald-700/[0.12] blur-[140px] animate-blob"
        style={{ animationDelay: "-14s", animationDuration: "32s" }}
      />

      {/* Fine grid, fading at the edges */}
      <div className="absolute inset-0 bg-grid mask-radial opacity-70" />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-emerald-200"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Cursor-following glow */}
      <motion.div className="absolute inset-0 hidden md:block" style={{ background: glow }} />

      {/* Film grain + vignette */}
      <div className="absolute inset-0 noise opacity-[0.06] mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(0_0_0/0.55)_100%)]" />
    </div>
  );
}
