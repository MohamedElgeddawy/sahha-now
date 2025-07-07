import { ContactUs } from "@/components/ContactUs";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export default function ContactPage() {
  return (
    <main className="py-2 md:py-4 bg-gray-50">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "تواصل معنا", href: "/contact" },
        ]}
      />
      <ContactUs />
    </main>
  );
}
