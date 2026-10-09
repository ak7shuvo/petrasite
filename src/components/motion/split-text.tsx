"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
};

/**
 * Section heading entrance. v2.1: one short fade-up for the whole heading instead of a
 * word-by-word stagger, which repeated on every section and slowed reading.
 */
export function SplitText({ text, className, delay = 0, as = "h2", id }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      id={id}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {text}
    </Tag>
  );
}
