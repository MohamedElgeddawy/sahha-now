"use client";
import Link from "next/link";
import { useIsClient, useMediaQuery } from "usehooks-ts";
import { useAppSelector } from "@redux/hooks";
import { selectIsAuthenticated } from "@redux/slices/authSlice";
import { LanguagesIcon, MapPin, Smartphone, UserRound } from "lucide-react";

export function TopNav() {
  const isClient = useIsClient();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (!isClient || isMobile) return null;

  return (
    <div className="bg-[#f5f5f5] border-b border-[#DADADA] w-full" dir="rtl">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-[36px]">
          {/* Right Group */}
          <div className="flex items-center gap-4">
            {isClient && isAuthenticated ? (
              <>
                <NavItem
                  href="/account"
                  icon={<UserRound className="size-4" />}
                >
                  حسابي
                </NavItem>
              </>
            ) : (
              <NavItem
                href="/auth/login"
                icon={<UserRound className="size-4" />}
              >
                تسجيل الدخول
              </NavItem>
            )}
            <div className="w-[1px] h-4 bg-[#DADADA]" />
            <NavItem href="/branches" icon={<MapPin className="size-4" />}>
              فروعنا
            </NavItem>
          </div>

          {/* Left Group */}
          <div className="flex items-center gap-4">
            <NavItem href="/app" icon={<Smartphone className="size-4" />}>
              حمل التطبيق
            </NavItem>
            <div className="w-[1px] h-4 bg-[#DADADA]" />
            <NavItem
              href="/language"
              icon={<LanguagesIcon className="size-4" />}
            >
              العربية
            </NavItem>
          </div>
        </nav>
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon,
  children,
  className,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      prefetch
      href={href}
      className={`flex items-center gap-1.5 text-sm text-[#2C3E50] hover:text-gray-900 transition-colors duration-200 ${
        className || ""
      }`}
    >
      <span className="size-4 text-[#2C3E50]">{icon}</span>
      <span>{children}</span>
    </Link>
  );
}
