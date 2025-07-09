"use client";

import Image from "next/image";
import { Truck, CreditCard, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { Bandaids } from "./icons/about/Bandaids";
import { FirstAid } from "./icons/about/FirstAid";
import { Pill } from "./icons/about/Pill";

export function AboutUs() {
  const router = useRouter();
  return (
    <div className="w-full mx-auto">
      <div className="bg-white px-2 sm:px-4 py-4 sm:py-8">
        {/* Main Content */}
        <div className="space-y-8 md:space-y-12">
          {/* About Section with Image */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
            <div className="w-full lg:w-1/2 order-1 lg:order-1">
              <h1 className="text-right font-cairo text-[#2C3E50] text-2xl sm:text-[28px] md:text-[32px] font-extrabold leading-[140%] tracking-[0.5px] ml-auto mb-4 md:mb-4">
                من نحن
              </h1>
              <p className="text-right font-cairo text-[#2C3E50] text-sm sm:text-base font-normal leading-[140%] ml-auto mb-4 md:mb-6">
                في صحــــــــــة، نؤمن بأن الرعاية الصحية تبدأ من الراحة والثقة.
                نحن منصة سعودية إلكترونية متخصصة في بيع الأدوية، مستحضرات
                التجميل، والعناية الشخصية، نسعى لتقديم تجربة تسوق آمنة، سريعة،
                وسهلة لكل بيت في المملكة.
              </p>
              <h2 className="text-xl sm:text-2xl text-right text-[#2C3E50] mb-2">
                مهمتنا
              </h2>
              <p className="text-right text-[#2C3E50] text-sm sm:text-base mb-4 md:mb-6">
                نهدف إلى تمكين الأفراد والعائلات من الوصول إلى منتجات صحية
                وعلاجية معتمدة، بسهولة ومن مكان واحد. نختار بعناية منتجاتنا من
                أفضل العلامات التجارية لضمان الجودة والموثوقية.
              </p>

              <h2 className="text-xl sm:text-2xl text-right text-[#2C3E50] mb-2">
                رؤيتنا
              </h2>

              <p className="text-[#2C3E50] text-sm sm:text-base">
                أن نكون الخيار الأول للرعاية الصحية والتجميلية الإلكترونية في
                السعودية، عبر توفير تجربة تسوق ذكية ومتكاملة، تلبي احتياجات جميع
                أفراد الأسرة.
              </p>
            </div>
            <div className="w-full lg:w-1/2 h-[250px] sm:h-[300px] md:h-[400px] order-2 lg:order-2 rounded-lg overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src="/images/doctor.png"
                  alt="صيدلية صحة الآن"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-[#F6F6F6] p-2 md:p-6 rounded-lg border border-[#DADADA] text-right">
              <div className="flex mb-0 md:mb-2">
                <div className="size-8 md:size-10 flex items-center justify-center">
                  <Bandaids />
                </div>
              </div>
              <h3 className="text-lg text-[#2C3E50] mb-1 md:mb-4">
                منتجات عالية الجودة
              </h3>
              <p className="text-[#2C3E50] text-sm">
                نقدم لك فقط المنتجات الطبية والتجميلية عالية الجودة. تشكيلة
                مختارة بعناية لضمان حصولك على أفضل المنتجات لتلبية احتياجاتك
                الصحية والجمالية.
              </p>
            </div>
            <div className="bg-[#F6F6F6] p-4 md:p-6 rounded-lg border border-[#DADADA] text-right">
              <div className="flex  mb-2">
                <div className="size-8 md:size-10 flex items-center justify-center">
                  <Pill />
                </div>
              </div>
              <h3 className="text-lg  text-[#2C3E50] mb-1 md:mb-4">
                تغطية شاملة في جميع أنحاء المملكة
              </h3>
              <p className="text-[#2C3E50] text-sm">
                بغض النظر عن مكانك في المملكة العربية السعودية، نحن نضمن لك
                توصيل طلبك إلى باب منزلك بسرعة ودقة، مع ضمان وصوله في الوقت
                المحدد.
              </p>
            </div>
            <div className="bg-[#F6F6F6] p-4 md:p-6 rounded-lg border border-[#DADADA] text-right">
              <div className="flex mb-2">
                <div className="size-8 md:size-10  flex items-center justify-center">
                  <FirstAid />
                </div>
              </div>
              <h3 className="text-lg text-[#2C3E50] mb-1 md:mb-4">
                دعم مريح وطرق دفع سهلة
              </h3>
              <p className="text-[#2C3E50] text-sm">
                فريق الدعم لدينا دائمًا هنا لمساعدتك. بالإضافة إلى ذلك، استمتع
                بطرق دفع آمنة وسهلة لتجربة تسوق سلسة.
              </p>
            </div>
          </div>

          {/* People First Section */}
          <div className="flex flex-col lg:flex-row gap-4 md:gap-12 items-center">
            <div className=" bg-[#E9F9F5]  rounded-lg  p-4 md:p-10  w-full lg:w-1/2 order-1 lg:order-1 text-right">
              <h2 className="text-right text-[#2C3E50] text-xl sm:text-xl md:text-2xl font-bold mb-2 md:mb-6">
                الناس أولاً
                <br />
                نوفّر لك أعلى جودة من العناية والاهتمام.
              </h2>
              <p className="text-right text-[#7F8C8D] text-base sm:text-lg font-normal leading-relaxed mb-2 md:mb-6">
                في صحة، نؤمن تماماً أن عملائنا هم أولويتنا الأولى. صحتك وراحتك
                هي الأهم بالنسبة لنا. نحن ملتزمون بتوفير أفضل جودة من العناية
                إلى جانب تجربة تسوق سهلة وآمنة. سواء كنت بحاجة إلى أدوية أساسية،
                أو مستحضرات تجميل، أو منتجات صحية، نحن هنا لمساعدتك على العيش
                بصحة أفضل.
              </p>
              <button
                onClick={() => router.push("/products")}
                className="w-64 h-12 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md text-lg font-medium"
              >
                تسوق الآن
              </button>
            </div>

            <div className="w-full lg:w-1/2 h-[250px] sm:h-[300px] md:h-[400px] order-2 lg:order-2 rounded-lg overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src="/images/Tablets.jpg"
                  alt="منتجات صحة الآن"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Best Products Section */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
            <div className="w-full lg:w-1/2 h-[250px] sm:h-[300px] md:h-[350px] order-2 lg:order-2 rounded-lg overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src="/images/lab.jpg"
                  alt="مختبر صحة الآن"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className=" bg-[#FFF5E5]  rounded-lg  p-4 md:p-10  w-full lg:w-1/2 order-1 lg:order-2 text-right">
              <h2 className="text-right text-[#2C3E50] text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4">
                أفضل الخيارات، أفضل المنتجات
              </h2>
              <p className="text-right text-[#2C3E50] text-sm sm:text-base mb-4">
                نحرص دائمًا على اختيار منتجات عالية الجودة من أفضل وأشهر
                الماركات في السوق.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Truck className="size-4 md:size-6 -scale-x-100" />

                  <span className="text-[#2C3E50] text-sm">
                    توصيل سريع في خلال 24 ساعة
                  </span>
                </div>
                <div className="flex items-center  gap-2">
                  <CreditCard className="size-4 md:size-6" />

                  <span className="text-[#2C3E50] text-sm">
                    أسعار منافسة مع خيارات دفع متعددة
                  </span>
                </div>
                <div className="flex items-center  gap-2">
                  <Clock className="size-4 md:size-6" />

                  <span className="text-[#2C3E50] text-sm">
                    طلب سهل وتتبع شحنات في أي وقت
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => router.push("/products")}
                  className="w-64 h-12 bg-[#F4A261] hover:bg-orange-500  text-white px-4 py-3 rounded-md text-lg font-medium"
                >
                  اشترى الآن
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
