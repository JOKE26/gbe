"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface MockupCardAnimationProps {
  children: ReactNode;
}

export function MockupCardAnimation({ children }: MockupCardAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
