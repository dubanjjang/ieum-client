import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type FadeProps = {
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  className?: string;
  children: ReactNode;
};

const fadeVariants: Variants = {
  hidden: (y: number = 16) => ({
    opacity: 0,
    y,
  }),
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Fade({
  delay = 0,
  duration = 0.5,
  y = 16,
  once = true,
  className,
  children,
}: FadeProps) {
  return (
    <motion.div
      className={className}
      custom={y}
      variants={fadeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
