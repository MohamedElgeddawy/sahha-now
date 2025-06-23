import { Metadata } from "next";
import { TermsAndConditions } from "@/components/TermsAndConditions";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "الشروط والأحكام - صحتي الآن",
  description: "الشروط والأحكام الخاصة باستخدام منصة صحتي الآن",
};

export default function TermsPage() {
  return (
    <main className="py-12 bg-gray-50">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "الشروط والأحكام", href: "/terms" },
        ]}
      />

      <TermsAndConditions />
    </main>
  );
}
