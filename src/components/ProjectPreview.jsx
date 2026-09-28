/**
 * Stylised browser-window illustration of each project (no screenshots are bundled).
 * Pure CSS so it stays crisp at any size and costs nothing to load.
 */
function Bar({ w, className = "" }) {
  return <span className={`block h-1.5 rounded-full bg-white/20 ${className}`} style={{ width: w }} />;
}

function Education({ theme, title }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 py-3">
        <span className="text-[10px] font-bold tracking-wide text-white">{title.toUpperCase()}</span>
        <div className="hidden gap-3 sm:flex">
          {["Home", "Courses", "Faculty", "Library", "Gallery"].map((l) => (
            <span key={l} className="text-[9px] text-white/60">{l}</span>
          ))}
        </div>
      </div>
      <div className="grid flex-1 grid-cols-[1.2fr_1fr] items-center gap-4 px-5">
        <div>
          <span className="mb-2 inline-block rounded-full px-2 py-0.5 text-[8px] font-semibold text-ink-950" style={{ background: theme.accent }}>
            ADMISSIONS OPEN
          </span>
          <p className="font-display text-lg leading-tight font-bold text-white sm:text-2xl">Learn. Grow.<br />Succeed.</p>
          <div className="mt-3 space-y-1.5"><Bar w="85%" /><Bar w="65%" /></div>
          <span className="mt-4 inline-block rounded-md px-3 py-1.5 text-[9px] font-semibold text-white" style={{ background: theme.from }}>
            Explore Courses
          </span>
        </div>
        <div className="relative aspect-square rounded-2xl" style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}>
          <div className="absolute inset-3 rounded-xl border border-white/30" />
          <div className="absolute right-3 bottom-3 left-3 rounded-lg bg-white/90 p-2">
            <Bar w="70%" className="!bg-ink-950/30" />
            <Bar w="45%" className="mt-1 !bg-ink-950/20" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 p-5 pt-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-white/10 bg-white/[0.06] p-2">
            <span className="mb-1.5 block size-4 rounded" style={{ background: i === 1 ? theme.to : theme.from, opacity: 0.8 }} />
            <Bar w="80%" /><Bar w="50%" className="mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Studio({ theme }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 py-3">
        <span className="text-[10px] font-bold text-white">&lt;FWS/&gt;</span>
        <span className="rounded-full border border-white/20 px-2.5 py-1 text-[8px] text-white">Start a project</span>
      </div>
      <div className="flex flex-1 flex-col justify-center px-5">
        <p className="font-display text-xl leading-[1.05] font-bold text-white sm:text-3xl">
          We build websites
          <br />
          <span style={{ color: theme.accent }}>that convert.</span>
        </p>
        <div className="mt-4 flex gap-2">
          <span className="rounded-md px-3 py-1.5 text-[9px] font-semibold text-ink-950" style={{ background: theme.accent }}>Our Work</span>
          <span className="rounded-md border border-white/20 px-3 py-1.5 text-[9px] text-white">Services</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 p-5 pt-2">
        {[theme.from, theme.to, theme.accent].map((c, i) => (
          <div key={i} className="aspect-[4/3] rounded-lg" style={{ background: `linear-gradient(160deg, ${c}, transparent)` }}>
            <div className="p-2"><Bar w="60%" className="!bg-white/40" /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Restaurant({ theme }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 py-3">
        <span className="text-[10px] font-bold text-white">Chatkara</span>
        <span className="rounded-full px-2.5 py-1 text-[8px] font-semibold text-ink-950" style={{ background: theme.accent }}>
          Order Online
        </span>
      </div>
      <div className="px-5">
        <p className="font-display text-lg font-bold text-white sm:text-2xl">Taste the Tradition</p>
        <div className="mt-2 flex gap-1.5">
          {["Starters", "Main Course", "Chaat", "Desserts"].map((t, i) => (
            <span key={t} className={`rounded-full px-2 py-0.5 text-[8px] ${i === 0 ? "text-ink-950" : "border border-white/15 text-white/70"}`} style={i === 0 ? { background: theme.from } : undefined}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2 p-5 sm:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] p-2 ${i > 3 ? "hidden sm:flex" : ""}`}>
            <span
              className="size-7 shrink-0 rounded-full"
              style={{ background: `radial-gradient(circle at 35% 35%, ${theme.accent}, ${i % 2 ? theme.to : theme.from})` }}
            />
            <div className="min-w-0 flex-1">
              <Bar w="80%" />
              <span className="mt-1 block text-[8px] font-semibold" style={{ color: theme.accent }}>₹{120 + i * 40}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const layouts = { education: Education, studio: Studio, restaurant: Restaurant };

export default function ProjectPreview({ project }) {
  const Layout = layouts[project.preview];
  const { theme } = project;
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-900" aria-hidden="true">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-3 flex-1 truncate rounded-md bg-white/[0.05] px-3 py-1 font-mono text-[10px] text-white/45">
          {project.domain}
        </span>
      </div>
      <div
        className="relative h-[calc(100%-38px)] transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        style={{
          background: `radial-gradient(120% 80% at 100% 0%, ${theme.from}33, transparent 60%), radial-gradient(90% 70% at 0% 100%, ${theme.to}26, transparent 60%), #0c0f12`,
        }}
      >
        <Layout theme={theme} title={project.title} />
      </div>
    </div>
  );
}
