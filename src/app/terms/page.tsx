import { Metadata } from "next";
import { TermsAndConditions } from "@/components/TermsAndConditions";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "الشروط والأحكام - صحتي الآن",
  description: "الشروط والأحكام الخاصة باستخدام منصة صحتي الآن",
};

export default function TermsPage() {
  return (
    <main className="py-2 md:py-4 bg-gray-50">
      {/* Breadcrumb */}
      <div className="container px-4 md:px-6">
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "الشروط والأحكام", href: "/terms" },
          ]}
        />

        <TermsAndConditions />
      </div>
    </main>
  );
}
