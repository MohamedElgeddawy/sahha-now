// components/auth/AuthLayout.jsx
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description?: ReactNode;
  aboveCard?: ReactNode;
}

export const AuthLayout = ({
  children,
  title,
  description,
  aboveCard,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] py-6 px-4">
      <div className="max-w-[1224px] mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="text-[#2C3E50]">
            <ul className="flex items-center">
              <li>
                <Link prefetch href="/" className="hover:text-green-600">
                  الرئيسية
                </Link>
              </li>
              <li className="mx-2">
                <ChevronLeft className="ltr:rotate-180 size-4" />
              </li>
              <li className="font-medium">حسابي</li>
            </ul>
          </nav>
        </div>

        {/* Content */}
        <div className="max-w-[648px] mx-auto">
          {/* Title & Description */}
          <div className="text-right mb-8">
            {title && (
              <h1 className="text-[32px] font-extrabold leading-[45px] tracking-[0.5px] text-[#2C3E50] mb-2">
                {title}
              </h1>
            )}
            {description && (
              <div className="text-[16px] leading-[22px] tracking-[0.5px] text-[#7B868A]">
                {description}
              </div>
            )}
          </div>

          {/* Content above card */}
          {aboveCard && <div className="mb-8">{aboveCard}</div>}

          {/* Card */}
          <div className="bg-white border border-[#DADADA] rounded-[8px] shadow-sm p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
