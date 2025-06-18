import Link from "next/link";
import { SahhaNowArabicLogo } from "@/components/layout/icons/brand-logos/SahhaNowArabicLogo";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#F8F9FA] text-[#2C3E50] pt-24 pb-4">
      <div className="container mx-auto px-4">
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
                  prefetch
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  من نحن
                </Link>
              </li>
              <li>
                <Link
                  prefetch
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  الشروط والأحكام
                </Link>
              </li>
              <li>
                <Link
                  prefetch
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link
                  prefetch
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
                  prefetch
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  العروض
                </Link>
              </li>
              <li>
                <Link
                  prefetch
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  الماركات
                </Link>
              </li>
              <li>
                <Link
                  prefetch
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  جميع المنتجات
                </Link>
              </li>
              <li>
                <Link
                  prefetch
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
                  prefetch
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  الرياض
                </Link>
              </li>
              <li>
                <Link
                  prefetch
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  جدة
                </Link>
              </li>
              <li>
                <Link
                  prefetch
                  href="#"
                  className="hover:text-green-600 transition-colors block"
                >
                  الدمام
                </Link>
              </li>
              <li>
                <Link
                  prefetch
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
        <div className="border-t pt-2.5 border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-x-12 gap-y-2 items-center">
              <div className="flex gap-3 order-1">
                {/* Google Play Button */}
                <Link prefetch href="#" className="block">
                  <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors min-w-[140px]">
                    <Image
                      src={"/icons/social/google-play.svg"}
                      alt="google play"
                      width={20}
                      height={20}
                    />
                    <div className="text-right">
                      <div className="text-xs text-gray-300">Get it on</div>
                      <div className="text-sm font-medium">Google Play</div>
                    </div>
                  </div>
                </Link>

                {/* App Store Button */}
                <Link prefetch href="#" className="block">
                  <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors min-w-[140px]">
                    <Image
                      src={"/icons/social/apple.svg"}
                      alt="apple"
                      width={20}
                      height={20}
                    />
                    <div className="text-right">
                      <div className="text-xs text-gray-300">
                        Download on the
                      </div>
                      <div className="text-sm font-medium">App Store</div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="flex items-center gap-4 order-2">
                <Link
                  prefetch
                  href="#"
                  className="text-gray-500 hover:text-green-600 transition-colors"
                >
                  <Image
                    src={"/icons/social/linkedin.svg"}
                    alt="linkedin"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link
                  prefetch
                  href="#"
                  className="text-gray-500 hover:text-green-600 transition-colors"
                >
                  <Image
                    src={"/icons/social/instagram.svg"}
                    alt="instagram"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link
                  prefetch
                  href="#"
                  className="text-gray-500 hover:text-green-600 transition-colors"
                >
                  <Image
                    src={"/icons/social/twitter.svg"}
                    alt="twitter"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link
                  prefetch
                  href="#"
                  className="text-gray-500 hover:text-green-600 transition-colors"
                >
                  <Image
                    src={"/icons/social/facebook.svg"}
                    alt="facebook"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link
                  prefetch
                  href="#"
                  className="text-gray-500 hover:text-green-600 transition-colors"
                >
                  <Image
                    src={"/icons/social/youtube.svg"}
                    alt="youtube"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
            </div>

            {/* Left: Copyright and Logo */}
            <div className="flex items-center gap-4">
              <div className="text-gray-600">
                <p>© 2025 جميع الحقوق محفوظة لـ صحة ناو</p>
              </div>
              <div className="flex-shrink-0">
                <Link prefetch href="/" className="flex items-center">
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
