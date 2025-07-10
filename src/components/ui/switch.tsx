"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      dir="ltr"
      className={cn(
        "peer p-px data-[state=checked]:bg-green-primary data-[state=unchecked]:bg-[#92A5B8] focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 flex data-[state=unchecked]:justify-start data-[state=checked]:justify-end w-9 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all duration-200 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-white dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-all duration-200 "
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
