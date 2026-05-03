import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reveal from "@/components/effects/Reveal";
import { useIsMobile } from "@/hooks/use-mobile";

const CTABanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });

  const videoX = useTransform(sx, [-1, 1], [-18, 18]);
  const videoY = useTransform(sy, [-1, 1], [-12, 12]);
  const glassX = useTransform(sx, [-1, 1], [10, -10]);
  const glassY = useTransform(sy, [-1, 1], [6, -6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // ✅ Skip on mobile - no mouse anyway
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mx.set(x);
    my.set(y);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section className="relative py-20 md:py-28">
      <div className="container">
        <Reveal>
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden rounded-3xl px-8 py-16 text-center md:px-16 md:py-24"
            style={{ background: "var(--gradient-brand)" }}
          >
            {/* ✅ Video — disabled on mobile, lazy on desktop */}
            {!isMobile && (
              <motion.div
                aria-hidden
                className="absolute inset-0"
                style={{ x: videoX, y: videoY, scale: 1.08 }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    scale: [1, 1.04, 1],
                    x: [0, -8, 0],
                    y: [0, 6, 0],
                  }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"         // ✅ Don't preload
                    aria-hidden
                    disablePictureInPicture
                    disableRemotePlayback
                    className="absolute inset-0 h-full w-full object-cover"
                  >
                    <source src="/videos/codevalceno-coding-loop.mp4.mp4" type="video/mp4" />
                  </video>
                </motion.div>
              </motion.div>
            )}

            {/* Glass sheen */}
            <motion.div
              aria-hidden
              className="absolute inset-0"
              style={{
                x: isMobile ? 0 : glassX,
                y: isMobile ? 0 : glassY,
                background:
                  "linear-gradient(135deg, hsl(0 0% 100% / 0.06), hsl(0 0% 100% / 0) 45%, hsl(0 0% 100% / 0.04) 100%)",
                boxShadow:
                  "inset 0 1px 0 hsl(0 0% 100% / 0.12), inset 0 -1px 0 hsl(0 0% 100% / 0.04)",
              }}
            />

            {/* Vignette */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, hsl(224 47% 5% / 0.05) 0%, hsl(224 47% 5% / 0.4) 100%)",
              }}
            />

            {/* ✅ Decorative circles — disabled on mobile */}
            {!isMobile && (
              <>
                <motion.div
                  aria-hidden
                  animate={{ rotate: 360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                  className="absolute -left-32 -top-32 h-96 w-96 rounded-full border border-white/20 opacity-30"
                />
                <motion.div
                  aria-hidden
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute -right-32 -bottom-32 h-[500px] w-[500px] rounded-full border border-white/15 opacity-30"
                />
              </>
            )}

            <div className="relative mx-auto max-w-3xl">
              <span className="label-eyebrow text-white/80">Let's collaborate</span>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
                Ready to Build Something Great?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)]">
                Tell us about your product. We'll respond within 24 hours with a clear plan and rough timeline.
              </p>
              <Link
                to="/contact"
                className="group mt-10 inline-flex items-center gap-2 rounded-full bg-background px-7 py-4 text-sm font-semibold text-foreground transition-all hover:scale-[1.03] hover:shadow-2xl"
              >
                Start your project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CTABanner;