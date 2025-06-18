import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <main
      className={cn(
        "mx-auto flex-1 bg-[#F8F9FA] container px-4",
        className
      )}
    >
      {children}
    </main>
  );
}
