"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export default function ShineBorder({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative rounded-3xl p-[1px] transition",
        "bg-gradient-to-r from-orange-500/60 via-amber-400/60 to-orange-500/60",
        "hover:from-orange-500 hover:via-amber-300 hover:to-orange-500",
        className
      )}
    >
      <div className="relative rounded-3xl bg-white">
        {/* subtle shine */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition duration-700 hover:translate-x-[200%] hover:opacity-100" />
        </div>
        {children}
      </div>
    </div>
  );
}