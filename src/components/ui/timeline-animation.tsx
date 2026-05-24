"use client";

import React, { useRef, type ElementType, type RefObject } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineContentProps {
  as?: ElementType;
  animationNum?: number;
  timelineRef?: RefObject<HTMLElement | HTMLDivElement | null>;
  customVariants?: {
    visible: (i: number) => object;
    hidden: object;
  };
  className?: string;
  children: React.ReactNode;
}

export function TimelineContent({
  as: Tag = "div",
  animationNum = 0,
  timelineRef,
  customVariants,
  className,
  children,
}: TimelineContentProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(timelineRef ?? ref, { once: true, margin: "-10% 0px" });

  const defaultVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
  };

  const variants = customVariants ?? defaultVariants;

  const MotionTag = motion[Tag as keyof typeof motion] as React.ComponentType<{
    ref?: React.Ref<HTMLElement>;
    custom?: number;
    initial?: string;
    animate?: string;
    variants?: typeof variants;
    className?: string;
    children?: React.ReactNode;
  }>;

  return (
    <MotionTag
      ref={ref}
      custom={animationNum}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
