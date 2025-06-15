import Link from "next/link";
import {
  FaApple,
  FaGooglePlay,
  FaYoutube,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { SahhaNowArabicLogo } from "@/components/layout/icons/brand-logos/SahhaNowArabicLogo";

export default function Footer() {
  return (
    <footer
      className="bg-[#F8F9FA] text-[#2C3E50] pt-6 pb-4 mt-16 font-[Cairo]"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Footer columns - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* من نحن */}
          <div>
            <h3 className="font-bold text-xl mb-5 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-10 after:h-0.5 after:bg-green-600">
              من نحن
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  من نحن
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  الشروط والأحكام
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* التسوق */}
          <div>
            <h3 className="font-bold text-xl mb-5 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-10 after:h-0.5 after:bg-green-600">
              التسوق
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  العروض
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  الماركات
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  جميع المنتجات
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  المنتجات الجديدة
                </Link>
              </li>
            </ul>
          </div>

          {/* فروعنا */}
          <div>
            <h3 className="font-bold text-xl mb-5 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-10 after:h-0.5 after:bg-green-600">
              فروعنا
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  الرياض
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  جدة
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  الدمام
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  خريطة الفروع
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and footer bottom */}
        <div className="pt-6 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-12 h-24">
            {/* Right: App download buttons */}
            <div className="flex gap-3 order-1">
              {/* Google Play Button */}
              <Link href="#" className="block">
                <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors min-w-[140px]">
                  <FaGooglePlay className="text-xl" />
                  <div className="text-right">
                    <div className="text-xs text-gray-300">Get it on</div>
                    <div className="text-sm font-medium">Google Play</div>
                  </div>
                </div>
              </Link>

              {/* App Store Button */}
              <Link href="#" className="block">
                <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors min-w-[140px]">
                  <FaApple className="text-2xl" />
                  <div className="text-right">
                    <div className="text-xs text-gray-300">Download on the</div>
                    <div className="text-sm font-medium">App Store</div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Center: Social Media Icons in specific order */}
            <div className="flex items-center gap-4 order-2">
              <Link
                href="#"
                className="text-gray-500 hover:text-green-600 transition-colors"
              >
                <FaLinkedinIn className="text-xl" />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-green-600 transition-colors"
              >
                <FaInstagram className="text-xl" />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-green-600 transition-colors"
              >
                <FaTwitter className="text-xl" />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-green-600 transition-colors"
              >
                <FaFacebookF className="text-xl" />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-green-600 transition-colors"
              >
                <FaYoutube className="text-xl" />
              </Link>
            </div>

            {/* Left: Copyright and Logo */}
            <div className="flex items-center gap-4 order-3">
              <div className="text-gray-600">
                <p>© 2025 جميع الحقوق محفوظة لـ صحة ناو</p>
              </div>
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <SahhaNowArabicLogo />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
