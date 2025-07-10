import React, { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@utils";

interface LoadingComponentProps {
  /**
   * The loading message to display
   */
  message?: string;
  /**
   * Size variant of the loading component
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * Layout variant
   */
  variant?: "inline" | "centered" | "card" | "overlay";
  /**
   * Animation type
   */
  animation?:
    | "spinner"
    | "dots"
    | "pulse"
    | "particles"
    | "wave"
    | "skeleton"
    | "morphing";
  /**
   * Custom className for additional styling
   */
  className?: string;
  /**
   * Whether to show the loading message
   */
  showMessage?: boolean;
  /**
   * Custom spinner size
   */
  spinnerSize?: string;
}

const sizeVariants = {
  sm: {
    spinner: "h-4 w-4",
    text: "text-xs",
    padding: "p-2",
    gap: "gap-2",
    canvas: { width: 40, height: 40 },
  },
  md: {
    spinner: "h-6 w-6",
    text: "text-sm",
    padding: "p-4",
    gap: "gap-3",
    canvas: { width: 60, height: 60 },
  },
  lg: {
    spinner: "h-8 w-8",
    text: "text-base",
    padding: "p-6",
    gap: "gap-4",
    canvas: { width: 80, height: 80 },
  },
  xl: {
    spinner: "h-12 w-12",
    text: "text-lg",
    padding: "p-8",
    gap: "gap-6",
    canvas: { width: 120, height: 120 },
  },
};

const variantStyles = {
  inline: "inline-flex items-center",
  centered: "flex items-center justify-center w-full",
  card: "flex items-center justify-center w-full bg-white rounded-lg border border-gray-300",
  overlay:
    "fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50",
};

// Canvas Particles Animation
function ParticlesCanvas({ width, height }: { width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width * 2; // High DPI
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(2, 2);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }

    let animationId: number;

    function animate() {
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
      }

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));

        // Draw particle
        if (ctx) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 197, 94, ${particle.opacity})`;
          ctx.fill();
        }

        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) +
                Math.pow(particle.y - otherParticle.y, 2)
            );

            if (distance < 60 && ctx) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(34, 197, 94, ${
                0.2 * (1 - distance / 60)
              })`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [width, height]);

  return <canvas ref={canvasRef} className="rounded-lg" />;
}

