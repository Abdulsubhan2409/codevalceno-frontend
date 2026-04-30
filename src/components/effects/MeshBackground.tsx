import { motion } from "framer-motion";

/**
 * Animated multi-layer gradient mesh + drifting orbs + grid pattern.
 * Used as a hero / page background.
 */
const MeshBackground = ({ withGrid = true }: { withGrid?: boolean }) => {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base gradient mesh */}
      <div className="absolute inset-0 gradient-mesh-bg" />

      {/* Grid pattern overlay */}
      {withGrid && <div className="absolute inset-0 grid-pattern opacity-50" />}

      {/* Drifting cyan orb */}
      <motion.div
        className="absolute -top-20 -left-20 h-[480px] w-[480px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(184 100% 50% / 0.35) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ x: [0, 80, -40, 0], y: [0, 60, -30, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Drifting violet orb */}
      <motion.div
        className="absolute top-1/3 -right-32 h-[560px] w-[560px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(262 83% 58% / 0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, -100, 50, 0], y: [0, -80, 40, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom cyan accent */}
      <motion.div
        className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(184 100% 60% / 0.25) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ x: [0, 120, -60, 0], y: [0, -40, 60, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, hsl(var(--background)) 100%)",
        }}
      />
    </div>
  );
};

export default MeshBackground;
