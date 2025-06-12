"use client";
import { Play } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#F8F9FA] text-[#2C3E50] pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* فروعنا */}
          <div>
            <h3 className=" font-bold text-xl mb-5 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-10 after:h-0.5 after:bg-green-600">
              فروعنا
            </h3>
            <ul className="space-y-3 ">
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors"
                >
                  الرياض
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors"
                >
                  جدة
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors"
                >
                  الدمام
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors"
                >
                  خريطة الفروع
                </Link>
              </li>
            </ul>
          </div>

          {/* التسوق */}
          <div>
            <h3 className=" font-bold text-xl mb-5 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-10 after:h-0.5 after:bg-green-600">
              التسوق
            </h3>
            <ul className="space-y-3 ">
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors"
                >
                  جميع الفئات
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors"
                >
                  الماركات
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors"
                >
                  المنتجات الجديدة
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors"
                >
                  العروض
                </Link>
              </li>
            </ul>
          </div>

          {/* من نحن */}
          <div>
            <h3 className=" font-bold text-xl mb-5 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-10 after:h-0.5 after:bg-green-600">
              من نحن
            </h3>
            <ul className="space-y-3 ">
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors"
                >
                  من نحن
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors"
                >
                  الشروط والأحكام
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors"
                >
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors"
                >
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className=" font-bold text-xl mb-5 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-10 after:h-0.5 after:bg-green-600">
              حمل التطبيق
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col">
                <button className="bg-black text-white px-5 py-3 rounded-lg flex items-center gap-3  hover:bg-gray-800 transition-colors">
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.9679 15.2366C14.7068 15.9061 14.3976 16.5224 14.0395 17.089C13.5513 17.8614 13.1516 18.396 12.8435 18.6929C12.366 19.1802 11.8544 19.4298 11.3065 19.444C10.9132 19.444 10.4388 19.3198 9.88669 19.0679C9.33274 18.8171 8.82365 18.6929 8.35817 18.6929C7.86998 18.6929 7.3464 18.8171 6.78637 19.0679C6.22549 19.3198 5.77365 19.4511 5.42819 19.4641C4.9028 19.489 4.37911 19.2323 3.85639 18.6929C3.52276 18.37 3.10545 17.8164 2.60554 17.0322C2.06917 16.1947 1.62821 15.2236 1.28274 14.1164C0.912764 12.9206 0.727295 11.7626 0.727295 10.6415C0.727295 9.35724 0.977358 8.24962 1.47823 7.32143C1.87187 6.57588 2.39556 5.98777 3.05099 5.55603C3.70642 5.12429 4.41461 4.90428 5.17727 4.8902C5.59458 4.8902 6.14182 5.03344 6.82187 5.31496C7.5 5.59743 7.93543 5.74067 8.12633 5.74067C8.26906 5.74067 8.75277 5.57318 9.57278 5.23926C10.3482 4.92959 11.0027 4.80137 11.5389 4.85187C12.9917 4.98199 14.0832 5.61753 14.8091 6.76254C13.5097 7.63619 12.867 8.85985 12.8798 10.4296C12.8915 11.6523 13.2912 12.6698 14.0768 13.4777C14.4328 13.8527 14.8304 14.1425 15.2727 14.3483C15.1768 14.657 15.0756 14.9527 14.9679 15.2366ZM11.6359 0.686343C11.6359 1.6447 11.3203 2.53952 10.6915 3.36775C9.93252 4.35236 9.01456 4.92131 8.0191 4.83153C8.00642 4.71656 7.99906 4.59555 7.99906 4.46839C7.99906 3.54837 8.35998 2.56377 9.00092 1.75872C9.3209 1.35111 9.72787 1.01218 10.2214 0.741819C10.7138 0.475487 11.1796 0.328201 11.6177 0.302979C11.6305 0.431096 11.6359 0.559222 11.6359 0.686331V0.686343Z"
                      fill="white"
                    />
                  </svg>
                  <div className="text-left">
                    <p className=" text-sm text-gray-500 mb-1">
                      Download on the
                    </p>
                    <span className="text-xs">App Store</span>
                  </div>
                </button>
              </div>

              <div className="flex flex-col">
                <button className="bg-black text-white px-5 py-3 rounded-lg flex items-center gap-3  hover:bg-gray-800 transition-colors">
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.20644 0.593994C1.0176 0.823185 0.909058 1.17594 0.909058 1.63432V17.9388C0.909058 18.3972 1.0176 18.7499 1.2135 18.9711L1.26468 19.02L9.35488 9.8842V9.67893L1.25762 0.545166L1.20644 0.593994Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.0463 12.9415L9.34778 9.89331V9.68006L12.0472 6.63184L12.1054 6.67269L15.2981 8.72145C16.2123 9.3034 16.2123 10.262 15.2981 10.8519L12.1054 12.9007C12.1045 12.9007 12.0463 12.9415 12.0463 12.9415Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.1054 12.9004L9.34864 9.78638L1.20728 18.98C1.50466 19.3407 2.005 19.3815 2.56446 19.0288L12.1054 12.9004Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.1054 6.67315L2.56446 0.552785C2.00588 0.192061 1.50466 0.240888 1.20728 0.601613L9.34776 9.78614L12.1054 6.67315Z"
                      fill="white"
                    />
                    <path
                      opacity="0.2"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.0461 12.8352L2.57045 18.9147C2.04099 19.2585 1.56888 19.2346 1.26444 18.9227L1.21326 18.9805L1.26444 19.0293C1.56888 19.3402 2.04099 19.3652 2.57045 19.0214L12.1114 12.901L12.0461 12.8352Z"
                      fill="#030C15"
                    />
                    <path
                      opacity="0.12"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.2975 10.745L12.0396 12.8347L12.0978 12.9004L15.2905 10.8516C15.7476 10.5567 15.9726 10.172 15.9726 9.78638C15.9435 10.1391 15.7114 10.475 15.2975 10.745Z"
                      fill="#030C15"
                    />
                    <path
                      opacity="0.25"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.56363 0.659636L15.2973 8.82878C15.7111 9.09086 15.9432 9.43464 15.9794 9.7874C15.9794 9.40276 15.7544 9.01712 15.2973 8.72216L2.56363 0.553013C1.64943 -0.0369039 0.909058 0.454361 0.909058 1.63419V1.74082C0.909058 0.560984 1.64943 0.0776913 2.56363 0.659636Z"
                      fill="white"
                    />
                  </svg>
                  <div className="text-left">
                    <p className=" text-sm text-gray-500 mb-1">Get it on</p>
                    <span className="text-xs">Google Play</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and footer bottom */}
        <div className="pt-6 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className=" text-gray-600 text-center md:text-left">
              © 2025 جميع الحقوق محفوظة لـ صحة ناو
            </p>

            <div className="flex space-x-6">
              <Link
                href="#"
                className=" text-gray-600 hover:text-green-600 transition-colors"
              >
                الشروط والأحكام
              </Link>
              <Link
                href="#"
                className=" text-gray-600 hover:text-green-600 transition-colors"
              >
                سياسة الخصوصية
              </Link>
              <Link
                href="#"
                className=" text-gray-600 hover:text-green-600 transition-colors"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
