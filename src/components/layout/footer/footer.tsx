'use client';

import Link from 'next/link';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#F8F9FA] text-[#2C3E50] pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* فروعنا */}
          <div>
            <h3 className="font-[Cairo] font-bold text-xl mb-5 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-10 after:h-0.5 after:bg-green-600">
              فروعنا
            </h3>
            <ul className="space-y-3 font-[Cairo]">
              <li>
                <Link href="#" className="hover:text-green-600 transition-colors">
                  الرياض
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-600 transition-colors">
                  جدة
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-600 transition-colors">
                  الدمام
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-600 transition-colors">
                  خريطة الفروع
                </Link>
              </li>
            </ul>
          </div>
          
          {/* التسوق */}
          <div>
            <h3 className="font-[Cairo] font-bold text-xl mb-5 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-10 after:h-0.5 after:bg-green-600">
              التسوق
            </h3>
            <ul className="space-y-3 font-[Cairo]">
              <li>
                <Link href="#" className="hover:text-green-600 transition-colors">
                  جميع الفئات
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-600 transition-colors">
                  الماركات
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-600 transition-colors">
                  المنتجات الجديدة
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-600 transition-colors">
                  العروض
                </Link>
              </li>
            </ul>
          </div>
          
          {/* من نحن */}
          <div>
            <h3 className="font-[Cairo] font-bold text-xl mb-5 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-10 after:h-0.5 after:bg-green-600">
              من نحن
            </h3>
            <ul className="space-y-3 font-[Cairo]">
              <li>
                <Link href="#" className="hover:text-green-600 transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-600 transition-colors">
                  الشروط والأحكام
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-600 transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-600 transition-colors">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Download App */}
          <div>
            <h3 className="font-[Cairo] font-bold text-xl mb-5 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-10 after:h-0.5 after:bg-green-600">
              حمل التطبيق
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col">
                <p className="font-[Cairo] text-sm text-gray-500 mb-1">Download on the</p>
                <button className="bg-black text-white px-5 py-3 rounded-lg flex items-center gap-3 font-[Cairo] hover:bg-gray-800 transition-colors">
                  <FaApple className="text-2xl" />
                  <div className="text-left">
                    <span className="text-xs">App Store</span>
                  </div>
                </button>
              </div>
              
              <div className="flex flex-col">
                <p className="font-[Cairo] text-sm text-gray-500 mb-1">Get it on</p>
                <button className="bg-black text-white px-5 py-3 rounded-lg flex items-center gap-3 font-[Cairo] hover:bg-gray-800 transition-colors">
                  <FaGooglePlay className="text-xl" />
                  <div className="text-left">
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
            <p className="font-[Cairo] text-gray-600 text-center md:text-left">
              © 2025 جميع الحقوق محفوظة لـ صحة ناو
            </p>
            
            <div className="flex space-x-6">
              <Link href="#" className="font-[Cairo] text-gray-600 hover:text-green-600 transition-colors">
                الشروط والأحكام
              </Link>
              <Link href="#" className="font-[Cairo] text-gray-600 hover:text-green-600 transition-colors">
                سياسة الخصوصية
              </Link>
              <Link href="#" className="font-[Cairo] text-gray-600 hover:text-green-600 transition-colors">
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}