"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type Props = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Larger margin = triggers earlier while scrolling */
  viewMargin?: string;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  viewMargin = "-10% 0px -10% 0px",
  ...rest
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: viewMargin, amount: 0.12 }}
      transition={{
        duration: 0.58,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
