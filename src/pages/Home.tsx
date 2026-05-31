import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu, Code2, Smartphone, Rocket, Star, CheckCircle2,
  MessageCircle, Share2, Play, Globe2, ArrowRight,
  Bot, Globe, Monitor, Zap, Users, BookOpen, Terminal,
  Wifi, Battery, Signal, Menu, X,
} from "lucide-react";
import ShaderBackground from "@/components/ui/shader-background";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import NavHeader from "@/components/ui/nav-header";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import PricingSection from "@/components/ui/pricing-section";
import { SpiralAnimation } from "@/components/ui/spiral-animation";
import MentorsSection from "@/components/ui/mentors-section";

/* ─── Timeline Data ─────────────────────────────────────── */

const courseTracksData = [
  {
    id: 1, title: "Robotics & AI", date: "Age 8–18",
    content: "Build real robots with Arduino, sensors, IoT and AI computer vision. 4 levels from Spark to Innovate.",
    category: "Hardware", icon: Cpu, relatedIds: [2, 3], status: "completed" as const, energy: 100,
  },
  {
    id: 2, title: "Coding & Web", date: "Age 6–18",
    content: "Scratch games to React + AI web apps. Every student ships a live portfolio website on the internet.",
    category: "Web", icon: Code2, relatedIds: [1, 3], status: "completed" as const, energy: 95,
  },
  {
    id: 3, title: "App & AI Dev", date: "Age 10–18",
    content: "Android apps with MIT App Inventor, Python projects, and full AI applications — install on your phone.",
    category: "Mobile", icon: Smartphone, relatedIds: [1, 2], status: "in-progress" as const, energy: 85,
  },
];

const howItWorksData = [
  {
    id: 1, title: "Choose Track", date: "Step 1",
    content: "Pick Robotics & AI, Coding & Web, or App & AI Dev — or bundle them all.",
    category: "Onboarding", icon: BookOpen, relatedIds: [2], status: "completed" as const, energy: 100,
  },
  {
    id: 2, title: "Start at Your Level", date: "Step 2",
    content: "We assess and place you in the right level — no pressure, no prior experience needed.",
    category: "Placement", icon: Users, relatedIds: [1, 3], status: "completed" as const, energy: 90,
  },
  {
    id: 3, title: "Build Every Class", date: "Step 3",
    content: "90-minute sessions: 60 min learn + 30 min build. Every class you make something real.",
    category: "Learning", icon: Zap, relatedIds: [2, 4], status: "in-progress" as const, energy: 70,
  },
  {
    id: 4, title: "Graduate with Portfolio", date: "Step 4",
    content: "Certificate + 3–5 real projects. A portfolio that shows the world what you built.",
    category: "Outcome", icon: Rocket, relatedIds: [3], status: "pending" as const, energy: 40,
  },
];

/* ─── Section wrappers ───────────────────────────────────── */

function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Project Showcase ───────────────────────────────────── */

type Category = "all" | "robotics" | "web" | "app";

