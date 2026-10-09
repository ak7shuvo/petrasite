"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { ease } from "@/lib/motion";

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/** Scroll-triggered fade/translate reveal. Short and subtle by design. */
export function Reveal({ delay = 0, y = 16, children, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease, delay: Math.min(delay, 0.2) }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
