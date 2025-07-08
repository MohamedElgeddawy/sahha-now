import { Metadata } from "next";
import { Branches } from "@/components/Branches";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

// export const metadata: Metadata = {
//   title: "فروعنا - صحتي الآن",
//   description: "تعرف على أقرب فرع لك من فروع صحتي الآن",
// };

export default function BranchesPage() {
  return (
    <main className="py-2 md:py-4 bg-gray-50 ">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "فروعنا", href: "/branches" },
        ]}
      />
      <Branches />
    </main>
  );
}