const PROJECTS = [
  // Robotics
  {
    id: 1, category: "robotics" as Category,
    title: "Smart Light System", sub: "LDR Sensor + Arduino",
    age: "Age 8–10", level: "Level 1",
    screen: "terminal",
    terminalLines: [
      { text: "$ Upload to Arduino...", dim: true },
      { text: "> Sensor: 42 lux", green: false },
      { text: "> Threshold: 100 lux", green: false },
      { text: "✓ Relay ON — Light activated!", accent: true },
    ],
  },
  {
    id: 2, category: "robotics" as Category,
    title: "Obstacle Avoiding Robot", sub: "Ultrasonic + Motors",
    age: "Age 10–13", level: "Level 2",
    screen: "terminal",
    terminalLines: [
      { text: "$ Running obstacle loop...", dim: true },
      { text: "> Distance: 12 cm", green: false },
      { text: "> Obstacle detected!", green: false },
      { text: "✓ Turning right — path clear", accent: true },
    ],
  },
  {
    id: 3, category: "robotics" as Category,
    title: "AI Face Detection Robot", sub: "OpenCV + Servo Tracking",
    age: "Age 14–18", level: "Level 4",
    screen: "terminal",
    terminalLines: [
      { text: "$ OpenCV: camera feed OK", dim: true },
      { text: "> Face detected at x:312 y:240", green: false },
      { text: "> Servo X: 90° → 62°", green: false },
      { text: "✓ Locked on target!", accent: true },
    ],
  },
  // Web
  {
    id: 4, category: "web" as Category,
    title: "Portfolio Website", sub: "Live on Vercel",
    age: "Age 12–15", level: "Level 3",
    screen: "browser",
    url: "riya.vercel.app",
    browserContent: [
      { tag: "h1", text: "Hi, I'm Riya 👋" },
      { tag: "p",  text: "I build cool things with code." },
      { tag: "btn", text: "See My Projects →" },
    ],
  },
  {
    id: 5, category: "web" as Category,
    title: "Weather App", sub: "Live API + React",
    age: "Age 12–15", level: "Level 3",
    screen: "browser",
    url: "weather-app.vercel.app",
    browserContent: [
      { tag: "h1", text: "🌤 Mumbai, India" },
      { tag: "temp", text: "32°C" },
      { tag: "p",  text: "Humidity: 78%  Wind: 12 km/h" },
    ],
  },
  {
    id: 6, category: "web" as Category,
    title: "AI Chat Website", sub: "React + OpenAI API",
    age: "Age 14–18", level: "Level 4",
    screen: "browser",
    url: "ai-chat.vercel.app",
    browserContent: [
      { tag: "chat-in",  text: "What is machine learning?" },
      { tag: "chat-out", text: "ML is how computers learn from data to make predictions..." },
    ],
  },
  // App Dev
  {
    id: 7, category: "app" as Category,
    title: "School Reminder App", sub: "Android — MIT App Inventor",
    age: "Age 10–12", level: "Level 1",
    screen: "phone",
    phoneContent: [
      { type: "title", text: "📚 School Reminder" },
      { type: "item",  text: "✓  Math HW — Due Tomorrow" },
      { type: "item",  text: "⏰ Science Test — Friday" },
      { type: "btn",   text: "+ Add Reminder" },
    ],
  },
  {
    id: 8, category: "app" as Category,
    title: "AI Story Generator", sub: "Python + ChatGPT API",
    age: "Age 13–16", level: "Level 3",
    screen: "phone",
    phoneContent: [
      { type: "title", text: "✨ AI Stories" },
      { type: "story", text: '"A robot who dreams of becoming a painter discovers colours for the first time..."' },
      { type: "btn",   text: "Generate New Story" },
    ],
  },
  {
    id: 9, category: "app" as Category,
    title: "Voice Assistant App", sub: "Python Speech Recognition",
    age: "Age 13–16", level: "Level 3",
    screen: "phone",
    phoneContent: [
      { type: "title", text: "🎙 Voice Assistant" },
      { type: "wave",  text: "Listening..." },
      { type: "item",  text: "You: \"What's 25 × 4?\"" },
      { type: "reply", text: "Assistant: \"That's 100!\"" },
    ],
  },
];

const TABS: { key: Category; label: string; icon: React.ReactNode }[] = [
  { key: "all",      label: "All Projects", icon: <Rocket size={14} /> },
  { key: "robotics", label: "Robotics",     icon: <Bot size={14} /> },
  { key: "web",      label: "Web & Coding", icon: <Globe size={14} /> },
  { key: "app",      label: "App & AI",     icon: <Monitor size={14} /> },
];

const CATEGORY_META: Record<string, { label: string; color: string; bg: string; border: string }> = {
  robotics: { label: "Robotics & AI", color: "#639922", bg: "from-[#0d1a07] to-[#091005]", border: "border-[#639922]/30" },
  web:      { label: "Web Dev",       color: "#3b82f6", bg: "from-[#07101a] to-[#050d17]", border: "border-blue-500/30" },
  app:      { label: "App & AI Dev",  color: "#EF9F27", bg: "from-[#1a120a] to-[#110d05]", border: "border-[#EF9F27]/30" },
};

type Project = typeof PROJECTS[number];

function TerminalScreen({ lines }: { lines: { text: string; dim?: boolean; accent?: boolean; green?: boolean }[] }) {
  return (
    <div className="bg-[#080c08] rounded-lg h-full flex flex-col overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-black/40">
        <Terminal size={10} className="text-[#639922]" />
        <span className="text-[10px] text-white/30 font-mono">Arduino IDE</span>
      </div>
      <div className="p-3 space-y-1 flex-1">
        {lines.map((l, i) => (
          <p
            key={i}
            className={`font-mono text-[10px] leading-relaxed ${
              l.dim ? "text-white/30" : l.accent ? "text-[#EF9F27] font-semibold" : "text-[#639922]"
            }`}
          >
            {l.text}
          </p>
        ))}
        <p className="font-mono text-[10px] text-[#639922] animate-pulse">▋</p>
      </div>
    </div>
  );
}

