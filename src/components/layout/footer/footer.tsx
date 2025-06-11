import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Smartphone, MapPin } from "lucide-react";
import { Container } from "../container";

export function Footer() {
  return (
    <footer className="border-b border-[#E2E8F0]">
      <Container>
        <div className="min-h-[322px] flex flex-col items-center justify-center text-center w-full">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Company Section */}
            <div>
              <h3 className="text-lg font-bold text-[#2C3E50] mb-4">من نحن</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-[#7F8C8D] hover:text-[#2D9CDB] transition">من نحن</Link></li>
                <li><Link href="/terms" className="text-[#7F8C8D] hover:text-[#2D9CDB] transition">الشروط والأحكام</Link></li>
                <li><Link href="/privacy" className="text-[#7F8C8D] hover:text-[#2D9CDB] transition">سياسة الخصوصية</Link></li>
                <li><Link href="/contact" className="text-[#7F8C8D] hover:text-[#2D9CDB] transition">تواصل معنا</Link></li>
              </ul>
            </div>
            {/* Shopping Section */}
            <div>
              <h3 className="text-lg font-bold text-[#2C3E50] mb-4">التسوق</h3>
              <ul className="space-y-3">
                <li><Link href="/offers" className="text-[#7F8C8D] hover:text-[#2D9CDB] transition">العروض</Link></li>
                <li><Link href="/brands" className="text-[#7F8C8D] hover:text-[#2D9CDB] transition">الماركات</Link></li>
                <li><Link href="/categories" className="text-[#7F8C8D] hover:text-[#2D9CDB] transition">جميع الفئات</Link></li>
                <li><Link href="/new-products" className="text-[#7F8C8D] hover:text-[#2D9CDB] transition">المنتجات الجديدة</Link></li>
              </ul>
            </div>
            {/* Branches Section */}
            <div>
              <h3 className="text-lg font-bold text-[#2C3E50] mb-4">فروعنا</h3>
              <ul className="space-y-3">
                <li><Link href="/branches/riyadh" className="text-[#7F8C8D] hover:text-[#2D9C8D] transition">الرياض</Link></li>
                <li><Link href="/branches/jeddah" className="text-[#7F8C8D] hover:text-[#2D9C8D] transition">جدة</Link></li>
                <li><Link href="/branches/dammam" className="text-[#7F8C8D] hover:text-[#2D9C8D] transition">الدمام</Link></li>
                <li><Link href="/branches-map" className="text-[#7F8C8D] hover:text-[#2D9C8D] transition">خريطة الفروع</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}