"use client";

import { ContactUs } from "./ContactUs";

export function TermsAndConditions() {
  return (
    <div className="w-full mx-auto">
      <div className="bg-white px-4 sm:px-6 md:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="text-right mb-6 md:mb-8">
          <h1 className="text-right font-cairo text-[#2C3E50] text-2xl sm:text-[28px] md:text-[32px] font-extrabold leading-[140%] tracking-[0.5px] w-full sm:w-auto ml-auto mb-4 md:mb-6">
            الشروط والأحكام
          </h1>
          <p className="text-right font-cairo text-[#2C3E50] text-sm sm:text-base font-normal leading-[140%] w-full sm:w-auto md:w-[675px] ml-auto">
            مرحبًا بك في موقعنا! يُرجى قراءة الشروط والأحكام التالية بعناية قبل
            استخدامك للموقع أو أي من خدماتنا.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-6 md:space-y-8">
          <Section
            number="1"
            title="التعريفات"
            items={[
              "الموقع: يشير إلى منصة الصيدلية الإلكترونية الخاصة بنا.",
              "المستخدم: هو كل من يقوم باستخدام الموقع سواء للتصفح أو الشراء.",
              "المنتجات: تشمل الأدوية، المكملات، مستحضرات التجميل، العناية الشخصية، وغيرها من الأصناف المعروضة للبيع.",
            ]}
          />

          <Section
            number="2"
            title="قبول الشروط"
            items={[
              "باستخدامك للموقع، فإنك توافق على الالتزام بهذه الشروط والأحكام، وتقر بأنك قرأت وفهمت كافة البنود.",
            ]}
          />

          <Section
            number="3"
            title="معلومات المنتجات"
            items={[
              "نسعى لتقديم معلومات دقيقة ومحدثة عن المنتجات، إلا أننا لا نضمن خلو المحتوى من الأخطاء أو النواقص. يُرجى دائمًا الرجوع للنشرة الطبية أو استشارة مختص قبل الاستخدام.",
            ]}
          />

          <Section
            number="4"
            title="الطلبات والدفع"
            items={[
              "يحتفظ الموقع بالحق في رفض أو إلغاء أي طلب لأي سبب.",
              "تتم معالجة الطلبات بعد التأكيد واستلام الدفع.",
              "يتم الدفع عبر وسائل الدفع الإلكترونية المتاحة داخل المملكة العربية السعودية.",
            ]}
          />

          <Section
            number="5"
            title="الشحن والتوصيل"
            items={[
              "يتم توصيل الطلبات إلى جميع مدن المملكة خلال 1–5 أيام عمل.",
              "في حال تعذر التوصيل لظروف خارجة عن إرادتنا، سيتم التواصل معك لإعادة الترتيب.",
            ]}
          />

          <Section
            number="6"
            title="سياسة الإرجاع والاستبدال"
            items={[
              "يمكن إرجاع أو استبدال المنتجات خلال 7 أيام من الاستلام بشرط عدم فتحها أو استخدامها.",
              "تُستثنى الأدوية والمستحضرات الطبية من الإرجاع، تماشيًا مع تعليمات وزارة الصحة.",
            ]}
          />

          <Section
            number="7"
            title="الحسابات"
            items={[
              "يتحمل المستخدم مسؤولية الحفاظ على بيانات تسجيل الدخول الخاصة به.",
              "يُمنع مشاركة الحساب مع أطراف أخرى حفاظًا على أمان معلوماتك وسلامة استخدامك.",
            ]}
          />

          <Section
            number="8"
            title="حقوق الملكية"
            items={[
              "جميع حقوق المحتوى والتصميمات والعلامات التجارية محفوظة للموقع. لا يجوز نسخ أو إعادة استخدام أي جزء من الموقع دون إذن مسبق.",
            ]}
          />

          <Section
            number="9"
            title="التعديلات على الشروط"
            items={[
              "نحتفظ بحق تعديل أو تحديث الشروط والأحكام في أي وقت دون إشعار. يسري العمل بالشروط الجديدة فور نشرها على الموقع.",
            ]}
          />

          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl mb-3 flex items-center gap-1">
              <span className="text-[#2C3E50]">10.</span>
              <span className="text-[#2C3E50]">الدعم والتواصل</span>
            </h2>
            <div className="[&>*]:p-0">
              <ContactUs />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  number,
  title,
  items,
}: {
  number: string;
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl md:text-3xl mb-2 md:mb-3 flex items-center gap-1">
        <span className="text-[#2C3E50]">{number}.</span>
        <span className="text-[#2C3E50]">{title}</span>
      </h2>
      <ul className="space-y-1 md:space-y-2 text-[#2C3E50] text-sm sm:text-base list-inside">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-1 px-0 sm:px-2 text-right"
          >
            <span className="text-[#2C3E50] mt-1 px-1 sm:px-2 flex-shrink-0">
              •
            </span>
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
