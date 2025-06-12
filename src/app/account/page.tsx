import Link from 'next/link';

export default function AccountPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center text-[#2C3E50]">
          حسابي الأوروبا
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          الشكل: إحداث عن دوالد ممنوع أو مراكبة
        </p>
        <div className="text-center my-4">
          <span className="text-xl font-bold text-green-600">SahhaNow</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Account Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold text-[#2C3E50] mb-4">
            تسجيل الدخول إلى حسابات
          </h2>
          <ul className="space-y-3">
            <li>
              <Link href="#" className="text-gray-600 hover:text-green-600">
                تسجل بعد الحقوق
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-green-600">
                سياسة الخصوصية
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-green-600">
                تواجد معنا
              </Link>
            </li>
          </ul>
        </div>

        {/* Additional Sections */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* About Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-[#2C3E50] mb-3">من أخذ</h3>
            <ul className="space-y-2 text-sm">
              {["من أخذ", "الشروط والذكاء", "سياسة الخصوصية", "تواجد معنا"].map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-gray-600 hover:text-green-600">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-[#2C3E50] mb-3">التاريخ</h3>
            <ul className="space-y-2 text-sm">
              {["المرجع", "الماركات", "جميع الشالت", "المتجدات الجديدة"].map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-gray-600 hover:text-green-600">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-[#2C3E50] mb-3">فرعها</h3>
            <ul className="space-y-2 text-sm">
              {["الرئيس", "حدة", "العدام", "خرينك النورج"].map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-gray-600 hover:text-green-600">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 border-t border-gray-200 pt-6 text-center">
        <div className="flex flex-wrap justify-center gap-4 text-xs">
          {["من نحن", "الشروط والتحكم", "سياسة الحكومية", "تواصل معنا"].map((link, index) => (
            <Link 
              key={index} 
              href="#"
              className="text-gray-500 hover:text-green-600 hover:underline"
            >
              {link}
            </Link>
          ))}
        </div>
        <div className="mt-4 text-xs text-gray-500">
          © {new Date().getFullYear()} جميع الحقوق محفوظة
        </div>
      </div>
    </div>
  );
}