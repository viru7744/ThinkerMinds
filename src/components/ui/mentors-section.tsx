"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Quote } from "lucide-react";
import vireendraImg from "../../assets/virendra.jpg";
import shivamImg from "../../assets/shivam.jpg";
/* ── Types ───────────────────────────────────────────────────── */
interface Mentor {
  initials: string;
  name: string;
  role: string;
  accentColor: string;
  glowColor: string;
  borderColor: string;
  tagBg: string;
  specializations: string[];
  highlights: string[];
  quote: string;
}

interface ParticlePos {
  top: string;
  left?: string;
  right?: string;
  size: number;
  delay: number;
}

/* ── Mentor data ─────────────────────────────────────────────── */
const MENTORS: Mentor[] = [
  {
    initials: "VG",
    name: "Virendra Gaur",
    role: "Founder & Lead Technology Instructor",
    accentColor: "#639922",
    glowColor: "rgba(99,153,34,0.35)",
    borderColor: "#639922",
    tagBg: "bg-[#639922]/15 border-[#639922]/30 text-[#C0DD97]",
    specializations: ["Coding", "AI", "Web Development", "App Development"],
    highlights: [
      "6+ Years Industry Experience",
      "Real Project Based Learning",
      "Java Full Stack Developer",
      "AI & Technology Mentor",
    ],
    quote: "Build technology. Don't just use it.",
  },
  {
    initials: "SP",
    name: "Shivam Pandey",
    role: "Co-Founder & STEM Instructor",
    accentColor: "#00e5ff",
    glowColor: "rgba(0,229,255,0.25)",
    borderColor: "#00e5ff",
    tagBg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
    specializations: ["Mathematics", "Robotics", "Problem Solving"],
    highlights: [
       "6+ Years Industry Experience",
      "Robotics Mentor",
      "Mathematics Instructor",
      "Hands-On STEM Learning",
      "Innovation Projects",
    ],
    quote: "Strong concepts create future innovators.",
  },
];

/* ── Photo map ───────────────────────────────────────────────── */
const mentorImages: Record<string, string> = {
  VG: vireendraImg,
  SP: shivamImg,
};
/* ── Avatar ──────────────────────────────────────────────────── */
function Avatar({
  initials,
  accent,
  glow,
}: {
  initials: string;
  accent: string;
  glow: string;
}) {
  const photo = mentorImages[initials];

  return (
    <div className="relative mx-auto mb-6 w-28 h-28 md:w-32 md:h-32">
      {/* Pulsing outer glow */}
      <div
        className="absolute -inset-3 rounded-full blur-lg opacity-50 animate-pulse"
        style={{ background: glow }}
      />

      {/* Outer spinning ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ border: `1.5px dashed ${accent}50` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Avatar circle */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          border: `2px solid ${accent}`,
          boxShadow: `0 0 20px ${glow}, 0 0 50px ${glow}`,
        }}
      >
        {photo ? (
          <img
            src={photo}
            alt={initials}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center top" }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-3xl md:text-4xl font-black text-white"
            style={{
              background: "linear-gradient(145deg, #111 0%, #0a0a0a 100%)",
            }}
          >
            {initials}
          </div>
        )}

        {/* Reflective sheen overlay */}
        <div
          className="absolute top-1 left-3 w-10 h-5 rounded-full opacity-10 pointer-events-none"
          style={{ background: "linear-gradient(135deg, white, transparent)" }}
        />
      </div>

      {/* Orbiting dot */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ marginLeft: "-50%", marginTop: "-50%" }}
      >
        <div
          className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
          style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
        />
      </motion.div>
    </div>
  );
}

