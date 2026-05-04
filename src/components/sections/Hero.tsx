import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, CheckCircle2, Zap } from "lucide-react";
import MeshBackground from "@/components/effects/MeshBackground";
import Particles from "@/components/effects/Particles";
import TypingCodeCard from "@/components/effects/TypingCodeCard";
import CountUp from "@/components/effects/CountUp";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const ROTATING_PHRASES = [
  "Digital Products",
  "Creative Solutions",
  "Scalable Software",
];

const RotatingText = () => {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  const word = ROTATING_PHRASES[phraseIdx];

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (charIdx < word.length) {
        t = setTimeout(() => setCharIdx((c) => c + 1), 120 + Math.random() * 70);
      } else {
        t = setTimeout(() => setPhase("pause"), 2200);
      }
    } else if (phase === "pause") {
      t = setTimeout(() => setPhase("deleting"), 1800);
    } else {
      if (charIdx > 0) {
        t = setTimeout(() => setCharIdx((c) => c - 1), 60);
      } else {
        setPhraseIdx((i) => (i + 1) % ROTATING_PHRASES.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [charIdx, phase, word]);

  return (
    <span className="relative inline-block align-baseline">
      <span className="text-gradient-shimmer">
        {word.slice(0, charIdx) || "\u00A0"}
      </span>
    </span>
  );
};

const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-24 md:pt-28">
      <MeshBackground />
      {/* ✅ Fix 1: Fewer particles on mobile */}
      <Particles count={isMobile ? 15 : 50} />

      <div className="container relative z-10 grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr]">
        {/* LEFT: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-sm"
            style={{ boxShadow: "0 0 20px hsl(184 100% 50% / 0.2)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-primary" />
            </span>
            🚀 Available for new projects · Q3 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-hero md:text-6xl lg:text-[68px]"
          >
            We Build{" "}
            <RotatingText />
            <br />
            That Scale.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            CodeValceno is a software studio engineering performant web platforms,
            mobile apps and cloud systems for brands shipping at global scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/projects"
              className="btn-glow group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground"
              style={{ boxShadow: "0 0 30px hsl(184 100% 50% / 0.4)" }}
            >
              View Our Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/40 bg-transparent px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-primary hover:bg-primary/10 hover:shadow-glow"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              Start a Project
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-border pt-8"
          >
            {[
              { v: 50, suf: "+", label: "Projects shipped" },
             { v: 6, suf: "+", label: "Countries served" },
              { v: 5, suf: "+", label: "Years building" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-bold md:text-4xl">
                  <CountUp to={s.v} suffix={s.suf} className="text-gradient" />
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: code card + floating badges */}
        <div className="relative">
          {/* ✅ Fix 3: Hide heavy card on mobile */}
          {!isMobile && <TypingCodeCard />}

          {/* ✅ Fix 2: No infinite animations on mobile */}
          <motion.div
            animate={isMobile ? {} : { y: [-6, 6, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-2 hidden items-center gap-2 rounded-full border border-primary/40 bg-surface/90 px-4 py-2 text-xs font-medium text-foreground backdrop-blur-md shadow-glow sm:inline-flex"
          >
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Project Deployed
          </motion.div>

          <motion.div
            animate={isMobile ? {} : { y: [6, -6, 6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-full border border-secondary/40 bg-surface/90 px-4 py-2 text-xs font-medium text-foreground backdrop-blur-md sm:inline-flex"
            style={{ boxShadow: "0 0 24px hsl(262 83% 58% / 0.35)" }}
          >
            <Zap className="h-4 w-4 text-secondary" />
            React · Node · Flutter
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-border p-1">
          <motion.span
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="block h-2 w-1 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;