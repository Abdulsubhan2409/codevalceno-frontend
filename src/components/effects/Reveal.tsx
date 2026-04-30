import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Reveal = ({ children, delay = 0, className, once = true }: Props) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once, margin: "0px 0px -10% 0px" }}
    custom={delay}
    variants={variants}
    className={className}
  >
    {children}
  </motion.div>
);

export default Reveal;
