"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface HeroAnimationsProps {
  children: ReactNode;
}

export function HeroAnimations({ children }: HeroAnimationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
