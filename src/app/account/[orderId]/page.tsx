import { OrderDetails } from "@/components/account/OrderDetails";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export default function OrderDetailsPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "الحساب", href: "/account" },
          { label: "تفاصيل الطلب" },
        ]}
      />
      <OrderDetails />
    </>
  );
}