// Wave Animation Component
function WaveAnimation({ size }: { size: "sm" | "md" | "lg" | "xl" }) {
  const waveSize = sizeVariants[size].canvas;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: waveSize.width, height: waveSize.height }}
    >
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border-2 border-green-500 rounded-full"
          style={{
            width: waveSize.width * 0.3,
            height: waveSize.width * 0.3,
          }}
          animate={{
            scale: [1, 2.5, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
      <div
        className="absolute bg-green-500 rounded-full"
        style={{
          width: waveSize.width * 0.3,
          height: waveSize.width * 0.3,
        }}
      />
    </div>
  );
}

// Morphing Shape Animation
function MorphingShape({ size }: { size: "sm" | "md" | "lg" | "xl" }) {
  const shapeSize = sizeVariants[size].canvas;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: shapeSize.width, height: shapeSize.height }}
    >
      <motion.div
        className="bg-gradient-to-r from-green-400 to-green-600"
        style={{
          width: shapeSize.width * 0.6,
          height: shapeSize.height * 0.6,
        }}
        animate={{
          borderRadius: [
            "20% 80% 80% 20%",
            "80% 20% 20% 80%",
            "50% 50% 50% 50%",
            "20% 80% 80% 20%",
          ],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// Dots Animation
function DotsAnimation({ size }: { size: "sm" | "md" | "lg" | "xl" }) {
  const dotSize =
    size === "sm" ? 4 : size === "md" ? 6 : size === "lg" ? 8 : 12;

  return (
    <div className="flex gap-2">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="bg-green-500 rounded-full"
          style={{ width: dotSize, height: dotSize }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Pulse Animation
function PulseAnimation({ size }: { size: "sm" | "md" | "lg" | "xl" }) {
  const pulseSize = sizeVariants[size].canvas;

  return (
    <motion.div
      className="bg-gradient-to-r from-green-400 to-green-600 rounded-full"
      style={{
        width: pulseSize.width * 0.4,
        height: pulseSize.width * 0.4,
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Skeleton Animation
function SkeletonAnimation({ size }: { size: "sm" | "md" | "lg" | "xl" }) {
  const skeletonHeight =
    size === "sm" ? 16 : size === "md" ? 20 : size === "lg" ? 24 : 32;

  return (
    <div className="space-y-2">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"
          style={{
            height: skeletonHeight,
            width: `${100 - i * 20}%`,
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function getAnimationComponent(
  animation: string,
  size: "sm" | "md" | "lg" | "xl",
  sizeConfig: typeof sizeVariants[keyof typeof sizeVariants]
) {
  switch (animation) {
    case "particles":
      return <ParticlesCanvas {...sizeConfig.canvas} />;
    case "wave":
      return <WaveAnimation size={size} />;
    case "morphing":
      return <MorphingShape size={size} />;
    case "dots":
      return <DotsAnimation size={size} />;
    case "pulse":
      return <PulseAnimation size={size} />;
    case "skeleton":
      return <SkeletonAnimation size={size} />;
    default:
      return (
        <Loader2
          className={cn("animate-spin text-green-600", sizeConfig.spinner)}
        />
      );
  }
}

export function LoadingComponent({
  message = "جاري التحميل...",
  size = "md",
  variant = "centered",
  animation = "morphing",
  className,
  showMessage = true,
}: LoadingComponentProps) {
  const sizeConfig = sizeVariants[size];

  return (
    <motion.div
      className={cn(
        "text-gray-600",
        variantStyles[variant],
        variant === "card" ? sizeConfig.padding : "",
        sizeConfig.gap,
        className
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {getAnimationComponent(animation, size, sizeConfig)}

      {showMessage && (
        <motion.span
          className={cn("font-medium", sizeConfig.text)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {message}
        </motion.span>
      )}
    </motion.div>
  );
}

// Specialized loading components for common use cases
export function CardLoading({
  message = "جاري التحميل...",
  animation = "wave",
  className,
}: {
  message?: string;
  animation?:
    | "spinner"
    | "dots"
    | "pulse"
    | "particles"
    | "wave"
    | "skeleton"
    | "morphing";
  className?: string;
}) {
  return (
    <LoadingComponent
      variant="card"
      size="lg"
      animation={animation}
      message={message}
      className={className}
    />
  );
}

export function InlineLoading({
  message = "جاري التحميل...",
  size = "sm",
  animation = "dots",
  className,
}: {
  message?: string;
  size?: "sm" | "md";
  animation?:
    | "spinner"
    | "dots"
    | "pulse"
    | "particles"
    | "wave"
    | "skeleton"
    | "morphing";
  className?: string;
}) {
  return (
    <LoadingComponent
      variant="inline"
      size={size}
      animation={animation}
      message={message}
      className={className}
    />
  );
}

export function OverlayLoading({
  message = "جاري التحميل...",
  animation = "particles",
  className,
}: {
  message?: string;
  animation?:
    | "spinner"
    | "dots"
    | "pulse"
    | "particles"
    | "wave"
    | "skeleton"
    | "morphing";
  className?: string;
}) {
  return (
    <LoadingComponent
      variant="overlay"
      size="xl"
      animation={animation}
      message={message}
      className={className}
    />
  );
}

// Profile-specific loading messages
export const ProfileLoadingMessages = {
  orders: "جاري تحميل الطلبات...",
  orderDetails: "جاري تحميل تفاصيل الطلب...",
  personalInfo: "جاري تحميل البيانات الشخصية...",
  points: "جاري تحميل النقاط...",
  favorites: "جاري تحميل المفضلة...",
  profile: "جاري تحميل الملف الشخصي...",
  updating: "جاري التحديث...",
  saving: "جاري الحفظ...",
  deleting: "جاري الحذف...",
  uploading: "جاري الرفع...",
} as const;
