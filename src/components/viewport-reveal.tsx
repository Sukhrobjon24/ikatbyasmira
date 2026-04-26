"use client";

import { type CSSProperties, type ReactNode } from "react";

type ViewportRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function ViewportReveal({
  children,
  className = "",
  delay = 0,
}: ViewportRevealProps) {
  return (
    <div
      className={`reveal-block${className ? ` ${className}` : ""}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