/* ── Floating particles ──────────────────────────────────────── */
function FloatingParticles({ accent }: { accent: string }) {
  const positions: ParticlePos[] = [
    { top: "8%",  left: "4%",  size: 2.5, delay: 0 },
    { top: "18%", right: "6%", size: 2,   delay: 0.8 },
    { top: "65%", left: "2%",  size: 3.5, delay: 1.6 },
    { top: "78%", right: "4%", size: 2,   delay: 0.4 },
    { top: "45%", right: "2%", size: 3,   delay: 1.2 },
    { top: "32%", left: "96%", size: 2,   delay: 2.0 },
  ];

  return (
    <>
      {positions.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            width: p.size,
            height: p.size,
            background: accent,
            boxShadow: `0 0 ${p.size * 3}px ${accent}`,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.35, 1, 0.35] }}
          transition={{
            duration: 3 + i * 0.4,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

/* ── Mentor card ─────────────────────────────────────────────── */
function MentorCard({ mentor, index }: { mentor: Mentor; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.18, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
      className="relative group"
    >
      {/* Hover glow behind card */}
      <div
        className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm"
        style={{
          background: `linear-gradient(135deg, ${mentor.borderColor}44 0%, transparent 50%, ${mentor.borderColor}22 100%)`,
        }}
      />

      {/* Card shell */}
      <div
        className="relative rounded-3xl h-full flex flex-col overflow-hidden transition-[border-color,box-shadow] duration-300"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.045) 0%, rgba(10,10,10,0.85) 100%)",
          backdropFilter: "blur(24px)",
          border: `1px solid ${mentor.borderColor}28`,
          boxShadow: `0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)`,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = `${mentor.borderColor}60`;
          el.style.boxShadow = `0 12px 60px rgba(0,0,0,0.6), 0 0 50px ${mentor.glowColor}, inset 0 1px 0 rgba(255,255,255,0.08)`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = `${mentor.borderColor}28`;
          el.style.boxShadow = `0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)`;
        }}
      >
        {/* Particles layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <FloatingParticles accent={mentor.accentColor} />
        </div>

        {/* Top neon bar */}
        <div
          className="h-[2px] w-full flex-shrink-0"
          style={{
            background: `linear-gradient(to right, transparent 0%, ${mentor.accentColor} 40%, ${mentor.accentColor} 60%, transparent 100%)`,
            boxShadow: `0 0 12px ${mentor.accentColor}`,
          }}
        />

        {/* Body */}
        <div className="flex flex-col flex-1 px-6 pt-8 pb-7 relative z-10">
          {/* Avatar */}
          <Avatar
            initials={mentor.initials}
            accent={mentor.accentColor}
            glow={mentor.glowColor}
          />

          {/* Name & role */}
          <div className="text-center mb-5">
            <h3 className="text-xl md:text-2xl font-black text-white mb-1.5 tracking-tight">
              {mentor.name}
            </h3>
            <p
              className="text-[13px] font-semibold"
              style={{
                color: mentor.accentColor,
                textShadow: `0 0 12px ${mentor.accentColor}66`,
              }}
            >
              {mentor.role}
            </p>
          </div>

          {/* Specialization pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {mentor.specializations.map((spec) => (
              <span
                key={spec}
                className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${mentor.tagBg}`}
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div
            className="w-3/4 mx-auto h-px mb-6"
            style={{
              background: `linear-gradient(to right, transparent, ${mentor.borderColor}35, transparent)`,
            }}
          />

          {/* Highlights */}
          <ul className="space-y-2.5 mb-6 flex-1">
            {mentor.highlights.map((h) => (
              <li key={h} className="flex items-center gap-3">
                <CheckCircle2
                  size={14}
                  className="flex-shrink-0"
                  style={{
                    color: mentor.accentColor,
                    filter: `drop-shadow(0 0 4px ${mentor.accentColor})`,
                  }}
                />
                <span className="text-[13px] text-white/70">{h}</span>
              </li>
            ))}
          </ul>

          {/* Quote */}
          <div
            className="relative mt-auto rounded-2xl px-5 py-4"
            style={{
              background: `linear-gradient(135deg, ${mentor.accentColor}0a, ${mentor.accentColor}05)`,
              border: `1px solid ${mentor.borderColor}20`,
            }}
          >
            <Quote
              size={14}
              className="absolute top-3 left-4 opacity-35"
              style={{ color: mentor.accentColor }}
            />
            <p
              className="text-[13px] font-medium italic text-center pt-2 leading-relaxed"
              style={{
                color: mentor.accentColor,
                textShadow: `0 0 16px ${mentor.accentColor}55`,
              }}
            >
              "{mentor.quote}"
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section export ──────────────────────────────────────────── */
export default function MentorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 md:py-28 px-4 md:px-6 overflow-hidden bg-black"
    >
      {/* Background ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#639922]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/4 blur-[110px] pointer-events-none" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,153,34,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,153,34,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#639922] uppercase tracking-widest text-xs font-bold mb-3"
          >
            The Team
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight"
          >
            Meet Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #639922 0%, #C0DD97 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Mentors
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/45 max-w-lg mx-auto text-sm md:text-base"
          >
            Industry professionals committed to turning every student into a
            builder, not just a learner.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
          {MENTORS.map((mentor, i) => (
            <MentorCard key={mentor.name} mentor={mentor} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-white/25 text-xs mt-12 md:mt-16"
        >
          Combined 10+ years of industry and teaching experience · 3 tracks · Age 6–18
        </motion.p>
      </div>
    </section>
  );
}