function BrowserScreen({ url, content }: { url: string; content: { tag: string; text: string }[] }) {
  return (
    <div className="bg-[#f5f5f5] rounded-lg h-full flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 bg-[#e8e8e8] border-b border-black/10">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded text-[9px] text-gray-500 px-2 py-0.5 truncate font-mono">{url}</div>
      </div>
      <div className="p-3 space-y-2 flex-1 bg-white">
        {content.map((c, i) => {
          if (c.tag === "h1")     return <p key={i} className="font-bold text-[11px] text-gray-800">{c.text}</p>;
          if (c.tag === "temp")   return <p key={i} className="text-2xl font-black text-blue-600">{c.text}</p>;
          if (c.tag === "btn")    return <span key={i} className="inline-block bg-blue-600 text-white text-[9px] px-2 py-1 rounded">{c.text}</span>;
          if (c.tag === "chat-in")  return <div key={i} className="self-end ml-auto bg-blue-600 text-white text-[9px] px-2 py-1 rounded-lg max-w-[80%] text-right">{c.text}</div>;
          if (c.tag === "chat-out") return <div key={i} className="bg-gray-100 text-gray-700 text-[9px] px-2 py-1 rounded-lg max-w-[90%] leading-tight">{c.text}</div>;
          return <p key={i} className="text-[10px] text-gray-500">{c.text}</p>;
        })}
      </div>
    </div>
  );
}

