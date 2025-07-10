"use client";

import { ContactUs } from "./ContactUs";
import { motion } from "motion/react";
import { useIntersectionObserver } from "usehooks-ts";

export function TermsAndConditions() {
  return (
    <div className="w-full mx-auto">
      <div className="bg-white px-2 sm:px-6 md:px-8 py-6 md:py-8">
        {/* Header */}
        <motion.div
          className="text-right mb-6 md:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-right font-cairo text-[#2C3E50] text-2xl sm:text-[28px] md:text-[32px] font-extrabold leading-[140%] tracking-[0.5px] w-full sm:w-auto ml-auto mb-4 md:mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            الشروط والأحكام
          </motion.h1>
          <motion.p
            className="text-right font-cairo text-[#2C3E50] text-sm sm:text-base font-normal leading-[140%] w-full sm:w-auto md:w-[675px] ml-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            مرحبًا بك في موقعنا! يُرجى قراءة الشروط والأحكام التالية بعناية قبل
            استخدامك للموقع أو أي من خدماتنا.
          </motion.p>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-6 md:space-y-8">
          <AnimatedSection
            number="1"
            title="التعريفات"
            items={[
              "الموقع: يشير إلى منصة الصيدلية الإلكترونية الخاصة بنا.",
              "المستخدم: هو كل من يقوم باستخدام الموقع سواء للتصفح أو الشراء.",
              "المنتجات: تشمل الأدوية، المكملات، مستحضرات التجميل، العناية الشخصية، وغيرها من الأصناف المعروضة للبيع.",
            ]}
          />

          <AnimatedSection
            number="2"
            title="قبول الشروط"
            items={[
              "باستخدامك للموقع، فإنك توافق على الالتزام بهذه الشروط والأحكام، وتقر بأنك قرأت وفهمت كافة البنود.",
            ]}
          />

          <AnimatedSection
            number="3"
            title="معلومات المنتجات"
            items={[
              "نسعى لتقديم معلومات دقيقة ومحدثة عن المنتجات، إلا أننا لا نضمن خلو المحتوى من الأخطاء أو النواقص. يُرجى دائمًا الرجوع للنشرة الطبية أو استشارة مختص قبل الاستخدام.",
            ]}
          />

          <AnimatedSection
            number="4"
            title="الطلبات والدفع"
            items={[
              "يحتفظ الموقع بالحق في رفض أو إلغاء أي طلب لأي سبب.",
              "تتم معالجة الطلبات بعد التأكيد واستلام الدفع.",
              "يتم الدفع عبر وسائل الدفع الإلكترونية المتاحة داخل المملكة العربية السعودية.",
            ]}
          />

          <AnimatedSection
            number="5"
            title="الشحن والتوصيل"
            items={[
              "يتم توصيل الطلبات إلى جميع مدن المملكة خلال 1–5 أيام عمل.",
              "في حال تعذر التوصيل لظروف خارجة عن إرادتنا، سيتم التواصل معك لإعادة الترتيب.",
            ]}
          />

          <AnimatedSection
            number="6"
            title="سياسة الإرجاع والاستبدال"
            items={[
              "يمكن إرجاع أو استبدال المنتجات خلال 7 أيام من الاستلام بشرط عدم فتحها أو استخدامها.",
              "تُستثنى الأدوية والمستحضرات الطبية من الإرجاع، تماشيًا مع تعليمات وزارة الصحة.",
            ]}
          />

          <AnimatedSection
            number="7"
            title="الحسابات"
            items={[
              "يتحمل المستخدم مسؤولية الحفاظ على بيانات تسجيل الدخول الخاصة به.",
              "يُمنع مشاركة الحساب مع أطراف أخرى حفاظًا على أمان معلوماتك وسلامة استخدامك.",
            ]}
          />

          <AnimatedSection
            number="8"
            title="حقوق الملكية"
            items={[
              "جميع حقوق المحتوى والتصميمات والعلامات التجارية محفوظة للموقع. لا يجوز نسخ أو إعادة استخدام أي جزء من الموقع دون إذن مسبق.",
            ]}
          />

          <AnimatedSection
            number="9"
            title="التعديلات على الشروط"
            items={[
              "نحتفظ بحق تعديل أو تحديث الشروط والأحكام في أي وقت دون إشعار. يسري العمل بالشروط الجديدة فور نشرها على الموقع.",
            ]}
          />

          <AnimatedContactSection />
        </div>
      </div>
    </div>
  );
}

function AnimatedSection({
  number,
  title,
  items,
}: {
  number: string;
  title: string;
  items: string[];
}) {
  const { ref, isIntersecting: inView } = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-xl sm:text-2xl md:text-3xl mb-2 md:mb-3 flex items-center gap-1"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <span className="text-[#2C3E50]">{number}.</span>
        <span className="text-[#2C3E50]">{title}</span>
      </motion.h2>
      <motion.ul className="space-y-1 md:space-y-2 text-[#2C3E50] text-sm sm:text-base list-inside">
        {items.map((item, index) => (
          <motion.li
            key={index}
            className="flex items-start gap-1 px-0 sm:px-2 text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
          >
            <span className="text-[#2C3E50] mt-1 px-1 sm:px-2 flex-shrink-0">
              •
            </span>
            <span className="leading-snug">{item}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

function AnimatedContactSection() {
  const { ref, isIntersecting: inView } = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-xl sm:text-2xl md:text-3xl mb-3 flex items-center gap-1"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <span className="text-[#2C3E50]">10.</span>
        <span className="text-[#2C3E50]">الدعم والتواصل</span>
      </motion.h2>
      <motion.div
        className="[&>*]:p-0"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <ContactUs />
      </motion.div>
    </motion.div>
  );
}
