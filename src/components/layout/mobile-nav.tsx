import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, ChevronUp, MapPin, Phone } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const categories = [
    {
      title: "الفئات",
      links: [
        "الأدوية",
        "العناية الشخصية",
        "الأجهزة الطبية",
        "الفيتامينات والمكملات",
        "العروض",
      ],
    },
    {
      title: "حسابي",
      links: ["تسجيل الدخول", "إنشاء حساب", "المفضلة", "الطلبات"],
    },
    {
      title: "المساعدة",
      links: [
        "تواصل معنا",
        "الأسئلة الشائعة",
        "سياسة الخصوصية",
        "الشروط والأحكام",
      ],
    },
  ];

  const toggleCategory = (index: number) => {
    setExpandedCategories((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
      onClick={onClose}
    >
      <div
        className="absolute inset-y-0 right-0 max-w-xs w-full bg-white h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="font-bold text-lg">القائمة</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          {categories.map((category, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleCategory(index)}
                className="flex items-center justify-between w-full py-2 border-b border-gray-200"
              >
                <span className="font-medium text-gray-800">
                  {category.title}
                </span>
                {expandedCategories.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {expandedCategories.includes(index) && (
                <ul className="mt-2 pr-4 space-y-2">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href="#"
                        className="text-gray-600 hover:text-green-500"
                        onClick={onClose}
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <Link
            href="/branches"
            className="flex items-center gap-2 text-gray-700 hover:text-green-500 mb-4"
            onClick={onClose}
          >
            <MapPin className="h-5 w-5" />
            <span>فروعنا</span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 text-gray-700 hover:text-green-500"
            onClick={onClose}
          >
            <Phone className="h-5 w-5" />
            <span>اتصل بنا</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
