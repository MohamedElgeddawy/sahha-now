import { cn } from "@/lib/utils";

interface ContainerProps extends React.ComponentProps<"div"> {}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[108px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}