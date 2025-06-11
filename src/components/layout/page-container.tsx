import { Container } from "./container";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className={`w-full flex items-center justify-center ${className}`}>
      <Container>
        {children}
      </Container>
    </div>
  );
} 