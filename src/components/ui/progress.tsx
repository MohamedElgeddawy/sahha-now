"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@utils";

function Progress({
  className,
  value,
  color = "#FFA726",
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  color?: string;
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-slate-200 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-[var(--color)] h-full w-full flex-1 transition-all"
        style={
          {
            transform: `translateX(${100 - (value || 0)}%)`,
            "--color": color,
          } as React.CSSProperties
        }
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
