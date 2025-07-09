import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { AboutUs } from "@/components/AboutUs";
import { ContactUs } from "@/components/ContactUs";

// export const metadata: Metadata = {
//   title: "من نحن - صحة الآن",
//   description: "تعرف على صحة الآن - منصة الصيدلية الإلكترونية الرائدة في المملكة العربية السعودية",
// };

export default function AboutPage() {
  return (
    <main className="py-2 md:py-4 bg-gray-50 min-h-[calc(100vh-64px)]">
      {/* Breadcrumb */}
      <div className="container mb-2">
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
            <li className="font-medium">من نحن</li>
          </ul>
        </nav>
      </div>

      <div className="container">
        <AboutUs />
        <ContactUs />
      </div>
    </main>
  );
} 