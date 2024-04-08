"use client";
import { AnimatePresence, motion } from "framer-motion";
import type React from "react";

function AnimateSize({ children }: { children: React.ReactNode }) {
  return (
    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <AnimatePresence>{children}</AnimatePresence>
    </motion.div>
  );
}

export default AnimateSize;
