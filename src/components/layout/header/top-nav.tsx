import Link from "next/link";
import { Container } from "../container";
import { AccountIcon } from "@/components/icons/top-icons/AccountIcon";
import { BranchesIcon } from "@/components/icons/top-icons/BranchesIcon";
import { AppDownloadIcon } from "@/components/icons/top-icons/AppDownloadIcon";
import { LanguageIcon } from "@/components/icons/top-icons/LanguageIcon";

export function TopNav() {
  return (
    <div className="bg-[#f5f5f5] border-b border-[#DADADA] w-full" dir="rtl">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[108px]">
        <nav className="flex items-center justify-between h-[36px]">
          {/* Right Group */}
          <div className="flex items-center gap-4">
            <NavItem href="/account" icon={<AccountIcon className="w-4 h-4" />}>
              حسابي
            </NavItem>
            <div className="w-[1px] h-4 bg-[#DADADA]" />
            <NavItem href="/branches" icon={<BranchesIcon className="w-4 h-4" />}>
              فروعنا
            </NavItem>
          </div>

          {/* Left Group */}
          <div className="flex items-center gap-4">
            <NavItem href="/app" icon={<AppDownloadIcon className="w-4 h-4" />}>
              حمل التطبيق
            </NavItem>
            <div className="w-[1px] h-4 bg-[#DADADA]" />
            <NavItem href="/language" icon={<LanguageIcon className="w-4 h-4" />}>
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
      href={href} 
      className={`flex items-center gap-1.5 text-sm text-[#2C3E50] hover:text-gray-900 transition-colors duration-200 ${className || ''}`}
    >
      <span className="w-4 h-4 text-[#2C3E50]">{icon}</span>
      <span>{children}</span>
    </Link>
  );
} 