import Link from "next/link";
import { SahhaNowArabicLogo } from "@components/layout/icons/brand-logos/SahhaNowArabicLogo";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#F8F9FA] text-[#2C3E50] pt-12 pb-4">
      <div className="container mx-auto px-4">
        {/* Footer columns - always 3 columns */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-8">
          {/* من نحن */}
          <div className="space-y-3">
            <h3 className="font-bold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-8 sm:after:w-10 after:h-0.5 after:bg-green-600">
              من نحن
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link
                  prefetch
                  href="/about"
                  className="hover:text-green-600 transition-colors block text-xs sm:text-sm md:text-base"
                >
                  من نحن
                </Link>
              </li>
              <li>
                <Link
                  prefetch
                  href="/terms"
                  className="hover:text-green-600 transition-colors block text-xs sm:text-sm md:text-base"
                >
                  الشروط والأحكام
                </Link>
              </li>
              <li>
                <Link
                  prefetch
                  href="/terms"
                  className="hover:text-green-600 transition-colors block text-xs sm:text-sm md:text-base"
                >
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link
                  prefetch
                  href="/contact"
                  className="hover:text-green-600 transition-colors block text-xs sm:text-sm md:text-base"
                >
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* التسوق */}
          <div className="space-y-3">
            <h3 className="font-bold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-8 sm:after:w-10 after:h-0.5 after:bg-green-600">
              التسوق
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link
                  prefetch
                  href="/offers"
                  className="hover:text-green-600 transition-colors block text-xs sm:text-sm md:text-base"
                >
                  العروض
                </Link>
              </li>
              <li>
                <Link
                  prefetch
                  href="#"
                  className="hover:text-green-600 transition-colors block text-xs sm:text-sm md:text-base"
                >
                  الماركات
                </Link>
              </li>
              <li>
                <Link
                  prefetch
                  href="/products"
                  className="hover:text-green-600 transition-colors block text-xs sm:text-sm md:text-base"
                >
                  جميع المنتجات
                </Link>
              </li>
              <li>
                <Link
                  prefetch
                  href="/products"
                  className="hover:text-green-600 transition-colors block text-xs sm:text-sm md:text-base"
                >
                  المنتجات الجديدة
                </Link>
              </li>
            </ul>
          </div>

          {/* فروعنا */}
          <div className="space-y-3">
            <h3 className="font-bold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-8 sm:after:w-10 after:h-0.5 after:bg-green-600">
              فروعنا
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link
                  prefetch
                  href="/branches"
                  className="hover:text-green-600 transition-colors block text-xs sm:text-sm md:text-base"
                >
                  الرياض
                </Link>
              </li>
              <li>
                <Link
                  prefetch
                  href="/branches"
                  className="hover:text-green-600 transition-colors block text-xs sm:text-sm md:text-base"
                >
                  جدة
                </Link>
              </li>
              <li>
                <Link
                  prefetch
                  href="/branches"
                  className="hover:text-green-600 transition-colors block text-xs sm:text-sm md:text-base"
                >
                  الدمام
                </Link>
              </li>
              <li>
                <Link
                  prefetch
                  href="/branches"
                  className="hover:text-green-600 transition-colors block text-xs sm:text-sm md:text-base"
                >
                  خريطة الفروع
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and footer bottom */}
        <div className="border-t pt-4 border-gray-300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-4">
            {/* First line on mobile: App buttons and social icons */}
            <div className="flex flex-row items-center gap-3 md:gap-6">
              {/* App buttons */}
              <div className="flex gap-3 md:gap-4">
                {/* Google Play Button */}
                <Link prefetch href="#" className="block">
                  <div className="bg-black text-white px-2 py-1.5 rounded-lg flex items-center gap-4 hover:bg-gray-800 transition-colors min-w-[110px] md:min-w-[130px] h-8 md:h-10">
                    <div className="text-left">
                      <div className="text-xs text-gray-200">Get it on</div>
                      <div className="text-xs md:text-sm">Google Play</div>
                    </div>
                    <Image
                      src={"/icons/social/google-play.svg"}
                      alt="google play"
                      width={16}
                      height={16}
                      className="flex-end size-4 md:size-5 "
                    />
                  </div>
                </Link>

                {/* App Store Button */}
                <Link prefetch href="#" className="block">
                  <div className="bg-black text-white px-2 py-1.5 rounded-lg flex items-center gap-4 hover:bg-gray-800 transition-colors min-w-[110px] md:min-w-[130px] h-8 md:h-10">
                    <div className="text-left">
                      <div className="text-xs text-gray-200">Get it on</div>
                      <div className="text-xs md:text-sm">App Store</div>
                    </div>
                    <Image
                      src={"/icons/social/apple.svg"}
                      alt="apple"
                      width={16}
                      height={16}
                      className="flex-end size-4 md:size-5"
                    />
                  </div>
                </Link>
              </div>

              {/* Social icons */}
              <div className="flex gap-3">
                <Link
                  prefetch
                  href="#"
                  className="text-gray-500 hover:text-green-600 transition-colors"
                >
                  <Image
                    src={"/icons/social/linkedin.svg"}
                    alt="linkedin"
                    width={20}
                    height={20}
                    className="size-5"
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
                    width={20}
                    height={20}
                    className="size-5"
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
                    width={20}
                    height={20}
                    className="size-5"
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
                    width={20}
                    height={20}
                    className="size-5"
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
                    width={20}
                    height={20}
                    className="size-5"
                  />
                </Link>
              </div>
            </div>

            {/* Second line on mobile: Copyright and logo */}
            <div className="flex items-center gap-18 md:gap-6">
              <div className="text-gray-600 text-sm">
                <p>© 2025 جميع الحقوق محفوظة لـ صحة ناو</p>
              </div>
              <div className="flex-shrink-0">
                <Link prefetch href="/" className="flex items-center">
                  <SahhaNowArabicLogo className="w-16 h-12 md:w-24" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
