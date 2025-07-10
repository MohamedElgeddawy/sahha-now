import { cn } from "@utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <main className={cn("mx-auto flex-1 container px-4 py-2", className)}>
      {children}
    </main>
  );
}
