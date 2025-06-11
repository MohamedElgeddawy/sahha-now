import Link from "next/link";
import { Container } from "../container";
import { User, MapPin, Smartphone, Globe } from 'lucide-react';

export function TopNav() {
  return (
    <div className="bg-[#f5f5f5] border-b border-[#DADADA]" dir="rtl">
    <Container>
      <nav className="flex items-center justify-between h-9 py-2">
        {/* Right Group */}
        <div className="flex items-center gap-4">
          <NavItem href="/account" icon={<User className="w-4 h-4" />} className="ml-1">
            حسابي
          </NavItem>
          <div className="w-[1px] h-4 bg-[#DADADA] mx-2" />
          <NavItem href="/branches" icon={<MapPin className="w-4 h-4" />}>
            فروعنا
          </NavItem>
        
        </div>

        {/* Left Group */}
        <div className="flex items-center gap-4">
          <NavItem href="/app" icon={<Smartphone className="w-4 h-4" />} className="ml-1">
            حمل التطبيق
          </NavItem>
          <div className="w-[1px] h-4 bg-[#DADADA] mx-2" />
          <NavItem href="/language" icon={<Globe className="w-4 h-4" />}>
            العربية
          </NavItem>
        </div>
      </nav>
    </Container>
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
    className={`flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200 ${className || ''}`}
  >
    <span className="w-4 h-4">{icon}</span>
      <span>{children}</span>
    </Link>
  );
} 