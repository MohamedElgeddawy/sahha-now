// components/auth/AuthLayout.jsx
import { ReactNode } from "react";
import { Breadcrumb } from "../layout/Breadcrumb";

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
    <>
      <div className="">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "حسابي", href: "/account" },
          ]}
        />

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
    </>
  );
};
