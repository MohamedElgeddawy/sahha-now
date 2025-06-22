import { ContactUs } from "@/components/ContactUs";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";


export default function ContactPage() {
  return (
    <main className="py-12 bg-gray-50 min-h-[calc(100vh-64px)]">
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
            <li className="font-medium">اتصل بنا</li>
          </ul>
        </nav>
      </div>
      <div className="container">
        <ContactUs />
      </div>
    </main>
  );
}
