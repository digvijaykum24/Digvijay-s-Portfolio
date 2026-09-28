import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight, LoaderCircle, CircleCheck } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { profile, projectTypes } from "../data/portfolio";
import { ease, MagneticButton, Reveal, SectionHeading } from "./ui";

const channels = [
  { icon: Phone, label: "Phone", value: profile.phone, href: profile.phoneHref },
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: MapPin, label: "Location", value: profile.location },
  { icon: FaLinkedinIn, label: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin, external: true },
];

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  // No backend: the form composes an email in the visitor's mail app.
  // Swap this for EmailJS / Formspree / your own API to send directly.
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    const subject = `New project enquiry — ${data.get("type")}`;
    const body = `Hi Digvijay,\n\n${data.get("message")}\n\n— ${data.get("name")}
Email: ${data.get("email")}
Mobile: ${data.get("phone")}`;
    setTimeout(() => {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      e.target.reset();
      setTimeout(() => setStatus("idle"), 5000);
    }, 1200);
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-28 md:py-40">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-[500px] max-w-4xl rounded-full bg-emerald-500/[0.08] blur-[120px]"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="contact-title"
          eyebrow="Get in touch"
          title={<>Let's Build Something <span className="text-gradient">Great Together.</span></>}
          subtitle="Have a website idea or a project in mind? Let's turn it into a modern digital experience."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <ul className="grid content-start gap-4">
            {channels.map((c, i) => {
              const Inner = (
                <>
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-emerald-300 transition-all duration-500 group-hover:border-emerald-400/40 group-hover:bg-emerald-400/10">
                    <c.icon size={19} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[11px] tracking-widest text-white/40 uppercase">{c.label}</span>
                    <span className="mt-0.5 block truncate text-[15px] text-white sm:text-base">{c.value}</span>
                  </span>
                  {c.href && (
                    <ArrowUpRight
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 text-white/30 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-300"
                    />
                  )}
                </>
              );
              const cls = "glass group flex items-center gap-4 rounded-2xl p-4 pr-5 transition-colors duration-500 hover:border-white/15 sm:p-5";
              return (
                <Reveal as="li" i={i} key={c.label}>
                  {c.href ? (
                    <a href={c.href} className={cls} {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {Inner}
                    </a>
                  ) : (
                    <div className={cls}>{Inner}</div>
                  )}
                </Reveal>
              );
            })}
          </ul>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease }}
            className="glass relative rounded-3xl p-6 sm:p-9"
            aria-label="Project enquiry form"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Name</span>
                <input name="name" required autoComplete="name" placeholder="Your full name" className="field" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Email</span>
                <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="field" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Mobile Number</span>
                <input
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  pattern="[+0-9 ()-]{10,16}"
                  title="Enter a valid mobile number, e.g. +91 98765 43210"
                  placeholder="+91 98765 43210"
                  className="field"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Project Type</span>
                <select name="type" required defaultValue="" className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2334d399%22 stroke-width=%222.5%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:14px] bg-[position:right_1rem_center] bg-no-repeat pr-10 [&>option]:bg-ink-800">
                  <option value="" disabled>Select a project type</option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm text-white/70">Message</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your idea, goals and timeline…"
                  className="field resize-none"
                />
              </label>
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <MagneticButton
                type="submit"
                disabled={status === "sending"}
                strength={0.2}
                arrow={status === "idle"}
                className="w-full sm:w-auto"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={status}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="inline-flex items-center gap-2"
                  >
                    {status === "sending" && <LoaderCircle size={17} className="animate-spin" aria-hidden="true" />}
                    {status === "sent" && <CircleCheck size={17} aria-hidden="true" />}
                    {status === "idle" ? "Send Message" : status === "sending" ? "Sending…" : "Opening your mail app"}
                  </motion.span>
                </AnimatePresence>
              </MagneticButton>
              <p className="text-xs text-white/40" aria-live="polite">
                {status === "sent" ? "Thanks! Your email draft is ready to send." : "I usually reply within 24 hours."}
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