function PhoneScreen({ content }: { content: { type: string; text: string }[] }) {
  return (
    <div className="bg-[#1a1a2e] rounded-2xl h-full flex flex-col overflow-hidden border border-white/10">
      <div className="flex items-center justify-between px-3 pt-2 pb-1">
        <span className="text-[9px] text-white/50 font-mono">9:41</span>
        <div className="flex items-center gap-1">
          <Signal size={8} className="text-white/50" />
          <Wifi size={8} className="text-white/50" />
          <Battery size={8} className="text-white/50" />
        </div>
      </div>
      <div className="flex-1 px-3 py-2 space-y-1.5">
        {content.map((c, i) => {
          if (c.type === "title") return <p key={i} className="text-[11px] font-bold text-white">{c.text}</p>;
          if (c.type === "story") return <p key={i} className="text-[9px] text-white/60 leading-relaxed italic">{c.text}</p>;
          if (c.type === "item")  return <p key={i} className="text-[10px] text-white/70">{c.text}</p>;
          if (c.type === "reply") return <p key={i} className="text-[10px] text-[#EF9F27]">{c.text}</p>;
          if (c.type === "wave")  return (
            <div key={i} className="flex items-center gap-2">
              <div className="flex gap-0.5 items-end">
                {[3,5,4,6,3,5].map((h,j) => (
                  <div key={j} className="w-1 bg-[#EF9F27] rounded-full animate-pulse" style={{ height: h * 2, animationDelay: `${j * 0.1}s` }} />
                ))}
              </div>
              <span className="text-[10px] text-[#EF9F27]">{c.text}</span>
            </div>
          );
          if (c.type === "btn") return (
            <div key={i} className="bg-[#EF9F27] text-black text-[9px] font-bold px-2 py-1.5 rounded-lg text-center mt-auto">
              {c.text}
            </div>
          );
          return null;
        })}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const meta = CATEGORY_META[project.category];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -6, scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`group relative rounded-2xl border ${meta.border} bg-gradient-to-b ${meta.bg} overflow-hidden cursor-default flex flex-col`}
      style={{ boxShadow: hovered ? `0 8px 32px ${meta.color}22` : "none" }}
    >
      {/* Glow line on top */}
      <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${meta.color}80, transparent)` }} />

      {/* Screen preview area */}
      <div className="h-44 p-3">
        {"terminalLines" in project && project.terminalLines && (
          <TerminalScreen lines={project.terminalLines} />
        )}
        {"browserContent" in project && project.browserContent && (
          <BrowserScreen url={project.url ?? ""} content={project.browserContent} />
        )}
        {"phoneContent" in project && project.phoneContent && (
          <div className="flex justify-center h-full">
            <div className="w-28">
              <PhoneScreen content={project.phoneContent} />
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-4 pb-5 pt-1 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border"
            style={{ color: meta.color, borderColor: `${meta.color}40`, background: `${meta.color}15` }}
          >
            {meta.label}
          </span>
          <span className="text-[10px] text-white/30">{project.level}</span>
        </div>
        <h3 className="text-base font-bold text-white leading-snug">{project.title}</h3>
        <p className="text-xs text-white/50">{project.sub}</p>
        <p className="text-xs font-semibold mt-1" style={{ color: meta.color }}>{project.age}</p>
      </div>
    </motion.div>
  );
}

function ProjectShowcaseSection() {
  const [activeTab, setActiveTab] = useState<Category>("all");
  const filtered = activeTab === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === activeTab);

  return (
    <section className="py-20 px-6 bg-black/60">
      <FadeInSection className="text-center mb-10">
        <span className="text-[#639922] uppercase tracking-widest text-sm font-semibold">Demo</span>
        <h2 className="text-4xl md:text-5xl font-black text-white mt-3">See What Our Kids Build</h2>
        <p className="text-white/50 mt-3 max-w-xl mx-auto">
          Every project is real — deployed, installed, or running on actual hardware.
        </p>
      </FadeInSection>

      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
              activeTab === tab.key
                ? "bg-[#639922] border-[#639922] text-white shadow-lg shadow-[#639922]/30"
                : "border-white/10 text-white/50 hover:text-white hover:border-white/20 bg-black/40"
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.key && (
              <motion.span
                layoutId="tab-indicator"
                className="absolute inset-0 rounded-full bg-[#639922] -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom note */}
      <FadeInSection className="text-center mt-10">
        <p className="text-white/30 text-sm">
          9 projects across 3 tracks · All built by real students aged 6–18
        </p>
      </FadeInSection>
    </section>
  );
}

/* ─── Home Page ──────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Courses",  href: "#courses"  },
  { label: "Projects", href: "#projects" },
  { label: "About",    href: "#about"    },
  { label: "Pricing",  href: "#pricing"  },
  { label: "Workshop", href: "#workshop" },
  { label: "Contact",  href: "#contact"  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* ── SHADER BACKGROUND (fixed, behind everything) ── */}
      <ShaderBackground />

      {/* ── NAVBAR ───────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-black/80 backdrop-blur-md border-b border-[#639922]/10">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-[#639922] flex items-center justify-center">
              <Cpu size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight text-white">
              Tinker<span className="text-[#639922]">Minds</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:block">
            <NavHeader />
          </div>

          {/* Desktop enroll + Mobile hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/91XXXXXXXXXX"
              className="hidden md:flex items-center gap-2 bg-[#639922] hover:bg-[#27500A] text-white px-4 py-2 rounded-full text-sm font-semibold transition-all"
            >
              <MessageCircle size={16} />
              Enroll Now
            </a>
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-[#639922]/30 text-white hover:border-[#639922] transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-b border-[#639922]/20"
            >
              <div className="flex flex-col px-4 py-4 gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white/80 hover:text-[#639922] hover:bg-[#639922]/10 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="https://wa.me/91XXXXXXXXXX"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 mt-2 bg-[#639922] text-white px-4 py-3 rounded-xl text-sm font-bold"
                >
                  <MessageCircle size={16} /> Enroll Now
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        id="home"
        ref={heroRef}
        className="relative w-full h-screen flex flex-col md:flex-row overflow-hidden"
      >
        {/* ── SPIRAL ANIMATION BACKGROUND ─────────────────── */}
        <div className="absolute inset-0 z-0">
          <SpiralAnimation />
        </div>

        {/* Left-side gradient so text stays readable over the stars */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.18) 65%, transparent 100%)",
          }}
        />

        {/* Subtle brand-green radial at top — tints the star field green */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(99,153,34,0.22) 0%, transparent 70%)",
          }}
        />

        {/* Bottom fade into the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-36 z-[1] pointer-events-none bg-gradient-to-t from-black to-transparent" />

        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#639922" />

        {/* ── TEXT COLUMN ──────────────────────────────────── */}
        <div className="flex-1 md:flex-1 px-5 pt-16 pb-2 md:px-16 md:pt-0 md:pb-0 relative z-10 flex flex-col justify-center md:max-w-2xl overflow-y-auto md:overflow-visible">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="inline-block bg-[#639922]/20 border border-[#639922]/40 text-[#C0DD97] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
              Where kids become creators
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl sm:text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-white mb-3 md:mb-5"
          >
            Kids Build{" "}
            <span className="text-[#639922]">Real</span>{" "}
            Technology Here.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-sm md:text-lg text-white/60 mb-4 md:mb-8 leading-relaxed max-w-xl"
          >
            Robots. Websites. AI Apps. Not theory — real projects they build
            themselves, from scratch. Ages 6–18.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#courses"
              className="flex items-center justify-center gap-2 bg-[#639922] hover:bg-[#27500A] text-white px-6 py-3.5 rounded-full font-semibold transition-all hover:scale-105 text-sm md:text-base"
            >
              Explore Courses <ArrowRight size={16} />
            </a>
            <a
              href="#workshop"
              className="flex items-center justify-center gap-2 border border-[#639922]/40 hover:border-[#639922] text-white px-6 py-3.5 rounded-full font-semibold transition-all hover:bg-[#639922]/10 text-sm md:text-base"
            >
              Join Free Workshop
            </a>
          </motion.div>

          {/* Pillar strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-3 md:gap-6 mt-4 md:mt-8"
          >
            {[
              { icon: <Zap size={14} />,      label: "Hands-On", sub: "Build every session" },
              { icon: <BookOpen size={14} />, label: "3 Tracks",  sub: "Robots · Web · AI" },
              { icon: <Users size={14} />,    label: "Age 6–18",  sub: "Structured levels" },
            ].map((p) => (
              <div key={p.label} className="flex items-center gap-2">
                <span className="text-[#639922]">{p.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-white">{p.label}</p>
                  <p className="text-xs text-white/40">{p.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── ROBOT (3D Spline) — visible on ALL screens ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex-1 md:flex-1 relative min-h-0 z-10"
        >
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </motion.div>

        {/* Scroll cue — desktop only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1"
        >
          <span className="text-white/30 text-xs tracking-widest uppercase">scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#639922]/60 to-transparent" />
        </motion.div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────── */}
      <FadeInSection>
        <div className="border-y border-[#639922]/20 py-10 bg-black/60 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
            {[
              { value: "3",    label: "Expert Tracks" },
              { value: "12",   label: "Levels" },
              { value: "30+",  label: "Projects" },
              { value: "6–18", label: "Age Range" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-black text-[#639922]">{s.value}</p>
                <p className="text-white/50 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ── PROBLEM STATEMENT ────────────────────────────── */}
      <FadeInSection>
        <section className="max-w-5xl mx-auto px-4 md:px-6 py-14 md:py-24 text-center">
          <span className="text-[#639922] uppercase tracking-widest text-sm font-semibold">The Problem</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-8 md:mb-12 leading-tight">
            Most coding classes teach syntax.
            <br />
            <span className="text-[#639922]">We teach creation.</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            {[
              { ok: false, text: "Old institutes → boring theory, no real projects" },
              { ok: false, text: "Kids memorize code → don't understand it" },
              { ok: true,  text: "TinkerMinds → kids build, break, debug, repeat" },
              { ok: true,  text: "Every kid leaves with a real project portfolio" },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 p-5 rounded-xl border ${
                  item.ok
                    ? "border-[#639922]/40 bg-[#639922]/5"
                    : "border-white/10 bg-white/2"
                }`}
              >
                <span className={`text-xl mt-0.5 ${item.ok ? "text-[#639922]" : "text-red-400/60"}`}>
                  {item.ok ? "✅" : "❌"}
                </span>
                <p className={`text-base ${item.ok ? "text-white" : "text-white/50 line-through decoration-red-400/40"}`}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* ── COURSES OVERVIEW (orbital) ───────────────────── */}
      <section id="courses" className="py-16 bg-black/40">
        <FadeInSection className="text-center mb-4 px-6">
          <span className="text-[#639922] uppercase tracking-widest text-sm font-semibold">Courses</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3">
            Three Tracks. Infinite Possibilities.
          </h2>
          <p className="text-white/50 mt-3">Click a node to explore each track</p>
        </FadeInSection>
        <RadialOrbitalTimeline timelineData={courseTracksData} />

        {/* Course detail cards */}
        <FadeInSection className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6 mt-4">
          {[
            {
              icon: <Cpu size={28} className="text-[#639922]" />,
              title: "Robotics & AI Engineering",
              age: "8–18", levels: "4 Levels", weeks: "6–8 weeks/level",
              builds: ["Smart Light System", "Obstacle Avoiding Robot", "AI Face Detection Robot"],
              color: "from-[#27500A]/40 to-transparent",
            },
            {
              icon: <Code2 size={28} className="text-[#639922]" />,
              title: "Coding & Web Development",
              age: "6–18", levels: "4 Levels", weeks: "6–8 weeks/level",
              builds: ["Scratch Games", "Portfolio Website (live)", "React + AI Web App"],
              color: "from-[#639922]/20 to-transparent",
            },
            {
              icon: <Smartphone size={28} className="text-[#639922]" />,
              title: "App & AI Development",
              age: "10–18", levels: "4 Levels", weeks: "6–8 weeks/level",
              builds: ["School Reminder App", "AI Story Generator", "Voice Assistant App"],
              color: "from-[#27500A]/40 to-transparent",
            },
          ].map((c, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-[#639922]/20 bg-gradient-to-b ${c.color} p-6`}
            >
              <div className="mb-4">{c.icon}</div>
              <h3 className="text-lg font-bold text-white mb-1">{c.title}</h3>
              <div className="flex gap-3 text-xs text-white/40 mb-4">
                <span>Age {c.age}</span>
                <span>·</span>
                <span>{c.levels}</span>
                <span>·</span>
                <span>{c.weeks}</span>
              </div>
              <ul className="space-y-2">
                {c.builds.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-white/70">
                    <CheckCircle2 size={14} className="text-[#639922]" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </FadeInSection>
      </section>

      {/* ── WHAT KIDS BUILD ──────────────────────────────── */}
      <FadeInSection>
        <section className="py-14 md:py-24 px-4 md:px-6 max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-[#639922] uppercase tracking-widest text-sm font-semibold">Projects</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-3">Real Projects. Real Pride.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[
              { icon: <Bot size={28} />,    label: "Smart Light System (LDR + Arduino)" },
              { icon: <Bot size={28} />,    label: "Obstacle Avoiding Robot" },
              { icon: <Bot size={28} />,    label: "AI Face Detection Robot" },
              { icon: <Globe size={28} />,  label: "Portfolio Website (live on internet)" },
              { icon: <Globe size={28} />,  label: "Weather App with live API" },
              { icon: <Globe size={28} />,  label: "AI Chat Website" },
              { icon: <Monitor size={28} />, label: "School Reminder Android App" },
              { icon: <Monitor size={28} />, label: "AI Story Generator" },
              { icon: <Monitor size={28} />, label: "Voice Assistant App" },
            ].map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03, borderColor: "rgba(99,153,34,0.6)" }}
                className="flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 rounded-xl border border-[#639922]/20 bg-black/40 text-center cursor-default transition-colors"
              >
                <span className="text-[#639922]">{p.icon}</span>
                <p className="text-sm text-white/70 font-medium leading-snug">{p.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* ── PROJECT SHOWCASE ─────────────────────────────── */}
      <ProjectShowcaseSection />

      {/* ── HOW IT WORKS (orbital) ───────────────────────── */}
      <section id="about" className="py-16 bg-black/40">
        <FadeInSection className="text-center mb-4 px-6">
          <span className="text-[#639922] uppercase tracking-widest text-sm font-semibold">Process</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3">
            Simple. Structured. Powerful.
          </h2>
          <p className="text-white/50 mt-3">Click a step to see what happens</p>
        </FadeInSection>
        <RadialOrbitalTimeline timelineData={howItWorksData} />
      </section>

      {/* ── PRICING ──────────────────────────────────────── */}
      <PricingSection />

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <FadeInSection>
        <section className="py-14 md:py-24 px-4 md:px-6 max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-[#639922] uppercase tracking-widest text-sm font-semibold">Testimonials</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-3">What Parents & Students Say</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { quote: "My son built a robot in his first month. He won't stop talking about it.", by: "Parent", age: "Son, Age 10" },
              { quote: "I built my own app and installed it on my phone!",                          by: "Student", age: "Age 12" },
              { quote: "Best investment for my daughter's future.",                                  by: "Parent", age: "Daughter, Age 14" },
            ].map((t, i) => (
              <div key={i} className="p-6 rounded-2xl border border-[#639922]/20 bg-[#0d1a07]/60">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#EF9F27" className="text-[#EF9F27]" />)}
                </div>
                <p className="text-white/80 text-base leading-relaxed mb-4">"{t.quote}"</p>
                <div>
                  <p className="text-white font-semibold text-sm">{t.by}</p>
                  <p className="text-white/40 text-xs">{t.age}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* ── MENTORS ──────────────────────────────────────── */}
      <MentorsSection />

      {/* ── FREE WORKSHOP CTA ────────────────────────────── */}
      <FadeInSection>
        <section id="workshop" className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center rounded-3xl border border-[#639922]/30 bg-gradient-to-b from-[#0d1a07] to-black px-5 py-10 md:p-12">
            <span className="inline-block bg-[#EF9F27]/20 border border-[#EF9F27]/40 text-[#EF9F27] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
              Free Workshop
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Start with a Free Workshop
            </h2>
            <p className="text-white/60 text-base md:text-lg mb-8">
              1-hour live session — Robotics demo + Coding intro + AI demo.
              <br className="hidden sm:block" />
              No experience needed. Just curiosity.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/91XXXXXXXXXX"
                className="flex items-center justify-center gap-2 bg-[#639922] hover:bg-[#27500A] text-white px-6 py-4 rounded-full font-bold text-base md:text-lg transition-all hover:scale-105"
              >
                <MessageCircle size={18} /> Register for Free Workshop
              </a>
            </div>
            <p className="text-white/30 text-sm mt-6">FREE · Seats limited · First come first served</p>
          </div>
        </section>
      </FadeInSection>

      {/* ── CONTACT ──────────────────────────────────────── */}
      <FadeInSection>
        <section id="contact" className="py-14 md:py-24 px-4 md:px-6 bg-black/40">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[#639922] uppercase tracking-widest text-sm font-semibold">Contact</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-4">
              Come Say Hello.
            </h2>
            <p className="text-white/50 mb-8 md:mb-12">Or build something together.</p>
            <div className="grid sm:grid-cols-3 gap-4 text-center mb-10">
              {[
                { icon: <MessageCircle size={24} />, label: "WhatsApp", value: "+91 XXXXXXXXXX", href: "https://wa.me/91XXXXXXXXXX" },
                { icon: <Globe size={24} />,          label: "Email",    value: "hello@tinkermindsindia.com", href: "mailto:hello@tinkermindsindia.com" },
                { icon: <Share2 size={24} />,           label: "Instagram", value: "@tinkermindsindia", href: "https://instagram.com/tinkermindsindia" },
              ].map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  className="flex flex-col items-center gap-2 p-6 rounded-xl border border-[#639922]/20 bg-black/40 hover:border-[#639922]/60 transition-all group"
                >
                  <span className="text-[#639922] group-hover:scale-110 transition-transform">{c.icon}</span>
                  <p className="text-white/40 text-xs uppercase tracking-wide">{c.label}</p>
                  <p className="text-white text-sm font-medium">{c.value}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="border-t border-[#639922]/20 py-10 md:py-12 px-4 md:px-6 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col items-center md:flex-row md:justify-between gap-6 md:gap-8 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#639922] flex items-center justify-center">
              <Cpu size={16} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-white">Tinker<span className="text-[#639922]">Minds</span></p>
              <p className="text-white/40 text-xs">Where kids become creators.</p>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-sm text-white/50">
            {["Courses", "Workshop", "About", "Contact", "Pricing"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-[#639922] transition-colors">
                {l}
              </a>
            ))}
          </nav>

          <div className="flex gap-4">
            {[
              { icon: <Share2 size={18} />,       href: "https://instagram.com/tinkermindsindia" },
              { icon: <Play size={18} />,          href: "#" },
              { icon: <Globe2 size={18} />,        href: "#" },
              { icon: <MessageCircle size={18} />, href: "https://wa.me/91XXXXXXXXXX" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="w-9 h-9 rounded-full border border-[#639922]/30 flex items-center justify-center text-white/50 hover:text-[#639922] hover:border-[#639922]/60 transition-all"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <p className="text-center text-white/20 text-xs mt-8">
          © 2025 TinkerMinds. All rights reserved. · Build. Think. Innovate.
        </p>
      </footer>
    </div>
  );
}
